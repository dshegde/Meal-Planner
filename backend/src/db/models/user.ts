/** @module Models/User */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { IPHistory } from "./ip_history";
import { MealPlans } from "./meal_plans";

/**
 *  Class representing user table
 */
@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    type: "varchar",
  })
  name: string;

  @Column("text")
  email: string;

  // IPHistory
  @OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
  ips: Relation<IPHistory[]>;

  @OneToMany((type) => MealPlans, (mp: MealPlans) => mp.user)
  mps: Relation<MealPlans[]>;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
