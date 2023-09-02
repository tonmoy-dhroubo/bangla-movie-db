import { Component } from '@angular/core';
import {ApiService} from "../service/api.service";
import {IDiscover} from "../i-discover";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bannerLinks: IDiscover[] = [];
  bannerIndex = 0;

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.bannerLinkLoad();
  }

  bannerLinkLoad() {
    this.api.getDiscover().subscribe({
      next: data => {
        this.bannerLinks = data.results;
      },
      error: err => console.log(err),
      complete: () => {
        this.bannerLinks = this.bannerLinks.filter((obj) => {
          return obj.backdrop_path != null && obj.id != 330141 && obj.id != 92472;
        });
      }
    });
  }

  bannerPrevious() {
    if (this.bannerIndex > 0) {
      this.bannerIndex--;
    }
  }

  bannerNext() {
    if (this.bannerIndex < this.bannerLinks.length) {
      this.bannerIndex++;
      console.log(this.bannerLinks[this.bannerIndex].original_title)
    }
  }
}
