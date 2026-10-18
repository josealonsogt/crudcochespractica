import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";
import ServiceCoche from "../services/ServiceCoche";

export default class UpdateCoche extends Component {
    service = new ServiceCoche();

    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        coche: null,
        status: false,
        mensaje: null
    };

    // Consulta el coche con el ID recibido por props.
    loadCoche = async () => {
        try {
            const coche = await this.service.getCocheById(
                this.props.idCoche
            );

            this.setState({
                coche: coche
            });
        } catch (error) {
            this.setState({
                mensaje: "No se pudo cargar el coche."
            });
            console.error(error);
        }
    };

    componentDidMount() {
        this.loadCoche();
    }

    // Recoge el formulario y envía los cambios.
    updateCoche = async (event) => {
        event.preventDefault();

        const coche = {
            idCoche: this.state.coche.idCoche,
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        };

        try {
            await this.service.updateCoche(coche);

            this.setState({
                status: true
            });
        } catch (error) {
            this.setState({
                mensaje: "No se pudo actualizar el coche."
            });
            console.error(error);
        }
    };

    render() {
        if (this.state.status) {
            return <Navigate to="/" />;
        }

        // Esperamos a tener el coche antes de mostrar los inputs.
        if (this.state.coche === null) {
            return (
                <p>
                    {this.state.mensaje || "Cargando coche..."}
                </p>
            );
        }

        return (
            <div style={{ margin: "auto", width: "50%" }}>
                <h1>Actualizar coche</h1>

                {this.state.mensaje && (
                    <p style={{ color: "red" }}>
                        {this.state.mensaje}
                    </p>
                )}

                <form onSubmit={this.updateCoche}>
                    <label>ID del coche</label>
                    <input
                        type="number"
                        defaultValue={this.state.coche.idCoche}
                        className="form-control"
                        disabled
                    />

                    <label>Marca</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.marca}
                        ref={this.cajaMarca}
                        className="form-control"
                        required
                    />

                    <label>Modelo</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.modelo}
                        ref={this.cajaModelo}
                        className="form-control"
                        required
                    />

                    <label>Conductor</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.conductor}
                        ref={this.cajaConductor}
                        className="form-control"
                        required
                    />

                    <label>Imagen</label>
                    <input
                        type="text"
                        defaultValue={this.state.coche.imagen}
                        ref={this.cajaImagen}
                        className="form-control"
                    />

                    <button
                        type="submit"
                        className="btn btn-info"
                    >
                        Guardar
                    </button>

                    <NavLink to="/" className="btn btn-secondary">
                        Cancelar
                    </NavLink>
                </form>
            </div>
        );
    }
}