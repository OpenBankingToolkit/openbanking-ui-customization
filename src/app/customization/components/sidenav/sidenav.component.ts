import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { Store, select } from "@ngrx/store";

import { ForgerockCustomizationService } from "../../services/customization.service";
import { FileUploadChangeObject } from "../file-upload/file-upload.component";
import {
  AddLogoAction,
  AddIconAction,
  AddFaviconAction,
} from "../../store/reducers/files";
import {
  selectors,
  ICustomizationMetadataState,
  UpdateMetasAction,
} from "../../store/reducers/metadata";
import { Subscription, Observable } from "rxjs";
import { MetaFormValues } from "../metas/metas.component";
import { first } from "rxjs/operators";

@Component({
  selector: "forgerock-customization-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgerockCustomizationSidenavComponent
  implements OnInit, OnDestroy {
  @Input() disableIcon = false;
  isOpened: boolean = false;
  customizationServiceSubscription: Subscription;
  metas$: Observable<ICustomizationMetadataState> = this.store.pipe(
    first(),
    select(selectors.selectAll)
  );

  constructor(
    protected store: Store<any>,
    private customizationService: ForgerockCustomizationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.customizationServiceSubscription = this.customizationService
      .onOpen()
      .subscribe((isOpened: boolean) => {
        this.isOpened = isOpened;
        this.cdr.detectChanges();
      });
    this.open();
  }

  ngOnDestroy() {
    this.customizationServiceSubscription.unsubscribe();
  }

  metasChange(values: MetaFormValues) {
    this.store.dispatch(new UpdateMetasAction(values));
  }

  close() {
    this.customizationService.close();
  }

  open() {
    this.customizationService.open();
  }

  export() {
    this.customizationService.export();
  }

  uploadLogo(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddLogoAction(changeObject));
  }

  uploadIcon(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddIconAction(changeObject));
  }

  uploadFavicon(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddFaviconAction(changeObject));
  }
}
