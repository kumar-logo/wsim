import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts: BlogPost[] = [
    { id: '1', title: 'Market Update Q4 2023', excerpt: 'A comprehensive look at market performance...', content: '', author: 'John Admin', publishedAt: new Date('2023-12-15'), tags: ['market', 'analysis'] },
    { id: '2', title: 'Investment Strategies for 2024', excerpt: 'Key strategies to consider...', content: '', author: 'Sarah Manager', publishedAt: new Date('2024-01-05'), tags: ['strategy', 'investing'] }
  ];

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts).pipe(delay(300));
  }

  getPost(id: string): Observable<BlogPost | undefined> {
    return of(this.posts.find(p => p.id === id)).pipe(delay(200));
  }
}
