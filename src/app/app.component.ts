import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    hamburger = false;

    constructor(
        private titleService: Title,
        private router: Router,
    ) {
        this.titleService.setTitle('Bangla Movie DB');
    }

    ngOnInit(): void {}

    goToSearch(query: string): void {
        this.router.navigate(['search', query]);
    }
}
