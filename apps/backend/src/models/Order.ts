import { Table, Column, Model, DataType, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import User from './User';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

@Table({
  tableName: 'orders',
  timestamps: true
})
export default class Order extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING
  })
  status!: OrderStatus;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false
  })
  items!: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }>;

  @Column({
    type: DataType.JSONB,
    allowNull: false
  })
  deliveryAddress!: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  scheduledDeliveryDate?: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  // Associations
  @BelongsTo(() => User)
  user!: User;
}
