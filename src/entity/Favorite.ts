import {Entity, ManyToOne} from "typeorm";
import {User} from "./User";
import {Recipe} from "./Recipe";

@Entity()
export class Favorite {
    @ManyToOne(() => User, {eager: true, cascade: ['insert'], nullable: false, primary: true})
    user!: User;

    @ManyToOne(() => Recipe, {eager: true, cascade: ['insert'], nullable: false, primary: true})
    recipe!: Recipe;
}
