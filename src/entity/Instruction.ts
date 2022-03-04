import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Instruction {

    @PrimaryGeneratedColumn()
    id_instruction: number;

    @Column("text")
    text: string;

}