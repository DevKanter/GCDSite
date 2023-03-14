import { Component, OnInit } from '@angular/core';
import { Post, PostCategory } from '../../../models/Post';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css', './../../../styles.css']
})
export class NewsComponent implements OnInit {
 
  constructor() {
    
  }

  ngOnInit(): void {
  }


}
