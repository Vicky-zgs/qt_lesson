import App, { Container } from 'next/app'

import 'antd/dist/antd.css'

class MyApp extends App {
  
  // 进行全局的数据的获取
  static async getInitialProps({ Component }) {
    // 拿到子组件 (例如a.js) 中的getInitialProps获取的数据
    console.log('app init')  // 每次页面切换 getInitialProps方法都会执行
    let pageProps
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }
    return {
      pageProps
    }
  }

  render() {
    // 这个Component就代表pages文件夹下的所有页面
    const { Component, pageProps } = this.props
    // console.log('Component', Component)

    return(
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp