import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	nav=false;

	constructor(private _bicycleService: BicycleService, private _router: Router) {
		this._router.events.subscribe(event=>{
			this.nav=Boolean(this._bicycleService.getUser());
		});
	}

	ngOnInit() {
	}

	logoff(){
		this._bicycleService.logout(res=>{
			this._bicycleService.logoffUser();
			this._router.navigateByUrl("/");
		});
	}
}
