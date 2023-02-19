import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from '../api.service';

declare var window: any;
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  response: any;
  loading = true;
  apiError = false;
  bookList: Array<any> = [];
  showAddBook = false;
  enableButton = false;

  constructor(private api: Service, private http: HttpClient) { }

  ngOnInit() {
    this.api.getBooksUrl().subscribe((res) => {
      this.loading = false;
      this.response = res;
      this.bookList = this.response.data.books
    }, error => {
      this.loading = false;
      this.apiError = true;
    });
  }
  goToPurchase(link: any) {
    window.open(link, "_blank");
  }
  sortType(type: any) {
    if (type === 'publishedDate') {
      let newArr = this.response.data.books.sort((a: any, b: any) => a.PublishDate - b.PublishDate)
      this.bookList = newArr;
    }
    else if (type === 'bookTitle') {
      let newArr = this.response.data.books.sort((a: any, b: any) => a.title.localeCompare(b.title))
      this.bookList = newArr;
    }
  }
  addNewBook(val: boolean) {
    this.showAddBook = !this.showAddBook;
  }
  cancelAddBook(val: boolean) {
    this.showAddBook = val;
  }
  addBooks(data: any) {
    const dataToAdd = [];
    this.enableButton = true;
    dataToAdd.push({
      'imageUrl': data.imageUrl,
      'title': data.bookTitle,
      'purchaseLink': data.bookLink,
      'PublishDate': data.publishDate,
    })
    let datatoModify = Object.assign({}, ...dataToAdd)
    this.bookList.push(datatoModify);
    this.showAddBook = false;
  }
}
