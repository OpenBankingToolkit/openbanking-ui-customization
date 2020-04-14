import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  ForgerockCustomizationModule,
  ForgerockCustomization,
} from "./customization/customization.module";
// @ts-ignore
import cssVars from "../scss/cssvars.scss";

export function ForgerockCustomizationFactory(): ForgerockCustomization {
  // /\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g
  // this removes the comments in the Sass file (only in dev, in prod there are no comments)
  // can't find a good wait to remove sourcemap in dev (since we can't eject Webpack config)
  // this removes the comments and select the CSS vars (way faster than just matching the CSS vars)
  return {
    cssVars: cssVars
      .replace(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g, "")
      .match(/[^{\}]+(?=})/g)[0],
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    BrowserAnimationsModule,
    ForgerockCustomizationModule.forRoot(ForgerockCustomizationFactory),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
