import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ForgerockCustomerIconContainer } from './forgerock-customer-icon.component';
import { ForgerockConfigModule } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockCustomerSVGModule } from 'ob-ui-libs/components/forgerock-customer-svg';

@NgModule({
  imports: [CommonModule, StoreModule, ForgerockConfigModule, ForgerockCustomerSVGModule],
  declarations: [ForgerockCustomerIconContainer],
  exports: [ForgerockCustomerIconContainer]
})
export class ForgerockCustomerIconCustomModule {}
