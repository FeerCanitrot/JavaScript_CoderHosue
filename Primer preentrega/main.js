// const palabra = "esperando"

// let letra 

// let intentos = 6

// let errores = 0

// let result = 0

// console.log("La palabra tiene "+palabra.length+" letras")

// function ahorcado(){
//     while(errores < intentos){
//         letra = prompt("Ingrese una letra").toLowerCase()
//         if(palabra.includes(letra)){
//             console.log("¡¡Adivinaste!!");
//             result = intentos - errores
//             console.log("Te queda/n "+result+" intento/s");
//         }else{
//             errores++
//             result = intentos - errores
//             console.log("Perdiste un intento, te queda/n "+result+" intento/s")
//         }
//         mostrar_guiones(palabra)
//     }
// }

// ahorcado()
// function mostrar_guiones(str, posible_letra = 0){
//     let long = str.length
//     let guiones = ""
//     for(i=0;i<long;i++){
//         guiones = guiones + "_ "
//     }
//     console.log(guiones);
// }

// PIEDRA PAPEL Y TIJERA

alert("Juguemos a PIEDRA, PAPEL Y TIJERA contra la maquina. Donde se gana el mejor de 3")

let intento = 0

let ganadas = 0

let perdidas = 0

const piedra = 1

const papel = 2

const tijera = 3

function pregunta(){
    if(confirm("¿Quieres jugar de nuevo al piedra pael o tijera?")){
        ganadas = 0
        perdidas = 0
        intento = 0
        juego()
    }else{
        alert("Que mala onda")
    }
}

function resultado(){
    if(ganadas<perdidas){
        alert("Terminaste perdinedo "+perdidas+" a "+ganadas)
        pregunta()
    }else{
        alert("Terminaste ganando "+ganadas+" a "+perdidas)
        pregunta()
    }
}

function juego(){
    while(ganadas <= 2){
        let usuario = prompt("Que vas a elegir(PIEDRA: 1, PAPEL: 2 Y TIJERA 3)")
        let compu = Math.floor(Math.random()*3+1)
        if(!["1", "2", "3"].includes(usuario)){
            alert("Opción no válida. Intenta de nuevo.");
            juego()
            return
        }
        if(usuario == 1 && compu == 2 || usuario == 2 && compu == 3 || usuario == 3 && compu == 2){
            perdidas++
            intento = intento + perdidas
            alert("Perdiste vas "+ganadas+" a "+perdidas)
            if(perdidas == 3){
                resultado()
                break;
            }
        }else if(usuario == 1 && compu == 3 || usuario == 2 && compu == 1 || usuario == 3 && compu == 2){
            ganadas++
            intento = intento + ganadas
            alert("¡Ganaste! vas "+ganadas+" a "+perdidas)
            if(ganadas == 3){
                resultado()
                break;
            }
        }else if(usuario == compu){
            alert("¡Empate!");
        }
    }
}

juego()



