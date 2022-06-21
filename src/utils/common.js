import { Message } from 'element-ui'
import { orderCenter } from '@/api/orderCenter'

const common = {
    getBetType: async () => {
        if(1 || !common.isSet(sessionStorage.getItem('betType'))) { 
            var newData = {}
            const { data } = await orderCenter.getBetType();
            for(var i in data) {
                newData[data[i].value] = data[i].name
            }
            sessionStorage.setItem('betType', JSON.stringify(newData))
        }
        // console.log(JSON.parse(sessionStorage.getItem('betType')),2222)
        common.betType = JSON.parse(sessionStorage.getItem('betType'))
    },

    resetArgs : (list) => { //清空参数
        Object.keys(list).forEach((k,v) => {
            if(k == "pageNumber") {
                list[k] = 1
            } else if (k == "pageSize") {
                list[k] = common.defaultPage
            } else {
                list[k] = ""
            }
        })
        return list
    },
    isSet : (val)  => {
        if(val === undefined || val === '' || val === null) {
            return false
        } else {
            return true
        }
    },

    transferToSearchParams(json) {
        let args = new URLSearchParams()
        for(var i in json) {
            if(common.isSet(json[i])) {
                args.append(i, json[i])
            }
        }

        return args
    },

    //上传验证
    beforeAvatarUpload : (file) => {
        if (file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png') {
            Message.error('上传头像图片只能是 jpg,jpeg,png 格式!')
            return false
        }
        if ((file.size / 1024 / 1024)  > 2) {
            Message.error('上传头像图片大小不能超过 2MB!')
            return false
        }
    },

    //复制
    copyFn: (text) => {
        if(text == '') {
            Message.error('请先填写内容')
            return
        }
        var oInput = document.createElement("input");
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none";
        Message.success('复制成功')
    },

    
    timeOut: 5000,
    msgTime: 3000,
    defaultPage: 10, //默认页码



    clientType: ["网版","手机版","飞机"],
    betType: []
}

export default common