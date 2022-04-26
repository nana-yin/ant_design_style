<template>
  <div class="checkboxOther">
    <span v-for="item in checkInit" :key="item.name">
      <span :class="item.status ? 'checkboxOther_checked' : 'checkboxOther_common'" @click="changeStatus(item)">{{item.name}}</span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'checkboxOther',
  props: {
    checkboxArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      checked: true,
      checkInit: JSON.parse(JSON.stringify(this.checkboxArr))
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    changeStatus(item) {
      if (item.status) {
        item.status = 0
      } else {
        item.status = 1
      }
    }
  }
}
</script>
<style>
.checkboxOther_common, .checkboxOther_checked {
    cursor: pointer;
    padding: 6px 16px;
    margin-right: 20px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
}
.checkboxOther_checked {
    position: relative;
    background-color: rgba(49,113,245, 0.1);
    color: #3171f5;
}
.checkboxOther_checked:before {
    content: '';
    width: 6px;
    height: 4px;
    display: inline-block;
    z-index: 1;
    position: absolute;
    bottom: 2px;
    right: 2px;
    background: url('../../assets/css/check.png') no-repeat;
    background-size: 6px auto;
}
.checkboxOther_checked:after {
    content: '';
    position: absolute;
    bottom: 0;
    display: inline-block;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid #3171f5;
    border-bottom: 8px solid #3171f5;
    border-radius: 0 0 4px 0;
}
.checkboxOther_common {
    background-color: #eee;
    color: #666;
}
</style>
