import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id_ingredient: number;

    @Column("text")
    text: string;

}