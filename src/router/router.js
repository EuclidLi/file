//引入react jsx写法的必须
import React from 'react'; 
//引入需要用到的页面组件 
import File from '../compents/file.js';
//引入一些模块
import { BrowserRouter as Router, Route} from "react-router-dom";

function router(){
return (
<Router>
    <Route path="/" component={File} />
</Router>);
}

export default router;