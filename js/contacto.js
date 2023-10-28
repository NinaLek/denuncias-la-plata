const envio = document.querySelector('#registro');
const limpiar = document.getElementById('btn-limpiar');
const emailv = document.querySelector('#email');
const motiv = document.querySelector('#motivoContacto');
const nombrev = document.querySelector('#nombre');
const apellidov = document.querySelector('#apellido');
const mensajev = document.querySelector('#mensaje');
const btnSuscribite = document.getElementById('btn-suscribite');
const mensajesEnviados = []; //arreglo para los mensajes
const usuarios = []; //arreglo para los suscriptores
const caracteresValidos = /^[ a-zA-ZñÑáéíóúüçÁÉÍÓÚÜÇ]+$/; //validación letras
const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;  //validación emails


envio.addEventListener('submit', (e)=>{ //al hacer click en el botón enviar
    e.preventDefault();                 // detenemos el envío hasta validar los datos
    if (validarNombre() && validarApellido() && validarEmail() && validarMensaje() && validarMotivo(e)){  //si todo es correcto se envia el formulario y se archiva en el local storage
        let mensajeActual = new Mensaje(nombre.value,apellido.value,email.value,mensaje.value, motivoContacto.value); //creamos un objeto mensaje el cual enviaremos al array antes de enviarlo al Local Storage
        mensajesEnviados.push(mensajeActual); //pusheamos el msj nuevo al array mensajeEnviados
        let mensajeJSON = JSON.stringify(mensajesEnviados); // convertimos el arreglo a formato JSON
        localStorage.setItem('mensajes',mensajeJSON); //enviamos el array en formato JSON al Local storage
            
        //recupera los datos del local storage y los convierte en un objeto mensajeRecuperado
        let mensajeRecuperado = JSON.parse(localStorage.getItem("mensajes"));//crea el objeto desde el local storage

        ///mostrar los datos ingresados
        let nomIngresado = mensajeRecuperado[mensajeRecuperado.length-1].nombre;
        let apeIngresado = mensajeRecuperado[mensajeRecuperado.length-1].apellido;
        let emailIngresado = mensajeRecuperado[mensajeRecuperado.length-1].email;
        let msjIngresado = mensajeRecuperado[mensajeRecuperado.length-1].mensaje;
        let motIngresado = mensajeRecuperado[mensajeRecuperado.length-1].motivo;
        //Se muestran los datos recuperados con el reemplazo del alert 'sweet alert' para que quede más lindo :D
        swal('Mensaje enviado exitosamente',`Nombre: ${nomIngresado} \n Apellido: ${apeIngresado} \n Email: ${emailIngresado} \n Motivo: ${motIngresado} \n Mensaje: ${msjIngresado}`, 'success' );
        return true;
    }else{
        // si falta completar algún dato o hubo algún dato inválido el formulario no se envía
        swal('Algo no salió como esperabamos', 'El mensaje no ha sido enviado. Verifique que todos los campos tengan datos válidos', 'error');
        return false;
    }
})


//funciones para validar nombre y apellido    - falta unirlas, me está costando

function validarNombre(){  //validamos que sólo acepten letras
    if (nombrev.value != '' && nombrev.value != null && caracteresValidos.test(nombrev.value)){
        colorValorValido(nombrev); //si el valor es correcto el borde del campo input es verde
        return true;
    }else{
        colorValorInvalido(nombrev);  //si el valor es incorrecto el borde del campo input es rojo
        return false;
    }
}

function validarApellido(){
    if (apellidov.value != '' && apellidov.value != null && caracteresValidos.test(apellidov.value)){
        colorValorValido(apellidov);
        return true;
    }else{
        colorValorInvalido(apellidov);
        return false;
    }
}


//función para validar email
function validarEmail(){
     if (emailv.value != '' && emailv.value != null && emailValido.test(emailv.value)){
         colorValorValido(emailv);
         return true;
     }else{
         colorValorInvalido(emailv);
         return false;
     }
 }

//funcion para validar el motivo
function validarMotivo(e){
    let motivo = e.target.value

    //comparo el valor del select contra 'motivo' ya que es el valor
    //default cuando no hay ningun motivo seleccionado

    if (motivo === 'motivo') {
        colorValorInvalido(motiv);
        return false
    } else {
        colorValorValido(motiv);
        return true
    }
}

 //validar mensaje
function validarMensaje(){ // se valida que al menos el mensaje sea de 10 caracteres
    if (mensajev.value != '' && mensajev.value != null && mensajev.value.length>10){
        colorValorValido(mensajev);
        return true;
    }else{
        colorValorInvalido(mensajev);
        return false;
    }

}

