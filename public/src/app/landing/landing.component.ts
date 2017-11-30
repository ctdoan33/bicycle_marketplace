import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	bike=null;
	logUser=new User;
	regUser=new User;
	confirm="";
	mismatch=false;
	restricted;
	duplicate=false;

	constructor(private _bicycleService: BicycleService, private _router: Router) { }

	ngOnInit() {
		if(this._bicycleService.getUser()){
			this._router.navigateByUrl("/browse");
		}else{
			this._bicycleService.randomBicycle(res=>{
				this.bike=res;
			});
		};
	}

	login(){
		this._bicycleService.login(this.logUser, res=>{
			if(res.success){
				this._bicycleService.loginUser(res.success);
				this._router.navigateByUrl("/browse");
			}else{
				this.restricted=Math.floor(res.restricted/1000/60);
				this.mismatch=true;
			};
		});
	};
	register(){
		this._bicycleService.register(this.regUser, res=>{
			if(res.success){
				this._bicycleService.loginUser(res.success);
				this._router.navigateByUrl("/browse");
			}else{
				this.duplicate=true;
			};
		});
	};
}
