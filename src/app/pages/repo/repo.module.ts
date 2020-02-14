import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepoPageRoutingModule } from './repo-routing.module';

import { RepoPage } from './repo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepoPageRoutingModule
  ],
  declarations: [RepoPage]
})
export class RepoPageModule {}
