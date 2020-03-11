// 高阶组件

import React from 'react'

function HOC (WrappedComponent) {
  let inputElement = null

  function handleClick () {
    inputElement.focus()
  }

  return (props) => (
    <div>
      {/* 获取子组件的ref并操作 */}
      <WrappedComponent inputRef={(el) => { inputElement = el}} {...props} />
      <input type="button" value="获取子组件输入框焦点" onClick={handleClick} />
    </div>
  )
}

export default HOC