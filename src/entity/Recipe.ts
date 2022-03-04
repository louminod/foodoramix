import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Recipe {

    @PrimaryColumn()
    id_recipe: string;

    @Column("text")
    title: string;

    @Column("text")
    url: string;

}
