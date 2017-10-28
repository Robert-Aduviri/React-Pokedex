import React, { Component } from 'react';
import logo from './logo.svg';
import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/b/b8/059Arcanine.png/250px-059Arcanine.png',
      buttonText: '¿Quién es ese Pokémon?'
    };
    // this.neuralNet = new NeuralNet();
  }
  
  loadImage(url) {
    this.setState({imageUrl: url});
    this.setState({buttonText: '¿Quién es ese Pokémon?'});
  }

  predictImage(url) {
    this.setState({buttonText: '...'});
    return fetch('https://pokedex-neural-net.herokuapp.com/predict', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: url
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // this.setState({imageUrl: responseJson});
        this.setState({buttonText: `¡Es ${responseJson.predictedLabel}!`});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <label>Ingresa la imagen del Pokémon: </label>
          <input 
            onChange={event => this.state.imageUrl = this.loadImage(event.target.value)} 
            value={this.state.imageUrl}/>
        </div>
        <div className="image-container">
          <img src={this.state.imageUrl} />
        </div>
        <div className="button-container">
          <a className="waves-effect deep-orange accent-3 btn-large" 
             onClick={() => this.predictImage(this.state.imageUrl)}>{this.state.buttonText}</a>
        </div>
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
