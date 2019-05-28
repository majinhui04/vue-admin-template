function os() {
    var ua = navigator.userAgent;
    var touchRegExp = new RegExp('(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT-)|(SonyEricsson)|(NEC-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG-)|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC-)|(SED-)|(EMOL-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)', 'i');
    // todo 需要重新判断
    var isApp = /xiugou/i.test(ua);
    var isMiniApp = window.__wxjs_environment === 'miniprogram' || /miniProgram/i.test(navigator.userAgent);
    var isWeixin = /MicroMessenger/i.test(ua) && !isMiniApp;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isTouch = touchRegExp.test(ua);
    var isPC = !isTouch;

    return {
        isApp: isApp,
        isMiniApp: isMiniApp,
        isWeixin: isWeixin,
        isAndroid: isAndroid,
        isiOS: isiOS,
        isTouch: isTouch,
        isPC: isPC
    };
}

export default {
    os: os
};
