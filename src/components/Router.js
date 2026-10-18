import React, { Component } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useParams
} from "react-router-dom";

import MenuComponent from "./MenuComponent";
import HomeComponent from "./HomeComponent";
import CreateCoche from "./CreateCoche";
import UpdateCoche from "./UpdateCoche";

// Lee el ID de la URL y lo entrega por props.
function UpdateCocheElement() {
    const { idCoche } = useParams();

    return <UpdateCoche idCoche={idCoche} />;
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent />

                <Routes>
                    <Route
                        path="/"
                        element={<HomeComponent />}
                    />

                    <Route
                        path="/create"
                        element={<CreateCoche />}
                    />

                    <Route
                        path="/update/:idCoche"
                        element={<UpdateCocheElement />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}