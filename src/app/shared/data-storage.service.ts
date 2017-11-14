import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    this.http.put('https://funny-angular-app.firebaseio.com/recipes.json', this.recipeService.recipes).subscribe(
      (responce: Response) => console.log(responce)
    );
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://funny-angular-app.firebaseio.com/recipes.json').map(
      (data) => {
        for (const recipe of data) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return data;
      }
    )
      .subscribe(
        (data: Recipe[]) => {
          this.recipeService.setRecipes(data);
        }
      );
  }
}
