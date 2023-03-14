import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostData, PostCategory, PostVisibility } from '../../../../models/Post';
import { PostService } from '../../../../services/post/post.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PostComponent } from '../post.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  visibilityOptions = [
    {key:"Everyone",value: PostVisibility.EVERYONE},
    {key:"Developers",value: PostVisibility.DEV}];

  public createPostGroup: FormGroup;
  constructor(private _postService: PostService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { category:PostCategory,postComponent:PostComponent }) {
    this.createPostGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(10)]),
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      content: new FormControl("", [Validators.required, Validators.minLength(10)]),
      visibility:new FormControl(PostVisibility.EVERYONE,[Validators.required])
    });
}

  ngOnInit(): void {
  }


  createPostRequest() {
    const title = this.createPostGroup.controls["title"].getRawValue();
    const description = this.createPostGroup.controls["description"].getRawValue();
    const content = this.createPostGroup.controls["content"].getRawValue();
    const visibility = this.createPostGroup.controls["visibility"].getRawValue();

    const createPostData: CreatePostData = {
      Category:this.data.category,
      Title: title,
      Description: description,
      Content: content,
      Visibility: visibility
    }
    this._postService.addPost(createPostData, this.data.postComponent);
  }

}