//agregandole y sacandole las clases para los colores de campo

function colorValorValido(elemento){ //agregando y quitando colores de validación a los inputs
    elemento.classList.remove("limpio");
    elemento.classList.add("valida");
    elemento.classList.remove("invalido");
}

function colorValorInvalido(elemento){
    elemento.classList.remove("limpio");
    elemento.classList.add("invalido");
    elemento.classList.remove("valida");  
}


//Validar con blur
emailv.addEventListener('blur', validarEmail);
motiv.addEventListener('blur', validarMotivo);
nombrev.addEventListener('blur', validarNombre);
apellidov.addEventListener('blur', validarApellido);
mensajev.addEventListener('blur', validarMensaje);


/////////// Acá arrancamos con los usuarios que se suscriban//////////////////

function Usuario(nombre, apellido, email){
    this.nombre= nombre,
    this.email = email,
    this.apellido =apellido
}

btnSuscribite.addEventListener('click', (e)=>{
   
    let emailsusc = prompt('Ingresá tu mail para recibir nuestras novedades');
    let nuevoUsuario = true;
   
    if(emailsusc != '' && emailsusc != null && emailValido.test(emailsusc)){ //capturamos el email ingresado por el prompt
        //revisa la base de usuarios

        if(usuarios.length > 0){ //si tiene algo el array de usuarios guardados lo revisamos
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
            console.log('cantidad de usuarios guardados' + usuariosGuardados.length);
            for(var i=0; i<usuariosGuardados.length;i++){
                if(usuariosGuardados[i].email == emailsusc){  //si el mail guardado en esa posición es igual al ingresado
                    nuevoUsuario = false; //ya no es un usuario nuevo, se le comunica los datos ingresados en pantalla
                    swal('Momento!', 'Este email ha sido registrado anteriormente, chequeá los datos ingresados', 'error');
                    let msjPantalla = `Datos registrados: <br>Nombre: ${usuariosGuardados[i].nombre} <br> Apellido: ${usuariosGuardados[i].apellido} <br> Email: ${usuariosGuardados[i].email}`
                    document.querySelector('#ventana-ingresados').innerHTML= msjPantalla;
                }
                if(!nuevoUsuario){//corta cuando encuentre una coincidencia
                    break;
                }
            }
        }
        if(usuarios == null || nuevoUsuario){  //si no habia usuarios o no estaba registrado el mail agrega otro
            //si el array estaba vacío o si no lo encuentra sigue para ingresar un usuario nuevo
            let nombsusc= prompt('Ingresá tu nombre');
            if (nombsusc != '' && nombsusc != null && caracteresValidos.test(nombsusc)){ //valida el nombre ingresado
                let apesusc= prompt('Ingresá tu apellido');
                if (apesusc != '' && apesusc != null && caracteresValidos.test(apesusc)){  //valida el apellido ingresado
                    let usuario= new Usuario(nombsusc,apesusc,emailsusc);//instancio un nuevo objeto usuario
                    usuarios.push(usuario);//se lo mando al arreglo de usuarios
                    let usuariosJSON= JSON.stringify(usuarios);// se convierte a formato JSON
                    localStorage.setItem('usuarios',usuariosJSON);//se manda al local storage
                //mostrando los datos desde la pagina y no el local storage
                swal('¡Felicitaciones!',`${nombsusc} ${apesusc} ya estás registrada/o en nuestra base de datos!`,'success');
                let msjPantalla= `Datos registrados: <br>Nombre: ${nombsusc} <br> Apellido: ${apesusc} <br> Email: ${emailsusc}`;
                document.querySelector('#ventana-ingresados').innerHTML= msjPantalla;
               return true; 
                }
            }
        }
    }else{ //si se ingresa un email no válido
        swal('Ha ocurrido un error', 'Por favor revise sus datos','error');
        return false;
    }
});
  
//localstorage para los mensajes
//objeto mensaje

class Mensaje {
    constructor(nombre, apellido, email, mensaje, motivo) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.email = email,
        this.mensaje = mensaje,
        this.motivo = motivo;
    }
}



limpiar.addEventListener('click', ()=>{   //botón para limpiar tanto los campos del formulario como la pantalla de los datos ingresados
    document.querySelector('#ventana-ingresados').innerHTML='';   
    const  inputs = [emailv, nombrev, apellidov, mensajev, motiv];
    inputs.forEach( function(element){
        element.classList.add('limpio');
    });
})