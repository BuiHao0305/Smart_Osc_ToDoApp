import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppLang } from 'src/app/core/enum/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class AppLangService {
  private currentLangContextSubject = new BehaviorSubject<AppLang>(
    AppLang.SIGN_IN
  );
  currentLangContext$ = this.currentLangContextSubject.asObservable();

  setLangContext(langContext: AppLang): void {
    this.currentLangContextSubject.next(langContext);
  }

  getLangContext(): AppLang {
    return this.currentLangContextSubject.getValue();
  }

  clearLangContext(): void {
    this.currentLangContextSubject.next(AppLang.SIGN_IN);
  }
}
