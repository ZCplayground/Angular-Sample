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

### Suite、Specs、Expectation、Mathcer

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

## Protractor

overview：http://www.protractortest.org/#/api-overview
文档：http://www.protractortest.org/#/api

### Global Variables

Protractor 可以向你的 spec test file 提供的全局变量：

- `browser` 实质上是 WebDriver 的封装实例，用于导航到对应的网页。`browser.get` 方法加载一个页面。
- `element` 用于在你 test 的 page 上寻找定位 DOM element。需要一个叫做 `Locator` 的参数。见：[Using Locators](http://www.protractortest.org/#/locators)，或者[例子](https://github.com/angular/protractor/blob/5.4.1/spec/basic/elements_spec.js)
- `by` 是 locator strtegies 的集合，用于查找元素。For example, elements can be found by CSS selector, by ID, or by the attribute they are bound to with ng-model.

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

API | 解释
---|---
