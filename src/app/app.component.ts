import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const rotate = { asc: 'desc', desc: '', '': 'asc' };
function matches(drink, term: string) {
  return drink.Name.toLowerCase().includes(term)
    || drink.Ingredient1.toLowerCase().includes(term)
    || drink.Ingredient2.toLowerCase().includes(term)
    || drink.Category.toLowerCase().includes(term);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  drinks = [];
  sortedDrinks = [];
  itemKeys: string[] = [];
  direction = '';
  activeColuntFilter = '';
  filterText = '';
  url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
  constructor(private http: HttpClient, private pipe: DecimalPipe){}

  ngOnInit(){
    // tslint:disable-next-line: deprecation
    this.http.get(this.url).subscribe(
      (res: { drinks: [any]}) => {
          this.drinks = res.drinks.map(itr => {
          return {
            Name: itr.strDrink,
            Category: itr.strCategory,
            Tags: itr.strTags,
            Ingredient1: itr.strIngredient1,
            Ingredient2: itr.strIngredient2,
            Ingredient3: itr.strIngredient3,
          };
        });
          this.sortedDrinks = [...this.drinks];
          this.itemKeys = Object.keys(this.drinks[0]);
      });

  }
  onSort(col) {
    if (this.activeColuntFilter === col) {
      this.direction = rotate[this.direction];
    }else{
      this.direction = rotate[''];
      this.activeColuntFilter = col;
    }
    if (this.direction.length){
      this.sortedDrinks.sort( (a, b) => {
        const res = compare(`${a[col]}`, `${b[col]}`);
        return this.direction === 'asc' ? res : -res;
      });
    }else{
      this.sortedDrinks = this.drinks;
    }
  }

  triggerFilter(){
    if (this.filterText.length){
      let data = [...this.drinks];
      data = data.filter(drink => matches(drink !== null ? drink : '', this.filterText.toLowerCase()));
      this.sortedDrinks = data;
    }else{
      this.sortedDrinks = [...this.drinks];
    }
  }
}
