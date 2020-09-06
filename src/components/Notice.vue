<template>
  <div class="box" v-if="isShow">
    <h3>{{ title }}</h3>
    <p class="box-content">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      const timer = setTimeout(this.hide, this.duration);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    },
    hide() {
      this.isShow = false;
      this.remove();
    },
  },
};
</script>

<style scoped>
.box{
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  border: 2px solid #ddd;
  background: pink;
}
</style>
