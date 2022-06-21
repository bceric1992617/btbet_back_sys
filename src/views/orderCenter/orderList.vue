<template>
  <div>


    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="下注类型：">
            <el-select v-model="listQuery.betOption" placeholder="请输入下注类型">
              <el-option v-for="(item,k) in $common.betType" :key="k" :label="item" :value="k"/>
            </el-select>
        </el-form-item>
        <el-form-item label="游戏局号：">
          <el-input v-model="listQuery.noActive" placeholder="请输入游戏局号" class="filter-item"  />
        </el-form-item>
        <el-form-item label="游戏轮号：">
          <el-input v-model="listQuery.noRun" placeholder="请输入游戏轮号" class="filter-item"  />
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-input v-model="listQuery.status" placeholder="请输入订单状态" class="filter-item"  />
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="listQuery.userName" placeholder="请输入用户名" class="filter-item"  />
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
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.orderNo}}</template>
        </el-table-column>
        <el-tableColumn label="游戏轮号" align="center">
          <template slot-scope="scope">{{scope.row.noRun}}</template>
        </el-tableColumn>
        <el-tableColumn label="游戏局号" align="center">
          <template slot-scope="scope">{{scope.row.noActive}}</template>
        </el-tableColumn>
        <el-tableColumn label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-tableColumn>
        <el-tableColumn label="下注金额" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-tableColumn>
        <el-tableColumn label="下注类型" align="center">
          <template slot-scope="scope">{{$common.betType[scope.row.betOption]}}</template>
        </el-tableColumn>
        <el-tableColumn label="IP" align="center">
          <template slot-scope="scope">{{scope.row.clientIP}}</template>
        </el-tableColumn>
        <el-tableColumn label="客户类型" align="center">
          <template slot-scope="scope">{{$common.clientType[scope.row.clientType - 1]}}</template>
        </el-tableColumn>
        <el-tableColumn label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
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
        betOption: '',
        noActive: '',
        noRun: '',
        pageNumber: '',
        pageSize: '',
        status: '',
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

    }
  },

  async created() {
    await this.$common.getBetType()
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
      this.listQuery.pageNumber = 1
      this.fetchData()
    },
    // 获取列表数据
    async fetchData() {
      let args = this.$common.transferToSearchParams(this.listQuery)
      const { code, data } = await this.$api.orderCenter.getOrderList(args)
      if(code == 0) {
        this.list = data.content
        this.total = data.numberOfElements
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

