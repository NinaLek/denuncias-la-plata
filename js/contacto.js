
function registrate(){
let email = prompt("Ingresá tu email para estar conocer los últimos eventos:");

if ((email.indexOf('@') != -1)&&(email.indexOf('.com') != -1)){
    alert('Se ha registrado el mail: ' + email + ' correctamente');
    console.log("El email "+ email + "ha sido registrado exitosamente")
}else{
    alert('El email ingresado no es válido. Intentelo nuevamente')
}
}
/* Chequeando uno por uno
 if (email.indexOf('@') != -1){
    alert('puse @')
}else{
    alert('no puse @')
}
if(email.indexOf('.com') != -1){
    alert('puse .com')
}else{
    alert('no puse .com')
}
 */

function MensajeEnviado(){
    if ((document.getElementById('mensaje').value != "")&&(document.getElementById('email').value != "")&&(document.getElementById('apellido').value != "") ){
        alert('Su mensaje ha sido enviado exitosamente');
    }

}