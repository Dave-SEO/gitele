/**
 * Created by zn on 2017/2/16.
 */
// 解析url参数
// @example ?id=12345&a=b
// @ return Object{id:123456,a:b}
export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg); // ['?id=123456','&a=b']
  arr.forEach((item) => {
    let tempArr = item.substring(1).split('='); // 截取问号，&后面的内容，并用=分割['id','123456']
    let key = decodeURIComponent(tempArr[0]);
    let vule = decodeURIComponent(tempArr[1]);
    obj[key] = vule;
  });
  return obj;
}
