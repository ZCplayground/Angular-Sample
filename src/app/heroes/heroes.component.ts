import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({ // component装饰器函数，为该组件指定元数据
  selector: 'app-heroes', // 组件选择器
  templateUrl: './heroes.component.html', // 组件模板文件位置
  styleUrls: ['./heroes.component.css'] // 私有CCS样式表位置
})
export class HeroesComponent implements OnInit { 

  heroes = HEROES;
  selectedHero: Hero;   // 一个属性，不要赋初值

  constructor() { }

  onSelect(hero: Hero): void { // 按钮click事件
    this.selectedHero = hero;
  }
  
  ngOnInit() { // life cycle hook, 初始化逻辑
  }

}
