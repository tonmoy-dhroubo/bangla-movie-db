import { Component, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { IDetails } from '../../i-details';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent {
    @Input() id!: string;
    details!: IDetails;

    constructor(
        public api: ApiService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loadDetails();
    }

    loadDetails() {
        this.api.getMovieDetails(this.id).subscribe({
            next: (data: IDetails) => {
                this.details = data;
                console.log(data);
            },
            error: (err: any) => console.log(err),
            complete: () => {},
        });
    }

    goToDetails(): void {
        this.router.navigate(['details', this.id]);
    }
}
