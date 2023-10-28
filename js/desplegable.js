/////botón menú barra de navegación responsive
//const btnCat = document.querySelector('.btn-menu-desplegable-hamburguesa');
const btnCat = document.querySelector('#boton-impostor');

const menuOculto = document.querySelector('#menuOculto');

btnCat.addEventListener('click', ()=>{
    document.querySelector('#menuOculto').classList.toggle("menuOculto");
    
});