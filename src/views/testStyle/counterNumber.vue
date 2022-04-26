<template>
    <div class="counterNumber">
      <a-button-group>
        <a-button :class="disabled ? 'disabledNUmber' : ''" :disabled="disabled" @click="decline" class="minuss">-</a-button>
        <a-input :class="disabled ? 'disabledNUmber' : ''" :disabled="disabled" v-model="count"/>
        <a-button :class="disabled ? 'disabledNUmber' : ''" :disabled="disabled" @click="increase" class="plus">+</a-button>
      </a-button-group>
    </div>
</template>
<script>
export default {
  name: 'counterNumber',
  data() {
    return {
      count: 1,
      show: true,
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    textCount: {
        type: Number,
        default: 100
    }
  },
  components: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    decline() {
        console.log('减', this.count)
      let count = this.count - 1;
      if (count < 0) {
        count = 0;
      }
      this.count = count;
    },
    increase() {
      this.count++
      console.log('加', this.count)
    },
  }
}
</script>
<style scoped>
.counterNumber .ant-btn {
    width: 32px;
    height: 32px;
}
.ant-input {
    width: 56px;
    border-radius: 0;
    padding: 5px 24px;
    border-left: 0;
    border-right: 0;
    font-size: 14px;
    line-height: 20px;
    color: #999;
}
.counterNumber .ant-btn, .counterNumber .ant-btn:hover, .counterNumber .ant-btn:focus, .counterNumber .ant-btn:visited{
    padding: 0;
    background-color: #f5f7fa;
    border: 1px solid #d9d9d9;
}
.minuss, .plus{
    display: inline-block;
    color: #ccc;
}
.counterNumber .disabledNUmber, .counterNumber .disabledNUmber:hover{
    background-color: #ecedee;
}
</style>