import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}
export interface State {
  ingredients: Ingredient[];
  editetIngredient: Ingredient;
  editetIngredientIndex: number;
}
const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editetIngredient: null,
  editetIngredientIndex: -1
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editetIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editetIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editetIngredientIndex: -1,
        editetIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editetIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editetIngredientIndex: -1,
        editetIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      const editetIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editetIngredient: editetIngredient,
        editetIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editetIngredient: null,
        editetIngredientIndex: -1
      };
    default:
      return state;

  }

}
