import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
@Injectable()
export class BicycleService {

	user_id=null;

	constructor(private _http: Http, private _router: Router) { }

	getUser(){
		return this.user_id;
	};
	loginUser(id){
		this.user_id=id;
	};
	logoffUser(){
		this.user_id=null;
	};

	contact(id, callback){
		if(this.user_id){
			this._http.get('/users/'+id).subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	register(data, callback){
		this._http.post('/users', data).subscribe(
			res=>{callback(res.json())},
			err=>{callback(err.json())}
		);
	};
	login(data, callback){
		this._http.post('/sessions', data).subscribe(
			res=>{callback(res.json())},
			err=>{callback(err.json())}
		);
	};
	logout(callback){
		if(this.user_id){
			this._http.delete('/sessions/'+this.user_id).subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	allBicycles(callback){
		if(this.user_id){
			this._http.get('/bicycles').subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	randomBicycle(callback){
		this._http.get('/bicycles/random').subscribe(
			res=>{callback(res.json())},
			err=>{callback(err.json())}
		);
	};
	userBicycles(callback){
		if(this.user_id){
			this._http.get('/users/'+this.user_id+'/bicycles').subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	createBicycle(data, callback){
		if(this.user_id){
			this._http.post('/users/'+this.user_id+'/bicycles', data).subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	updateBicycle(data, callback){
		if(this.user_id){
			this._http.put('/users/'+this.user_id+'/bicycles/'+data._id, data).subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
	destroyBicycle(id, callback){
		if(this.user_id){
			this._http.delete('/users/'+this.user_id+'/bicycles/'+id).subscribe(
				res=>{callback(res.json())},
				err=>{callback(err.json())}
			);
		}else{
			this._router.navigateByUrl("/");
		};
	};
}
