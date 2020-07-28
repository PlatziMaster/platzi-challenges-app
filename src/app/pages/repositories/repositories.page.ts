import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { EdgeRepository, Filter, SearchResponse } from '@models/repositoty.model';
import { GraphqlService } from '@services/graphql.service';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'repositories.page.html',
  styleUrls: ['repositories.page.scss'],
})
export class RepositoriesPage implements OnInit {
  response: SearchResponse = null;
  filter: Filter = {
    type: 'challenge',
    topic: 'all',
    language: 'all',
    level: 'all',
  };
  recent: EdgeRepository[];

  typeCtrl: FormControl = new FormControl('challenge');

  constructor(
    private graphqlService: GraphqlService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) {
    this.typeCtrl.valueChanges.subscribe((type) => {
      this.filter.type = type || 'all';
      this.getRepositories(this.filter);
    });
  }

  ngOnInit() {
    this.getRepositories(this.filter);
  }

  async getRepositories(filter: Partial<Filter>) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.graphqlService.search(filter).subscribe(
      async (data) => {
        this.response = data;
        this.recent = this.getRecent(data);
        await loading.dismiss();
      },
      async (error) => {
        await loading.dismiss();
      }
    );
  }

  async openFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: {
        payload: this.filter,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.filter = data;
      this.getRepositories(data);
    }
  }

  getRecent(data: SearchResponse) {
    const recentData = data.edges.map((edge) => edge);
    return recentData
      .sort((a, b) => {
        return (new Date(a.node.createdAt).getTime() - new Date(b.node.createdAt).getTime()) * -1;
      })
      .slice(0, 5);
  }
}
