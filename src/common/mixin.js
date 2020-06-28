import BackTop from 'components/common/backTop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      //  this.scrollRef.scroll拿到组件的对象
      this.scrollRef.scrollTo(0, 0, 1000);
    }
  }
}