/*
路由 best practice：
在 Angular 中，最好在一个独立的顶级模块中加载和配置路由器，它专注于路由功能，然后由根模块 AppModule 导入它。
按照惯例，这个模块类的名字叫做 AppRoutingModule，并且位于 src/app 下的 app-routing.module.ts 文件中。

指令：ng generate module app-routing --flat --module=app
--flat 把这个文件放进了 src/app 中，而不是单独的目录中。
--module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

*/
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*
路由知识：
路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图。

典型的 Angular 路由（Route）有两个属性：
1. path：一个用于匹配浏览器地址栏中 URL 的字符串。
2. component：当导航到此路由时，路由器应该创建哪个组件。
例如：你希望当 URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent。

所以，首先要导入 HeroesComponent，以便能在 Route 中引用它。然后定义一个路由数组，其中的某个路由是指向这个组件的。
*/
import { HeroesComponent }      from './heroes/heroes.component'; 
import { DashboardComponent }   from './dashboard/dashboard.component'; // 导入组件
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

// 路由数组
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }, // 添加路由
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 默认路由，把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由。

  { path: 'detail/:id', component: HeroDetailComponent }, // 参数化路由，指向id相匹配的hero detail
];

@NgModule({
  exports: [ RouterModule ],

  // 你必须首先初始化路由器，并让它开始监听浏览器中的地址变化。
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}