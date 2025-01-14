/** @module Models/IPHistory */
import TypeORM from "typeorm";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { User } from "./user";

/**
 * IPHistory model - holds all IPs a user has logged in with
 */
@TypeORM.Entity()
export class IPHistory extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  id: string;

  @TypeORM.Column("text")
  ip: string;

  @TypeORM.ManyToOne((type) => User, (user: User) => user.ips, {
    //adding an IPHistory will also add associated User if it is new, somewhat useless in this example
    cascade: true,
    // if we delete a User, also delete their IP History
    onDelete: "CASCADE",
  })
  @TypeORM.JoinColumn()
  user: TypeORM.Relation<User>;

  @TypeORM.CreateDateColumn()
  created_at: string;
}
