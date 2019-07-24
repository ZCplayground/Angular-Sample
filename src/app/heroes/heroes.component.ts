import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({ // component装饰器函数，为该组件指定元数据
  selector: 'app-heroes', // 组件选择器
  templateUrl: './heroes.component.html', // 组件模板文件位置
  styleUrls: ['./heroes.component.css'] // 私有CCS样式表位置
})
export class HeroesComponent implements OnInit { 

  constructor() { }

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  
  ngOnInit() { // life cycle hook, 初始化逻辑
  }

}
