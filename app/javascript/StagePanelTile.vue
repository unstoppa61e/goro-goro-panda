<template>
  <img :src="imgSrc" class="wordplay-img" alt="wordplay" />
  <div class="number">{{ number }}</div>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      default: null
    }
  },
  computed: {
    imgSrc() {
      if (this.number) {
        return require(`../assets/images/wordplays/${this.number}.png`) // eslint-disable-line no-undef
      } else {
        return require('../assets/images/mark_question.png') // eslint-disable-line no-undef
      }
    },
  }
}
</script>

<style scoped>
.wordplay-img {
  max-width: 100%;
  max-height: 100%;
}
.number {
  color: #ffffff;
  font-size: 30px;
}
</style>
