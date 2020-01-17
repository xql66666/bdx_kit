<template>
                <el-main>
                    <h3>我的资源</h3>
                    <hr /><br /><br />

                     <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row style="width: 100%" max-height="5000">
                        <el-table-column
                        fixed
                        prop="sourceName"
                        label="描述"
                        width="370" align="center">
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
                        width="560" align="center">
                        </el-table-column>
                        <el-table-column
                        prop="sourcePwd"
                        label="密码"
                        width="150" align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                            <template slot-scope="scope">

                                <!-- <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="visible">
                                    <p>这是一段内容这是一段内容确定删除吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                                    </div>
                                    <el-button slot="reference">删除</el-button>
                                </el-popover> -->
                                
                                <el-button @click="deleteClick(scope.row.sourceId)" type="text" size="small">删除</el-button>
                                
                            </template>
                            
                        </el-table-column>
                        
                        
                    </el-table>
                    
                </el-main>
                
</template>

<script>
import { findMySourceList, deleteTheSource } from '@/api/source';
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      visible: false,
    };
  },

  created(){
    this.findMySource()
  },
  filters: {
       type: function(value) {
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
      
      findMySource() {
        this.listLoading = true
        findMySourceList().then(response => {
          this.list = response.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      deleteClick(sourceId) {
          this.visible = false
         //console.log(sourceId)
         deleteTheSource(sourceId).then(response => {
            if(response.code === 200) {
            this.$message({
                    message: '删除成功！',
                    type: 'success'
                }); 
            }
            this.findMySource()
         }).catch(() => {
          
         })

      }
     
  }
};
</script>