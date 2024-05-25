// Organizador del dia

// REGLAS
// No te puedes pasar mas que las 24 horas del dia en hacer todas tus actividades.
// Donde si o si tienes que dormir 8 horas. ¡¡PARA ESTAR AL 100!!
// Tambien tus 8 horas de trabajo (9am a 17pm).
// Y estudiar unas 2 horas.
// alert("RING RINGGG son las 8 am") 

// const dormir = 8
// const trabajo = 8
// const estudio = 2
// const desayunar = 0.50
// const cambiarte = 0.50
// const viaje_auto = 0.25

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