import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value:string,limit:number=3):string {
    return (limit>=value.length)?value:value.substring(0,limit)+'...';
  }
}
