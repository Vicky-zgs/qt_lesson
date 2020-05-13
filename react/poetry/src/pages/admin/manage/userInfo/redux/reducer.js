//import  store  from  '../STORE/index'  //引入store  这个组件引用只能在一个组件中获取到数据 自组件中也不能获取到数据

const initialState = {    //创建一个对象  用来存放数据
      dataList:[],
      visble:false,

        radioFlag: 1,
        radioFlagV: 0,
        userValue: '',
        pwdValue: '',
        levelValue: '',
        emailInput: '',


        changeId:''
};



export default (state = { initialState }, action) => {

    if (action.type === 'dataList_type') {

        const newState = JSON.parse(JSON.stringify(state));

        console.log('原来newState', newState)
        action.value.map((item, index) => {
            newState.initialState.dataList.push(item)
        })
        console.log('newState', newState)

        return newState
    }

    if (action.type === 'changeModel_type') {

        const newState = JSON.parse(JSON.stringify(state));

        console.log('原来newState', newState)

         newState.initialState.changeId=action.value.id
        newState.initialState.userValue=action.value.username
        newState.initialState.pwdValue=action.value.password
        newState.initialState.levelValue=action.value.isManager

         newState.initialState.emailInput=action.value.email
              console.log('action.value.grade', action.value.grade);

       //  newState.initialState.radioFlag=action.value.grade="男"?1:0
        
       newState.initialState.visble=true ;

        
    
    //    console.log('newState', newState)

        return newState
    }

    if (action.type === 'levelpwd_type') {

        const newState = JSON.parse(JSON.stringify(state));


        newState.initialState.levelValue=action.value
       //  newState.initialState.radioFlag=action.value.grade="男"?1:0
        
       newState.initialState.visble=true ;

        
    
    //    console.log('newState', newState)

        return newState
    }

    

    if (action.type === 'hiddenModel_type') {

        const newState = JSON.parse(JSON.stringify(state));

        
       newState.initialState.visble=false

        
    
        console.log('newState', newState)

        return newState
    }






if (action.type == 'changeuser_type') {

        const newState = JSON.parse(JSON.stringify(state));

        console.log('原来newState', newState)

         newState.initialState.userValue=action.value
        
       newState.initialState.visble=true

        
    
        console.log('newState', newState)

        return newState
    }   



if (action.type == 'changepwd_type') {

        const newState = JSON.parse(JSON.stringify(state));

        console.log('原来newState', newState)

         newState.initialState.pwdValue=action.value
        
    //   newState.initialState.visble=true

        
    
        console.log('newState', newState)

        return newState
    } 

    


    return state
}