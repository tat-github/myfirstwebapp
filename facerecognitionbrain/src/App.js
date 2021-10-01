import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Facerecognition from './components/Facerecognition/Facerecognition'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particleOptions ={
  particles: {
    number:{
      value: 200,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state ={
      input: '',
      route: 'signin',
      image:'',
      name: '',
    }
  }

  onInputChange = (event) =>{
    console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    console.log('click');
  }

  onRouteChange = (route, name) => {
    this.setState({route: route, name: name})
  }
  render(){
    if (this.state.route === 'signin'){
      return(
        <div className="App">
            <Particles className ="particles" params={particleOptions} />
           <Signin onRouteChange={this.onRouteChange}/>
        </div>
      )
    }
    else if (this.state.route === 'register'){
      return(
        <div className="App">
            <Particles className ="particles" params={particleOptions} />
            <Navigation route = {this.state.route} name = {this.state.name} onRouteChange={this.onRouteChange}/>
            <Register onRouteChange={this.onRouteChange}/>
        </div>
      )
    }
    else if(this.state.route === 'home') {
      return(
        <div className="App">
          <Particles className ="particles" params={particleOptions} />
          <Navigation route = {this.state.route} name = {this.state.name} onRouteChange={this.onRouteChange}/>
          <Logo />
          <Rank/>
          <ImageLinkForm  
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <Facerecognition />
        </div>
      )
    }
    
  }
}

export default App;
