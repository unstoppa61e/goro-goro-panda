import { createApp } from 'vue'
import StageSelectHeader from './StageSelectHeader.vue'

document.addEventListener('turbolinks:load', () => {
  const selector = '#js-stage-select-header'
  if (!document.querySelector(selector)) return
  createApp(StageSelectHeader).mount(selector)
})
