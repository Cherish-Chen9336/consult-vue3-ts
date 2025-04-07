<script setup lang="ts"></script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部区域 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单区域 -->
    <van-form>
      <van-field placeholder="请输入手机号" type="tel"></van-field>
      <van-field placeholder="请输入密码" type="password"></van-field>
      <div class="cp-cell">
        <van-checkbox>
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私协议</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>

    <!-- 底部区域 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  // &-page {
  //   padding-top: 46px;
  // }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 20px;
  .cp-cell {
    padding: 14px 16px;
    height: 52px;
    line-height: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
}
</style>
