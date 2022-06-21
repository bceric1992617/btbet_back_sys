const constant = {
    RESPONSECODE : {
        FAILURE: -2, //fail
        ERROR: -1, //error
        SUCCESS: 0, //成功
        EXPIRED: 1, //登录已过期，请重新登录
        AUTHERROR: 2, //授权失败
        REQUESTLIMITERROR: 4, //限定时间内超过请求次数
        RISKERROR: 6, //风险操作
        SETPASSWORDERROR: 7, //未设置交易密码
        LOGINOTHERPLACEERROR: 8, //帐号已在其他设备登录
    },

    STATUSLIST : {
        ENABLESTATUS: 1, //启动
        DISABLESTATUS: 0, //禁用
    },

}

export default constant