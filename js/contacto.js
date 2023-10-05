let envio = document.querySelector('#registro');

envio.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (validarNombre() && validarApellido() && validarEmail() && validarMensaje()){
        alert('Su mensaje ha sido enviado exitosamente');
        return true;
    }else{
        alert('El mensaje no ha sido enviado. Verifique los campos');
        return false;
    }
})


//funciones para validar nombre y apellido 

function validarNombre(e){
    const nombre = document.getElementById('nombre').value;
    //e.preventDefault();
    const caracteresValidos = /^[ a-zA-ZñÑáéíóúüçÁÉÍÓÚÜÇ]+$/;
    if (nombre != '' && nombre != null && caracteresValidos.test(nombre)){
        colorValorValido('#nombre');
        
        return true;
    }else{
        colorValorInvalido('#nombre');
        return false;
    }
}

function validarApellido(e){
    const apellido = document.getElementById('apellido').value;
   // e.preventDefault();
    const caracteresValidos = /^[ a-zA-ZñÑáéíóúüçÁÉÍÓÚÜÇ]+$/;
    if (apellido != '' && apellido != null && caracteresValidos.test(apellido)){
        colorValorValido('#apellido');
        
        return true;
    }else{
        colorValorInvalido('#apellido');
        return false;
    }
}

//función para validar email

function validarEmail(e){
    // e.preventDefault();
     const email = document.getElementById('email').value;
     const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
     if (email != '' && email != null && emailValido.test(email)){
         colorValorValido('#email');
         return true;
     }else{
         colorValorInvalido('#email');
         return false;
     }
     
 }
 //validar mensaje
function validarMensaje(){
    let msj = document.getElementById('mensaje').value;
    if (msj != '' && msj != null && msj.length>10){
        colorValorValido('#mensaje');
        return true;
    }else{
        colorValorInvalido('#mensaje');
        return false;
    }

}

//agregandole y sacandole las clases para los colores de campo
// version simplificada?
function colorValorValido(elemento){
    document.querySelector(elemento).classList.add("valida");
    document.querySelector(elemento).classList.remove("invalido");
}
function colorValorInvalido(elemento){
    document.querySelector(elemento).classList.add("invalido");
    document.querySelector(elemento).classList.remove("valida");  
}



document.querySelector('#email').addEventListener('blur', validarEmail);
document.querySelector('#nombre').addEventListener('blur', validarNombre);
document.querySelector('#apellido').addEventListener('blur', validarApellido);
document.querySelector('#mensaje').addEventListener('blur', validarMensaje);

//botón suscribite- La idea es mejorar el código para que no se repita tanto, y hacerlo más eficientes con todo lo que hemos visto. Pero voy de a poco

const btnSuscribite = document.getElementById('btn-suscribite');

function Usuario(nombre, apellido, email){
    this.nombre= nombre,
    this.email = email,
    this.apellido =apellido
}

let usuarios = [];

btnSuscribite.addEventListener('click', (e)=>{

    let emailsusc = prompt('Ingresá tu mail para recibir nuestras novedades');
    const emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const caracteresValidos = /^[ a-zA-ZñÑáéíóúüçÁÉÍÓÚÜÇ]+$/;
    
    if (emailsusc != '' && emailsusc != null && emailValido.test(emailsusc)){
        let nombsusc= prompt('Ingresá tu nombre');
        if (nombsusc != '' && nombsusc != null && caracteresValidos.test(nombsusc)){
            let apesusc= prompt('Ingresá tu apellido');
            if (apesusc != '' && apesusc != null && caracteresValidos.test(apesusc)){
                let usuario= new Usuario(nombsusc,apesusc,emailsusc);//instancio un nuevo usuario
                usuarios.push(usuario);//se lo mando al arreglo de usuarios
                let usuariosJSON= JSON.stringify(usuarios);
                localStorage.setItem('usuarios',usuariosJSON);//se supone que acá se mandó al local storage
                alert('Felicidades, ' + nombsusc + ' ' + apesusc + ' ya estás registrada en nuestra base de datos');
                return true; 
            }
        }
    }
    else{

        alert('Ha ocurrido un error. Por favor revise sus datos');
    }

})

// chequeando que el local storage ande
console.log(localStorage.getItem('usuarios'));// muestra el ingresado antes de la recarga