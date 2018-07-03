import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  public transform(value: number, args?: any): string {
    const date = new Date(value * 1000);
    return date.toLocaleDateString();
  }
}
