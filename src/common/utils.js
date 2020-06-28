//防抖函数
export function debounce(func,delay=50
  ) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}

export function formatDate(date, fmt) {
  // 获取年份
  //y+ -> 1个或者多个y
  //y* -> 0个或者多个y
  //y？ -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    // 正则.test(字符串)/正则.exec(字符串)
    // RegExp.$1 = 匹配到的第一个字符串
    // (date.getFullYear() + '').substring(4 - RegExp.$1.length)替换RegExp.$1
    // date.getFullYear() + '' 即数字+空字符串=字符串，就可以调用substr（截取）
    // substr和subString的区别 来源https://www.cnblogs.com/xxjcai/p/10865321.html
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }

  // x+ -> 1个或者多个x
  // 同理如下
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let i in o) {
    if (new RegExp(`(${i})`).test(fmt)) {
      let str = o[i] + '';
      // 比如'MM' => RegExp.$1
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 如果时间为1时1分1秒,则显示应为01:01:01，补0
//补0操作：  先在字符串前加两个0，然后在截取掉字符串长度个 0，最后返回的就是补0后的两位数的字符串
// str => '4', str.lefnth => 1
// '00' + '4' => '004'
// '004'.subStr(1) => '04'
function padLeftZero(str) {
  return ('00' + str).substring(str.length)
}
