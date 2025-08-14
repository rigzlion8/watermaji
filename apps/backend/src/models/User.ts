import { Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Order from './Order';
import Subscription from './Subscription';

export enum UserRole {
  CUSTOMER = 'customer',
  RIDER = 'rider',
  ADMIN = 'admin'
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google'
}

@Table({
  tableName: 'users',
  timestamps: true
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  phone?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  passwordHash?: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CUSTOMER
  })
  role!: UserRole;

  @Column({
    type: DataType.ENUM(...Object.values(AuthProvider)),
    defaultValue: AuthProvider.LOCAL
  })
  authProvider!: AuthProvider;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  googleId?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  avatar?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  emailVerified!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  lastLoginAt?: Date;

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  preferences?: Record<string, any>;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  refreshToken?: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  // Virtual fields
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Associations
  @HasMany(() => Order)
  orders!: Order[];

  @HasMany(() => Subscription)
  subscriptions!: Subscription[];
}
