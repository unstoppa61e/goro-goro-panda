import { createApp } from 'vue'
import StageSelectHeader from './StageSelectHeader.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-stage-select-header'
  if (!document.querySelector(selector)) return
  createApp(StageSelectHeader).mount(selector)
})