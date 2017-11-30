import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../bicycle.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

	user_id;
	bikes;
	display;
	contactinfo;

	constructor(private _bicycleService: BicycleService) { }

	ngOnInit() {
		this.user_id=this._bicycleService.getUser();
		this.refresh();
	}

	refresh(){
		this._bicycleService.allBicycles(res=>{
			this.bikes=res;
			this.display=res;
		});
	};
	filter(search){
		this.display=this.bikes.filter(bike=>bike.title.toLowerCase().includes(search.toLowerCase()));
	};
	delete(id){
		this._bicycleService.destroyBicycle(id, res=>{
			this.refresh();
		});
	};
	contact(id){
		this._bicycleService.contact(id, res=>{
			this.contactinfo=res;
		});
	};
}
