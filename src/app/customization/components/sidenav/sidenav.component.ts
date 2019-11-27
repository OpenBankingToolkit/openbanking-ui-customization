import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl } from "@angular/forms";

import { ForgerockCustomizationService } from "../../services/customization.service";
import { FileUploadChangeObject } from "../file-upload/file-upload.component";
import {
  AddLogoAction,
  AddIconAction,
  AddFaviconAction
} from "../../store/reducers/files";
import {
  AddMetaTitleAction,
  AddMetaDescriptionAction
} from "../../store/reducers/metadata";
import { Subscription } from "rxjs";

@Component({
  selector: "forgerock-customization-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomizationSidenavComponent
  implements OnInit, OnDestroy {
  @Input() disableIcon = false;
  isOpened: boolean = false;
  metaForm: FormGroup;
  metaFormSubscirption: Subscription;

  constructor(
    protected store: Store<any>,
    private customizationService: ForgerockCustomizationService,
    private cdr: ChangeDetectorRef
  ) {
    this.metaForm = new FormGroup({
      title: new FormControl(""),
      description: new FormControl("")
    });
  }

  ngOnInit() {
    this.customizationService.onOpen().subscribe((isOpened: boolean) => {
      this.isOpened = isOpened;
      this.cdr.detectChanges();
    });

    this.metaFormSubscirption = this.metaForm.valueChanges.subscribe(
      ({ title, description }) => {
        title && this.store.dispatch(new AddMetaTitleAction(title));
        description &&
          this.store.dispatch(new AddMetaDescriptionAction(description));
      }
    );
    this.open();
  }

  ngOnDestroy() {
    this.metaFormSubscirption.unsubscribe();
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
