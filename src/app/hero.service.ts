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

/* @Injectable() 装饰器。 
它把这个类标记为依赖注入系统的参与者之一 */
@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(
    private messageService: MessageService
    // 典型的“服务中的服务”场景： 你把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。
  ) { }

  // getHeroes 方法，让它返回模拟的英雄列表。
  // getHeroes(): Hero[] { 不要用这个同步的，断定肯定能获取数据的操作

  // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`); // 反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    return of(HEROES.find(hero => hero.id === id));
  }
  
}
