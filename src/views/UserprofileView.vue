<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
           <UserprofileInfo v-bind:user="user" @follow = "follow" @unfollow = "unfollow"></UserprofileInfo>
            
           <UserprofileWrite v-if = "is_me" @publish_post ="publish_post"></UserprofileWrite>
        </div>
        <div class="col-9">
          <UserprofilePosts :user = "user" :posts = "posts" @delete_post = "delete_post"></UserprofilePosts>
        </div>

        
      </div>
    </ContentBase>
    </template>
    
    <script>
    
    import ContentBase from '../components/ContentBase';
    import UserprofileInfo from '../components/UserprofileInfo';
    import UserprofilePosts from '../components/UserprofilePosts';
    import { reactive } from'vue';
    import UserprofileWrite from '../components/UserprofileWrite';
    import { useRoute } from 'vue-router';
    import $ from 'jquery';
    import { useStore } from 'vuex';
    import { computed } from 'vue';

    export default {
      name: "UserprofileView",
      components: {
        ContentBase,
        UserprofileInfo,
        UserprofilePosts,
        UserprofileWrite,
      },
      setup(){
          const route = useRoute();
          const userId = parseInt(route.params.userId);
          const store = useStore();
          console.log(userId);

          const user = reactive({})

          const posts = reactive({});

          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
              user_id: userId,
            },
            headers: {
              'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
              user.id = resp.id;
              user.username = resp.username;
              user.photo = resp.photo;
              user.followerCount = resp.followerCount;
              user.is_followed = resp.is_followed;
            }
            });

          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            data: {
              user_id: userId,
            },
            headers: {
              'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
              posts.posts = resp;
              posts.count = resp.length;
            }
          })

          const follow = () => {
            if(user.is_followed) return;
            user.is_followed = true;
            user.followerCount ++;
          }

          const unfollow = () => {
            if(!user.is_followed) return;
            user.is_followed = false;
            user.followerCount --;
          }
          const publish_post = content => {
            posts.count ++;

            posts.posts.unshift({
              id: posts.count,
              userId: 1,
              content: content,
            })
          }
          const delete_post = post_id => {
            posts.posts = posts.posts.filter(post => post.id !== post_id)
            posts.count = posts.posts.length;
          }
          const is_me = computed(() => userId === store.state.user.id);
          
          return {
            user,
            follow,
            unfollow,
            posts,
            publish_post,
            delete_post,
            is_me,
          }
      }
    };
    </script>
    
    <style scoped>
    </style>