import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './models/Movie';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  baseAuthUrl = 'http://127.0.0.1:8000/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieservice: CookieService
  ) { }
  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl, {headers: this.getAuthHeader()}) ;
  }
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseUrl}${id}/`, {headers: this.getAuthHeader()}) ;
  }
  createMovie(title: string , description : string) {
    const body = JSON.stringify({title , description});
    return this.httpClient.post(`${this.baseUrl}`, body , {headers: this.getAuthHeader()}) ;
  }
  updateMovie(id: number, title: string , description : string) {
    const body = JSON.stringify({title , description});
    return this.httpClient.put(`${this.baseUrl}${id}/`, body , {headers: this.getAuthHeader()}) ;
  }
  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseUrl}${id}/`, {headers: this.getAuthHeader()}) ;
  }
  rateMovie(rate:number,movieId:number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseUrl}${movieId}/rate_movie/`,body, {headers: this.getAuthHeader()}) ;
  }

  loginUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseAuthUrl}auth/`, body , {headers: this.headers}) ;
  }
  registerUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseAuthUrl}api/users/`, body , {headers: this.headers}) ;
  }

  getAuthHeader() {
    const token = this.cookieservice.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
