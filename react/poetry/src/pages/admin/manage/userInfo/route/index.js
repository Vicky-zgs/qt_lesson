import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; //路由安装包

//路由懒加载
import Loadable from 'react-loadable';

import loading from '../loading';

 const  Home = Loadable({
    loader:()=>import('../home'),
    loading:loading
})



const  Add = Loadable({
    loader:()=>import('../add'),
    loading:loading
})




//import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return ( 
            
            <Router >
            <Switch>
            < Route exact path = "/"  component = { Home }  /> 
             < Route path = "/add" render = {(rag) => < Add x = { '1111' } {...rag } />  } />
             <Redirect from = '/*' to = '/' / > { /* 当上面当路由都不能匹配时就渲染  to后面的页面 */ }
             </Switch> 
                </Router >
            )
        }
    }