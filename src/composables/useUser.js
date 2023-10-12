import { renderIcon } from '@/utils'
import { NIcon } from 'naive-ui'
export default function ({ modalAction, modalVisible, cols, formData, modalTitle, doReset }) {
  /* 重置密码 */
  function resetPassword(id) {
    $dialog.confirm({
      title: '提示',
      showIcon:false,
      content: ()=>{
        return [
            h(
                renderIcon('eva:alert-circle-fill', { size: 24 , color:'#f0a020',style:'vertical-align: middle;' })
               
            ),
            h(
            'span',
            {},
            {
                default:()=>'确定重置密码？'
            }
        )
       
    ]
      },
      async confirm() {
        try {
          const data = await doReset(id)
          $message.success('重置密码成功')
          refresh(data)
        } catch (error) {}
      },
    })
  }
  //   更换手机号
  function handlePhone(type, id) {
    modalAction.value = type
    modalVisible.value = true
    modalTitle.value = '修改手机号'
    cols.value = 1
    formData.value = [
      {
        label: '手机号',
        value: 'phone',
        type: 'input',
        rule: {
          required: true,
          trigger: ['input', 'blur'],
        },
      },
    ]
  }
  return {
    resetPassword,
    handlePhone,
  }
}
