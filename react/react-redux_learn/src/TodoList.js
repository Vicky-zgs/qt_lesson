import React, { Component } from 'react';
// import store from './store'
import { connect } from 'react-redux'

class TodoList extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = store.getState()
  // }

  // handleInputChange (e) {
  //   console.log(e.target.value)
  // }

  render () {
    return (
      <div>
        <div>
          <input value={this.props.inputValue} onChange={this.props.changeInputValue} />
          <button onClick={this.props.submitInputValue}>提交</button>
        </div>
        <ul>
          {
            this.props.list.map((item, index) => {
              return (
                <li key={index} onClick={() => {this.props.deleteItemValue(index)}}>{item}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // mapStateToProps作为connect的第一个参数 , 它的参数就是 store
  // 该方法会把store映射到当前的props中
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  // 把store.dispatch 映射到 props上
  return {
    changeInputValue (e) { 
      // 将输入的值保存在input框中
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      console.log('输入框中输入的值',e.target.value)
      dispatch(action)
    },

    submitInputValue () {
      // 将提交了的value值显示在list中
      const action = {
        type: 'submit_input_value'
      }
      dispatch(action)
    },

    deleteItemValue (index) {
      // 删除点击的数据
      const action = {
        type: 'delete_item_value',
        index
      }
      dispatch(action)
    }
  }
}

// connect 是连接
// TodoList 和 store 做连接

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)