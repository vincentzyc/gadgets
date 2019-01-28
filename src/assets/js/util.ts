export default {
	/**
	 * 设置cookie
	 * @param key  key
	 * @param value 值
	 * @param time  保存时间（天）
	 */
  setCookie(key: string, value: any, time: number) {
    let cur: any = new Date();
    cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time ? cur.toGMTString() : '');
  },
  getCookie(key: string) {
    let data = document.cookie;
    let startIndex = data.indexOf(key + '=');
    if (startIndex > -1) {
      startIndex = startIndex + key.length + 1;
      let endIndex = data.indexOf(';', startIndex);
      endIndex = endIndex < 0 ? data.length : endIndex;
      return decodeURIComponent(data.substring(startIndex, endIndex));
    } else {
      return '';
    }
  },
  delCookie(key: string) {
    let data: any = this.getCookie(key);
    if (data !== false) this.setCookie(key, data, -1);
  },
  setSessionStorage(key: string, value: any) {
    let str: string = JSON.stringify(value);
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, str);
    }
  },
  getSessionStorage(key: string) {
    let json: any;
    if (window.sessionStorage) {
      json = window.sessionStorage.getItem(key);
      if (json) json = JSON.parse(json);
    }
    return json;
  },
  setLocalStorage(key: string, value: any) {
    let str = JSON.stringify(value);
    if (window.localStorage) {
      window.localStorage.setItem(key, str);
    }
  },
  getLocalStorage(key: string) {
    let json: any;
    if (window.localStorage) {
      json = window.localStorage.getItem(key);
      if (json) json = JSON.parse(json);
    }
    return json;
  },
	/**
	 * 获取url参数值
	 * @param name  name
	 */
  getUrlParam(name: string) {
    let reg = new RegExp("(^|\\?|&)" + name + "=([^&|^#]*)");
    let l = window.location.href;
    let i = l.indexOf("?");
    if (i < 0) return null;
    let str = l.slice(i + 1, l.length);
    if (str) {
      let r = str.match(reg);
      if (r) {
        return decodeURIComponent(r[2]);
      }
    }
    return null;
  },
	/**
	 * 判断Android还是iOS
	 */
  // checkDevice() {
  // 	let u = navigator.userAgent;
  // 	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  // 	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // 	if (isAndroid) {
  // 		return 'Android';
  // 	} else if (isiOS) {
  // 		return 'iOS';
  // 	} else {
  // 		return 'others';
  // 	}
  // },
  checkDevice() {
    let u = navigator.userAgent;
    if (/(Android|Adr)/i.test(u)) {
      return 'android';
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
      return 'ios';
    } else {
      return 'pc';
    }
  },
	/**
	 * 检查手机号是否合法
	 * @param {String} phone 手机号
	 */
  checkMobile(phone: string) {
    if ((/^1[0-9]{10}$/.test(phone))) return true;
    return false;
  },
	/**
	 * 倒计时
	 * @param  time  倒计时秒数
	 * @param  tickFunc  每秒执行
	 * @param  done     结束后回调
	 */
  countDown(time: number, tickFunc: any, done: any) {
    let tick = () => {
      setTimeout(() => {
        if (time > 0) {
          time--;
          tickFunc(time);
          tick();
        } else {
          done();
          return;
        }
      }, 1000);
    };
    tick();
  },
	/**
	 * 获取日期时间 默认格式 "yyyy-mm-dd hh:mm:ss"
	 * @param {String} formatType  可选 格式类型
	 * @param {Date} formatDate  可选 指定日期
	 * @return {String} 所需格式的日期
	 */
  getFormatDate(formatType: string, formatDate: Date): String {
    let type = formatType || 'yyyy-mm-dd hh:mm:ss';
    let date = Object.prototype.toString.call(formatDate) === "[object Date]" ? formatDate : new Date();
    let currentdate: string = '';
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let strDate: any = date.getDate();
    let hour: any = date.getHours();
    let minutes: any = date.getMinutes();
    let seconds: any = date.getSeconds();
    month >= 1 && month <= 9 ? month = "0" + month.toString() : '';
    strDate >= 0 && strDate <= 9 ? strDate = "0" + strDate : '';
    minutes >= 0 && minutes <= 9 ? minutes = "0" + minutes : '';
    seconds >= 0 && seconds <= 9 ? seconds = "0" + seconds : '';

    switch (type.toLowerCase()) {
      case 'yyyy-mm-dd hh:mm:ss':
        currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minutes + ":" + seconds;
        break;
      case 'yyyy-mm-dd':
        currentdate = year + "-" + month + "-" + strDate;
        break;
      case 'yyyy-mm-dd hh:mm':
        currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minutes;
        break;
      case 'yyyy-mm-dd hh':
        currentdate = year + "-" + month + "-" + strDate + " " + hour;
        break;
      case 'yyyy-mm':
        currentdate = year + "-" + month;
        break;
      case 'yyyy':
        currentdate = year;
        break;
      default:
        currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minutes + ":" + seconds;
        break;
    }
    return currentdate;
  },
	/**
	 * 缓冲函数
	 * @param {Object} dom 目标dom
	 * @param {Number} destination 目标位置
	 * @param {Number} rate 缓动率
	 * 示例用法
	  let dom = document.documentElement || document.body;
	  this.$util.easeout(dom, 0, 5);
	 */
  easeout(dom: any, destination = 0, rate = 3) {
    let position = dom.scrollTop;
    if (position === destination || typeof destination !== 'number' || rate === 0) {
      return false;
    }
    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 17);
      }
    }
    let step = function () {
      position = position + (destination - position) / rate;
      if (Math.abs(destination - position) < 1) { //动画结束
        dom.scrollTop = destination;
        return;
      }
      dom.scrollTop = position;
      requestAnimationFrame(step);
    };
    step();
  }
}