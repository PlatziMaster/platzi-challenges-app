import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  installEvent = null;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private swUpdate: SwUpdate,
  ) {
    this.menuCtrl.enable(false, 'menu');
  }

  ngOnInit() {
    this.updatePWA();
    this.authService.getAuth$()
    .subscribe(auth => {
      this.menuCtrl.enable(!!auth, 'menu');
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installEvent = event;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }

  async installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      await this.installEvent.userChoice();
    }
  }

  updatePWA() {
    this.swUpdate.available
    .subscribe(value => {
      console.log('update:', value);
      window.location.reload();
    });
  }

}
