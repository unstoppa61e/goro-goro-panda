import { createApp } from 'vue'
import StagePlay from './StagePlay.vue'

document.addEventListener('turbolinks:load', () => {
  const selector = '#js-stage-play'
  const stage = document.querySelector(selector)
  if (!stage) return
  const id = stage.getAttribute('data-id')
  createApp(StagePlay, { id: id }).mount(selector)
})
