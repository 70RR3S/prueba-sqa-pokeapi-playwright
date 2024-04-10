import {LaunchOptions, chromium} from 'playwright-core'

const opciones: LaunchOptions = {
    headless: process.env.HEADLESS === 'true'
}

export const invocar = () => {
    return chromium.launch(opciones)
}