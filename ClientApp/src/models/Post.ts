import { AuthRequest } from "./Account";

export class GetPostsRequest {
  public PostCategory:PostCategory
}

export class GetDevPostsRequest extends AuthRequest {
  public PostCategory:PostCategory
}
export class GetPostsResponse {
  public posts: Post[];
}

export class CreatePostRequest extends AuthRequest
{
  public Data: CreatePostData;
}

export class CreatePostResponse {
  public success: boolean;
  public code: number;
}

export class EditPostRequest extends AuthRequest
{
  public Data: EditPostData;
}

export class EditPostResponse {
  public success: boolean;
  public code: number;
}

export class Post {
  public id: number;
  public postCategory: PostCategory;
  public title: string;
  public description: string;
  public content: string;
  public posted: Date;
  public modified: Date;
  public postVisibility: PostVisibility;
  public postedBy: string;
}

export class CreatePostData {
  public Category: PostCategory;
  public Title: string;
  public Description: string;
  public Content: string;
  public Visibility: PostVisibility;

}
export class EditPostData{
  public PostId:number;
  public Title: string;
  public Description: string;
  public Content: string;
  public Visibility:PostVisibility;
}

export class DeletePostRequest extends AuthRequest
{
  public PostId: number;
}
export class DeletePostResponse {
  public success: boolean;
  public code: number;
}
export enum PostCategory {
  INVALID,
  NEWS,
  INFO,
  PATCH,
  EVENT
}
export enum PostVisibility {
  INVALID,
  EVERYONE,
  DEV
}
