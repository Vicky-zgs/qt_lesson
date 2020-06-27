import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  // 将六个钩子函数都执行一下
  Router.events.on(event, makeEvent(event))
})

export default () => {

  // function gotoTestB() {
  //   Router.push({
  //     // 添加点击时间进行页面跳转 这样的写法与Link效果一样
  //     pathname: '/test/b',
  //     query: {
  //       id: 2
  //     }
  //   }, '/test/b/2') // 页面跳转
  // }

  return (
    <>
      <span>Index</span>
    </>
  )
}
