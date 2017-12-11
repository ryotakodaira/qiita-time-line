<template>
  <div>
    <h2>Qiita Time Line</h2>
    <div class="filter">
      <PageSearchOption
        :active-item-key="this.queryParams.page"
        :action="handlePageChange"
      />
      <FilterSearchOption
        :active-item-key="this.queryParams.query"
        :action="handleSelectFilterCondition"
      />
    </div>
    <ul>
      <template v-if="this.state.isLoading === false">
        <li v-for="(item, key) in this.state.items">
          <a :href="item.url" target="_blank">
            <p class="trim green" style="font-weight: bold">{{item.title}}</p>
            <p>公開日時：{{item.created_at | formatJaTime }}</p>
            <p>いいね：{{item.likes_count}}</p>
            <p>タグ：<span class="tag" v-for="(tag, key) in item.tags">{{tag.name}}</span></p>
          </a>
        </li>
      </template>
      <li v-else>
        <p><i class="el-icon-loading"></i> Loading...</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {isEqual} from 'lodash-es'
import initialState from '../store/initialState/itemList'
import moment from 'moment'
import PageSearchOption from './PageSearchOption'
import FilterSearchOption from './FilterSearchOption'

export default {
  name: 'QiitaTimeLine',

  components: {
    PageSearchOption,
    FilterSearchOption
  },

  data () {
    return {}
  },

  mounted () {
    this.load()
  },

  computed: {
    ...mapGetters({
      state: 'item/state',
      queryParams: 'item/queryParams'
    }),

    isChangedQueryParams () {
      return !isEqual(this.queryParams, initialState.queryParams)
    },

    activeSortCondition () {
      return `${this.queryParams.sortBy}_${this.queryParams.order}`
    }
  },

  watch: {
    queryParams: {
      handler: function () {
        this.load()
      },
      deep: true
    }
  },

  methods: {
    ...mapActions({
      execGetItems: 'item/execGetItems',
      setQueryParams: 'item/setQueryParams',
      setItems: 'item/setItems'
    }),

    load () {
      this.execGetItems(this.queryParams).then(res => {
        this.setItems(res.data)
      }).catch(err => {
        console.log(err)
      })
    },

    handleSelectFilterCondition (val) {
      this.setQueryParams({query: val})
    },

    handlePageChange (num) {
      this.setQueryParams({page: num})
    }

  },

  filters: {
    formatJaTime (val) {
      return moment(val).format('YYYY/MM/DD hh:mm:ss')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

p {
  margin: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #2c3e50;
  padding: 20px;
  margin-bottom: 10px;
  display: inline-block;
  width: 600px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px;
  text-align: left;
  text-decoration: none;
}

.filter {
  display: flex;
  justify-content: space-between;
  width: 640px;
  margin: 0 auto;
}

.green {
  color: rgb(66, 185, 131);
}

.trim {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag {
  font-size: 12px;
  background: rgb(66, 185, 131);
  color: #fff;
  padding: 2px 8px;
  border-radius: 15px;
  margin-left: 5px;
}
</style>
