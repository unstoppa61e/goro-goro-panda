import { createApp } from 'vue'
import StagePanelTile from './StagePanelTile.vue'

document.addEventListener('turbolinks:load', () => {
  const selector = '#js-stage-panel-tile'
  if (!document.querySelector(selector)) return
  createApp(StagePanelTile).mount(selector)
})
