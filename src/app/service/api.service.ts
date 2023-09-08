import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    base: string = 'https://api.themoviedb.org/3/';
    genreCodes = new Map<string, number>([
        ['Action', 28],
        ['Adventure', 12],
        ['Animation', 16],
        ['Comedy', 35],
        ['Crime', 80],
        ['Documentary', 99],
        ['Drama', 18],
        ['Family', 10751],
        ['Fantasy', 14],
        ['History', 36],
        ['Horror', 27],
        ['Music', 10402],
        ['Mystery', 9648],
        ['Romance', 10749],
        ['ScienceFiction', 878],
        ['TVMovie', 10770],
        ['Thriller', 53],
        ['War', 10752],
        ['Western', 37],
    ]);

    constructor(private http: HttpClient) {}

    generateImg(path?: string): string {
        if (path != null) {
            return `https://image.tmdb.org/t/p/original${path}`;
        } else {
            return '';
        }
    }

    getMovieDetails(id: string): Observable<any> {
        return this.http.get(
            this.base + `movie/` + id + `?api_key=` + environment.theMovieDBKey,
        );
    }

    getGenreMovies(genre: string): Observable<any> {
        // return this.http.get(this.base + `discover/movie?api_key=` + environment.theMovieDBKey + `&with_genres=` + this.genres[genre as keyof typeof this.genres]);
        return this.http.get(
            this.base +
                `discover/movie?page=1&sort_by=popularity.desc&with_genres=` +
                genre +
                `&with_original_language=bn&api_key=` +
                environment.theMovieDBKey,
        );
    }

    getSearchMovies(query: string): Observable<any> {
        return this.http.get(
            this.base +
                `search/movie?query=` +
                query +
                `&page=1&api_key=` +
                environment.theMovieDBKey,
        );
    }

    getDiscover(): Observable<any> {
        // return this.http.get(this.base + `discover/movie?api_key=` + environment.theMovieDBKey + `&with_genres=` + this.genres[genre as keyof typeof this.genres]);
        return this.http.get(
            this.base +
                `discover/movie?page=1&sort_by=popularity.desc&with_original_language=bn&api_key=` +
                environment.theMovieDBKey,
        );
    }

    getYoutubeTrailer(title: string) {
        return this.http.get(
            `https://youtube.googleapis.com/youtube/v3/search?q=${
                title + ' trailer'
            }&key=${environment.googleKey}`,
        );
    }

    getCredits(id: string): Observable<any> {
        return this.http.get(
            this.base +
                `movie/` +
                id +
                `/credits?api_key=` +
                environment.theMovieDBKey,
        );
    }
}
