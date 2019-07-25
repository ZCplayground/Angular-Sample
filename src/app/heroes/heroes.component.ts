import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';  // 删除 HEROES 的导入语句， 转而导入 HeroService。
import { HeroService } from '../hero.service';

@Component({ // component装饰器函数，为该组件指定元数据
  selector: 'app-heroes', // 组件选择器
  templateUrl: './heroes.component.html', // 组件模板文件位置
  styleUrls: ['./heroes.component.css'] // 私有CCS样式表位置
})
export class HeroesComponent implements OnInit { 

  // heroes = HEROES;
  heroes: Hero[]; // 把 heroes 属性的定义改为一句简单的声明。
  
  constructor(
    /* 
      往构造函数中添加一个私有的 heroService，其类型为 HeroService。
      这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
    */
    private heroService : HeroService
  ) { }
  
  // 创建一个函数，以从服务中获取这些英雄数据。
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
      // subscribe 函数把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性。
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  
  ngOnInit() { // life cycle hook, （生命周期钩子）初始化逻辑
    this.getHeroes();
  }

}


/*垃圾堆

selectedHero: Hero;   // 一个属性，不要赋初值
  onSelect(hero: Hero): void { // 按钮click事件
    this.selectedHero = hero; // 同步操作
  }*/