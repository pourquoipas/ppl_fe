import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ConfigService } from 'src/app/core/configuration/config.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private configService: ConfigService, private router: Router) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.canAll(childRoute, state);
	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canAll(next, state);
	}

	public canAll(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.isLoggedIn()) {
			if (this.authService.isTenantChoose()) {
				return true;
			} else {
				this.router.navigate([this.configService.get('tenantPage')], { queryParams: { requestedRoute: state.url}});
				return false;
			}
		} else {
			this.router.navigate([this.configService.get('loginPage')]);
			return false;
		}
	}

}
