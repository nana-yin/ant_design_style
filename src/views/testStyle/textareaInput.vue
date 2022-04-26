<template>
    <div class="textareaInput">
        <a-textarea v-model="textContent" placeholder="请输入内容" />
        <div class="textareaInput-number">
            <span :style="currentText === 0 ? 'color: #999' : ((currentText > 0) && (currentText < textCount)) ? 'color: #333' : 'color: #f93a4a'">{{ currentText}}</span>
            <span>{{ '/' + textCount }}</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TextareaInput',
  data() {
    return {
        currentText: 0,
        textContent: ''
    }
  },
  props: {
    textCount: {
        type: Number,
        default: 100
    }
  },
  components: {
  },
  watch: {
    textContent(val) {
        this.currentText = val.length
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
.textareaInput {
    position: relative;
    display: inline-block;
    width: 354px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
}
.textareaInput-number {
    position: absolute;
    bottom: 6px;
    right: 0;
}
</style>