import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    email!: string

    @Column()
    password!: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    loginToken!: string | null
}