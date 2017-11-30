import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../bicycle.service';
import { Bicycle } from './bicycle';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

	bike=new Bicycle();
	userBikes;
	updateImage=true;
	updateImages=[];

	constructor(private _bicycleService: BicycleService) { }

	ngOnInit() {
		this.refresh();
	}

	refresh(){
		this._bicycleService.userBicycles(res=>{
			this.userBikes=res;
		});
	}
	create(form){
		this._bicycleService.createBicycle(this.bike, res=>{
			form.resetForm();
			this.bike=new Bicycle();
			this.refresh();
		});
	};
	update(index){
		this._bicycleService.updateBicycle(this.userBikes[index], res=>{
			this.refresh();
		});
	};
	destroy(id){
		this._bicycleService.destroyBicycle(id, res=>{
			this.refresh();
		});
	};
}
