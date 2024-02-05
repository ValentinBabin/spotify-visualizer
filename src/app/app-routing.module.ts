import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserResolver } from './resolver/user.resolver';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistResolver } from './resolver/playlist.resolver';
import { CallbackComponent } from './pages/callback/callback.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'callback', component: CallbackComponent },
    { path: 'home', component: HomeComponent, resolve: { user: UserResolver } },
    { path: 'login', component: LoginComponent },
    { path: 'playlist/:id', component: PlaylistComponent, resolve: { user: UserResolver, playlist: PlaylistResolver } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
