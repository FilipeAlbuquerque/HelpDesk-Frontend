import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./components/security/auth.guard";
import { LoginComponent } from './components/security/login/login.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component : LoginComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
