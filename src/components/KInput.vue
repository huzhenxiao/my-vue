<template>
  <div>
    <input :type="type" :value="value" @input="onInput" @blur="onBlur" v-bind="$attrs"/>
  </div>
</template>

<script>
import emitter from '../mixins/emitter'
export default {
  inheritAttrs: false, // 设置为false避免设置到根元素上
  mixins:[emitter],
  name: "KInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {};
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
    onBlur(){
      // 通知父级执行校验
      // this.$parent.$emit('validate')
      this.dispatch('KFormItem','validate')

    },
  },
};
</script>

<style scopd></style>
