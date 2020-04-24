import { loadImages } from './imageTools'

export default {
  mounted() {
    this.$nextTick(loadImages)
  },
}
