<template>
  <div>
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名" />
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput
          type="password"
          v-model="userInfo.password"
          placeholder="请输入密码"
        />
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "../components/KInput";
import KFormItem from "../components/KFormItem";
import KForm from "../components/KForm";

export default {
  name: "",
  components: {
    KInput,
    KFormItem,
    KForm,
  },
  props: {},
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        const notice = this.$notice({
            title:'这是一个notice',
            message:valid? '请求登录':'校验失败',
            duration:3000
          });
          notice.show()
      });
    },
  },
};
</script>

<style scoped></style>
