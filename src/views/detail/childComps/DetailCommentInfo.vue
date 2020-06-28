<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item"
              v-for="(item,index) in commentInfo.images" 
              :key="index" 
              alt=""
              @click="infoImgClick(item,index)">
      </div>
    </div>
    <!-- <div class="commentImg" v-show="isCommentImgShow" @click="outerDivClick">
      <span>{{currentImgIndex}}/{{commentImgLength}}</span>
      <img :src="commentClickImg" alt="">
    </div> -->
  </div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isCommentImgShow: false,
      commentClickImg: '',
      currentImgIndex: 0,
      commentImgLength: 0
    }
  },
  updated() {
    // 更新父组件传给子组件的数据props（需要在updated执行，防止页面刷新读取不到数据）
    // 如果images没有，其length初始值为0，防止undefined报错
    if(this.commentInfo.images) {
      this.commentImgLength = this.commentInfo.images.length;
    }
  },
  methods: {
    infoImgClick(item,index) {
      this.isCommentImgShow = true;
      this.currentImgIndex = index + 1;
      this.$emit('infoImgClick',
                  item,
                  this.currentImgIndex,
                  this.commentImgLength,
                  this.isCommentImgShow,
                  this.stopTouch)
      // 监听doucment.body的touchmove事件，执行阻止冒泡
      // document.body.addEventListener('touchmove', this.stopTouch);
    },
    // outerDivClick() {
    //   // this.isCommentImgShow = false;
    //   // // 移除监听document.body的touchmove事件，并且移除阻止冒泡
    //   // document.body.removeEventListener('touchmove', this.stopTouch);
    //   this.$emit('outerDivClick', this.stopTouch)
    // },
    stopTouch(e) {
      e.stopPropagation();
    }
  },
  filters: {
    // value为commentInfo.created
    showDate: function (value) {
      // 将时间戳转换成Date的对象
      let date = new Date(value*1000)
      // 将date格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: .05rem .12rem;
    color: #333;
    border-bottom: .05rem solid #f2f5f8;
  }

  .info-header {
    height: .5rem;
    line-height: .5rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: .15rem;
  }

  .header-more {
    float: right;
    margin-right: .1rem;
    font-size: .13rem;
  }

  .info-user {
    padding: .1rem 0 .05rem;
  }

  .info-user span {
    position: relative;
    font-size: .15rem;
    top: -0.15rem;
    margin-left: .1rem;
  }

  .info-user img {
    width: .4rem;
    height: auto;
  }

  .info-detail {
    padding: 0 .05rem .2rem;
  }

  .info-detail p {
    font-size: .14rem;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: .12rem;
    color: #999;
    margin-top: .1rem;
  }

  .info-other .date {
    margin-right: .08rem;
  }

  .info-imgs {
    margin-top: .1rem;
  }

  .info-imgs img {
    width: .7rem;
    height: .7rem;
    margin-right: .05rem;
  }

  /* .commentImg {
    height: 736px;
    width: 414px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0);
    z-index: 100;
  }

  .commentImg span {
    position: absolute;
    top: 11%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 10px;
    color: #fff;
    font-size: 18px;
  }

  .commentImg img{
    width: 100%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: cornsilk;
  } */
</style>