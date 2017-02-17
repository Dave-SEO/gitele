/**
 * Created by zn on 2017/2/14.
 */
export function formaDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth(),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // console.log(k); // M+
      // console.log(o[k]); // 6
      // console.log(RegExp.$1); // MM
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  };
  return fmt;
};
function padLeftZero (str) { // 月 日 时 分 秒 想要两位数时调用，传过来是个一位数的日期
  return ('00' + str).substr(str.length);
}
