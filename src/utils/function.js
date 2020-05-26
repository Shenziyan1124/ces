export function toMoney(num) {
  return num.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,"); //返回的是字符串23,245.12保留2位小数
}

export function parsePrice(s) {
  var n = 2; //设置保留的小数位数
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s
    .split(".")[0]
    .split("")
    .reverse();
  var r = s.split(".")[1];
  var t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i];
  }
  return (
    t
      .split("")
      .reverse()
      .join("") +
    "." +
    r
  );
}

export function getTimes(time) {
  let Y = new Date(time).getFullYear();
  let M = new Date(time).getMonth() + 1;
  M =
    M < 10
      ? "0" + (new Date(time).getMonth() + 1)
      : new Date(time).getMonth() + 1;
  let D = new Date(time).getDate();
  D = D < 10 ? "0" + new Date(time).getDate() : new Date(time).getDate();
  let h = new Date(time).getHours();
  let m = new Date(time).getMinutes();
  let s = new Date(time).getSeconds();
  let ms2 = h + m + s;
  ms2.toString();
  return Y + "-" + M + "-" + D;
}
