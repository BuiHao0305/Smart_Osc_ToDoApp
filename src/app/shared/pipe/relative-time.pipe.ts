import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Pipe({
  name: 'relativeTime',
  standalone: true,
  pure: false,
})
export class RelativeTimePipe implements PipeTransform {
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      moment.locale(this.currentLang);
    });
  }

  transform(value: string | Date): string {
    if (!value) return '';

    const diff = moment(value).diff(moment(), 'seconds');
    let translatedText = '';

    if (diff >= -60) {
      translatedText = this.translate.instant('RELATIVE_TIME.JUST_NOW');
    } else if (diff > -3600) {
      const count = Math.abs(Math.floor(diff / 60));
      translatedText = this.translate.instant('RELATIVE_TIME.MINUTES_AGO', {
        count,
      });
    } else if (diff > -86400) {
      const count = Math.abs(Math.floor(diff / 3600));
      translatedText = this.translate.instant('RELATIVE_TIME.HOURS_AGO', {
        count,
      });
    } else {
      const count = Math.abs(Math.floor(diff / 86400));
      translatedText = this.translate.instant('RELATIVE_TIME.DAYS_AGO', {
        count,
      });
    }

    return translatedText;
  }
}
