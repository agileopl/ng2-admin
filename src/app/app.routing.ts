import { Routes, RouterModule } from '@angular/router';
import {Login} from "./login/login";
import {Signup} from "./signup/signup";
import {Home} from "./home/home";
import {AuthGuard} from "./common/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login2',  component: Login },
  { path: 'signup2', component: Signup },
  { path: 'home2',   component: Home, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
