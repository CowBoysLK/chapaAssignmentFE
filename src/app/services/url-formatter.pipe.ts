import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'urlFormatter'
})
export class UrlFormatterPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, ...args: unknown[]): SafeHtml {
    let wordList : string[] = value.split(' ');
    wordList = wordList.map(word => {
      if(word.includes("https://")){
        return `<a href="${word}">${word} </a>`;
      }
      else {
        return `${word} `;
      }
    });
    const fomattedStr =  wordList.reduce((w1 , w2) => w1 + w2 , '');

    return this.sanitizer.bypassSecurityTrustHtml(fomattedStr);
  }

}
