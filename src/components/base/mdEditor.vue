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
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        watch: {
            editorContent: {
                handler() {
                    this.$emit('input', this.editorContent);
                }
            },
            value: {
                immediate: true, // 表示创建组件时立马执行一次
                handler() {
                    this.editorContent = this.value;
                    console.log('doing something...'); // 只用一次的方法没必要在methods里面声明了
                }
            }
        },
        mounted() {
        },
        data() {
            return {
                editorContent: ''
            };
        },
        methods: {
            imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                // this.img_file[pos] = $file;
                this.$http.axios({
                    baseURL: '',
                    url: '/v2/openapi/img/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    let _res = res.data;
                    console.log(1111, res);
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, _res);
                }).catch(err => {
                    console.log(4444, err);
                });
            },
            imgDel(pos) {
                // delete this.img_file[pos];
            }

        }
    };
</script>
