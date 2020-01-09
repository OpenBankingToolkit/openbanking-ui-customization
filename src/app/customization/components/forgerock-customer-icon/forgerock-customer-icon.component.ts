import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

import { ForgerockConfigService } from "@forgerock/openbanking-ngx-common//services/forgerock-config";
import { selectors } from "../../store/reducers/files";
import { ForgerockCustomerIconComponent } from "@forgerock/openbanking-ngx-common/components/forgerock-customer-icon";

@Component({
  selector: "forgerock-customer-icon-container",
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host div {
        display: flex;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerIconContainer
  extends ForgerockCustomerIconComponent
  implements OnInit {
  stream$: Observable<string> = this.store.pipe(select(selectors.selectIcon));

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
