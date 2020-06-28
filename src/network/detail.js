import {request} from './request';

export function getDetailInfo(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
};

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// es6类写法
// 当一个组件需要用到接口的一个以上的多个数据时，复杂度高，要整合成一个类
export class Goods {
  constructor(itemInfo, columns, services) {
    // this指向new Goods()出来的对象
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;// description
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice =  itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParams {
  constructor(info, rule) {
    // images可能没有值（某些商品可能有，可能没有）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
} 
