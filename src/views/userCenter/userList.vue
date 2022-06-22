<template>
  <div>


    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="用户名：">
          <el-input v-model="listQuery.userName" placeholder="请输入用户名" class="filter-item"  />
        </el-form-item>
        <el-form-item>
          <el-button  class="filter-item" type="primary" @click="handleFilter">
            查询
          </el-button>
          <el-button  class="filter-item" @click="$common.resetArgs(listQuery);fetchData()">
            重置
          </el-button>
        </el-form-item>
      </el-form>



      <el-table class="m-t-20" :data="list" border stripe>
        <el-tableColumn label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-tableColumn>
        <el-tableColumn label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
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
        userName: '',
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
    changeStatus(row) {
      var statusValue = row.status ? this.$constant.STATUSLIST.DISABLESTATUS : this.$constant.STATUSLIST.ENABLESTATUS;
      let args = this.$common.transferToSearchParams({
        id : row.id,
        status : row.status ? this.$constant.STATUSLIST.DISABLESTATUS : this.$constant.STATUSLIST.ENABLESTATUS,
      })
      this.$api.userCenter.changeUserStatus(args).then(res => {
        if (res.code == this.$constant.RESPONSECODE.SUCCESS) {
          this.fetchData()
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
        this.$api.userCenter.delUserInfo(args).then(res => {
          if (res.code == this.$constant.RESPONSECODE.SUCCESS) {
            this.fetchData()
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      })

    },
    
    handleCreate(type) {
      this.dialogStatus = type;
      this.dialogFormVisible = true;
    },
    handleFilter() { //搜索
      this.listQuery.pageNumber = 1
      this.fetchData()
    },
    // 获取列表数据
    async fetchData() {
      const { code, data } = await this.$api.userCenter.getUserList(this.listQuery)

      if(code == this.$constant.RESPONSECODE.SUCCESS) {
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
  },
}
</script>

<style scoped>
</style>

