import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';


export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [
    new Recipe('Test recipe 1', 'This is just a test',
      'http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg',
      [
        new Ingredient('meat', 5),
        new Ingredient('sugar', 2)
      ]),
    new Recipe('Test recipe 2', 'This is just a test',
      'http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg',
      [
        new Ingredient('meat', 5),
        new Ingredient('salt', 4)
      ])
  ];


  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }

  getRecipe(id: number) {
    return this._recipes[id];
  }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
