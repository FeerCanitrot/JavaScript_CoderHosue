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
    const opciones = ["piedra", "papel", "tijera"];
    while(ganadas <= 2){
        let usuario = prompt("Elige piedra, papel o tijera:").toLowerCase()
        let compu = opciones[Math.floor(Math.random() * opciones.length)]
        if(!opciones.includes(usuario)){
            alert("Opción no válida. Intenta de nuevo.");
            juego()
            return
        }
        if(usuario == "piedra" && compu == "papel" || usuario == "papel" && compu == "tijera" || usuario == "tijera" && compu == "piedra"){
            perdidas++
            intento = intento + perdidas
            alert("¡Perdiste! la compu saco( "+compu+" ) vas "+ganadas+" a "+perdidas)
            if(perdidas == 3){
                resultado()
                break;
            }
        }else if(usuario == "piedra" && compu == "tijera" || usuario == "papel" && compu == "piedra" || usuario == "tijera" && compu == "papel"){
            ganadas++
            intento = intento + ganadas
            alert("¡Ganaste! la compu saco( "+compu+" ) vas "+ganadas+" a "+perdidas)
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