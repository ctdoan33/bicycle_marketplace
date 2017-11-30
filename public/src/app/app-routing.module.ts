import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
	{path: "", pathMatch: "full", component: LandingComponent},
	{path: "browse", pathMatch: "full", component: BrowseComponent},
	{path: "listings", pathMatch: "full", component: ListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
