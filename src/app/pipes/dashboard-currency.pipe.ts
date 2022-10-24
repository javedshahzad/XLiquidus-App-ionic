import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardCurrencyFilter',
  pure: false
})
export class DashboardCurrencyPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.teamName.indexOf(filter.teamName) !== -1);
  }

}
