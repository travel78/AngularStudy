import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

import { Observable } from 'rxjs/Observable';
import * as SLReducers from './store/shopping-list.reducers';
import * as SLActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ ingredients: Ingredient[] }>;


  constructor(private store: Store<SLReducers.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }


  onEditItem(index: number) {
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
