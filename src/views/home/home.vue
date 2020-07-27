<template>
  <el-container>
    <el-header>
      <img src="@/views/login/image/LOGO-new.png" alt />
      <!-- 
      高速公路施工要素调查数据填报系统
      【都香高速公路项目， 张三】-->
      <div>wo shi szy</div>

      <div>woshi szy123</div>
    </el-header>
    <el-container>
      <el-aside width="600px">
        <el-card class="left-card">
          <div slot="header" class="clearfix">
            <span>WBS结构树</span>
            <div>13212312311111111111111111111111111111111111111</div>
          </div>
          <div class="left-card-body u_scrollBar">
            <el-table
              :data="tableData1"
              style="width: 100%"
              row-key="id"
              border
              lazy
              :highlight-current-row="true"
              :load="load"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              tooltip-effect="dark"
              @row-click="rowClick"
              :cell-style="{padding:'2px 0'}"
              :header-cell-style="{padding:'4px 0'}"
            >
              <el-table-column prop="name" label="名称" show-overflow-tooltip width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column label="操作" width="50" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    icon="iconfont icon-jia"
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <el-card class="right-card">
          <div slot="header" class="clearfix">
            <span>属性信息</span>
          </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="bottom clearfix">
            <time class="time"></time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </el-card>
        <el-card class="right-card">
          <div slot="header" class="clearfix">
            <span>施工要素</span>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
let id = 1000;
export default {
  name: "home",
  data() {
    return {
      tableData1: [
        {
          id: 1,
          name:
            "王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {
          id: 4,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
        // {
        //   id: 1,
        //   name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   id: 2,
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   id: 3,
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄',
        //   hasChildren: true
        // }, {
        //   id: 4,
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }
      ],
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: (id += 1),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            hasChildren: true
          },
          {
            id: (id += 2),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: (id += 3),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            hasChildren: true
          },
          {
            id: (id += 4),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: (id += 5),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            hasChildren: true
          },
          {
            id: (id += 6),
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]);
      }, 1000);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    rowClick(row, column, event) {
      console.log(row, column, event);
    }
  }
};
</script>

<style scoped lang="scss">
.el-container {
  .el-header {
    background: #2a82e4;
  }

  .el-aside {
    width: 600px;
    padding: 5px;
    height: calc(100vh - 60px);
  }

  .el-main {
    padding: 5px;
  }
}
</style>
<style lang="scss">
.left-card {
  height: 100%;

  .el-card__body {
    padding: 0;
    height: calc(100% - 56px);
    overflow: hidden;
  }

  .left-card-body {
    padding: 0;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
