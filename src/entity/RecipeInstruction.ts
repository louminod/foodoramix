import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class RecipeInstruction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_recipe: string;

    @Column()
    id_instruction: number;

}