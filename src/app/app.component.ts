import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuth$()
    .subscribe(auth => {
      this.menuCtrl.enable(!!auth, 'first');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }

}
