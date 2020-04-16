import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

export interface CustomerFormValues {
  name: string;
  contact: string;
  support: string;
  privacy: string;
  terms: string;
  about: string;
}

export const urlRegex = /^(https|http):\/\/[^\s$.?#].[^\s]*$/;

export function validateUrl(c: FormControl) {
  if (c.value) {
    return urlRegex.test(c.value)
      ? null
      : {
          validateUrl: {
            valid: false,
          },
        };
  }
  return null;
}

@Component({
  selector: "forgerock-customer",
  template: `
    <form [formGroup]="customerForm">
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Customer name"
          formControlName="name"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="email"
          placeholder="Contact public email"
          formControlName="contact"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Support link"
          formControlName="support"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Privacy link"
          formControlName="privacy"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Terms link"
          formControlName="terms"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="About link"
          formControlName="about"
        />
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit, OnDestroy {
  @Input() defaultValues;
  @Output() update = new EventEmitter<CustomerFormValues>();
  customerForm: FormGroup;
  customerFormSubscription: Subscription;

  constructor() {
    this.customerForm = new FormGroup({
      name: new FormControl("", [Validators.minLength(1)]),
      contact: new FormControl("", [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ]),
      support: new FormControl("", [validateUrl]),
      privacy: new FormControl("", [validateUrl]),
      terms: new FormControl("", [validateUrl]),
      about: new FormControl("", [validateUrl]),
    });
  }

  ngOnInit() {
    this.customerFormSubscription = this.customerForm.valueChanges.subscribe(
      () => this.update.emit(this.customerForm.value)
    );
    // this.defaultValues && this.customerForm.setValue(this.defaultValues);
  }

  ngOnDestroy() {
    this.customerFormSubscription.unsubscribe();
  }
}
