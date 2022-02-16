import {Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Session} from "./session";

export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    email!: string

    @Column({type: 'varchar', unique: true, nullable: true})
    loginToken!: string | null

    @OneToMany(() => Session, session => session.user)
    sessions!: Promise<Session[]>
}