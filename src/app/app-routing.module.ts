import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PerformLoginComponent } from './perform-login/perform-login.component';
import { SinglePlayerStationComponent } from './single-player-station/single-player-station.component';
import { BattleStationComponent } from './battle-station/battle-station.component';

// note that 'auth' path is not handled through router, and instead
// is handled in SpotifyService... for no good reason really
const routes: Routes = [
{ path: 'battles/:battleId', component: BattleStationComponent },
{ path: ':station', component: SinglePlayerStationComponent },
{ path: '', component: SinglePlayerStationComponent },
];

@NgModule({
	imports: [
	RouterModule.forRoot(routes)
	],
	exports: [
	RouterModule
	],
	providers: []
})
export class AppRoutingModule {
}
