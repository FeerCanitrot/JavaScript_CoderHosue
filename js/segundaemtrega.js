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

let partidas = 0

let ganadas = 0

let perdidas = 0

let j = 0

function pregunta(){
    if(confirm("¿Quieres jugar al piedra papel o tijera?")){
        logueo()
        juego()
    }else{
        alert("Se cierra la sesion")
        logueo()
    }
}

function resultado(ganadas,perdidas){
    if(ganadas<perdidas){
        alert("Terminaste perdinedo "+perdidas+" a "+ganadas)
        pregunta()
    }else{
        alert("Terminaste ganando "+ganadas+" a "+perdidas)
        pregunta()
    }
}

function juego(){
    let jugadas = 0
    
    let ganadas = 0

    let perdidas = 0

    alert("Bienvenido al juego "+juegos.nombre)
    mostrarLista()
    const opciones = ["piedra", "papel", "tijera"];
    while(jugadas <= 5){
        let usuario = prompt("Elige piedra, papel o tijera:")
        let compu = opciones[Math.floor(Math.random() * opciones.length)]
        if(!opciones.includes(usuario)){
            alert("Opción no válida. Intenta de nuevo.");
            juego()
            return
        }
        if(usuario == "piedra" && compu == "papel" || usuario == "papel" && compu == "tijera" || usuario == "tijera" && compu == "piedra"){
            perdidas++
            jugadas++
            alert("¡Perdiste! la compu saco( "+compu+" ) vas "+ganadas+" a "+perdidas)
            modificarUsuario(false)
        }else if(usuario == "piedra" && compu == "tijera" || usuario == "papel" && compu == "piedra" || usuario == "tijera" && compu == "papel"){
            ganadas++
            jugadas++
            alert("¡Ganaste! la compu saco( "+compu+" ) vas "+ganadas+" a "+perdidas)
            modificarUsuario(true)
        }else if(usuario == compu){
            alert("¡Empate!");
        }
        if(ganadas + perdidas == 3){
            resultado(ganadas, perdidas)
        }
    }
}

let usuarios = []

class Juego{
    constructor(partidas, ganadas, perdidas, nombre, contraseña){
        this.partidas = partidas
        this.ganadas = ganadas
        this.perdidas = perdidas
        this.nombre = nombre
        this.contraseña = contraseña
    }
}

let juegos = new Juego()

let logueo = () => {
    nombre = prompt("Ingrese su nombre")
    contraseña = prompt("Ingrese su contraseña")
    chequeo(nombre, contraseña)
}

let chequeo = (nombre,contraseña) => {
    for (let i = 0; i < usuarios.length; i++) {
        if(nombre == usuarios[i].nombre){
            if(contraseña == usuarios[i].contraseña){
                juegos.nombre = nombre
                juegos.contraseña = contraseña
                juegos.partidas = usuarios[i].partidas
                juegos.ganadas = usuarios[i].ganadas
                juegos.perdidas = usuarios[i].perdidas
                juego()
            }else{
                alert("Contraseña incorrecta")
                logueo()
            }
        }
    }
    if(juegos.nombre != nombre){
        let usuarioNuevo = {
            partidas: 0,
            perdidas: 0,
            ganadas: 0,
            nombre: nombre,
            contraseña: contraseña,
            ultimaVez: new Date()
        }
        usuarios.push(usuarioNuevo)
        juegos.nombre = nombre
        juegos.contraseña = contraseña
        juegos.partidas = usuarioNuevo.partidas
        juegos.ganadas = usuarioNuevo.ganadas
        juegos.perdidas = usuarioNuevo.perdidas
        alert("Se te creo una cuenta nueva!")
        juego()
    }
}

let modificarUsuario = (bool) => {
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].nombre == juegos.nombre){
            usuarios[i].ultimaVez = new Date()
            if(bool){
                usuarios[i].ganadas++
            }else{
                usuarios[i].perdidas++
            }
            if(j == 5){
                usuarios[i].partidas++
                j = 0
            }
            j++
        }
    }
}

function mejoresPuntajes(n) {
    usuarios.sort((a, b) => b.ganadas - a.ganadas);
    return usuarios.slice(0, n);
}

function mostrarLista(){
    let lista = mejoresPuntajes(10)
    for (let i = 0; i < lista.length; i++) {
        console.log([i+1]+" "+lista[i].nombre+" "+lista[i].ganadas);
    }
}

logueo()