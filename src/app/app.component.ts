import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Array<any>=[]
  baseUrl: string  = "http://localhost:3000/posts"

  async getPosts(){
    const response = await fetch (this.baseUrl)
    const data = await response.json()
    this.posts = await data
  }

ngOnInit(){
  this.getPosts()
}
}