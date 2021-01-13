import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Array<any>=[]
  baseUrl: string  = "http://localhost:3000/posts"

//Binding Properties for create
  createTitle: string = ""
  createBody: string = ""
  createDate: string = ""
  createImg: string = ""
//properties for editing a post
editTitle: string = ""
editBody: string = ""
editDate: string = ""
editImg: string = ""
editId: number = 0


  async getPosts(){
    const response = await fetch (this.baseUrl)
    const data = await response.json()
    this.posts = await data
  }

  async createPost(){
    console.log(this.createTitle, this.createBody, this.createDate, this.createImg)
    await fetch(this.baseUrl,{
      method:"post",
      headers: {
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        title: this.createTitle,
        body: this.createBody,
        date: this.createDate,
        img: this.createImg
      }),
    })
    this.getPosts()
    this.createTitle =" "
    this.createBody = " "
    this.createDate = " "
    this.createImg = " "
  }

editSelect(post){
  this.editId = post.id
  this.editTitle = post.title
  this.editBody = post.body
  this.editDate = post.date
  this.editImg = post.img 
}

async updatePost(){
  await fetch (this.baseUrl + "/" + this.editId,{
    method:"put",
    headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        title : this.editTitle,
        date: this.editDate ,
        body: this.editBody,
        img: this.editImg 
      }),
  })
  this.getPosts()
  this.editTitle =" "
  this.editBody = " "
  this.editDate = " "
  this.editImg = " "
  this.editId = 0

}

ngOnInit(){
  this.getPosts()
}
}