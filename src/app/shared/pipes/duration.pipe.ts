import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  public transform(value: number, args?: any): string {
    const minutes = value / 60;

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes - hours * 60} min`;
  }
}
