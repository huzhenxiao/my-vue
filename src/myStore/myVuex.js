let Vue;

class Store {
  constructor(options) {
    this._mutation = options.mutations;
    this._actions = options.actions;
    this._wrappedGetters = options.getters;

    // 定义computed选项
    const computed = {};
    this.getters = {};
    // { doubleCouter(state){} }
    const store = this;
    Object.keys(this._wrappedGetters).forEach((key) => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key];
      // 转换为computed可以使用的无参数形式
      computed[key] = function() {
        return fn(store.state);
      };
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      });
    });

    // 响应式处理
    // this.state = new Vue({
    //   data:options.state
    // })
    this._vm = new Vue({
      data: {
        // 加两个$,vue不做代理
        $$state: options.state,
      },
      computed,
    });

    // 绑定commit、dispatch的上下文为store实例
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  // 存取器，store.state
  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("不能直接访问");
  }

  // type: mutation的类型
  // payload:载荷，是参数
  commit(type, payload) {
    const entry = this._mutation[type];
    if (entry) {
      entry(this.state, payload);
    }
  }

  dispatch(type, payload) {
    const entry = this._actions[type];
    if (entry) {
      entry(this, payload);
    }
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
