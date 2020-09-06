import Link from './my-router-link';
import View from './my-router-view';

let Vue;

class KVueRouter {
  constructor(options) {
    this.$options = options;

    // 需要创建响应式的current属性
    // 利用vue提供的defineReactive做响应式
    // 这样将来current变化的时候，依赖的组件会重新render
    // Vue.util.defineReactive(this, "current", "/");
    this.current = window.location.hash.slice(1) || '/';
    Vue.util.defineReactive(this,'matched',[]);
    this.match();


    // 第二种写法
    // this.app = new Vue({
    //   data(){
    //     return {
    //       current:'/'
    //     }
    //   }
    // })

    // 3.监听url的变化
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));

    // 创建一个路由映射表
    // this.routeMap = {};

    // options.routes.forEach((route) => {
    //   this.routeMap[route.path] = route;
    // });
  }
  onHashChange(){
    console.log(window.location.hash);
    this.current = window.location.hash.slice(1) || '/';
    this.matched = [];
    this.match();
  }

  match(routes){
    routes = routes || this.$options.routes;

    // 递归遍历
    for (const route of routes) {
      if(route.path === '/' && this.current === '/'){
        this.matched.push(route);
      }
      // /about/info
      if(route.path !== '/' && this.current.indexOf(route.path) !== -1){
        this.matched.push(route);
        if(route.children){
          this.match(route.children)
        }
        return
      }
    }
  }
}

KVueRouter.install = function(_Vue) {
  // 保存构造函数，在kvuerouter里面使用
  Vue = _Vue;
  // 1.实现一个插件：挂载$router
  // 挂载$router
  Vue.mixin({
    beforeCreate() {
      //  确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2.实现两个全局组件router-link和router-view
  Vue.component("router-link", Link);
  Vue.component("router-view", View);
};

export default KVueRouter;
