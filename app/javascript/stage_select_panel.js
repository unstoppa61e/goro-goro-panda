import { createApp } from 'vue'
import StageSelectPanel from './StageSelectPanel.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-stage-select'
  if (!document.querySelector(selector)) return
  createApp(StageSelectPanel).mount(selector)
})
