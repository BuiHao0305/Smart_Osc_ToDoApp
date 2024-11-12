import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-languages',
  templateUrl: './change-languages.component.html',
  styleUrls: ['./change-languages.component.scss'],
  standalone: true,
  imports: [],
})
export class ChangeLanguagesComponent {

  constructor(private translate: TranslateService) {}

  changeLanguage(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }
}
