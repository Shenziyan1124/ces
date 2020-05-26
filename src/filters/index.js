// set function parseTime,formatTime to filter
export { parseTime, formatTime } from "@/utils";

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

export function stateType(value) {
  if (value == 0) {
    return "未审批";
  } else if (value == 1) {
    return "已审批(通过)";
  } else if (value == 2) {
    return "已审批(未通过)";
  }
}

export function searchType(value) {
  if (value == 0) {
    return "输入文件名关键字";
  } else if (value == 1) {
    return "按文件名搜索1";
  } else if (value == 2) {
    return "按文件名搜索2";
  }
}

export function searchName(value) {
  if (value == 0) {
    return "按文件名搜索";
  } else if (value == 1) {
    return "按文件名搜索1";
  } else if (value == 2) {
    return "按文件名搜索2";
  }
}

// 文件类型
export function fileType(value) {
  switch (value) {
    case 0:
      return "#icon-docx";
    case 1:
      return "#icon-xlsx";
    case 2:
      return "#icon-ppt1";
    case 3:
      return "#icon-PDF";
    case 4:
      return "#icon-zip-";
    case 5:
      return "#icon-mp";
    case 6:
      return "#icon-mp1";
    case 7:
      return "#icon-wenjianjia-icon";
    default:
      return "#icon-xxx";
  }
}

export function createdAt(value) {
  var time = new Date(value);
  return time.Format("yyyy-MM-dd hh:mm:ss");
}

export function imgToArray(str) {
  var arr = str.split(",");
  let newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push("http://123.56.7.142/bimplatform/v1/api/coopes/" + arr[i]);
  }
  return newArr;
}

export function qsType(value) {
  if (value == 0) {
    return "问题整改";
  } else if (value == 1) {
    return "信息通报";
  }
}

export function labType(value) {
  if (value == 0) {
    return "安全问题";
  } else if (value == 1) {
    return "质量问题";
  } else if (value == 2) {
    return "环保问题";
  }
}

export function bim_leave(value) {
  if (value == 0) {
    return "零级";
  } else if (value == 1) {
    return "一级";
  } else if (value == 2) {
    return "二级";
  } else if (value == 3) {
    return "三级";
  } else if (value == 4) {
    return "四级";
  } else if (value == 5) {
    return "五级";
  } else if (value == 6) {
    return "六级";
  } else if (value == 7) {
    return "七级";
  } else if (value == 8) {
    return "八级";
  }
}

// function Format(fmt) { //author: meizz
//   var o = {
//     "M+" : this.getMonth()+1,                 //月份
//     "d+" : this.getDate(),                    //日
//     "h+" : this.getHours(),                   //小时
//     "m+" : this.getMinutes(),                 //分
//     "s+" : this.getSeconds(),                 //秒
//     "q+" : Math.floor((this.getMonth()+3)/3), //季度
//     "S"  : this.getMilliseconds()             //毫秒
//   };
//   if(/(y+)/.test(fmt))
//     fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
//   for(var k in o)
//     if(new RegExp("("+ k +")").test(fmt))
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//   return fmt;
// }

export function Format(value) {
  let time = new Date(value);
  return time.Format("yyyy-MM-dd hh:mm:ss");
}

export function alert_level(value) {
  if (value == 1) {
    return "warning-bg";
  } else if (value == 21) {
    return "error-bg";
  }
}

export function alert_state(value) {
  if (value == 3502) {
    return "info-bg";
  } else {
    return "error-bg";
  }
}

export function alert_type(value) {
  if (value == 3502) {
    return "default";
  } else {
    return "danger";
  }
}

export function csec_type(value) {
  if (value == "1G01") {
    return "primary";
  } else {
    return "danger";
  }
}

export function listToTree(myId, pId, list) {
  function exists(list, parentId) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][myId] == parentId) return true;
    }
    return false;
  }

  var nodes = [];
  // get the top level nodes
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (!exists(list, row[pId])) {
      nodes.push(row);
    }
  }

  var toDo = [];
  for (let i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }
  while (toDo.length) {
    var node = toDo.shift(); // the parent node
    // get the children nodes
    for (let i = 0; i < list.length; i++) {
      let row = list[i];
      if (row[pId] == node[myId]) {
        //var child = {id:row.id,text:row.name};
        if (node.children) {
          node.children.push(row);
        } else {
          node.children = [row];
        }
        toDo.push(row);
      }
    }
  }
  return nodes;
}

export function tofixed(value, n) {
  return Number(value).toFixed(n);
}

// export function exists(arr, v) {
//   var b = false;
//   for (var i = 0; i < arr.length; i++) {
//     if (v.indexOf(arr[i]) != -1) {
//       b = true;
//       break;
//     }
//   }
//   return b;
// }
export function strtoTime(dateString) {
  let yy = dateString.substring(0, 4);
  let mm = dateString.substring(4, 6);
  let dd = dateString.substring(6, 8);
  let hh = dateString.substring(8, 10);
  let ii = dateString.substring(10, 12);
  let ss = dateString.substring(12, 14);
  return yy + "-" + mm + "-" + dd + " " + hh + ":" + ii + ":" + ss;
}

export function langtoTime(stamp) {
  function onetotow(val) {
    return (val + "").length <= 1 ? "0" + val : val;
  }

  let stampfloor = Math.floor(stamp);
  let ss = onetotow(stampfloor % 60);
  let ii = onetotow(Math.floor(stampfloor / 60));
  let hh = onetotow(Math.floor(stampfloor / 3600));
  return hh + ":" + ii + ":" + ss;
}

export function zhuanyetype(type) {
  switch (type) {
    case 1:
      return "现场安全";
    case 2:
      return "操作安全";
    default:
      return "xxxx";
  }
}

export function yidu(value) {
  if (value == 0) {
    return "待执行";
  } else if (value == 1) {
    return "已执行";
  } else if (value == 2) {
    return "待审核";
  }
}
