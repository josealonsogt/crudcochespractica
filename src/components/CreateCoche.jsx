import React, { Component  } from "react";
import ServiceCoche from "../services/ServiceCoche";
import { Navigate } from "react-router-dom";

export default class CreateCoche extends Component {
  service = new ServiceCoche();
  cajaMarca = React.createRef();
  cajaModelo = React.createRef();
  cajaConductor = React.createRef();
  cajaImagen = React.createRef();

  state = {
    mensaje: null,
    status: false,
  };

  insertCoche = async  (event) => {
    event.preventDefault();
    let coche = {
        marca : this.cajaMarca.current.value,
        modelo : this.cajaModelo.current.value,
        conductor: this.cajaConductor.current.value,
        imagen: this.cajaImagen.current.value
    }
    try{
            await this.service.createCoche(coche);
            console.log("coche insertado")
            this.setState({
                status: true
            })
        }catch(error){
            this.setState({
            mensaje: "No se pudo insertar el coche"
            });
            console.error("No se pudo insertar:", error);
        }
  };


  


    render() {
        if (this.state.status == true){
            return (<Navigate to="/"/>)
        }else{
            return (

            <div style={{margin: "auto", width: "50%"}}>
                <h1>Create Coche</h1>
                {
                    this.state.mensaje && 
                    (<p style={{color:"red", fontWeight: "bold"}}>
                        {this.state.mensaje}
                    </p>)
                }
                <form>
                    <label>Marca </label>
                    <input type="text" className='form-control'
                        ref={this.cajaMarca}/>
                    <label>modelo: </label>
                    <input type="text" className='form-control'
                        ref={this.cajaModelo}/>
                    <label>conductor: </label>
                    <input type="text" className='form-control'
                        ref={this.cajaConductor}/>
                        <label>imagen</label>
                    <input type="text" className='form-control'
                        ref={this.cajaImagen}/>
                    <button className='btn btn-warning' onClick={this.insertCoche}>
                        Insertar
                    </button>
                </form>
            </div>  
            )
        }
    }
}