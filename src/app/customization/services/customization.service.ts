import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import * as fileSaver from "file-saver";
import { Store, select } from "@ngrx/store";

import { BehaviorSubject } from "rxjs";
import { ForgerockCssVarsService, IPalette } from "./cssvars.service";
import {
  selectors as filesSelector,
  ICustomizationFilesState,
} from "../store/reducers/files";
import {
  selectors as metadataSelector,
  ICustomizationMetadataState,
} from "../store/reducers/metadata";
import {
  selectors as customerSelector,
  ICustomizationCustomerState,
} from "../store/reducers/customer";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ForgerockCustomizationService {
  public isOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected store: Store<any>,
    private cssVarsService: ForgerockCssVarsService,
    @Inject(DOCUMENT) private document: any
  ) {}

  open = async () => {
    await this.cssVarsService.init();
    this.document.body.classList.add("customization-mode");
    this.isOpened$.next(true);
  };

  close = () => this.isOpened$.next(false);
  onOpen = (): BehaviorSubject<boolean> => this.isOpened$;

  export() {
    const exportData: Partial<{
      imgs: ICustomizationFilesState;
      metadata: ICustomizationMetadataState;
      customer: ICustomizationCustomerState;
      theme: IPalette;
    }> = {};

    this.store
      .pipe(first(), select(filesSelector.selectAll))
      .subscribe((state: any) => (exportData.imgs = state));

    this.store
      .pipe(first(), select(metadataSelector.selectAll))
      .subscribe((state: any) => (exportData.metadata = state));

    this.store
      .pipe(first(), select(customerSelector.selectAll))
      .subscribe((state: any) => (exportData.customer = state));

    exportData["theme"] = this.cssVarsService.export();

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    fileSaver.saveAs(blob, "customization.json");
  }
}
