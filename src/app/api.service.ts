import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {
bookUrl ="https://s3.amazonaws.com/api-fun/books.json"
  constructor(private http : HttpClient) { }

  getBooksUrl() {
    return this.http.get(this.bookUrl);
  }
}
