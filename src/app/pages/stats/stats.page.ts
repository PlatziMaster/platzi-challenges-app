import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
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

  view = [window.innerWidth - 100, 1500];
  data: Data[] = [];
  mapData: {[key: string]: number} = {};

  typeCtrl: FormControl = new FormControl('challenge');
  hightLevel = 0;
  mediumLevel = 0;
  lowLevel = 0;
  crHightLevel = '';
  crMediumLevel = '';
  crLowLevel = '';

  total = 0;


  customColors = (key: string) => {
    if (this.mapData[key] >= 70) {
      return '#a1be4f';
    } else if (this.mapData[key] >= 40) {
      return '#C7B42C';
    } else {
      return '#A10A28';
    }
  }

  constructor(
    private graphqlService: GraphqlService,
    private cd: ChangeDetectorRef,
    private navCtrl: NavController
  ) {
    this.typeCtrl.valueChanges
    .subscribe(type => {
      this.getStats(type);
    });
  }

  ngOnInit() {
    const type = this.typeCtrl.value;
    this.getStats(type);
  }

  select(data) {
    this.navCtrl.navigateForward(`/repo/PlatziMaster/${data.name}`);
  }

  private getStats(type: string) {
    this.graphqlService.getStats(type)
    .subscribe(data => {
      this.data = data;
      this.total = this.data.length;
      this.view = [window.innerWidth - 100, this.total < 10 ? 600 : 1500];
      this.mapData = this.data.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {});
      const rta = this.data.map(item => item.value)
      .reduce((obj, value) => {
        if (value > 70) {
          obj['70']++;
        } else if (value >= 40 && value <= 69){
          obj['40 - 69']++;
        } else {
          obj['0 - 39']++;
        }
        return obj;
      }, {
        '70': 0,
        '40 - 69': 0,
        '0 - 39': 0
      });
      this.hightLevel = rta['70'];
      this.mediumLevel = rta['40 - 69'];
      this.lowLevel = rta['0 - 39'];

      this.crHightLevel = ((this.hightLevel * 100) / this.total).toFixed(0);
      this.crMediumLevel = ((this.mediumLevel * 100) / this.total).toFixed(0);
      this.crLowLevel = ((this.lowLevel * 100) / this.total).toFixed(0);
      this.cd.markForCheck();
    });
  }

}
