import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { GraphqlService } from '@services/graphql.service';
import { Data } from '@models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsPage implements OnInit {

  view = [window.innerWidth - 10, 1500];
  data: Data[] = [];
  mapData: {[key: string]: number} = {};


  customColors = (key: string) => {
    if (this.mapData[key] >= 70) {
      return '#a1be4f';
    } else if (this.mapData[key] >= 40) {
      return '#C7B42C';
    }
    return '#A10A28';
  }

  constructor(
    private graphqlService: GraphqlService,
    private cd: ChangeDetectorRef,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.graphqlService.getStats()
    .subscribe(data => {
      this.data = data;
      this.mapData = this.data.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {});
      this.cd.markForCheck();
    });
  }

  select(data) {
    this.navCtrl.navigateForward(`/repo/PlatziMaster/${data.name}`);
  }

}
