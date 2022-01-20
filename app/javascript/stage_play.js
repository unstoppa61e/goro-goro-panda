import { createApp } from 'vue'
import StagePlay from './StagePlay.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-stage-play'
  const stage = document.querySelector(selector)
  const id = stage.getAttribute('data-id')
  if (document.querySelector(selector)) {
    createApp(StagePlay, { id: id }).mount(selector)
  }
})
