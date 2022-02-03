<template>
  <div class="tile">
    <img :src="imgSrc" class="wordplay-img" alt="wordplay" />
    <div class="number">{{ number }}</div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      default: null
    },
    locked: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    imgSrc() {
      if (this.locked) {
        return require('../assets/images/mark_question.png') // eslint-disable-line no-undef
      } else {
        return require(`../assets/images/wordplays/${this.number}.png`) // eslint-disable-line no-undef
      }
    }
  }
}
</script>

<style scoped>
.wordplay-img {
  width: 50px;
  height: 50px;
}
.number {
  color: #ffffff;
  font-size: 30px;
}
</style>
