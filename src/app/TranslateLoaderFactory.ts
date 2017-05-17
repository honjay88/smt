import {Http} from '@angular/http';
import {TranslateStaticLoader} from 'ng2-translate/ng2-translate';

export function TranslateLoaderFactory(http: Http) {
   return  new TranslateStaticLoader(http, './assets/i18n', '.json');
}