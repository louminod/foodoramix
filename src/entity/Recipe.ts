import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Ingredient} from "./Ingredient";
import {Instruction} from "./Instruction";
import {User} from "./User";

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

    @ManyToOne(() => User, {eager: true, cascade: ['insert'], nullable: true})
    @JoinTable()
    user?: User;
}
