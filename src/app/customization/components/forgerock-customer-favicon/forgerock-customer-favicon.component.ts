import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

import { selectors } from "../../store/reducers/files";
import { ForgerockConfigService } from "ob-ui-libs/services/forgerock-config";
import { ForgerockCustomerFaviconComponent } from "ob-ui-libs/components/forgerock-customer-favicon";

@Component({
  selector: "forgerock-customer-favicon-container",
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerFaviconCustomComponent
  extends ForgerockCustomerFaviconComponent
  implements OnInit {
  defaultImgSrc = "./assets/logos/favicon.svg";
  stream$: Observable<string> = this.store.pipe(
    select(selectors.selectFavicon)
  );

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
