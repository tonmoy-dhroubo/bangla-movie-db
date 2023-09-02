import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { IDetails } from '../i-details';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
    id!: string;
    details!: IDetails;
    youtubeTrailerLink!: string;

    constructor(
        public api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.loadDetails();
        setTimeout(() => {
            this.youtubeTrailerLink =
                'https://www.youtube.com/embed/tgbNymZ7vqY';
        }, 5000);
    }

    loadDetails() {
        this.api.getMovieDetails(this.id).subscribe({
            next: (data: IDetails) => {
                this.details = data;
                console.log(data);
            },
            error: (err: any) => console.log(err),
            complete: () => {
                //console.log(this.details);
                this.loadYoutubeTrailerLink();
            },
        });
    }

    loadYoutubeTrailerLink() {
        this.api.getYoutubeTrailer(this.details.title).subscribe({
            next: (data: any) => {
                this.youtubeTrailerLink =
                    'https://www.youtube.com/embed/' + data.items[0].id.videoId;
            },
            error: (err: any) => console.log(err),
            complete: () => console.log(this.youtubeTrailerLink),
        });
    }
}
