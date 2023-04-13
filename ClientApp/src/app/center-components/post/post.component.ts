import { Component, Input, OnInit } from '@angular/core';
import { Post, PostCategory } from '../../../models/Post';
import { AccountService } from '../../../services/account/account.service';
import { PostService } from '../../../services/post/post.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', './../../../styles.css']
})
export class PostComponent implements OnInit {

  public posts: Post[];
  public devPosts: Post[];
  private _bottomSheetRef: MatBottomSheetRef;

  public postIcon;
  @Input()
  public category: PostCategory = PostCategory.INVALID;
  constructor(
    private _postService: PostService,
    public accountService: AccountService,
    private _bottomSheet: MatBottomSheet) {
    this._postService.newsComponent = this;
  }

  ngOnInit(): void {
    this._postService.getPosts(this.category, this);
    switch(this.category){
      case PostCategory.INFO:
        this.postIcon = "assets/server_info.png";
        break;
      case PostCategory.NEWS:
        this.postIcon = "assets/news.png";
        break;
      case PostCategory.PATCH:
        this.postIcon = "assets/patch.png";
        break;
      case PostCategory.EVENT:
        this.postIcon = "assets/event_post.png"
        break;
      default:
        this.postIcon = "assets/server_info.png";
        break;
    }
  }

  openCreatePost(): void {
    this._bottomSheetRef = this._bottomSheet.open(AddPostComponent, {
      data: {
        category: this.category,
        postComponent:this
      }
      });
  }

  openEditPost(post:Post): void {
    this._bottomSheetRef = this._bottomSheet.open(EditPostComponent, {
      data: {
        post:post,
        postComponent:this
      }
      });
  }
  closeBottomSheet() {
    this._bottomSheetRef.dismiss();
  }
  deleteRequest(post: Post) {
    this._postService.deletePost(post.id, this.category, this);
  }

}
