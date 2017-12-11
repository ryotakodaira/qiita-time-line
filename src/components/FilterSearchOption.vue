<template>
  <div>
    絞り込み
    <el-select
      v-model="value"
      placeholder="絞り込み条件を選択"
      size="small"
      @change="changeValue"
    >
      <el-option
        v-for="(item, key) in filterConditions"
        :key="key"
        :label="item.name"
        :value="key"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {SEARCH_CONDITIONS} from '../constants/itemSearchConstants'

export default {
  name: 'FilterSearchOption',

  props: {
    activeItemKey: {
      type: String,
      required: false
    },
    action: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      filterConditions: SEARCH_CONDITIONS,
      value: null
    }
  },

  mounted () {
    this.value = this.activeItemKey
  },

  methods: {
    changeValue (val) {
      this.action(this.filterConditions[val]['query'])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
