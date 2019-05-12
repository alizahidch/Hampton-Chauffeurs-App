import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourlybooking'
})
export class HourlybookingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
