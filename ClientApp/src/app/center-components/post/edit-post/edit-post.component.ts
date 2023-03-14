import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostData, EditPostData, Post, PostCategory, PostVisibility } from '../../../../models/Post';
import { PostService } from '../../../../services/post/post.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PostComponent } from '../post.component';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  visibilityOptions = [
    {key:"Everyone",value: PostVisibility.EVERYONE},
    {key:"Developers",value: PostVisibility.DEV}];
  
  public editPostGroup: FormGroup;
  constructor(private _postService: PostService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { post:Post, postComponent:PostComponent}) {
    this.editPostGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(10)]),
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      content: new FormControl("", [Validators.required, Validators.minLength(10)]),
      visibility:new FormControl(PostVisibility.EVERYONE, [Validators.required])
    });
    this.editPostGroup.controls["title"].setValue(this.data.post.title);
    this.editPostGroup.controls["description"].setValue(this.data.post.description);
    this.editPostGroup.controls["content"].setValue(this.data.post.content);
    this.editPostGroup.controls["visibility"].setValue(this.data.post.postVisibility);
}

  ngOnInit(): void {
  }


  editPostRequest() {
    const title = this.editPostGroup.controls["title"].getRawValue();
    const description = this.editPostGroup.controls["description"].getRawValue();
    const content = this.editPostGroup.controls["content"].getRawValue();
    const visibility = this.editPostGroup.controls["visibility"].getRawValue();

    const createPostData: EditPostData = {
      PostId: this.data.post.id,
      Title: title,
      Description: description,
      Content: content,
      Visibility :visibility
    }
    this._postService.editPost(createPostData, this.data.postComponent,this.data.post.postCategory);
  }



}
