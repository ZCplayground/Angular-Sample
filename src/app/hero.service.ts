/*
Why Services?

组件不应该直接获取或保存数据，它们不应该了解是否在展示假数据。 
它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务。

本节课，你将创建一个 HeroService，应用中的所有类都可以使用它来获取英雄列表。
不使用 new 来创建此服务，而要依靠 Angular 的依赖注入机制把它注入到 HeroesComponent 的构造函数中。

*/

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; 
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http'; // 所需的 HTTP 符号

import { catchError, map, tap } from 'rxjs/operators'; //捕获错误，你就要使用 RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）

/* @Injectable() 装饰器。 
它把这个类标记为依赖注入系统的参与者之一 */
@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(
    private messageService: MessageService,
    // 典型的“服务中的服务”场景： 你把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。
    private http: HttpClient, // 把 HttpClient 注入到构造函数中一个名叫 http 的私有属性中。
  ) { }

  // getHeroes 方法，让它返回模拟的英雄列表。
  // getHeroes(): Hero[] { 不要用这个同步的，断定肯定能获取数据的操作

  // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。
  /*getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }*/

  
  /*getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`); // 反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    return of(HEROES.find(hero => hero.id === id));
  }*/

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
  
    private heroesUrl = 'api/heroes';  // URL to web api
  
    /** GET heroes from the server */
    // HeroService.getHeroes() 方法应该捕获错误，并做适当的处理。
    getHeroes (): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`; //它使用想获取的英雄的 id 构建了一个请求 URL。
      return this.http.get<Hero>(url) //服务器应该使用单个英雄作为回应，而不是一个英雄数组。
        .pipe(
          tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    /*HttpClient.put() 方法接受三个参数
      URL 地址
      要修改的数据（这里就是修改后的英雄）
      选项*/
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions) // 它调用 HttpClient.post() 而不是 put()。

    // 它期待服务器为这个新的英雄生成一个 id，然后把它通过 Observable<Hero> 返回给调用者
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`; // URL 就是英雄的资源 URL 加上要删除的英雄的 id。

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
 /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
