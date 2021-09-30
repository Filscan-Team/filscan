export default function ({ isServer, req, redirect, route }) {
    let isMobile = (ua) => {
        return !!ua.match(/AppleWebKit.*Mobile.*/)
    }
    let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
    // 若终端为pc但路径包含/mobile/ 或者/mobiled的 重定向到pc
    if((route.fullPath.indexOf('/mobile')>-1||route.fullPath.indexOf('/mobile/')>-1)&&!isMobile(userAgent)){
        let url = route.fullPath.substring(2)
        redirect(url)
    }
    // 若终端为mobile 但路径中不包含/mobile/ 或者/mobile的 重定向到mobile
    if((route.fullPath.indexOf('/mobile')<0||route.fullPath.indexOf('/mobile/')<0)&&isMobile(userAgent)){
        redirect('/mobile' + route.fullPath)
    }
}