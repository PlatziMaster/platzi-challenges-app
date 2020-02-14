import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GraphqlService } from '@services/graphql.service';

import { Repository } from '@models/repositoty.model';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.page.html',
  styleUrls: ['./repo.page.scss'],
})
export class RepoPage implements OnInit {

  repo: Repository = null;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const owner = params.owner;
      const name = params.name;
      this.getRepository(owner, name);
    });
  }

  async getRepository(owner: string, name: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.graphqlService.getRepoDetail(owner, name)
    .subscribe(async (data) => {
      this.repo = data;
      await loading.dismiss();
    }, async (error) => {
      await loading.dismiss();
    });
  }

}
