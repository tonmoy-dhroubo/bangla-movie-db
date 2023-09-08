import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearch } from '../i-search';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent {
    query: string = '';
    searchResults!: ISearch;
    // searchResults: any[] = [];
    constructor(
        public api: ApiService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            this.query = param.get('query')!;
            this.getSearchResults();
        });
        this.getSearchResults();
    }

    getSearchResults() {
        this.api.getSearchMovies(this.query).subscribe({
            next: (data: any) => {
                this.searchResults = data;
                console.log(data);
            },
            error: (err: any) => console.log(err),
            complete: () => {},
        });
    }
}
