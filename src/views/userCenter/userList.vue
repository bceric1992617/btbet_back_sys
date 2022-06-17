<template>
  <div>


    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="用户名：">
        <el-input v-model="listQuery.mobile" placeholder="请输入用户名" class="filter-item"  />
      </el-form-item>
      
      </el-form>
      <el-button  class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
      <el-button  class="filter-item" @click="$common.resetArgs(listQuery);fetchData()">
        重置
      </el-button>
      <!-- <el-button class="filter-item" type="primary" @click="handleCreate('create')">
        添加用户
      </el-button> -->

      <el-table class="m-t-20" :data="list" border stripe>
        <el-table-column label="ID" width="80px" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-tableColumn label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-tableColumn>
        <el-tableColumn label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-tableColumn>
        <el-tableColumn label="电话" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-tableColumn>
        <el-tableColumn label="角色" align="center">
          <template slot-scope="scope">{{scope.row.author}}</template>
        </el-tableColumn>
        <el-tableColumn label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-tableColumn>
        <el-tableColumn label="修改时间" align="center">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-tableColumn>
        <el-tableColumn label="操作人" align="center">
          <template slot-scope="scope">{{scope.row.author}}</template>
        </el-tableColumn>
        <el-tableColumn label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-tableColumn>
        <el-tableColumn label="操作" align="center">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <!-- 修改用户按钮 -->
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button> -->

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
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 修改用户的对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="email" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="1">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      total: 0,
      dialogFormVisible: false,
      listQuery: {
        pageNum: 1,
        pageSize: this.$common.defaultPage,
        email: '',
        mobile: '',
      },
      editForm : {
        username: ''
      },
      textMap: {
        update: '编辑',
        create: '新增',
      },
      dialogStatus: '',
      rules: {
        "username": [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    delData() {
      this.$confirm("确定删除吗？","提示", {
        cancelButtonText : "取消",
        confirmButtonText : "确定",
        type : 'warning'
      }).then(() => {
        
      })
    },
    
    handleCreate(type) {
      this.dialogStatus = type;
      this.dialogFormVisible = true;
    },
    handleFilter() { //搜索
      this.listQuery.pageNum = 1
      this.fetchData()
    },
    // 获取用户列表数据
    async fetchData() {
      const { code, data } = await this.$api.userAPI.list()
      if(code == 0) {
        this.list = data.items
        this.total = data.total
      }
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {

      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听page页码值改变的事件
    handleCurrentChange(newPage) {

      this.queryInfo.pagenum = newPage
      this.getUserList()
    },


    // // 监听switch开头状态的改变
    // async userStateChange(userInfor) {
    //   console.log(userInfor)
    //   const { data: res } = await this.$http.put(
    //     `users/${userInfor.id}/state/${userInfor.mg_state}`
    //   )
    //   if (res.meta.status !== 200) {
    //     userInfor.mg_state = !userInfor.mg_state
    //     return this.$message.error('更新用户失败！')
    //   }
    //   this.$message.success('更新用户成功！')
    // },
    // // 监听添加用户对话框的:close关闭事件,清除数据(resetFields)
    // addDialogClosed() {
    //   this.$refs.addUserFormRef.resetFields()
    // },
    // // 点击按钮，添加用户,validate(预校验)
    // addUser() {
    //   this.$refs.addUserFormRef.validate(async (valid) => {
    //     if (!valid) return
    //     // 成功后向api发出添加用户的网络请求
    //     const { data: res } = await this.$http.post('users', this.addUserForm)
    //     if (res.meta.status !== 201) {
    //       this.$message.error('添加用户失败!')
    //     }
    //     this.$message.success('添加用户成功!')
    //     // 隐藏添加用户的对话框
    //     this.addDialogVisible = false
    //     // 重新获取用户列表
    //     this.getUserList()
    //   })
    // },
    // // 展示编辑用户数据的对话框
    // async showEditDialog(id) {
    //   const { data: res } = await this.$http.get('users/' + id)
    //   if (res.meta.status !== 200) return this.$message.error('查询失败！')
    //   this.dialogFormVisible = true
    //   this.editForm = res.data
    // },
    // // 监听修改用户对话框关闭事件,resetFields重置数据
    // editDialogClosed() {
    //   this.$refs.editFormRef.resetFields()
    // },
    // // 修改用户信息并发出请求
    // editUserInfo() {
    //   this.$refs.editFormRef.validate(async (valid) => {
    //     if (!valid) return
    //     // 发出修改用户信息的数据请求
    //     const { data: res } = await this.$http.put(
    //       'users/' + this.editForm.id,
    //       { email: this.editForm.email, mobile: this.editForm.mobile }
    //     )
    //     if (res.meta.status !== 200) {
    //       return this.$message.error('更新用户信息失败！')
    //     }
    //     // 关闭修改信息对话框
    //     this.dialogFormVisible = false
    //     // 刷新数据列表
    //     this.getUserList()
    //     // 提示修改成功
    //     this.$message.success('更新用户信息成功！')
    //   })
    // },
    // // 根据Id删除用户
    // async removeUserById(id) {
    //   const confirmRes = await this.$confirm(
    //     '此操作将永久删除该用户, 是否继续?',
    //     '提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     }
    //   ).catch((err) => err)
    //   // 如果用户确认删除，返回confirm
    //   // 如果用户取消删除，返回cancel
    //   if (confirmRes !== 'confirm') {
    //     return this.$message.info('已取消删除')
    //   }
    //   const { data: res } = await this.$http.delete('users/' + id)
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('删除用户失败！')
    //   }
    //   this.$message.success('删除用户成功！')
    //   this.getUserList()
    // },
  },
}
</script>

<style scoped>
</style>

