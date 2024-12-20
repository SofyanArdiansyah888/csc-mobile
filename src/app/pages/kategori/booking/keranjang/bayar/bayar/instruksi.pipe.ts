import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instruksi'
})
export class InstruksiPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
