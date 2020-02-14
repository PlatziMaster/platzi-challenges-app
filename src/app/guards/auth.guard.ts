import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const auth = this.authService.getAuth();
    const token = this.authService.getToken();
    if (auth === null || token === null) {
      this.router.navigate(['./login']);
      return false;
    }
    return true;
  }

}
