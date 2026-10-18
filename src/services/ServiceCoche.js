import axios from 'axios'
import Global from '../Global'
import reportWebVitals from '../reportWebVitals'

export default class ServiceCoche  {

    async getCoche() {
        const url = Global.urlApiCoches
        const request = 'api/coches'
        const response = await axios.get(url + request)
        return response.data
    }


    async createCoche(coche) {
        let url = Global.urlApiCoches
        let request = 'api/coches/InsertCoche'
        const response = await axios.post(url + request, coche)
        return response.data

    }

    async deleteCoche(idCoche) {
        let url = Global.urlApiCoches
        let request = 'api/coches/DeleteCoche/' + idCoche;
        const response = await axios.delete(url + request)
                    console.log("Departamento eliminado: " + idCoche);

        return response.data


    }


 async updateCoche(coche) {
    const url = Global.urlApiCoches;
    const request = "api/Coches/UpdateCoche";

    const response = await axios.put(url + request, coche);

    return response.data;
}


     async getCocheById(idCoche){
         let url = Global.urlApiCoches;
        let request = "api/coches/FindCoche/" + idCoche ;
        const response = await axios.get(url + request);
            console.log("coche obtenido" + idCoche);
            return response.data
        
    }
}
