import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero'

/*以前，父组件 HeroesComponent 会设置 HeroDetailComponent.hero 属性，然后 HeroDetailComponent 就会显示这个英雄。
HeroesComponent 已经不会再那么做了。 现在，当路由器会在响应形如 ~/detail/11 的 URL 时创建 HeroDetailComponent。

HeroDetailComponent 需要从一种新的途径获取要显示的英雄。

- 获取创建本组件的路由，
- 从这个路由中提取出 id
- 通过 HeroService 从服务器上获取具有这个 id 的英雄数据。 */

import { ActivatedRoute } from '@angular/router'; //保存路由信息，如id
import { Location } from '@angular/common'; //一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。

import { HeroService }  from '../hero.service'; // 服务，从远端获取hero信息
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; 
  /* 输入属性是一个带有 @Input 装饰器的可设置属性。
     当它通过*属性绑定*的形式（也就是中括号）被绑定时，值会“流入”这个属性。
     
     这里的hero属性就必须是一个输入属性。因为 *外部的* 组件要绑定他
     
     这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。*/

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // 从路由参数中提取 id
    // route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
    // paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
    // JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
