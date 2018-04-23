/*一些公共的函数库*/

/**
 * 校验电话号码格式
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export function checkPhone(val) {
  let reg = /^1[0-9]{10}$/;
  return reg.test(val);
}
/**
 * 校验email地址
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export function checkEmail(val) {
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  return reg.test(val);
}
/**
 * 校验微信号
 * 微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头。
 */
export function checkWeixin(val) {
  let reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
  return reg.test(val);
}
/**
 * 校验QQ号
 * QQ最少5位数
 */
export function checkQQ(val) {
  let reg = /^[1-9][0-9]{4,}$/;
  return reg.test(val);
}
/**
 * 删除左右两端的空格
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function trim(str) { //删除左右两端的空格
  return String(str).replace(/(^\s*)|(\s*$)/g, "");　　
}
/**
 * 获取多个关键词数组
 * @param  {string} search 输入的关键词数组，其中多个关键词以空格分割
 * @return {array}        关键词数组，不含空格元素
 */
export const getSearchWordsArray = function(search) {
  let array = search.split(' ');
  let words = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] != '') {
      words.push(array[i]);
    }
  }
  return words;
}

/**
 * JavaScript判断object/json 是否为空，可以使用jQuery的isEmptyObject()方法
 * @return {Boolean}   true表示空
 */
export const isEmptyObject = function(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
}
/**
 * 获取某日期的下n天
 * @param  {string} date   日期
 * @param  {Number} amount 接下来n天
 * @return {[type]}        [description]
 */
export const nextDate = function(date, amount = 1) {
  let now = new Date(date);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + amount);
};

/**
 * 判别某个日期是否为给定月的最后一天
 * @param  {string}  date [某个日期]
 * @return {Boolean}      [description]
 */
export const isLastDateMonth = function(date) {
  let today = new Date(date);
  let next_day = nextDate(date, 1); //next day
  return (today.getMonth() != next_day.getMonth())
}
/**
 * 格式化日期
 * @param  {date} date   格式化前的日期
 * @param  {string} format 格式
 * 示例：formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
 */
export const formatDate = function(date, format) {
  let o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}


/**
 * 日期不足10的补充前缀0
 * @param  {number} val 月/日的天数
 * @return {[type]}     [description]
 */
export const prefixDate = function(val) {
  if (val < 10) {
    return '0' + val;
  } else {
    return val;
  }
}
/**
 * JS格式化数字（每三位加逗号）
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
export function toThousands(number, decimal_length) {
  var num, result = '';
  var decimal_length = decimal_length || 0;
  var decimal = "";
  if (number === null || number === undefined || number === "") {
    num = "";
  } else {
    if (decimal_length === 0) {
      num = number.toString();
    } else {
      if (number.toString().length > decimal_length) {
        decimal = "." + number.toString().slice(-decimal_length);
        num = number.toString().substring(0, number.toString().length - decimal_length);
      } else {
        decimal = number.toString();
        for (let i = 0; i < (decimal_length - number.toString().length); i++) {
          decimal = '0' + decimal;
        }
        decimal = "0." + decimal;
        num = "";
      }
    }
  }
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result + decimal;
}

export const MonthBefore = function(year, month, before) {
  var year = Number(year);
  var month = Number(month);
  var before = Number(before);
  if (before === 0) {
    return year + "-" + prefixDate(month);
  }
  let end_month = year * 12 + month;
  let start_month = end_month - before;
  let float = (start_month + 1) % 12;
  return Math.floor(start_month / 12) + "-" + prefixDate(float == 0 ? 12 : float);
}
//乘法函数
export const accMul = function(arg1, arg2) {
  if (arg1 === undefined) {
    return "";
  }
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}