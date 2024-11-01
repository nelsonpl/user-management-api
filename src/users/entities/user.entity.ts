import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column()
  password: string;
  @Column()
  birthDate: Date;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'REMOVED';

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  removedAt: Date;

  @Column({ nullable: true })
  removedBy: string;
}