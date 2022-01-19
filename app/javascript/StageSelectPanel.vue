<template>
  <div class="panel panel-1">
    {{ panelNumber }}
    <ul class="tiles-container">
      <li v-for="tileIndex in 5" :key="tileIndex">
        <stage-panel-tile :number="tileNumber(tileIndex)"></stage-panel-tile>
<!--        TODO 表示が上手くいったら消す-->
        <!--        <stage-panel-tile :number="numbers[tileIndex - 1]"></stage-panel-tile>-->
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
    },
    piDigits: {
      type: String,
      default: null
    }
  },
  // TODO 表示が上手くいったら消す
  data() {
    return {
      numbers: ['14', '15', '92', '65', '35']
    }
  },
  methods: {
    tileNumber(tileIndex) {
      return this.piDigits.substr((tileIndex - 1) * 2, 2)
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
