import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

export interface MetaFormValues {
  title: string;
  description: string;
}

@Component({
  selector: "forgerock-metas",
  template: `
    <form [formGroup]="metaForm">
      <mat-form-field>
        <input
          matInput
          placeholder="Title  (max 60 characters)"
          formControlName="title"
        />
      </mat-form-field>
      <mat-form-field>
        <textarea
          matInput
          rows="5"
          placeholder="Description (max 160 characters)"
          formControlName="description"
        ></textarea>
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
export class MetasComponent implements OnInit, OnDestroy {
  @Input() defaultValues;
  @Output() update = new EventEmitter<MetaFormValues>();
  metaForm: FormGroup;
  metaFormSubscirption: Subscription;

  constructor() {
    this.metaForm = new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
    });
  }

  ngOnInit() {
    this.metaFormSubscirption = this.metaForm.valueChanges.subscribe(() =>
      this.update.emit(this.metaForm.value)
    );
    this.defaultValues && this.metaForm.setValue(this.defaultValues);
  }

  ngOnDestroy() {
    this.metaFormSubscirption.unsubscribe();
  }
}
