function getsec(str) {
  let str1 = str.substring(1, str.length) * 1;
  let str2 = str.substring(0, 1);
  console.log(str2);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}

export function getToken() {
  return getCookie("BimPlatformstokens");
}
export function setToken(value) {
  return setCookie("BimPlatformstokens", value, "d7");
}
export function removeToken() {
  return removeCookie("BimPlatformstokens");
}
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
export function setCookie(name, value, time) {
  let strsec = getsec(time);
  let exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
export function removeCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 60 * 60 * 1000);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie =
      name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}
// 删除时只能删除对应路径下的cookie，不指定路径，默认删除的是页面所对应的路径下的cookie。
