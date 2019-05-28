// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)

const time = {
    format(value, fmt = 'yyyy-MM-dd HH:mm:ss') {
        var date;
        if (typeof value === 'number') {
            date = new Date(value);
        } else {
            date = new Date();
        }
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'H+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    getDateTime(e) {
        return this.format(e, 'yyyy-MM-dd HH:mm:ss');
    },
    getDate: function (e) {
        return this.format(e, 'YYYY-MM-dd');
    },
    getTime: function (e) {
        return this.format(e, 'HH:mm:ss');
    }
};
export default time;
