import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Perfil from './pages/Perfil'
import Alimentos from './pages/Alimentos'
import Calorias from './pages/Calorias'
import Page404 from './pages/Page404'
import Imc from './pages/Imc'
import './index.css'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/perfil' component={Perfil} />
          <Route path='/alimentos' component={Alimentos} />
          <Route path='/imc' component={Imc} />
          <Route path='/calorias' component={Calorias} />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Index} />
          <Route path='*' component={Page404} />
          
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
