import { Pipe, PipeTransform } from '@angular/core';
export const sortingData = { Name: 0, Category: 1, Tags: 2, Ingredient1: 3, Ingredient2: 4 , Ingredient3: 5};

export const sortValues = (a, b) => {
  return sortingData[a] >= sortingData[b] ? 1 : -1;
};

@Pipe({name: 'sortColumns'})
export class ColumnSortPipe implements PipeTransform {
  transform(value) {
    return value.sort(sortValues);
  }
}
