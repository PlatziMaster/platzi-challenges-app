import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RepositoriesPage } from './repositories.page';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RepositoriesPage
      }
    ])
  ],
  declarations: [
    RepositoriesPage,
    FilterModalComponent
  ]
})
export class RepositoriesPageModule {}
