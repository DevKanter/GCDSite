import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../../app/center-components/home/info.component';
import { NewsComponent } from '../../app/center-components/news/news.component';
import { PatchComponent } from '../../app/center-components/patch/patch.component';
import { CreatePostData, CreatePostRequest, DeletePostRequest, DeletePostResponse, EditPostData, EditPostRequest, GetDevPostsRequest, GetPostsRequest, GetPostsResponse, Post, PostCategory } from '../../models/Post';
import { AccountService } from '../account/account.service';
import { RequestService } from '../request/RequestService';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public newsComponent: NewsComponent;
  public infoComponent: InfoComponent;
  public patchComponent: PatchComponent;

  constructor(
    private _requestService: RequestService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar) { }

  public getPosts(category: PostCategory,component:any) {
    const request: GetPostsRequest = {
      PostCategory: category
    };

    this._requestService.sendPostRequest(request, "/Post/GetPosts").subscribe({
      next: (response: GetPostsResponse) => {
        component.posts = response.posts;
      },
      error: (error) => {
        this._snackBar.open("Failed to get Posts!", "", { duration: 3000 });

      }
    })

    if(this.accountService.loggedIn){
      const devRequest:GetDevPostsRequest = new GetDevPostsRequest(this.accountService.sessionID);
      devRequest.PostCategory = category;
      this._requestService.sendPostRequest(devRequest, "/Post/GetDevPosts").subscribe({
        next: (response: GetPostsResponse) => {
          component.devPosts = response.posts;
        },
        error: (error) => {
          this._snackBar.open("Failed to get Dev Posts!", "", { duration: 3000 });
  
        }
      })
    }
  }

  public addPost(createPostData: CreatePostData, component: any) {
    const request: CreatePostRequest = new CreatePostRequest(this.accountService.sessionID)
    request.Data = createPostData;
    this._requestService.sendNoCryptRequest(request, "/Post/CreatePost").subscribe({
      next: (result:boolean) => {
        if (result) {
          this.getPosts(createPostData.Category, component);
          component.closeBottomSheet()
        }
        else {
          this._snackBar.open("Failed to create Post!", "", { duration: 3000 });
        }
      },
      error: (error) => {
        this._snackBar.open("Failed to create Post!", "", { duration: 3000 });

      }
    })
  }

  public editPost(editPostData: EditPostData, component: any,category:PostCategory) {
    const request: EditPostRequest = new EditPostRequest(this.accountService.sessionID)
    request.Data = editPostData;
    this._requestService.sendNoCryptRequest(request, "/Post/EditPost").subscribe({
      next: (result:boolean) => {
        if (result) {
          this.getPosts(category, component);
          component.closeBottomSheet()
        }
        else {
          this._snackBar.open("Failed to edit Post!", "", { duration: 3000 });
        }
      },
      error: (error) => {
        this._snackBar.open("Failed to edit Post!", "", { duration: 3000 });

      }
    })
  }
  public deletePost(postID: number,postCategory:PostCategory, component: any) {
    const request: DeletePostRequest = new DeletePostRequest(this.accountService.sessionID)
    request.PostId = postID;
    this._requestService.sendPostRequest(request, "/Post/DeletePost").subscribe({
      next: (result: DeletePostResponse) => {
        if (result.success) {
          this._snackBar.open("Post deleted!", "", { duration: 3000 });
          this.getPosts(postCategory, component);
        }
        else {
          this._snackBar.open("Failed to delete Post!", "", { duration: 3000 });
        }
      },
      error: (error) => {
        this._snackBar.open("Failed to delete Post!", "", { duration: 3000 });

      }
    })
  }
}
