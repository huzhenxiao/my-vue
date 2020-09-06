<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "KForm",
  componentName: "KForm",
  components: {},
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {
    this.fields = [];
    this.$on("my.form.addField", (item) => {
      this.fields.push(item);
    });
    this.$once("hook:beforeDestroy", () => {
      this.$off("my.form.addField");
    });
  },
  methods: {
    validate(cb) {
      // const tasks = this.$children
      //   .filter((item) => item.prop) // 过滤掉没有prop属性的item
      //   .map((item) => item.validate());
      const tasks = this.fields.map(item=>item.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style scoped></style>
