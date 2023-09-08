import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { IDetails } from '../i-details';
import { ICredits } from '../i-credits';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
    id!: string;
    details!: IDetails;
    youtubeTrailerLink!: string;
    credits!: ICredits;
    director: string = '';
    writer: string = '';
    producer: string = '';
    casts: string[] = [];

    constructor(
        public api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.loadDetails();
        this.loadCredits();
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

    loadCredits() {
        this.api.getCredits(this.id).subscribe({
            next: (data: ICredits) => {
                this.credits = data;
                console.log(data);
            },
            error: (err: any) => console.log(err),
            complete: () => {
                console.log(this.credits);
                for (let i = 0; i < this.credits.crew.length; i++) {
                    if (this.credits.crew[i].job == 'Director') {
                        this.director = this.credits.crew[i].name;
                    } else if (this.credits.crew[i].job == 'Story') {
                        this.writer = this.credits.crew[i].name;
                    } else if (this.credits.crew[i].job == 'Producer') {
                        this.producer = this.credits.crew[i].name;
                    } else {
                    }
                }
                for (let i = 0; i < this.credits.cast.length; i++) {
                    this.casts.push(this.credits.cast[i].name);
                }
                console.log(this.director);
                console.log(this.writer);
                console.log(this.producer);
                this.casts.forEach((each) => console.log(each));
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
