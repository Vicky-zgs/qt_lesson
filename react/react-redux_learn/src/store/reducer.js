const defaultState = {
  inputValue: 'hello world',
  list: ['Lily', 'John']
}

export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    // input框中的值发生改变时将值保存到store中
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === 'submit_input_value') {
    // 点击提交后将input框存入list中
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === 'delete_item_value') {
    // 删除点击的数据
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }

  return state
}