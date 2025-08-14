import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const setupWebSocket = (io: Server): void => {
  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    // TODO: Verify JWT token
    // For now, allow all connections
    next();
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Join user to their personal room
    socket.on('join-user-room', (userId: string) => {
      socket.join(`user-${userId}`);
      console.log(`👤 User ${userId} joined their room`);
    });

    // Join rider to their room
    socket.on('join-rider-room', (riderId: string) => {
      socket.join(`rider-${riderId}`);
      console.log(`🚴 Rider ${riderId} joined their room`);
    });

    // Join admin room
    socket.on('join-admin-room', () => {
      socket.join('admin-room');
      console.log(`👨‍💼 Admin joined admin room`);
    });

    // Handle order updates
    socket.on('order-update', (data) => {
      const { orderId, userId, riderId, status, location } = data;
      
      // Notify user about order update
      if (userId) {
        io.to(`user-${userId}`).emit('order-status-changed', {
          orderId,
          status,
          location
        });
      }

      // Notify rider about order update
      if (riderId) {
        io.to(`rider-${riderId}`).emit('order-updated', {
          orderId,
          status,
          location
        });
      }

      // Notify admin room
      io.to('admin-room').emit('order-update', {
        orderId,
        status,
        location,
        timestamp: new Date()
      });
    });

    // Handle rider location updates
    socket.on('rider-location', (data) => {
      const { riderId, location, orderId } = data;
      
      // Notify user about rider location
      if (orderId) {
        io.to(`order-${orderId}`).emit('rider-location-update', {
          riderId,
          location,
          timestamp: new Date()
        });
      }

      // Notify admin room
      io.to('admin-room').emit('rider-location', {
        riderId,
        location,
        orderId,
        timestamp: new Date()
      });
    });

    // Handle delivery notifications
    socket.on('delivery-notification', (data) => {
      const { orderId, userId, message, type } = data;
      
      // Notify user
      if (userId) {
        io.to(`user-${userId}`).emit('delivery-notification', {
          orderId,
          message,
          type,
          timestamp: new Date()
        });
      }

      // Notify admin room
      io.to('admin-room').emit('delivery-notification', {
        orderId,
        message,
        type,
        timestamp: new Date()
      });
    });

    // Handle chat messages
    socket.on('chat-message', (data) => {
      const { orderId, senderId, senderType, message } = data;
      
      // Broadcast to order room
      io.to(`order-${orderId}`).emit('chat-message', {
        senderId,
        senderType,
        message,
        timestamp: new Date()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  console.log('✅ WebSocket service initialized');
};

// Utility functions for emitting events from other parts of the application
export const emitToUser = (io: Server, userId: string, event: string, data: any): void => {
  io.to(`user-${userId}`).emit(event, data);
};

export const emitToRider = (io: Server, riderId: string, event: string, data: any): void => {
  io.to(`rider-${riderId}`).emit(event, data);
};

export const emitToAdmin = (io: Server, event: string, data: any): void => {
  io.to('admin-room').emit(event, data);
};

export const emitToOrder = (io: Server, orderId: string, event: string, data: any): void => {
  io.to(`order-${orderId}`).emit(event, data);
};
