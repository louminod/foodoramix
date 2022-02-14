/* tslint:disable */

export interface Recipe {
    id: string;
    title: string;
    url: string;
    ingredients: {
        text: string;
    }
    instructions: {
        text: string;
    }
}
