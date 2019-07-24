import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero'

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

  constructor() { }

  ngOnInit() {
  }

}
