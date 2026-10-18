import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CocheCard extends Component {
    render() {
        // Recibimos el objeto completo desde Home.
        const coche = this.props.coche;

        return (
            <div className="col-12 col-md-6 col-lg-4">
                <article className="card h-100 shadow-sm">
                    {coche.imagen && (
                        <img
                            src={coche.imagen}
                            className="card-img-top"
                            alt={`${coche.marca} ${coche.modelo}`}
                            style={{
                                height: "220px",
                                objectFit: "cover"
                            }}
                        />
                    )}

                    <div className="card-body">
                        <h2 className="card-title h4">
                            {coche.marca} {coche.modelo}
                        </h2>

                        <p className="card-text">
                            <strong>Conductor:</strong> {coche.conductor}
                        </p>

                        <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={() =>
                                this.props.onEliminar(coche.idCoche)
                            }
                        >
                            Eliminar
                        </button>

                        <NavLink
                            className="btn btn-info"
                            to={"/update/" + coche.idCoche}
                        >
                            Editar
                        </NavLink>
                    </div>
                </article>
            </div>
        );
    }
}