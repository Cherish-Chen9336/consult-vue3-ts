<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showSuccessToast, showToast, type FormInstance } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const mobile = ref('')
const password = ref('')
const agree = ref(false)

const store = useUserStore()
const router = useRouter()
const route = useRoute()

const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选协议')
  // 发出登录请求
  // 判断是短信验证码还是密码登录
  const res = isPass.value
    ? await loginByPassword(password.value, mobile.value)
    : await loginByMobile(mobile.value, code.value)
  // console.log(res)
  // 将用户信息保存到仓库中

  store.setUser(res.data)
  // 成功提示
  showSuccessToast('登录成功')
  // 跳转页面
  router.replace((route.query.returnUrl as string) || '/user')
}

// 短信验证码界面切换
const isPass = ref(true)
const code = ref('')

// 发送短信验证码
const form = ref<FormInstance>()
const time = ref(0)
let timer: number

const onSend = async () => {
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  showToast('发送成功')
  // 开启定时器
  time.value = 10
  // 开启之前确保没有定时器在运行
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timer)
  }, 1000)
}

// 在组件卸载时再清除定时器

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>

    <!-- 头部区域 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">
          {{ isPass ? '短信验证码登录' : '密码登录' }}
        </span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        placeholder="请输入密码"
        type="password"
        :rules="passwordRules"
      ></van-field>
      <van-field
        v-model="code"
        v-else
        :rules="codeRules"
        placeholder="请输入验证码"
      >
        <template #button>
          <span @click="onSend" class="btn-send" :class="{ active: time > 0 }">
            {{ time > 0 ? `${time}s后重新发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私协议</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" block round type="primary">
          登 录
        </van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>
    <svg aria-hidden="true">
      <use href="#icon-consult-alipay" />
    </svg>
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

  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
