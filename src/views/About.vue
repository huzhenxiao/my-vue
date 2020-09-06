<template>
  <div>
    <p @click="$store.commit('add')">counter:{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">
      async counter:{{ $store.state.counter }}
    </p>
    <p>double coounter:{{ $store.getters.doubleCounter }}</p>

    <router-link to="/about/info">info</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
