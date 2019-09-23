<template>
    <div>
        <mavon-editor v-model="editorContent" :ishljs="true" ref='md' @imgAdd="imgAdd" @imgDel="imgDel"/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import mavonEditor from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    // use
    Vue.use(mavonEditor);

    export default {
        name: 'mdEditor',
        data() {
            return {
                editorContent: ''
            };
        },
        methods: {
            imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.img_file[pos] = $file;
                this.$http({
                    url: '/api/edit/uploadimg',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    let _res = res.data;
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, _res.url);
                });
            },
            imgDel(pos) {
                delete this.img_file[pos];
            }

        }
    };
</script>
