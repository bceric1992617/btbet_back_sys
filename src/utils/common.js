import { Message } from 'element-ui'

const common = {


    resetArgs : (list) => { //清空参数
        Object.keys(list).forEach((k,v) => {
            if(k == "pageNum") {
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
        if(val == undefined || val == '' || val == null) {
            return false
        } else {
            return true
        }
    },

    transferToSearchParams(json) {
        let args = new URLSearchParams()
        for(var i in json) {
            if(json[i] != "") {
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

    
    timeOut: 3000,
    defaultPage: 20,
    test : [],


}

export default common