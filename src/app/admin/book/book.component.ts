import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../../models/book.model";
import {BookService} from "../../services/book.service";

declare var $:any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  errorMessage:string="";

  @Input() book:Book = new Book();
  @Output() save = new EventEmitter<any>();
  constructor(private bookService:BookService) {}

   saveBook(){
     this.bookService.saveBook(this.book).subscribe(data=>{
       debugger
       this.save.emit(data)
       $('#bookModel').modal('hide');
     },err=>{
        this.errorMessage='Unexpected error occurred.';
        console.log(err);
     })
   }

   showBookModal(){
     $('#bookModel').modal('show');
   }
}
