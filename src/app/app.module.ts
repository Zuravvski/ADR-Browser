import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdrComponent } from './adr/adr.component';
import { AdrListComponent } from './adr/adr-list/adr-list.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusTileComponent } from './adr/status-tile/status-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdrComponent,
    AdrListComponent,
    TopMenuComponent,
    StatusTileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
