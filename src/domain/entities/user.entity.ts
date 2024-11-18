
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Posts } from './post.entity';

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Posts)
  posts: Posts[];
}