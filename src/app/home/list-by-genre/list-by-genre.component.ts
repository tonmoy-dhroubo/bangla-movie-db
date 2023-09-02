import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {IDiscover} from "../../i-discover";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-by-genre',
  templateUrl: './list-by-genre.component.html',
  styleUrls: ['./list-by-genre.component.css']
})
export class ListByGenreComponent {

  @Input('genre')
  genreName : string = '';

  genreId : string = '';

  links : IDiscover[] = [];

  @ViewChild('slider' , {static:true}) slider?:ElementRef;

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    // @ts-ignore
    this.genreId = this.api.genreCodes.get(this.genreName).toString();
    this.linkLoad();

  }

  linkLoad(){
    let genre = this.genreId;
    this.api.getGenreMovies(genre).subscribe({
      next: data=>{
        this.links = data.results;
      },
      error: err => console.log(err),
      complete: () => {
        this.links = this.links.filter((obj) => {
          return obj.poster_path != null && obj.id != 330141 && obj.id != 92472;
        });
        console.log(this.links);
      }
    });
  }

  routeToDetails(id?: number){
    this.router.navigate(['../details', {id: id}], {relativeTo: this.route});
    console.log(id);
  }

  sliderGoLeft(){
    this.slider?.nativeElement.scrollBy(-300,0);
  }
  sliderGoRight(){
    this.slider?.nativeElement.scrollBy(300, 0);
  }


}
