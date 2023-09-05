// 登录接口
import { defAxios as request } from '@/utils/http'

export default {
  login: (data) => request.post('/public/admin/login', data, { noNeedToken: true }),
}