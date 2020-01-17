<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    
    <div class="main main-raised">
      <div class="section profile-content">
        
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-70 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img
                    :src="img"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>

                <el-input placeholder="请输入搜索内容   （注意：选择类别查询只能查询到单个类别的资源）" v-model="searchMap.sourceName" class="input-with-select">
                  <el-select style="width: 100px;" v-model="searchMap.select" slot="prepend" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="Java" value="1"></el-option>
                    <el-option label="大数据" value="2"></el-option>
                    <el-option label="数据库" value="3"></el-option>
                    <el-option label="其他" value="99"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" @click="findSource()"></el-button>
                </el-input>
                <br /> <br /> <br /> <br /> <br /> <br /> 
              </div>
            </div>
          </div>


          <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row style="width: 100%" max-height="850">
            <el-table-column
              fixed
              prop="sourceName"
              label="描述"
              width="270" align="center">
            </el-table-column>
            <el-table-column
              label="类别"
              width="250" align="center">
              <template slot-scope="scope">
                 <el-tag  v-bind:key="i" v-for="(item,i) in scope.row.sourceType">{{item | type}}</el-tag>
                 
              </template>
              
            </el-table-column>
            
            <el-table-column
              prop="sourceUrl"
              label="链接"
              width="460" align="center">
            </el-table-column>
            <el-table-column
              prop="sourcePwd"
              label="密码"
              width="150" align="center">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="提供者"
              width="150" align="center">
            </el-table-column>
            
      
            </el-table>
            &nbsp;
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          <!-- <div class="description text-center">
            
          </div> -->
          
        </div>

        
        <el-tooltip effect="light" content="发布资源" placement="top-start" >
            <el-button @click="dialogFormVisible = true" class="msgeditbut" type="primary" icon="el-icon-edit" circle style="position:fixed" :style="{'left':left+'px','top':top+'px'}"></el-button>
        </el-tooltip>

        <el-dialog title="发布资源（资源发布后经过后台审核后才会展示噢~）" ref="numberValidateForm" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
          
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="描述">
                    <el-input maxlength="30" show-word-limit v-model="form.sourceName"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input maxlength="100" show-word-limit v-model="form.sourceUrl"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input maxlength="10" show-word-limit v-model="form.sourcePwd"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-checkbox-group v-model="form.sourceType">
                    <el-checkbox label="1">JAVA</el-checkbox>
                    <el-checkbox label="2">大数据</el-checkbox>
                    <el-checkbox label="3">数据库</el-checkbox>
                    <el-checkbox label="99">其他</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitSource()">立即提交</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
        </el-dialog>
      </div>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> 
    </div>
    
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { addSource, searchSource } from '@/api/source';
import { validateURL, validatAlphabets } from '@/util/validate'
export default {
  components: {
    Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      list: null,
      listLoading: true,
      total: 10,//总记录数
      currentPage: 1,//当前页
      pageSize: 10, //每页大小
      form: {
          sourceName: '',
          sourceUrl: '',
          sourcePwd: '',
          sourceType: [],
          nickname: ''
        },
      searchMap: {
          sourceName: '',
          select: ''
      },
      result: {

      },
      loading: false,
      dialogFormVisible: false,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  created(){
    this.findSource()
    this.left = document.documentElement.clientWidth - 200;
    this.top = document.documentElement.clientHeight*0.8;
  },
  filters: {
       type: function(value) {
          // for( let i in value) {
          //     return i
          // }
          if(value == "1") {
            return "JAVA"
          }
          if(value == "2") {
            return "大数据"
          }
          if(value == "3") {
            return "数据库"
          }
          if(value == "99") {
            return "其他"
          }
          
       }
  },
  methods: {
      submitSource() {
        if(this.form.sourceName === null || this.form.sourceName === undefined || this.form.sourceName.trim() === '' || this.form.sourceName.length < 2) {
          this.$message.error('请输入正确的描述格式！（至少两个字）');
          return false;
        }
        if(!validateURL(this.form.sourceUrl) || this.form.sourceUrl === null || this.form.sourceUrl === undefined || this.form.sourceUrl.trim() === '') {
          this.$message.error('请输入正确的URL格式！(注意是否有空格)');
          return false;
        }
        if(!validatAlphabets(this.form.sourcePwd) || this.form.sourcePwd === null || this.form.sourcePwd === undefined || this.form.sourcePwd.trim() === '') {
          this.$message.error('请输入正确的密码格式！');
          return false;
        }
        if(this.form.sourceType.length == 0 || this.form.sourceType === null || this.form.sourceType === undefined || this.form.sourceType === '') {
          this.$message.error('请选择资源类别！');
          return false;
        }
        this.loading = true;
        addSource(this.form).then(response => {
            this.dialogFormVisible = false
            this.loading = false;
            this.code = response.code
            if(this.code === 200) {
            this.$message({
                    message: '提交成功,通过审核后将会展示！',
                    type: 'success'
                }); 
            }
            this.form = {
              sourceName: '',
              sourceUrl: '',
              sourcePwd: '',
              sourceType: [],
            };
        }).catch(() => {
          this.loading = false;
        })
      },
      findSource() {
        this.listLoading = true
        searchSource(this.currentPage ,this.pageSize ,this.searchMap).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleSizeChange(val){
      this.pageSize = val;
      this.listLoading = true
        searchSource(this.currentPage ,this.pageSize ,this.searchMap).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.listLoading = true
          searchSource(this.currentPage ,this.pageSize ,this.searchMap).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      
  }
};
</script>

<style lang="scss" scoped>
.el-select .el-input {
    width: 130px;
  }
.msgeditbut {
     box-shadow: 0 0 6px rgba(0,0,0,.12);
     width: 50px;
     height: 50px;
  }
.section {
  padding: 0;
}

.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
