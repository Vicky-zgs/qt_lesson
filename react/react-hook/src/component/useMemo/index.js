// useMemo (useCallback) 优化React Hooks 程序的性能
// 因为当A,B使用useState, B发生变化时有可能对于A的操作也会发生变化, useMemo就是解决这种性能消耗的问题
// 像这个demo中 children发生变化 而接收name为参数的函数确也执行了
import React, { useState, useMemo } from 'react'

function Example () {
  const [ wn, setWn ] = useState('蜗牛coding中')
  const [ zm, setZm ] = useState('猛哥coding中')

  return (
    <>
      <button onClick={() => {setWn(new Date().getTime())}}>蜗牛</button>
      <button onClick={() => {setZm(new Date().getTime()+',猛哥很帅')}}>猛哥</button>
    <ChildComponent name={zm}>{wn}</ChildComponent>
    </>
  )
}

function ChildComponent ({name, children}) {
  function changeZm (name) {
    console.log('他来了，他来了，猛哥向我们走来了')
    return name + ',猛哥向我们走来了'
  }

  // 使用useMemo优化性能, 第一个参数是一个函数, 第二个参数是个数组
  const actionZm = useMemo(() => changeZm(name), [name])

  return (
    <>
      <div>{actionZm}</div>
      <div>{children}</div>
    </>
  )
}

export default Example