<template>
  <div flex h-full>
    <div m-auto bg-gray-100 w-350 flex flex-col items-center border border-gray-300 p-30 rounded-10>
      <h5 text-24 font-normal color="#6a6a6a">
        {{ title }}
      </h5>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.name"
          autofocus
          class="text-16 items-center h-50 pl-10"
          placeholder="llAdmin"
          :maxlength="20"
        >
        </n-input>
      </div>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.password"
          class="text-16 items-center h-50 pl-10"
          type="password"
          show-password-on="mousedown"
          placeholder="123456"
          :maxlength="20"
          @keydown.enter="handleLogin"
        />
      </div>

      <div mt-20 w-full>
        <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />
      </div>

      <div mt-20 w-full>
        <n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { lStorage,setToken,setUserInfo} from '@/utils'
import { useStorage } from '@vueuse/core' //响应式本地存储
import api from './api'
import { addDynamicRoutes } from '@/router'
import { useUserStore } from '@/store'
const title = import.meta.env.VITE_TITLE
const userStore = useUserStore()
const router = useRouter() //路由实例
console.log(router,'111');
const { query } = useRoute() //将query从路由对象中解构出来
const loginInfo = ref({
  name: '',
  password: '',
})

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}
// 1.设置
// 相当于 localStorage.setItem('isRemember', 'false')
// 参数个数为两个且键值相同时 多次调用useStorage无效只响应首次设置的值(函数内部会直接调用localStorage.getItem(key))
const isRemember = useStorage('isRemember', false)
const loading = ref(false)
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    loading.value = true //开启loading
    $message.loading('正在验证...')
    const res = await api.login({ loginName:name, password: password.toString() })
    if (res.code === 200) {
      $message.success('登录成功')
      setToken(res.data.token)
      setUserInfo(res.data.userInfo)
      if (isRemember.value) {
        lStorage.set('loginInfo', { name, password })
      } else {
        lStorage.remove('loginInfo')
      }
      await addDynamicRoutes()
      
      if (query.redirect) {
      const path = query.redirect
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    } else {
      router.push(userStore.role[0].path)
    }
    } else {
      $message.warning(res.message)
    }
  } catch (error) {
    $message.error(error.message)
  }
  loading.value = false
}
</script>
