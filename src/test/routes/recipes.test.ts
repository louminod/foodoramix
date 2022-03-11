import {expect} from "chai";
import {fastify} from "../../lib/fastify";
import {RecipeSchema} from "../../schemas/types/recipeSchema";
import {getCookie} from "../test-helper";

describe('/Recipes', function () {
    describe('#post', function () {
        it('should not be able to create a recipe in database if not connected', async function () {
            const payload: RecipeSchema = {
                "title": "Magic",
                "url": "http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340",
                "ingredients": [
                    {
                        "text": "1 (3 ounce) package watermelon gelatin"
                    },
                    {
                        "text": "14 cup boiling water"
                    },
                    {
                        "text": "1 (12 ounce) package Cool Whip, thawed"
                    },
                    {
                        "text": "2 cups cubed seedless watermelon"
                    },
                    {
                        "text": "1 graham cracker crust"
                    }
                ],
                "instructions": [
                    {
                        "text": "Dissolve Jello in boiling water."
                    },
                    {
                        "text": "Allow to cool to room temp."
                    },
                    {
                        "text": "Whisk in Cool Whip."
                    },
                    {
                        "text": "Fold in watermelon."
                    },
                    {
                        "text": "Spoon into crust."
                    },
                    {
                        "text": "Chill for 2-3 hours or overnight."
                    },
                    {
                        "text": "Yum!"
                    }
                ]
            }
            const response = await fastify.inject({method: 'POST', url: "recipes/", payload});
            expect(response.statusCode).to.eq(422);
            expect(response.json()).to.haveOwnProperty('message').equal('You are not logged in');
        })
        it('should create a recipe in database', async function () {
            const payload: RecipeSchema = {
                "title": "Magic",
                "url": "http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340",
                "ingredients": [
                    {
                        "text": "1 (3 ounce) package watermelon gelatin"
                    },
                    {
                        "text": "14 cup boiling water"
                    },
                    {
                        "text": "1 (12 ounce) package Cool Whip, thawed"
                    },
                    {
                        "text": "2 cups cubed seedless watermelon"
                    },
                    {
                        "text": "1 graham cracker crust"
                    }
                ],
                "instructions": [
                    {
                        "text": "Dissolve Jello in boiling water."
                    },
                    {
                        "text": "Allow to cool to room temp."
                    },
                    {
                        "text": "Whisk in Cool Whip."
                    },
                    {
                        "text": "Fold in watermelon."
                    },
                    {
                        "text": "Spoon into crust."
                    },
                    {
                        "text": "Chill for 2-3 hours or overnight."
                    },
                    {
                        "text": "Yum!"
                    }
                ]
            }
            const response = await fastify.inject({method: 'POST', url: "recipes/", payload, cookies: await getCookie()});
            expect(response.statusCode).to.eq(200);
        })
        it('should return recipes matching ingredients', async function () {
            const payload = {
                "ingredients": [
                    {
                        "text": "sugar"
                    },
                    {
                        "text": "potato"
                    }
                ]
            };
            const response = await fastify.inject({method: 'POST', url: "recipes/find", payload});
            expect(response.statusCode).to.eq(200);
        })
    })
    describe('#patch', function () {
        it('should not be able to patch a recipe in database if not connected', async function () {
            const payload: RecipeSchema = {
                "title": "Magic",
                "url": "http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340",
                "ingredients": [
                    {
                        "text": "1 (3 ounce) package watermelon gelatin"
                    },
                    {
                        "text": "14 cup boiling water"
                    },
                    {
                        "text": "1 (12 ounce) package Cool Whip, thawed"
                    },
                    {
                        "text": "2 cups cubed seedless watermelon"
                    },
                    {
                        "text": "1 graham cracker crust"
                    }
                ],
                "instructions": [
                    {
                        "text": "Dissolve Jello in boiling water."
                    },
                    {
                        "text": "Allow to cool to room temp."
                    },
                    {
                        "text": "Whisk in Cool Whip."
                    },
                    {
                        "text": "Fold in watermelon."
                    },
                    {
                        "text": "Spoon into crust."
                    },
                    {
                        "text": "Chill for 2-3 hours or overnight."
                    },
                    {
                        "text": "Yum!"
                    }
                ]
            }
            const response = await fastify.inject({method: 'PATCH', url: "recipes/000035f7ed", payload});
            expect(response.statusCode).to.eq(422);
            expect(response.json()).to.haveOwnProperty('message').equal('You are not logged in');
        })
        it('should patch a recipe in database ', async function () {
            const payload: RecipeSchema = {
                "title": "Magic",
                "url": "http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340",
                "ingredients": [
                    {
                        "text": "1 (3 ounce) package watermelon gelatin"
                    },
                    {
                        "text": "14 cup boiling water"
                    },
                    {
                        "text": "1 (12 ounce) package Cool Whip, thawed"
                    },
                    {
                        "text": "2 cups cubed seedless watermelon"
                    },
                    {
                        "text": "1 graham cracker crust"
                    }
                ],
                "instructions": [
                    {
                        "text": "Dissolve Jello in boiling water."
                    },
                    {
                        "text": "Allow to cool to room temp."
                    },
                    {
                        "text": "Whisk in Cool Whip."
                    },
                    {
                        "text": "Fold in watermelon."
                    },
                    {
                        "text": "Spoon into crust."
                    },
                    {
                        "text": "Chill for 2-3 hours or overnight."
                    },
                    {
                        "text": "Yum!"
                    }
                ]
            }
            const response = await fastify.inject({method: 'PATCH', url: "recipes/000035f7ed", payload, cookies: await getCookie()});
            expect(response.statusCode).to.eq(200);
        })
    })
    describe('#get', function () {
        it('should return the recipes', async function () {
            const response = await fastify.inject({method: 'GET', url: "recipes/"});
            expect(response.statusCode).to.eq(200);
        })
        it('should return one recipe', async function () {
            const response = await fastify.inject({method: 'GET', url: "recipes/000035f7ed"});
            expect(response.statusCode).to.eq(200);
        })
    })
})