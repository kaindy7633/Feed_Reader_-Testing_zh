/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('allFeeds has link and this link is not empty', function () {
          var linkTestResult = true;

          allFeeds.forEach(function (item) {
            if (Object.keys(item).indexOf('url') === -1 || !item['url']) {   // 未找到url链接字段名则表示没有链接字段或url字段值为空
              linkTestResult = false;
            }
          });

          expect(linkTestResult).toBe(true);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('allFeeds has name and this name is not empty', function () {
          var nameTestResult = true;

          allFeeds.forEach(function (item) {
            if (Object.keys(item).indexOf('name') === -1 || !item['name']) {   // 未找到url链接字段名则表示没有链接字段或url字段值为空
              nameTestResult = false;
            }
          });

          expect(nameTestResult).toBe(true);
        });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function () {
      /* TODO:
       * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
       * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
       */
       it('this menu is default hidden', function () {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* TODO:
        * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
        * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
        * 再次点击的时候是否隐藏。
        */
      it('menu will show or hidden when icon clicked', function () {
        var eleShow, eleHide;

        $('.menu-icon-link').trigger('click');

        if (!$('body').hasClass('menu-hidden')) {
          eleShow = true;
        }

        $('.menu-icon-link').trigger('click');

        if ($('body').hasClass('menu-hidden')) {
          eleHide = true;
        }

        expect(eleShow).toBe(true);
        expect(eleHide).toBe(true);
      });
    });



    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function () {
      /* TODO:
       * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
       * 里面至少有一个 .entry 的元素。
       *
       * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
       * 和异步的 done() 函数。
       */

       beforeEach(function (done) {
         loadFeed(0, function () {
           done();
         });
       });

       it('element feed at least have one entry', function (done) {
         var container = $('.feed');
         expect(container[0].innerHTML.indexOf('entry') > -1).toBe(true);
         done();
       })

    });



    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function () {
      /* TODO:
       * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
       * 记住，loadFeed() 函数是异步的。
       */

      var oldFeed, newFeed;

      beforeEach(function (done) {
        loadFeed(0, function () {
          oldFeed = $('.feed')[0].innerHTML;
          done();
        });

        loadFeed(1, function () {
          newFeed = $('.feed')[0].innerHTML;
          done();
        });


      });

      it('oldFeed and newFeed is different', function (done) {
        expect(oldFeed !== newFeed).toBe(true);
        done();
      });

    });


}());
