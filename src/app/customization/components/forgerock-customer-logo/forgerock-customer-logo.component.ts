import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common//services/forgerock-config';
import { selectors } from '../../store/reducers/files';
import { ForgerockCustomerLogoComponent } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';

@Component({
  selector: 'forgerock-customer-logo-container',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerLogoContainer extends ForgerockCustomerLogoComponent implements OnInit {
  stream$: Observable<string> = this.store.pipe(select(selectors.selectLogo));

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
