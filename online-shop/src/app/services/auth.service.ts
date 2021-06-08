import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {User} from '../models/user';
import {Role} from '../models/role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  isLoggedIn: boolean = false;
  private userUrl = '/api/login';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.userUrl, {username, password}).pipe(
      tap((user) => {
        this.isLoggedIn = true;
        this.user = user;
      }),
      catchError((err) => {
        this.isLoggedIn = false;
        return throwError(err);
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = <User>{};
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  hasRole(role: Role): boolean {
    return this.user?.roles.includes(role);
  }

  isUser(): boolean {
    return this.user?.roles.includes(Role.ROLE_USER);
  }

  isCustomer(): boolean {
    return this.user?.roles.includes(Role.ROLE_CUSTOMER);
  }

  isAdmin(): boolean {
    return this.user?.roles.includes(Role.ROLE_ADMIN);
  }

  getRoles(): Role[] {
    return this.user?.roles;
  }
}
