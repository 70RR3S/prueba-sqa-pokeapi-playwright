import { expect } from "playwright/test";
import { api, baseUrl } from "../../../../../../hooks/hook";


export default class ConsultarPokemon {
    private jsonRespuesta: any;
    private codigoRespuesta: any

    constructor(){
        this.jsonRespuesta = null;
        this.codigoRespuesta = null;
    }


    async enviarSolicitud(nombre: string){
        try {
            const solicitudConsultarPokemon = api.api;
            const respuesta = await solicitudConsultarPokemon.get(`${baseUrl}/pokemon/${nombre}`);
            this.codigoRespuesta = respuesta.status();
            this.jsonRespuesta = await respuesta.json()      
        } catch (error) {
            console.error('Error consultando el nombre del pokemon', error)
            throw error;
        }
    }

    /* 
        Los metodos de consultarEspecie y consultarEvoluciones estan dentro de esta clase,
        ya que, las urls de los endpoints se van conociendo a medida que se ejecuta el escenario
    */
    async consultarEspecie(url: string){
        try {
            const solicitudConsultarEspeciePokemon = api.api;
            const respuesta = await solicitudConsultarEspeciePokemon.get(url);
            this.codigoRespuesta = respuesta.status();
            this.jsonRespuesta = await respuesta.json()      
        } catch (error) {
            console.error('Error consultando las especies del pokemon', error)
            throw error;
        }
    }

    async consultarEvoluciones(url: string){
        try {
            const solicitudConsultarEvoluciones = api.api;
            const respuesta = await solicitudConsultarEvoluciones.get(url);
            this.codigoRespuesta = respuesta.status();
            this.jsonRespuesta = await respuesta.json()      
        } catch (error) {
            console.error('Error consultando las evoluciones del pokemon', error)
            throw error;
        }
    }

    
    async validarCodigo(codigo: number){
        expect(this.codigoRespuesta).toBe(codigo);
    }

    async obtenerUrlEspecies() {
        return await this.jsonRespuesta.species.url;
    }

    async obtenerUrlEvoluciones() {
        return await this.jsonRespuesta.evolution_chain.url;
    }

    async obtenerNombresEvoluciones() {
        const respuestaEvoluciones = await this.jsonRespuesta.chain;

        function obtenerNombres(cadena: any) {
            const nombres = [];
            if (cadena.species) {
                nombres.push(cadena.species.name); //Agrega el nombre del pokemon actual
                cadena.evolves_to.forEach(subCadena => {
                    nombres.push(...obtenerNombres(subCadena)); //Agrega los nombres de las evoluciones siguientes
                });
            }
            return nombres;
        }

        const nombresEvoluciones = obtenerNombres(respuestaEvoluciones);
        return nombresEvoluciones;
    }

    ordenarEtapasEvolucion(nombresEtapasEvolucion: any[]) {
        const resultados = [];
        for (let i = 0; i < nombresEtapasEvolucion.length - 2; i++) { //Solo ejecuta una vez
            const etapaActual = nombresEtapasEvolucion[i];
            const etapaIntermedia = nombresEtapasEvolucion[i + 1];
            const etapaFinal = nombresEtapasEvolucion[i + 2];
        
            const resultado = {
              nombre: etapaActual,
              etapaIntermedia: etapaIntermedia,
              etapaFinal: etapaFinal
            };

            resultados.push(resultado);
        }

        return resultados;
    }

    validarEvoluciones(evoluciones: any[], evolucionesEsperadas: any[]) {
        expect(evoluciones).toEqual(expect.arrayContaining(evolucionesEsperadas));
    }
}