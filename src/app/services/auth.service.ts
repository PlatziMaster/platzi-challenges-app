import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fb: AngularFireAuth
  ) { }

  async login() {
    const response: any = await this.fb.auth.signInWithPopup(new auth.GithubAuthProvider());
    localStorage.setItem('token', response.credential.accessToken);
  }

  logout() {
    this.fb.auth.signOut();
  }

  getAuth() {
    return this.fb.auth;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
