<template>
  <div>


    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="用户名：">
          <el-input v-model="listQuery.userName" placeholder="请输入用户名" class="filter-item"  />
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" @click="$common.resetArgs(listQuery);fetchData()">
            重置
          </el-button>

        </el-form-item>
      </el-form>
      
      <el-button class="filter-item" type="success" size="mini" @click="handleCreate('create')" plain>
        添加用户
      </el-button>
      <el-button class="filter-item" type="success" size="mini" @click="handleEditPwd()" plain>
        修改密码
      </el-button>
      <el-table class="m-t-20" :data="list" border stripe>
        <el-table-column label="修改密码" width="80px" align="center">
          <template slot-scope="scope">
            <el-checkbox :value="scope.row.id == editPwdForm.selectedId ? true : false" @change="selectedData($event, scope.row)"></el-checkbox>
          </template>
        </el-table-column>

        <el-tableColumn label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-tableColumn>
        <el-tableColumn label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-tableColumn>
        <el-tableColumn label="电话" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-tableColumn>
        <el-tableColumn label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-tableColumn>
        <el-tableColumn label="修改时间" align="center">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-tableColumn>
        <el-tableColumn label="操作人" align="center">
          <template slot-scope="scope">{{scope.row.updateBy}}</template>
        </el-tableColumn>
        <el-tableColumn label="状态" align="center">
          <template slot-scope="scope">
            <el-switch :value="scope.row.status == 0 ? false : true" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-tableColumn>
        <el-tableColumn label="操作" align="center">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">

            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delData(scope.row.id)"
            ></el-button>
          </template>
        </el-tableColumn>

      </el-table>
      
      <div v-if="list.length > 0" class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNumber"
          :page-size="listQuery.pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName" class="w-input">
          <el-input v-model="editForm.userName" placeholder="6~15字母或数字"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" class="w-input">
          <el-input v-model="editForm.nickName" placeholder="6~20字母"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="w-input">
          <el-input v-model="editForm.password" placeholder="6~15字母+数字组合"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" class="w-input">
          <el-input v-model="editForm.phone" placeholder="1~20位数组"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelData">取消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPwdFormVisible" width="50%">
      <el-form
        ref="editPwdForm"
        :model="editPwdForm"
        :rules="pwdRules"
        label-width="70px"
      >
        <el-form-item label="旧密码" prop="oldPassword" class="w-input">
          <el-input v-model="editPwdForm.oldPassword" placeholder="6~15英文或数字"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" class="w-input">
          <el-input v-model="editPwdForm.newPassword" placeholder="6~15英文或数字"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelData">取消</el-button>
        <el-button type="primary" @click="changePwd">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      selectedList: [],
      total: 0,
      dialogFormVisible: false,
      dialogPwdFormVisible: false,
      checked: false,

      listQuery: {
        pageNumber: 1,
        pageSize: this.$common.defaultPage,
        userName: '',
      },
      editForm : {
        userName: '',
        nickName: '',
        password: '',
        phone: '',
      },
      editPwdForm : {
        oldPassword: '',
        newPassword: '',
        selectedId: '',
      },
      textMap: {
        create: '新增',
      },
      dialogStatus: '',
      rules: {
        "userName": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]){6,15}$/, message: "请输入正确用户名，6~15字母或数字", trigger: 'blur'}
        ],
        "nickName": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z]){6,20}$/, message: "请输入正确昵称，6~20字母", trigger: 'blur'}
        ],
        "password": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]){6,15}$/, message: "请输入正确密码，6~15字母+数字组合", trigger: 'blur'}
        ],
        "phone": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]){6,15}$/, message: "请输入正确手机号码，1~20位数组", trigger: 'blur'}
        ],
      },
      pwdRules: {
        "oldPassword": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]){6,15}$/, message: "请输入正确密码，6~15字母+数字组合", trigger: 'blur'}
        ],
        "newPassword": [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]){6,15}$/, message: "请输入正确密码，6~15字母+数字组合", trigger: 'blur'}
        ],
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    handleEditPwd() {
      if(this.$common.isSet(this.editPwdForm.selectedId)) {
        this.dialogPwdFormVisible = true
      } else {
        this.$message.warning("请先勾选修改密码")
      }
    },
    selectedData(e,row) {
      this.editPwdForm.selectedId = e ? row.id : ''
    },
    createData(){
      this.$refs.editForm.validate(async vaild => {
        if(vaild) {
          let args = this.$common.transferToSearchParams(this.editForm)
          const {code, msg} = await this.$api.managerCenter.addManagerInfo(args)
          if (code == this.$constant.RESPONSECODE.SUCCESS) {
            this.$message.success(msg)
            this.listQuery.pageNumber = 1
            this.fetchData()
            this.dialogFormVisible = false
            } else {
            this.$message.error(msg)
          }
        }
      })
    },
    changePwd() {
      this.$refs.editPwdForm.validate(async vaild => {
        if(vaild) {
          let args = this.$common.transferToSearchParams(this.editPwdForm)
          const {code, msg} = await this.$api.managerCenter.changeManagerPwd(args)
          if (code == this.$constant.RESPONSECODE.SUCCESS) {
            this.$message.success(msg)
            this.fetchData()

            } else {
            this.$message.error(msg)
          }
        }
      })
    },

    cancelData() {
      this.editPwdForm.selectedId = ''
      this.dialogPwdFormVisible = false
    },

    changeStatus(row) {
      var statusValue = row.status ? this.$constant.STATUSLIST.DISABLESTATUS : this.$constant.STATUSLIST.ENABLESTATUS
      let args = this.$common.transferToSearchParams({
        id : row.id,
        status : statusValue,
      })
      this.$api.managerCenter.changeManagerStatus(args).then(res => {
        if (res.code == this.$constant.RESPONSECODE.SUCCESS) {
          // this.fetchData()
          row.status = statusValue
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    delData(id) {
      this.$confirm("确定删除吗？","提示", {
        cancelButtonText : "取消",
        confirmButtonText : "确定",
        type : 'warning'
      }).then(() => {
        let args = this.$common.transferToSearchParams({id : id})
        const {code, msg} = this.$api.managerCenter.delManagerInfo(args) 
        if (code == this.$constant.RESPONSECODE.SUCCESS) {
          this.fetchData()
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    },
    
    handleCreate(type) {
      this.dialogStatus = type;
      this.dialogFormVisible = true;
      this.editForm = {
        userName: '',
        nickName: '',
        password: '',
        phone: '',
      }  

    },
    handleFilter() { //搜索
      this.listQuery.pageNumber = 1
      this.fetchData()
    },
    // 获取列表数据
    async fetchData() {
      const { code, data } = await this.$api.managerCenter.getManagerList(this.listQuery)
      if(code == this.$constant.RESPONSECODE.SUCCESS) {
        this.list = data.content
        this.total = data.totalElements
      }
    },

    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.listQuery.pageSize = newSize
      this.getUserList()
    },
    // 监听page页码值改变的事件
    handleCurrentChange(newPage) {
      this.listQuery.pageNumber = newPage
      this.getUserList()
    },
  },
}
</script>

<style scoped>

</style>

