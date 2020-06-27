import React from 'react'

class MyCount extends React.Component {
  constructor(props) {
    super(props)
    state = {
      count: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000);
  }

  componentWillUnmount() {
    // 组件要卸载的时候把定时器清除
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render () {
    return <span>{this.state.count}</span>
  }
}

export default MyCount