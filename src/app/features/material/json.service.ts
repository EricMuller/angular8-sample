import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http: HttpClient) {
  }

  getComments(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/comments', httpOptions);
  }

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', httpOptions);
  }


}
