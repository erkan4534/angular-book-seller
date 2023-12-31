import { NgModule } from '@angular/core';
import {NavigationError, NavigationStart, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {filter} from "rxjs";
import {Role} from "../models/role.enum";
import {AuthClassGuard} from "./guards/auth-class.guard";

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthClassGuard],
    data:{roles:[Role.ADMIN,Role.USER]}
  },

  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthClassGuard],
    data:{roles:[Role.ADMIN]}
  },

  {path:'404',component:NotFoundComponent},
  {path:'401',component:UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationError))
      .subscribe(() =>
        // Handling NavigationError, e.g. redirect to error route
        this.router.navigate(['/404'], { skipLocationChange: true })
      );
  }

}
