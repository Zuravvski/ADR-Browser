import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdrListComponent } from './adr/adr-list/adr-list.component';
import { AdrComponent } from './adr/adr.component';

const routes: Routes = [
    { path: '', component: AdrListComponent },
    { path: ':id', component: AdrComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }