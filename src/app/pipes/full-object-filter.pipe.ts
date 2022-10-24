import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullObjectFilter'
})
export class FullObjectFilterPipe implements PipeTransform {

  transform(items, searchTerm) {
    let filteredList = [];
    if (searchTerm) {
      let newSearchTerm = !isNaN(searchTerm) ? searchTerm.toString() : searchTerm.toString().toUpperCase();
      let prop;
      console.log(items, searchTerm, newSearchTerm);
      return items.filter(item => {
        for (let key in item) {
          if (item[key]) {
            prop = isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
            if (prop.indexOf(newSearchTerm) > -1) {
              filteredList.push(item);
              return filteredList;
            }
          }
        }
      })
    }
    else {
      return items;
    }
  }
}
