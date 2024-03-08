const socket = io()

//DOM elements
let usuario = document.getElementById('usuario');
let mensaje = document.getElementById('mensaje');
let actions = document.getElementById('actions');
let btn = document.getElementById('send');
let btno = document.getElementById('seno');
let output = document.getElementById('output');

document.getElementById('dino').addEventListener('click', cambiarModo);

let modoOscuro = true; // Inicia en modo oscuro

document.getElementById('dino').addEventListener('click', cambiarModo);

function cambiarModo() {
    var boton = document.getElementById('dino');

    // Definir las rutas de las imágenes SVG
    var modoOscuroSrc = 'url("imagenes/DarkBackground.svg")';
    var modoLuzSrc = 'url("imagenes/LighBackground.svg")';

    // Cambiar el fondo del botón y del body basado en el modo actual
    if (modoOscuro) {
        boton.style.backgroundImage = modoLuzSrc;
        document.body.style.backgroundImage = modoLuzSrc;
    } else {
        boton.style.backgroundImage = modoOscuroSrc;
        document.body.style.backgroundImage = modoOscuroSrc;
    }

    // Cambiar el estado del modo
    modoOscuro = !modoOscuro;
}

/*Desplegar ventana de emojis*/ 
document.getElementById('emojiss').addEventListener('click', function(){
    // Obtener el elemento con la clase container_emojis
    let emojiContainer = document.querySelector('.container_emojis');

    // Alternar la visibilidad usando la propiedad display
    if (emojiContainer.style.display === 'grid') {
        emojiContainer.style.display = 'none'; // Si está visible, ocultarlo
    } else {
        emojiContainer.style.display = 'grid'; // Si está oculto, mostrarlo
    }
});

/*Anexar emojis a nuestro input*/
let emojis = document.querySelectorAll('.container_emojis span');
    emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
        mensaje.value += emoji.innerHTML;
    });
});

//enviar chat al servidor Conexion A
btn.addEventListener('click', function(){
    socket.emit('chat:mensaje', {           //enviar al servior los datos
        usuario: usuario.value,
        mensaje: mensaje.value
    })
    mensaje.value = "";
});
//mostrar que escribo conexion C
mensaje.addEventListener('keypress', function(){
    console.log(usuario.value);
    socket.emit('chat:typing', usuario.value)
})


//recibir chat del servidor ConexionB
socket.on('chat:mensaje', function(data){
    actions.innerHTML ='';
    output.innerHTML += `<p class="col-12 text-break text-secondary">
        <strong>${data.usuario}</strong>: ${data.mensaje}
    </p>`
});

//ver quienes escriben Conexion D
socket.on('chat:typing', function (data){
    actions.innerHTML = `<p><em>${data} esta escribiendo.</em></p>`
});