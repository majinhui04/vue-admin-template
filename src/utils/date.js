// 格式化方案 "yyyy年MM月dd日hh小时mm分ss秒"
export function formatDate(date, format) {
    var o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'h+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return format;
}

// 将秒转换成时间格式 console.log(formatSeconds(70)); 输出：00:01:10

export function formatSeconds(value) {
    var theTime = parseInt(value);
    var theTime1 = 0;
    var theTime2 = 0;

    if (theTime >= 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 >= 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    if (theTime < 10) {
        theTime = '0' + parseInt(theTime);
    }
    var result = '' + theTime + '';
    if (theTime1 >= 0) {
        if (theTime1 < 10) {
            theTime1 = '0' + parseInt(theTime1);
        }
        result = '' + theTime1 + ':' + result;
    }
    if (theTime2 >= 0) {
        if (theTime2 < 10) {
            theTime2 = '0' + parseInt(theTime2);
        }
        result = '' + theTime2 + ':' + result;
    }
    return result;
}

// 将时间转换成秒：
export function formatTimeToSeconds(v_time) {
    var t_arr = v_time.split(':');
    var hh = t_arr[0];
    var mm = t_arr[1];
    var ss = t_arr[2];
    var s_now = parseInt(hh * 3600) + parseInt(mm * 60) + parseInt(ss);
    return s_now;
}

// 生成时间段 console.log(getTimeList("10:00", "16:15", 15));
export function getTimeList(start, end, step) {
    const _start = start.split(':');
    const _end = end.split(':');
    const result = [];
    for (let i = +_start[0]; i <= +_end[0]; i++) {
        let h = 59;
        if (i === +_end[0]) {
            h = _end[1];
        }
        for (let j = 0; j <= h; j += step) {
            let hour = i;
            let minutes = j;
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            result.push(hour + ':' + minutes);
        }
    }
    return result;
}

// 计算时间戳与当前时间的差值 显示为x月前，x周前，x分钟前等。

/*
** console.log(dateDiff(1411111111111));  // 2014年09月19日
** console.log(dateDiff(1481111111111));  // 9月前
** console.log(dateDiff(1499911111111));  // 2月前
** console.log(dateDiff(1503211111111));  // 3周前
** console.log(dateDiff(1505283100802));  // 1分钟前
*/
export function dateDiff(timestamp) {
    // 补全为13位
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }

    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + '月前';
    } else if (weekC >= 1) {
        return parseInt(weekC) + '周前';
    } else if (dayC >= 1) {
        return parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
        return parseInt(hourC) + '小时前';
    } else if (minC >= 1) {
        return parseInt(minC) + '分钟前';
    }
    return '刚刚';
}
