// 拥有form表单的布局与提交功能
// formItem 收集错误信息
// input 输入框前增加icon
// 提供input 输入框空间提示事件处理, 表单校验功能
import React, { Component } from 'react'
import { Icon } from 'antd'

// hoc: 包装用户单位, 增加数据管理和校验
function KFormCreate (Comp) {
  return class NewComponent extends Component {
    constructor (props) {
      super(props)

      this.options = {}   // 字段选项设置
      this.state = {}      // 字段值
    }

    // 处理表单输入事件
    handleChange = e => {
      const { name, value } = e.target
      this.setState(
        {
          [name]: value
        },
        () => {
          // 数据变化后再校验
          this.validateField(name)
        }
      )
    }

    // 表单输入校验
    validateField = field => {
      const rules = this.options[field].rules
      // 只要任何一项失败就失败
      const ret = rules.some(rule => {
        // some() 方法用于检测数组中的元素是否满足指定条件(函数提供)
        if (rule.required) {
          // 仅验证必填项
          if (!this.state[field]) {
            // 校验失败
            this.setState({
              [field + "Message"]: rule.message
            })
            return true
          }
        }
      })
      if (!ret) {
        // 校验成功
        this.setState({[field + "message"]: ''})
      }
      return !ret
    }
  }
}

class FormItem extends Component {
  render () {
    return (
      <div className="formItem">
        {this.props.children}
        {this.props.validateStatus === "error" && (
          <p style={{color: 'red'}}>{this.props.help}</p>
        )}
      </div>
    )
  }
}

class KInput extends Component {
  render () {
    return (
      <div>
        {this.props.prefix}
        <input {...this.props} />
      </div>
    )
  }
}

@KFormCreate // 调用一下 即KForrmSample是KFormCreate的参数Comp
class KFormSample extends Component {

  // 登录按钮的点击事件
  onSubmit = () => {
    this.props.validate(isValid => {
      if (isValid) {
        // 校验成功
        console.log('校验成功, 提交登录', this.props.value)
      } else {
        console.log('校验失败')
      }
    })
  }

  render () {
    // 给父组件的props上挂载这几个属性
    // getFieldDec() 校验用户名不得为空的方法
    const { getFieldDec, isFieldTouched, getFieldError} = this.props

    const userNameError = isFieldTouched('uname') && getFieldError('uname')
    const passwordError = isFieldTouched('pwd') && getFieldError('pwd')

    return (
      <div>
        {/* 用户名的校验, FormItem组件即表单的内容输入不正确时的红色提示 */}
        <FormItem 
        validateStatus={userNameError ? "error" : ''}
        help={userNameError || ''}>
          {getFieldDec('uname', {
              rules: [{require: true, message: '请填写用户名'}]
            },
            <KInput type='text' prefix={<Icon type="user" />}>
              {/* 展示input框的组件 */}
            </KInput>
          )}
        </FormItem>
        {/* 密码的校验 */}
        <FormItem 
        validateStatus={passwordError ? "error" : ''}
        help={passwordError || ''}>
          {getFieldDec('pwd', {
              rules: [{require: true, message: '请填写密码'}]
            },
            <KInput type='password' prefix={<Icon type="lock" />}>
              {/* 展示input框的组件 */}
            </KInput>
          )}
        </FormItem>

        <button onClick={this.onSubmit}>登录</button>
      </div>
    );
  }
}

export default KFormSample