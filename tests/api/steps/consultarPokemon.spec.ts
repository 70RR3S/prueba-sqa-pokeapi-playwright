import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import ConsultarPokemon from "../../../pages/pokeapi/api/v2/pokemon/nombre/consultarPokemon";

const consultarPokemon = new ConsultarPokemon();
let nombre: string;
let urlEspecies: string;
let urlEvoluciones: string;
let evolucionesEscenario: any[];
let evoluciones: any[];

Given('que tengo el pokemon llamado {string}', async (nombrePokemon: string) => {
    nombre = nombrePokemon;
})

When('consulto el pokemon por su nombre', async () => {
    await consultarPokemon.enviarSolicitud(nombre);
})

Then('la respuesta al consultar el pokemon debe ser {int}', async (int) => {
    await consultarPokemon.validarCodigo(int);
    urlEspecies = await consultarPokemon.obtenerUrlEspecies();
    console.log(urlEspecies);
})

When('consulto la especie del pokemon', async () => {
    await consultarPokemon.consultarEspecie(urlEspecies);
})

Then('la respuesta al consultar la especie del pokemon debe ser {int}', async (int) => {
    await consultarPokemon.validarCodigo(int);
    urlEvoluciones = await consultarPokemon.obtenerUrlEvoluciones();
    console.log(urlEvoluciones);
})

When('finalmente consulto las evoluciones del pokemon', async () => {
    await consultarPokemon.consultarEvoluciones(urlEvoluciones);
})

Then('la respuesta al consultar la evoluciones del pokemon debe ser {int}', async (int) => {
    await consultarPokemon.validarCodigo(int);
    evoluciones = await consultarPokemon.obtenerNombresEvoluciones(); 
    console.log(evoluciones);   
})

Then('la etapas de evolucion del pokemon deben ser:', (dataTable: DataTable) => {
    evolucionesEscenario = dataTable.hashes();
    const evolucionesOrdenadas = consultarPokemon.ordenarEtapasEvolucion(evoluciones);
    console.log(evolucionesEscenario, evolucionesOrdenadas);

    consultarPokemon.validarEvoluciones(evolucionesEscenario, evolucionesOrdenadas);    
})
