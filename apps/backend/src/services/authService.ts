import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserRole, AuthProvider } from '../models/User';
import { config } from '../config';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface GoogleProfile {
  id: string;
  emails: Array<{ value: string; verified: boolean }>;
  name: { givenName: string; familyName: string };
  photos: Array<{ value: string }>;
}

export class AuthService {
  private static readonly SALT_ROUNDS = 12;
  private static readonly ACCESS_TOKEN_EXPIRY = '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';

  /**
   * Register a new user with local authentication
   */
  static async registerUser(userData: UserRegistrationData): Promise<User> {
    const { email, password, ...userInfo } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const user = await User.create({
      ...userInfo,
      email,
      passwordHash,
      authProvider: AuthProvider.LOCAL,
      emailVerified: false,
      role: UserRole.CUSTOMER
    });

    return user;
  }

  /**
   * Authenticate user with email and password
   */
  static async loginUser(loginData: UserLoginData): Promise<{ user: User; tokens: AuthTokens }> {
    const { email, password } = loginData;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Verify password for local auth users
    if (user.authProvider === AuthProvider.LOCAL && user.passwordHash) {
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
    } else if (user.authProvider === AuthProvider.LOCAL) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user, tokens };
  }

  /**
   * Handle Google OAuth authentication
   */
  static async handleGoogleAuth(profile: GoogleProfile): Promise<{ user: User; tokens: AuthTokens }> {
    const { id, emails, name, photos } = profile;
    const email = emails[0]?.value;

    if (!email) {
      throw new Error('Email is required from Google profile');
    }

    // Check if user exists
    let user = await User.findOne({ 
      where: { 
        $or: [
          { email },
          { googleId: id }
        ]
      }
    });

    if (user) {
      // Update existing user with Google info
      await user.update({
        googleId: id,
        firstName: name.givenName,
        lastName: name.familyName,
        avatar: photos[0]?.value,
        emailVerified: true,
        lastLoginAt: new Date()
      });
    } else {
      // Create new user
      user = await User.create({
        googleId: id,
        firstName: name.givenName,
        lastName: name.familyName,
        email,
        avatar: photos[0]?.value,
        authProvider: AuthProvider.GOOGLE,
        emailVerified: true,
        role: UserRole.CUSTOMER,
        isActive: true
      });
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user, tokens };
  }

  /**
   * Generate JWT tokens for user
   */
  private static async generateTokens(user: User): Promise<AuthTokens> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY
    });

    // Store refresh token in user record
    await user.update({ refreshToken });

    return { accessToken, refreshToken };
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.secret) as any;
      
      const user = await User.findByPk(decoded.userId);
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: this.ACCESS_TOKEN_EXPIRY
      });

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Logout user by invalidating refresh token
   */
  static async logoutUser(userId: string): Promise<void> {
    await User.update(
      { refreshToken: null },
      { where: { id: userId } }
    );
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    return await User.findByPk(userId);
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Don't allow updating sensitive fields
    const { passwordHash, authProvider, googleId, email, role, ...safeUpdates } = updateData;
    
    await user.update(safeUpdates);
    return user;
  }

  /**
   * Change password for local auth users
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findByPk(userId);
    if (!user || user.authProvider !== AuthProvider.LOCAL || !user.passwordHash) {
      throw new Error('Invalid user or authentication method');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    await user.update({ passwordHash: newPasswordHash });
  }
}
