    import React, { Component } from "react";
    import ServiceCoche from "../services/ServiceCoche";
import { NavLink } from "react-router-dom";

    export default class HomeComponent extends Component {
    service = new ServiceCoche();

    state = {
        coches: [],
        status: false,
        error: null,
    };

    loadCoches = async () => {
        try {
        const coches = await this.service.getCoche();

        this.setState({
            coches: coches,
            status: true,
        });
        } catch (error) {
        console.error("No se pudieron cargar los coches", error);
        this.setState({
            status: true,
            error: "No se pudieron cargar los coches.",
        });
        }
    };


    deleteCoche = async (idCoche) => {
        await this.service.deleteCoche(idCoche)
        this.loadCoches();

    }

    componentDidMount = () => {
        this.loadCoches();
    };

    render() {
        if (!this.state.status) {
        return <p className="text-center mt-4">Cargando coches...</p>;
        }

        if (this.state.error) {
        return <p className="alert alert-danger m-4">{this.state.error}</p>;
        }

        return (
        <main className="container py-4">
            <h1 className="mb-4">Nuestros coches</h1>
            <div className="row g-4">
            {this.state.coches.map((coche) => {
                return (
                <div className="col-12 col-md-6 col-lg-4" key={coche.idCoche}>
                    <article className="card h-100 shadow-sm">
                    <img
                        src={coche.imagen}
                        className="card-img-top"
                        alt={`${coche.marca} ${coche.modelo}`}
                        style={{ height: "220px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                        <h2 className="card-title h4">
                        {coche.marca} {coche.modelo}
                        </h2>
                        <p className="card-text mb-0">
                        <strong>Conductor:</strong> {coche.conductor}
                        </p>
                        <button className='btn btn-danger'
                        onClick={() => {
                            this.deleteCoche(coche.idCoche)
                        }}>
                            Delete
                        </button>
                        <NavLink className='btn btn-info' to={"/update/" + coche.idCoche}> 
                            Edit
                        </NavLink>
                    </div>
                    </article>
                </div>
                );
            })}
            </div>
        </main>
        );
    }
    }
