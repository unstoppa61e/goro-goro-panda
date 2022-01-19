<template>
  <ul class="panels-container">
    <li v-for="panelNumber in 10" :key="panelNumber">
      <stage-select-panel :panel-number="panelNumber"></stage-select-panel>
    </li>
  </ul>
</template>

<script>
import StageSelectPanel from './StageSelectPanel'
export default {
  components: {
    'stage-select-panel': StageSelectPanel
  }
}
</script>

<style scoped>
ul {
  padding-inline-start: 0;
}
li {
  list-style-type: none;
  text-align: center;
}
.panels-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
