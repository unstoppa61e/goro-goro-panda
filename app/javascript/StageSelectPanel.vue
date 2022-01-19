<template>
  <div class="panel panel-1">
    {{ panelNumber }}
    <ul class="tiles-container">
      <li v-for="number in numbers" :key="number">
        <stage-panel-tile :number="number"></stage-panel-tile>
      </li>
    </ul>
  </div>
</template>

<script>
import StagePanelTile from './StagePanelTile.vue'
export default {
  components: {
    'stage-panel-tile': StagePanelTile
  },
  props: {
    panelNumber: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      numbers: ['14', '15', '92', '65', '35']
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  text-align: center;
}
.panel {
  display: flex;
}
.panel-1 {
  background-color: #ff88bb;
  border-radius: 5px;
}
.tiles-container {
  display: flex;
  width: 250px;
}
</style>
