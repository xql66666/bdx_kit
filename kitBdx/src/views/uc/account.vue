<template>
    <el-main>
        <h3>我的账号</h3>
        <hr /><br />

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="重置密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width: 20%" placeholder="密码为5~16位字母，数字或者符号"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width: 20%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </el-main>
</template>

<script>
import { isvalidPassword } from '@/util/validate'
import Aes from '@/util/aes'
import { accountPass } from '@/api/profile'
  export default {
    data() {  
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!isvalidPassword(value)) {
            callback(new Error('密码格式不正确'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          loading: false
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.loading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert(this.ruleForm.pass);
            accountPass(Aes.encrypt(this.ruleForm.pass)).then( response => {
                this.code = response.code
                if(this.code === 200){
                    this.$message({
                        message: '密码修改成功！',
                        type: 'success'
                    });
                    this.loading = false
                    this.$router.push({ path: '/uc/info' })
                }
                
            })
            
          } else {
            this.$message.error('提交失败！');
            this.loading = false
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>