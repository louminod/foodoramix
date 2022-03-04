import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RecipeIngredient {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    id_recipe!: string;

    @Column()
    id_ingredient!: number;

}