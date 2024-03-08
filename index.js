const path = require('path');
const express = require('express');
const app = express();

//ajustes
app.set('port', process.env.PORT || 3000); //permitira ajustar un puerto si trabajamos en la nuve o en local tomara por deafult el puerto 3000

//archivos estaticos del front-end
app.use(express.static(path.join(__dirname,'public'))) //accedemos a la direccion mediante el path para poder acceder a nuestro front en la carpeta public

//nomas dice que el servidor ta activo
console.log('Status: Server Online');

//al iniciar el servidor nos permitira ver que puerto tiene asignado y se asigna a una variable para poder usar el socket io
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

//instanciamos los sockets y configurar los sockets
const SocketIO = require('socket.io'); //necesita un servidor para trabajar
const io = SocketIO(server);

//web sockets
io.on('connection',(socket)=>{
    console.log('new conection', socket.id);

    //recibir datos del ciente Conexion A
    socket.on('chat:mensaje',(data)=>{
        //enviar datos a todos los clientes ConexionB
        io.sockets.emit('chat:mensaje', data);
    })

    socket.on('chat:typing',(data) =>{ //recibir la funcion de escribir  conexion C
        socket.broadcast.emit('chat:typing',data);//mandar el typing a todos menos a mi
    })
});



