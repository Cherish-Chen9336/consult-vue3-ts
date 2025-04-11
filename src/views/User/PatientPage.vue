<script setup lang="ts">
import {
  getPatientList,
  addPatient,
  editPatient,
  delPatient
} from '@/services/user'
import type { Patient, PatientList } from '@/types/user'
import { idCardRule, nameRules } from '@/utils/rules'
import {
  showConfirmDialog,
  showSuccessToast,
  showToast,
  type FormInstance
} from 'vant'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

// 1. 页面初始化加载数据
const list = ref<PatientList>([])
const loadList = async () => {
  const res = await getPatientList()
  // console.log(res)
  list.value = res.data
}

onMounted(() => {
  loadList()
})

// 1. 先在父组件定义 响应式变量

const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 控制popup
const show = ref(false)

const showPopup = (item?: Patient) => {
  if (item) {
    const { id, idCard, name, defaultFlag, gender } = item
    patient.value = { id, idCard, name, defaultFlag, gender }
  } else {
    // 打开弹层之前，清空表单
    patient.value = { ...initPatient }
  }

  show.value = true
}

const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}

// 表单数据

const patient = ref<Patient>({ ...initPatient })

const defaultFlag = computed({
  get: () => (patient.value.defaultFlag === 1 ? true : false),
  set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})

// 保存表单
const form = ref<FormInstance>()

const onSave = async () => {
  // 校验表单
  await form.value?.validate()
  // 取身份证倒数第二位，判断是奇数还是偶数, 奇数为男性，偶数为女性，并判断与填写的性别是否一致
  const gender = +patient.value.idCard.slice(-2, -1) % 2
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别和身份证号的不一致\n您确认提交吗？'
    })
  }
  // console.log('校验通过')

  // 添加患者 或 编辑患者
  // 调用添加接口
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  patient.value.id
    ? await editPatient(patient.value)
    : await addPatient(patient.value)
  // 关闭弹层
  show.value = false
  // 重新渲染页面
  loadList()
  // 成功提示
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}

// 删除患者
const onDelete = async () => {
  if (patient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗？`
    })
  }
  // 调用接口，传入 id
  await delPatient(patient.value.id as string)
  // 关闭弹层
  show.value = false
  // 重新渲染页面
  loadList()
  // 成功提示
  showToast('删除成功')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in list" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}
          </span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit" @click="showPopup(item)" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="list.length < 6" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多添加 6 人</div>

      <!-- 使用 popup 组件 -->
      <van-popup v-model:show="show" position="right">
        <cp-nav-bar
          :title="patient.id ? '编辑患者' : '添加患者'"
          right-text="保存"
          @click-right="onSave"
          :back="
            () => {
              show = false
            }
          "
        />
        <!-- 表单区域 -->
        <van-form ref="form">
          <van-field
            v-model="patient.name"
            label="真实姓名"
            placeholder="请输入真实姓名"
            :rules="nameRules"
          />
          <van-field
            v-model="patient.idCard"
            label="身份证号"
            placeholder="请输入身份证号"
            :rules="idCardRule"
          />
          <van-field label="性别">
            <!-- 单选框组件 -->
            <template #input>
              <cp-radio-btn
                :options="options"
                v-model="patient.gender"
              ></cp-radio-btn>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox v-model="defaultFlag" :icon-size="18" />
            </template>
          </van-field>
        </van-form>
        <!-- 删除按钮 -->
        <van-action-bar>
          <van-action-bar-button @click="onDelete">删除</van-action-bar-button>
        </van-action-bar>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
.patient-list {
  padding: 15px;
}

.patient-item {
  display: flex;
  align-items: center;
  background-color: var(--cp-bg);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}

.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}

// 删除按钮
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
