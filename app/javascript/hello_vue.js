import { createApp } from 'vue'
import App from './helloTest.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-hello-vue'
  if (document.querySelector(selector)) {
    createApp(App).mount(selector)
  }
})
