import axios from 'axios'

const QIITA_BASE_PATH = 'https://qiita.com/api/v2/'

export default {
  getItems (data) {
    return axios.get(`${QIITA_BASE_PATH}items`, {params: data})
  }
}
