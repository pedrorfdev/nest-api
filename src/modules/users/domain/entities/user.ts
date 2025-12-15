import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  username: string; 

  @Column({ length: 100, unique: true, nullable: false })
  email: string; 

  @Column({ nullable: false, select: false })
  password: string;
}
