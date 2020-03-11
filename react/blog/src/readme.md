# 使用react, react-router-dom, antd 开发博客
- blog/src/assets 静态资源文件,例如图片
  - blog/src/pages 页面组件
  - blog/src/utils  一些全局公共方法,例如防抖、节流之类的
                  /loadable.js 将Router中的三个js文件做一个统一规划, 一个全局的loading
  - blog/src/Router 路由,index.js是总的,admin.js是与用户相关的组件,web.js是与页面相关的
    - Router/index.js中引入了web和admin下面的layout/index.js, 而web和admin下的layout分别管着各自下面的组件的路由匹配
    -   可以说App.js作为一级组件, web下面的layout和admin下面的layout作为二级组件, 二级组件下面又分管了很多三级组件
  - blog/src/requireLogin.js 一个判断登录的组件