<template>
    <ContentBase>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input v-model = "username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model = "password" type="password" class="form-control" id="password">
            </div>
            <div class = "error-message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary">登录</button>
          </form>
        </div>
      </div>
</ContentBase>
</template>
    


<script>
import ContentBase from '../components/ContentBase.vue'
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
  name: "LoginView",
  components: {
    ContentBase,
  },
  setup(){
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let error_message = ref('');

    const login = () => {
        store.dispatch("login", {
          username: username.value,
          password: password.value,
          success(){
            router.push({name: 'userlist'});
          },
          error() {
            error_message.value = "用户名或密码错误";
          },
        });
    }

    return {
      username: username,
      password: password,
      error_message,
      login,
    }
  }
};
</script>
    
<style scoped>
button {
width: 100%;
}
</style>