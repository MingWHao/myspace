<template>
    <div class="card edit-field">
        <div class="card-body">
            <div class="form-floating">
                <textarea v-model = "content" class="form-control" placeholder="Leave a comment here" id="edit-post" style="height: 120px"></textarea>
                <label for="edit-post">发个帖子吧</label>
                <button @click = "publish_post" type="button" class="btn btn-info">发布</button>
            </div>
         </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default{
    name:"UserprofileWrite",

    setup(props, context) {
        let content = ref('');
        const store = useStore();


        const publish_post = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "POST",
                data: {
                    content: content.value,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if(resp.result === "success") {
                        context.emit('publish_post', content.value);
                        content.value = "";
                    }
                }
            })


            
        }


        return{
        content: content,
        publish_post,
    }
    },    
}

</script>

<style scpoed>
.edit-field{
    margin-top: 10px;
}
button{
    margin-top: 10px;
}
</style>