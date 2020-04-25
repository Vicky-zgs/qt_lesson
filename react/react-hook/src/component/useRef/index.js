// useRef 获取dom元素    (这个函数一定要给参数)
import React, { useRef } from 'react'

function Example () {
  // inputEl这个变量是useRef函数的返回值, 那么这个变量给谁当ref属性, 就能表示该元素的DOM
  const inputEl = useRef(null)

  const onButtonClick = () => {
    inputEl.current.value = '猛哥贼拉帅'
    console.log(inputEl)
  }
  
  return (
    <>
      <input ref={inputEl} type="text"></input>
      <button onClick={onButtonClick}>在input上展示文字</button>
    </>
  )
}

export default Example