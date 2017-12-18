import React, { Component } from 'react';
import logo from './logo.svg';
import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/b/b8/059Arcanine.png/250px-059Arcanine.png',
      buttonText: '¿Quién es ese Pokémon?',
      pokemon: {
        "Altura": "1,9 m", 
        "Description": "Arcanine es conocido por lo veloz que es. Dicen que es capaz de correr 10 000 km en 24 horas. El fuego que arde con vigor en el interior de este Pok\u00e9mon constituye su fuente de energ\u00eda.", 
        "Habilidad": ['Intimidaci\u00f3n', 'Absorbe Fuego'], 
        "ImageUrl": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png", 
        "Number": 59, 
        "Peso": "155,0 kg", 
        "Pokemon": "Arcanine", 
        "Stats": "{'Velocidad': 95, 'Defensa Sp.': 80, 'Defensa': 100, 'Ataque Sp.': 80, 'Ataque': 110, 'HP': 90}", 
        "Types": "['Fuego']"
      }
    };
    // this.neuralNet = new NeuralNet();
  }
  
  loadImage(url) {
    this.setState({imageUrl: url});
    this.setState({buttonText: '¿Quién es ese Pokémon?'});
  }

  predictImage(url) {
    this.setState({buttonText: '...'});
    return fetch(`https://pokedex-cnn.herokuapp.com/predict?imageurl=${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log(responseJson.Habilidad)
      console.log(typeof responseJson)
      // this.setState({imageUrl: responseJson}); 
      this.setState({buttonText: `¡Es ${responseJson.Pokemon}!`, pokemon: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // oldPredictImage(url) {
  //   this.setState({buttonText: '...'});
  //   return fetch('https://pokedex-neural-net.herokuapp.com/predict', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       imageUrl: url
  //     })
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson);
  //       // this.setState({imageUrl: responseJson});
  //       this.setState({buttonText: `¡Es ${responseJson.predictedLabel}!`});
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  renderList(array) {
    // var array2 = Object.values(array);
    if(typeof array === typeof 'str')
      array = array.replace(/'/g, '').replace('[','').replace(']','').split(', ')
    return array.map(function(item, i){
        return (<p key={i}>{item}</p>);               
      })
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <label>URL: </label>
          <input 
            onChange={event => this.state.imageUrl = this.loadImage(event.target.value)} 
            value={this.state.imageUrl}/>
        </div>
        <div className="container">
          <div className="card">

            <div className="button-container">
              <a className="waves-effect deep-orange accent-3 btn-large" 
                onClick={() => this.predictImage(this.state.imageUrl)}>{this.state.buttonText}</a>
            </div>

            <h1>
              {this.state.pokemon.Pokemon + ' '}
              <span className="number">
                N.°{("00" + this.state.pokemon.Number).slice (-3)}
              </span>
            </h1>

            <div className="two-column-container">

              <div className="image-container">
                <img src={this.state.imageUrl} />
              </div>

              <div className="info-container">
                <p className="description">{this.state.pokemon.Description}</p>
                <div className="info-subcontainer">
                  <div className="info">
                    <p>Altura</p>
                    <p>{this.state.pokemon.Altura}</p>
                    <p>Peso</p>
                    <p>{this.state.pokemon.Peso}</p>
                  </div>
                  <div className="info">
                    <p>Habilidades</p>
                    {this.renderList(this.state.pokemon.Habilidad)}
                  </div>
                </div>
              </div>

            </div>  

            <div className="two-column-container">

              <div className="graph-container">
                <canvas id="stats-chart" width="200" height="200"></canvas>
              </div>

              <div className="types-container">
                <div className="info">
                  <p>Tipos</p>
                  {this.renderList(this.state.pokemon.Types)}
                </div>                  
              </div>

            </div>                    
            
          </div>
        </div>



        {/* <p>{this.state.pokemon.Altura}</p>
        <p>{this.state.pokemon.Description}</p>
        <p>{this.state.pokemon.Habilidad}</p>
        <p>{this.state.pokemon.ImageUrl}</p>
        <p>{this.state.pokemon.Number}</p>
        <p>{this.state.pokemon.Peso}</p>
        <p>{this.state.pokemon.Pokemon}</p>
        <p>{this.state.pokemon.Stats}</p>
        <p>{this.state.pokemon.Types}</p> */}
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
