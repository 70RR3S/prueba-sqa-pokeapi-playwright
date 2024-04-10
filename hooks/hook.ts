import { AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { APIRequestContext, Browser, BrowserContext, request } from "playwright";
import { invocar } from "./manager";

let navegador: Browser;
let contextoNavegador: BrowserContext;
let contextoApi: APIRequestContext;
export let baseUrl: string = 'https://pokeapi.co/api/v2/';

export const api = { 
    //@ts-ignore
    api: undefined as APIRequestContext
}

BeforeAll( async () => {
    navegador = await invocar();
});

Before( async () => {
    contextoApi = await request.newContext({
        baseURL: baseUrl,
    })

    contextoNavegador = await navegador.newContext({});
    api.api = contextoApi;
});

AfterAll(async () => {
    await navegador.close();
})