import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filename' })
export class FileNamePipe implements PipeTransform {
  transform(value: string, exponent?: string): string {
    const name = value.substr(0, value.lastIndexOf('.'));
    if (exponent === 'img') {
      return name + '.jpg';
    }
    return name;
  }
}
