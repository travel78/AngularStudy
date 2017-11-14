import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import * as SLActions from '../store/shopping-list.actions';
import * as SLReducers from '../store/shopping-list.reducers';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<SLReducers.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editetIngredientIndex > -1) {
          this.editedIngredient = data.editetIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amoumt
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onAddItem() {
    const value = this.slForm.value;
    const newIng = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new SLActions.UpdateIngredient({ ingredient: newIng }));
    } else {
      this.store.dispatch(new SLActions.AddIngredient(newIng));
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();

  }

  onDelete() {
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SLActions.StopEdit());
    this.subscription.unsubscribe();
  }

}


