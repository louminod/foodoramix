import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";

@Entity()
export class Recipe {

    @PrimaryColumn()
    id_recipe!: string;

    @Column("text")
    title!: string;

    @Column("text")
    url!: string;

    @ManyToMany(() => Ingredient, {eager: true, cascade: ['insert'], nullable: false})
    @JoinTable()
    ingredients!: Ingredient[];

    @ManyToMany(() => Instruction, {eager: true, cascade: ['insert'], nullable: false})
    @JoinTable()
    instructions!: Instruction[];

}
