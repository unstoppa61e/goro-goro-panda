import { createApp } from 'vue'
import StageSelect from './StageSelect.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-stage-select'
  if (document.querySelector(selector)) {
    createApp(StageSelect).mount(selector)
  }
})
