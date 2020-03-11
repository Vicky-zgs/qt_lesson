import React from 'react'

const withMouse = (Component) => {
  return class extends React.Component {
    state = { x: 0, y: 0 }

    handleMouseMove = (event) => {
      // console.log(event)
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }

    render () {
      return (
        <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
          <Component {...this.props} mouse={this.state}/>
        </div>
      )
    }
  }
}

// 定义一个纯函数无状态的组件
const App = (props) => {
  const { x, y } = props.mouse
  return (
    <div style={{height: '100vh'}}>
      <h1>The mouse position is ({x}, {y}) </h1>
    </div>
  )
}

// const test = (props) => {
//   const { x, y } = props.mouse
//   return (
//     <div>{x}, {y}</div>
//   )
// }

// 这样 高阶组件中的代码就可以复用在不同组件中
const AppWithMouse = withMouse(App)   // 高阶组件替组件干活
// const TestWithMouse = withMouse(test)

export default AppWithMouse
// export default TestWithMouse