<template>
  <div>
    ページ番号
    <el-select
      v-model="value"
      placeholder="ページ目を選択"
      size="small"
      @change="changeValue"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'PageSearchOption',

  props: {
    activeItemKey: {
      type: [String, Number],
      required: false
    },
    action: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      options: [{
        value: 1,
        label: '1ページ目'
      }, {
        value: 2,
        label: '2ページ目'
      }, {
        value: 3,
        label: '3ページ目'
      }, {
        value: 4,
        label: '4ページ目'
      }, {
        value: 5,
        label: '5ページ目'
      }],
      value: null
    }
  },

  mounted () {
    this.value = this.activeItemKey + 'ページ目'
  },

  methods: {
    changeValue (val) {
      this.action(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
