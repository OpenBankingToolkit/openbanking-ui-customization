import { NgModule, InjectionToken, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ColorPickerModule } from "ngx-color-picker";
import { FileDropModule } from "ngx-file-drop";
import { StoreModule, ActionReducerMap } from "@ngrx/store";

import { ForgerockCustomizationSidenavComponent } from "./components/sidenav/sidenav.component";
import { ForgerockCustomizationService } from "./services/customization.service";
import { ForgerockCssVarsService } from "./services/cssvars.service";
import { ForgerockMessagesModule } from "@forgerock/openbanking-ngx-common/services/forgerock-messages";
import { PaletteComponent } from "./components/palette/palette.component";
import { PaletteSampleComponent } from "./components/palette-sample/palette-sample.component";
import { PaletteBackgroundComponent } from "./components/palette-background/palette-background.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ForgerockCustomizationToken } from "./tokens";
import customizationFilesReducer, {
  customizationFilesReducerKey,
} from "./store/reducers/files";
import customizationMetaReducer, {
  customizationMetaReducerKey,
} from "./store/reducers/metadata";
import { ForgerockCustomerFaviconModule } from "@forgerock/openbanking-ngx-common/components/forgerock-customer-favicon";
import { ForgerockCustomerIconCustomModule } from "./components/forgerock-customer-icon/forgerock-customer-icon.module";
import { ForgerockCustomerLogoCustomModule } from "./components/forgerock-customer-logo/forgerock-customer-logo.module";
import { ForgerockCustomerFaviconCustomModule } from "./components/forgerock-customer-favicon/forgerock-customer-favicon.module";
import { MetasModule } from "./components/metas/metas.module";

export interface ForgerockCustomization {
  cssVars: string;
}

export type ForgerockCustomizationFactory = () => ForgerockCustomization;

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>(
  "Registered custom Reducers"
);

export function getCustomReducers() {
  return {
    [customizationFilesReducerKey]: customizationFilesReducer,
    [customizationMetaReducerKey]: customizationMetaReducer,
  };
}

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    FileDropModule,
    ForgerockCustomerIconCustomModule,
    ForgerockCustomerLogoCustomModule,
    ForgerockCustomerFaviconCustomModule,
    ForgerockCustomerFaviconModule,
    ForgerockMessagesModule,
    MetasModule,
    StoreModule.forFeature("customization", REDUCER_TOKEN),
  ],
  declarations: [
    ForgerockCustomizationSidenavComponent,
    PaletteComponent,
    PaletteSampleComponent,
    PaletteBackgroundComponent,
    FileUploadComponent,
  ],
  exports: [ForgerockCustomizationSidenavComponent],
  providers: [
    {
      provide: REDUCER_TOKEN,
      deps: [],
      useFactory: getCustomReducers,
    },
  ],
})
export class ForgerockCustomizationModule {
  static forRoot(config: ForgerockCustomizationFactory): ModuleWithProviders {
    return {
      ngModule: ForgerockCustomizationModule,
      providers: [
        ForgerockCustomizationService,
        ForgerockCssVarsService,
        { provide: ForgerockCustomizationToken, useFactory: config },
      ],
    };
  }
}
