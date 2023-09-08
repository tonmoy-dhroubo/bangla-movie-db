import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { ListByGenreComponent } from './home/list-by-genre/list-by-genre.component';
import { SearchItemComponent } from './search/search-item/search-item.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        DetailsComponent,
        ListByGenreComponent,
        SearchItemComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
