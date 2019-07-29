# 介绍

测试有两种：端到端测试和单元测试

- 端对端测试（e2e test），将程序视为一个黑盒，如同真实用户一样和程序交互，从旁观者的角度来测试程序是否达标。
- 单元测试（unit test）隔离程序的每一个部件，在隔离环境中针对每一个部件进行测试。提供既定的输入和相应的逻辑，检测输出结果，确定是否与预期匹配。

Angular 的官方文档比较推荐使用单元测试，把 e2e 测试[批判了一番](https://angular.cn/guide/testing#frequently-asked-questions)

在 Angular 中，最常用的 e2e 工具叫做 Protractor 和 Jasmine。都是 Angular 默认自带的。新建 Angular 工程时，会自动集成这两个东西的服务和代码。编写测试很方便。

> Protractor is an end-to-end test framework for Angular and AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

Protractor 是一款 Angular e2e test framework。能够打开一个浏览器与程序交互，运行测试，搜集结果，并检验每一个测试与预先设定的预期值是否相符。其定义了一系列的 API 获取 web 上的各种元素。Protractor tutorial 见[这里](http://www.protractortest.org/#/tutorial)

>Jasmine is a behavior-driven development framework for testing JavaScript code.

Jasmine 是行为驱动的一款测试 JavaScript 代码的测试框架。定义了一系列的语法，Protractor 就用到了这些语法。见[这里](https://jasmine.github.io/tutorials/your_first_suite)

# 功能 & 语法

## Jasmine

### Suite、Specs。（Expectation、Mathcer）

Jasmine 是一个 BDD framework，所以有 BDD 思想的那一套术语。下文整理自 [your_first_suite](https://jasmine.github.io/tutorials/your_first_suite)

**测试套件（Suite）**指的是，一组针对软件规格的**某个方面的测试**用例。可以看作，对软件的某个方面的描述（describe）。测试套件由一个`describe`函数构成，它接受两个参数：第一个参数是字符串，表示测试套件的名字或用来描述将要测试什么；第二个参数是个函数，用来实现这个测试套件。

**测试规格（Specs）**指的是，针对软件一个功能点的测试，是软件测试的最基本单位。**一组相关的测试用例，构成一个测试套件**。测试用例由一个`it`函数构成，它的参数与`describe`函数是一样的，接受两个参数：第一个参数是描述用字符串；第二个参数是函数，用来实现这个测试用例。

用于检验一个测试结果与预先设定的预期值是否相符，叫做 **expectations**，一个 Specs 里面可以有多个 expectations。Expectations 是由**断言（assert）**来实现的，对应的函数是`expect`和一系列 **Matcher function**。断言的结果是 true or false，只有当一个 Specs 里面所有的 expectations 都为 true 这个 specs 才算测试通过。

一个永远会通过的最简单的 test suite 语法如下：

~~~JavaScript
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
~~~

**Matchers**，每一个 matcher 函数实质上都是实现了一种在 actual value 和 expected value 之间的布尔比较。[matcher API docs](https://jasmine.github.io/api/edge/matchers.html)，也可以自己实现自己的 matcher。

### beforeEach, afterEach, beforeAll, and afterAll 

这几个 API 是为了让在测试 开始前 / 结束后 能够执行 setup or teardown 代码。

> `beforeEach` function is called once **before each spec** in the describe in which it is called. `afterEach` function is called once **after each spec**. The `beforeAll` function is **called only once before all the specs** in describe are run, and the `afterAll` function is **called after all specs finish**

### 共享变量：this & Function scope

`this` 关键字可以在多个 `beforeEach/it/afterEach` 函数之间共享一个变量。每一个单独的 `spec` 的 `beforeEach/it/afterEach` 有一个单独的 `this` 作为共享对象。执行到下一个 `spec` 时 `this` 会重置为 empty

~~~JavaScript
describe("A spec", function() {
  beforeEach(function() {
    this.foo = 0;
  });

  it("can use the `this` to share state", function() {
    expect(this.foo).toEqual(0);
    this.bar = "test pollution?";
  });

  it("prevents test pollution by having an empty `this` created for the next spec", function() {
    expect(this.foo).toEqual(0);
    expect(this.bar).toBe(undefined);
  });
});
~~~

`describe/it` 代码块有作用域，所以你也可以正常地声明变量。

~~~JavaScript
describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
~~~

### fail & disable

可以手动使一个 spec 必定失败或者不执行。函数是`fail`。必定不执行就是把 `describe` 改成 `xdescreibe`。有点像是注释掉的意思。会让 spec 进入 pending 状态。

### Spy

http://keenwon.com/1218.html

> Spies是Jasmine里面比较高端的方法，可以用来模拟函数的执行，以达到隔离复杂依赖的效果。例如，你要测试列表的处理是否正确，但是数据是异步请求接口取得的，这时你就可以使用Spies，模拟返回各种不同的数据进行测试。

> spy可以保存任何函数的调用记录和输入的参数，spy只能存在于describe和it中，在spec执行完之后销毁。先说两个针对spies的Matcher，toHaveBeenCalled 用来测试函数是否被调用过；toHaveBeenCalledWith 用来测试函数被调用时的参数列表，匹配的话返回true

### 类型判断/ not null or not undefined / objectContaining: 键值对是否存在 / 数组内是否存在某值 / 字符串部分匹配 / 计时与日期

见 tutorial，都有例子。

### 异步

1. 回调 callback
2. 承诺 promise
3. async/await

解释一下 

https://segmentfault.com/a/1190000007535316

## Protractor

overview：http://www.protractortest.org/#/api-overview
文档：http://www.protractortest.org/#/api

### Global Variables

Protractor 可以向你的 spec test file 提供的全局变量：

- `browser` 实质上是 WebDriver 的封装实例，用于导航到对应的网页。`browser.get` 方法加载一个页面。
- `element` 用于在你 test 的 page 上寻找定位 DOM element。需要一个叫做 `Locator` 的参数。见：[Using Locators](http://www.protractortest.org/#/locators)，或者[例子](https://github.com/angular/protractor/blob/5.4.1/spec/basic/elements_spec.js)
- `by` 是 **locator**，用于在 Angular 应用中查找元素。

### Locators

~~~javascript
// Find an element using a css selector.
by.css('.myclass')

// Find an element with the given id.
by.id('myid')

// Find an element using an input name selector.
by.name('field_name')

// Find an element with a certain ng-model.
// Note that at the moment, this is only supported for AngularJS apps.
by.model('name')

// Find an element bound to the given variable.
// Note that at the moment, this is only supported for AngularJS apps.
by.binding('bindingname')
~~~

Locators API | 解释 | 例子
---|---|---
model | by.model() 可以定位有 ng-model 属性的元素，可以定位输入框 | `by.model('first')` -> the element with `ng-model="first"`
id    | by.id() 定位任何 id，id 是一个 HTML 全局属性，规定元素的唯一 id |`by.id('gobutton')` -> the element with the given **id**. This finds `<button id="gobutton">`.
buttonText | 专门用 button 元素的字面值来定位 | `element(by.buttonText('Save'));` -> `<button>Save</button>`
partialButtonText  | button 字面值的部分匹配 | `element(by.partialButtonText('Save'))` -> `<button>Save my file</button>`
binding | angular 有个概念是绑定，可以将属性值与 HTML 元素的值进行绑定。元素中有属性 `class="ng-binding"`的，都有一个变量与其绑定。可以通过变量名来定位这个元素 | `by.binding('latest')` -> the element **bound to the variable** `latest`. This finds the span containing {{latest}}
repeater | Find elements inside an `ng-repeat`. | 是 AngularJS 产物
className | 根据特殊的类名寻找元素 | `element(by.className('dog'));` -> `<li class="dog">Dog</li>` 
css | 使用 CSS selector 来定位元素 |  CSS 选择器参考手册：https://www.w3school.com.cn/cssref/css_selectors.asp
cssContainingText  | 使用 CSS selector 和一个部分匹配字符串来定位元素 | 略
linkText | 用 visible text 定位 link element | `expect(element(by.linkText('Google')).getTagName()).toBe('a');` -> `<a href="http://www.google.com">Google</a>`
partialLinkText | 上一个函数的部分匹配版本 | `element(by.partialLinkText('Doge'));` -> `<a href="https://en.wikipedia.org/wiki/Doge_(meme)">Doge meme</a>`
js | 参数是一段 JavaScript，用这段 JS 来定位 |
name | 用 `name` 属性来定位 | `var dog = element(by.name('dog_name'));` -> `<li name="dog_name">Dog</li>`
tagName | 用标签名来定位 | `expect(element(by.tagName('a')).getText()).toBe('Google');` -> `<a href="http://www.google.com">Google</a>`
xpath | 用 xpath 来定位 | `var li = element(by.xpath('//ul/li/a'));`


### elements

获取了元素之后可以用 element 进行各种操作。

element.all() API | 解释 | 例子
---|---|---
element.all(locator) | 得到所有符合搜索条件的元素的数组 ElementArrayFinder。 all 是可以嵌套的。下列的函数的调用者的类型应该是 ElementArrayFinder
filter | 顾名思义
get | 用下标从 ElementArrayFinder 中得到一个元素。返回的元素的类是 ElementFinder
first | 
last | 
count | 
isPresent | Returns true if there are any elements match the finder.
$$(cssSelector) | 语法糖 | `element.all(by.css('.abc'))` is equivalent to `$$('.abc')`
then | 取出 ElementArrayFinder 中的元素列表，传入一个函数，执行这个函数
each | 对 ElementArrayFinder 中的每一个 ElementFinder 执行一个函数
map | 函数式编程
reduce | 函数式编程
element.(locator) | 得到符合搜索条件的代表单一元素的 ElementFinder。locator也是可以嵌套的。下列函数的调用者的类型是 ElementFinder。
isPresent | Determine whether the element is present on the page.
getWebElement | Returns the WebElement represented by this ElementFinder.
getId | Gets the WebDriver ID string representation for this web element.
click | 对这个元素模拟点击（如button）
sendKeys | 模拟输入，如对 input 的输入 
getTagName | 获得这个 element 的 tag 名字 |
getCssValue | 获取 CSS 中某个 property 的对应的值。例如可以检测颜色对不对 | `expect(element(by.binding('person.name')).getCssValue('color')).toBe('#000000');`
getAttribute | 获得某个属性，参数是一个查询字符串 |
getText | 获得字面值
getSize | compute the size of this element's bounding box
getLocation | compute the location of this element in page space
isEnabled | 查看 element 有没有被 disabled 属性
isSelected | 查看当前 element 有没有被选中
submit | 模拟表单的提交
clear | 清空一个 element 的 value 的属性值
isDisplayed | 检测是否 currently displayed，例如 `<div id="foo" style="visibility:hidden">` 就是false
takeScreenshot| 

### css selector 知识

https://www.w3school.com.cn/cssref/css_selectors.asp

selector 语法 | 例子 | 例子描述
---|---|---
.class |	.intro	|选择 class="intro" 的所有元素。
#id	| #firstname	|选择 id="firstname" 的所有元素。
element	| p |	选择所有 `<p>` 元素。
element,element|	div,p |	选择所有 `<div>` 元素和所有 `<p>` 元素。逗号就是集合并集
element element|	div p	| 选择 `<div>` 元素内部的所有 `<p>` 元素。空格是内部关系
element>element|	div>p	| 选择父元素为`<div>` 元素的所有`<p>` 元素。大于号是严格的父子关系