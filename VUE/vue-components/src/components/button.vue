<template>
  <button :class="'i-button-size' + size" @click="handleClick">
    <slot name="icon"></slot>
    /
    <slot></slot>
  </button>
</template>

<script>
function oneOf(value, validList) {
  for (var i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
export default {
  props: {
    size: {
      // type: String,
      // 校验传过来的值
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default'
    }
  },
  data () {
    return {
      message: '子组件的内容'
    }
  },
  methods: {
    handleClick () {
      this.$emit('on-click')
    },
    sureClick () {
      console.log('确认')
      this.$emit('sendMsg', this.message)
    }
  }
}
</script>

<style scoped>
button {
  border: 1px solid orange;
  background-color: yellow;
  color: black;
  border-radius: 5px;
}
.i-button-sizelarge {
  padding: 10px 16px;
}
.i-button-sizedefault {
  padding: 8px 14px;
}
.i-button-sizesmall {
  padding: 4px 10px;
}
</style>