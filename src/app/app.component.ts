import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() { // life cycle hook, （生命周期钩子）初始化逻辑
    this.setTitle('Tour of Heroes');
  }
}

/*
.ts 组件的类代码
.html 组件的模板
.css 组件私有CSS样式。
*/