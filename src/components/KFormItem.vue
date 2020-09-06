<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from '../mixins/emitter'

export default {
  name: "KFormItem",
  componentName:'KFormItem', // 用于emitter的dispatch
  components: {},
  inject: ["form"],
  mixins:[emitter],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      error: "",
    };
  },
  created() {},
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });

    // 派发事件通知KForm，新增一个KFormItem实例
    if(this.prop){
      this.dispatch('KForm','my.form.addField',[this])
    }
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const desc = { [this.prop]: rules }; // 校验描述对象
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped></style>
