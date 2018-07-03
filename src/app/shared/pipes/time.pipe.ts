import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  public transform(value: number, args?: any): string {
    const date = new Date(value * 1000);
    return date.toTimeString().split(':').slice(0, 2).join(':');
  }
}
