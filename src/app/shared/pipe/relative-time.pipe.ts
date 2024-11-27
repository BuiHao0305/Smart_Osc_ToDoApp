import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Pipe({
  name: 'relativeTime',
  standalone: true, 
})
export class RelativeTimePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}
  transform(value: string | Date): string {
    const lang = this.translate.currentLang 
    if (!value) return '';
    moment.locale(lang);
    return moment(value).fromNow();
  }
}
