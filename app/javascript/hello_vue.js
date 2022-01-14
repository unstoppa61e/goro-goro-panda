import { createApp } from 'vue'
import App from './hello.vue'

document.addEventListener('DOMContentLoaded', () => {
    const selector = '#js-hello-vue';
    if (document.querySelector(selector)) {
        createApp(App).mount(selector);
    }
})
