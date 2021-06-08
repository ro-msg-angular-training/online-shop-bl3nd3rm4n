import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserLoggedIn()) {
      if (route.data.roles && !route.data.roles.some((role: Role) => this.authService.hasRole(role))) {
        window.alert('Unauthorized');
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    window.alert('You have to log in');
    return false;
  }
}
