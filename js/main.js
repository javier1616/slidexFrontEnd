import router from './router.js';
import { getPresentations } from './api.js';


document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Iniciando main.js")

    router();

    //delegación de evento 'input'
    document.addEventListener("input", (event) => {
   
        if (event.target.matches("#idDelElemento")) {

            console.log("Cambio en el elemento", event.target.value);
            console.log("hace algo")

        }

        //se agregan los demas inputs

    });

    //delegacion de evento 'click' (carga el addEventListener para click para todo el DOM)
    document.addEventListener('click', async (event) => {

        console.log("click");

        //click en elemento exacto
        if (event.target.matches("#idDelelemento")) {

            console.log("hace algo");
    
        }


        //click en algun hijo dentro de ese elemento
        if(event.target.closest('idDelElemento')){

            console.log("hace algo");

        }

        //if (event.target.matches("#otro-boton")) {
        //  // Click directo al botón
        //}

        //const clicked = event.target.closest("#mi-boton");
        //if (clicked) {
        //    // Click en #mi-boton o alguno de sus hijos
        //}
     
     
    });

});