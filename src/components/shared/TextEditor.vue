<template>
    <div>
        <textarea :id="id" v-text="text"></textarea>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: 'TextEditor',
    emits: ['update:text'],
    data() {
        return {
            editor: null
        }
    },
    props: {
        text: String,
        id: String
    },
    updated() {
        if (this.editor && this.editor.getData() !== this.text)
            this.editor.setData(this.text);
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    mounted() {
        setTimeout(() => {
            this.initEditor();
        }, 100)
        
    },
    methods: {
        initEditor() {
            this.editor = window.CKEDITOR.replace(this.id, {
                filebrowserImageBrowseUrl: process.env.VUE_APP_API_BASE_URL + '/ly-lfm?type=Images&token=' + this.user.token,
                filebrowserImageUploadUrl: process.env.VUE_APP_API_BASE_URL + '/ly-lfm/upload?type=Images&_token=&token=' + this.user.token,
                filebrowserBrowseUrl: process.env.VUE_APP_API_BASE_URL + '/ly-lfm?type=Files&token=' + this.user.token,
                filebrowserUploadUrl: process.env.VUE_APP_API_BASE_URL + '/ly-lfm/upload?type=Files&_token=&token=' + this.user.token,
                allowedContent: true,
                // removeButtons: 'Image',
                removeDialogTabs: 'image:advanced;link:advanced',
            });

            setInterval(() => {
                this.$emit('update:text', this.editor.getData())
            }, 100)
        }
    }
}
</script>
