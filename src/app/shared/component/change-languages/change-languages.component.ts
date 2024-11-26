import { ChangeDetectorRef, Component} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-languages',
  templateUrl: './change-languages.component.html',
  styleUrls: ['./change-languages.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class ChangeLanguagesComponent {

  constructor(private translate: TranslateService,private cdr: ChangeDetectorRef) {
    
  }

  changeLanguage(lang: string) {
    console.log(`Changing language to: ${lang}`);
    this.translate.use(lang);
    this.cdr.detectChanges();
  }
}
