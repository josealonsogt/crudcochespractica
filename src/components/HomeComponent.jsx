import React, { Component } from "react";
import ServiceCoche from "../services/ServiceCoche";
import CocheCard from "./CocheCard";

export default class HomeComponent extends Component {
    service = new ServiceCoche();

    state = {
        coches: [],
        status: false,
        error: null
    };

    loadCoches = async () => {
        try {
            const coches = await this.service.getCoche();

            this.setState({
                coches: coches,
                status: true,
                error: null
            });
        } catch (error) {
            this.setState({
                status: true,
                error: "No se pudieron cargar los coches."
            });
            console.error(error);
        }
    };

    // Este método sigue en el padre.
    deleteCoche = async (idCoche) => {
        try {
            await this.service.deleteCoche(idCoche);
            await this.loadCoches();
        } catch (error) {
            this.setState({
                error: "No se pudo eliminar el coche."
            });
            console.error(error);
        }
    };

    componentDidMount() {
        this.loadCoches();
    }

    render() {
        if (!this.state.status) {
            return <p className="text-center mt-4">Cargando coches...</p>;
        }

        return (
            <main className="container py-4">
                <h1 className="mb-4">Nuestros coches</h1>

                {this.state.error && (
                    <p className="alert alert-danger">
                        {this.state.error}
                    </p>
                )}

                <div className="row g-4">
                    {this.state.coches.map((coche) => (
                        <CocheCard
                            key={coche.idCoche}
                            coche={coche}
                            onEliminar={this.deleteCoche}
                        />
                    ))}
                </div>
            </main>
        );
    }
}