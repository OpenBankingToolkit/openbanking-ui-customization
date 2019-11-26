import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { MaterialComponent } from "./material.component";
import { ForgerockCustomerIconCustomModule } from "../../customization/components/forgerock-customer-icon/forgerock-customer-icon.module";
import { ForgerockCustomerLogoCustomModule } from "../../customization/components/forgerock-customer-logo/forgerock-customer-logo.module";
import { ForgerockCustomerLogoModule } from "ob-ui-libs/components/forgerock-customer-logo";

@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    ForgerockCustomerLogoModule,
    ForgerockCustomerIconCustomModule,
    ForgerockCustomerLogoCustomModule
  ]
})
export class MaterialModule {}
