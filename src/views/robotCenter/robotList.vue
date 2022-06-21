<template>
  <div>


    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="名称：">
        <el-input v-model="listQuery.botName" placeholder="请输入名称" class="filter-item"  />
      </el-form-item>
      
      </el-form>
      <el-button  class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
      <el-button  class="filter-item" @click="$common.resetArgs(listQuery);fetchData()">
        重置
      </el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate('create')">
        添加
      </el-button>

      <el-table class="m-t-20" :data="list" border stripe>
        <el-table-column label="ID" width="80px" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.botName}}</template>
        </el-table-column>
        <el-tableColumn label="令牌" align="center">
          <template slot-scope="scope">{{scope.row.botToken}}</template>
        </el-tableColumn>
        <el-tableColumn label="飞机群id" align="center">
          <template slot-scope="scope">{{scope.row.chatId}}</template>
        </el-tableColumn>
        <el-tableColumn label="更新时间" align="center">
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


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="飞机群id" prop="chatId" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="token" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="username" class="w-input">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
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
        pageNumber: 1,
        pageSize: this.$common.defaultPage,
        betOption: '',
        clientType: '',
        noActive: '',
        noRun: '',
        status: '',
        userName: '',

      },
      editForm : {
        chatId: '',
        token: '',
        username: '',
      },
      textMap: {
        create: '新增',
      },
      dialogStatus: '',
      rules: {
        "chatId": [{ required: true, message: '必填', trigger: 'blur' }],
        "token": [{ required: true, message: '必填', trigger: 'blur' }],
        "username": [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    changeStatus(row) {
      if(row.status) {
        var text = "确定禁用吗？"
        var statusValue = this.$constant.STATUSLIST.DISABLESTATUS
      } else {
        var text = "确定启用吗？"
        var statusValue = this.$constant.STATUSLIST.ENABLESTATUS
      }

      this.$confirm(text,"提示", {
        cancelButtonText : "取消",
        confirmButtonText : "确定",
        type : 'warning'
      }).then( async () => {
        let args = this.$common.transferToSearchParams({
          id : row.id,
          status : statusValue,
        })
          this.$api.managerCenter.changeManagerStatus(args).then(res => {
            if (res.code == this.$constant.RESPONSECODE.SUCCESS) {
              this.fetchData()
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })

      })
    },
    createData(){
      this.$refs.dataForm.validate(async vaild => {
        if(vaild) {
          let args = this.$common.transferToSearchParams(this.editForm)
          const {code, msg} = await this.$api.robotCenter.addRobot(args)

          if (code == this.$constant.STATUSLIST.ENABLESTATUS) {
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

    
    handleCreate(type) {
      this.dialogStatus = type;
      this.dialogFormVisible = true;

      this.editForm = {
        chatId: '',
        token: '',
        username: '',
      }        
    },
    handleFilter() { //搜索
      this.listQuery.pageNumber = 1
      this.fetchData()
    },
    // 获取列表数据
    async fetchData() {
      let args = this.$common.transferToSearchParams(this.listQuery)
      const { code, data } = await this.$api.robotCenter.getRobotList(args)
      if(code == this.$constant.STATUSLIST.ENABLESTATUS) {
        this.list = data.content
        this.total = data.totalElements
      }
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {

      this.listQuery.pageSize = newSize
      this.fetchData()
    },
    // 监听page页码值改变的事件
    handleCurrentChange(newPage) {

      this.listQuery.pageNumber = newPage
      this.fetchData()
    },


    // 监听switch开头状态的改变
    async userStateChange(row) {
      let args = new URLSearchParams()
      args.append("id", row.id)
      args.append("status", row.status == this.$constant.STATUSLIST.ENABLESTATUS ? this.$constant.STATUSLIST.DISABLESTATUS : this.$constant.STATUSLIST.ENABLESTATUS)
      const { code, msg } = await this.$api.robotCenter.changeRobotStatus(args)
      if (code == this.$constant.STATUSLIST.ENABLESTATUS) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },

  },
}
</script>

<style scoped>
</style>

