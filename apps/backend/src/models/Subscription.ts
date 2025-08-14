import { Table, Column, Model, DataType, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import User from './User';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum DeliveryFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly'
}

@Table({
  tableName: 'subscriptions',
  timestamps: true
})
export default class Subscription extends Model {
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
    type: DataType.ENUM(...Object.values(SubscriptionStatus)),
    defaultValue: SubscriptionStatus.ACTIVE
  })
  status!: SubscriptionStatus;

  @Column({
    type: DataType.ENUM(...Object.values(DeliveryFrequency)),
    allowNull: false
  })
  frequency!: DeliveryFrequency;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  pricePerDelivery!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  endDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  nextDeliveryDate?: Date;

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
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  autoRenew!: boolean;

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
