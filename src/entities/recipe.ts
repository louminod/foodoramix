import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Recipe {
    @PrimaryColumn()
    id!: string
}