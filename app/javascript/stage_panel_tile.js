import { createApp } from 'vue'
import StagePanelTile from './StagePanelTile.vue'

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#js-stage-panel-tile'
  if (document.querySelector(selector)) {
    createApp(StagePanelTile).mount(selector)
  }
})
