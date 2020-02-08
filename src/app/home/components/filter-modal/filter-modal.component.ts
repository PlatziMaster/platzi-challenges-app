import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Filter } from '@models/repositoty.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  form: FormGroup;

  @Input()
  set payload(filter: Filter) {
    if (filter) {
      this.form.patchValue(filter);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.formBuilder.group({
      language: ['all', Validators.required],
      topic: ['all', Validators.required],
      type: ['all', Validators.required],
      level: ['all', Validators.required],
    });
  }

  onFilter(event: Event) {
    event.preventDefault();
    if ( this.form.valid ) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
