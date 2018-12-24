import React, { Component, Fragment } from 'react';
import './normalize.css';
import './skeleton.css';

import Formulario from './components/Formulario';
import { calcularTotal } from './helpers';
import Resultado from "./components/Resultado";
import Mensaje from './components/Mensaje';
import Spinner from './components/Spinner';
class App extends Component {

  state = {
    total: '',
    cantidad: '',
    plazo: '',
    cargando: false
  }

  datosPrestamo = (cantidad, plazo) => {
      const total = calcularTotal(cantidad, plazo);

      // Colocar el resultado en el state junto a la cantidad y el plazo
      this.setState({
        cargando : true
      }, () => {
        setTimeout(() => {
          this.setState({
            total,
            cantidad,
            plazo,
            cargando: false
          })
        }, 3000)
      })
  }

  render() {
    const { total, plazo, cantidad, cargando} = this.state;

    //Cargar un componente condificionalente 
    let componente;
    if(total === '' && !cargando) {
      componente = <Mensaje />
    } else if (cargando) {
      componente = <Spinner />
    }else {
      componente = <Resultado 
      total={total}
      plazo={plazo}
      cantidad={cantidad}
    />
    } 
    return (
        <Fragment>
          <h1>Cotizador de Prestamos</h1>
          <div className="container">
            <Formulario 
                datosPrestamo={this.datosPrestamo}
            />

            <div className="mensajes">
              {componente}
            </div>
          </div>
        </Fragment>
    );
  }
}

export default App;
