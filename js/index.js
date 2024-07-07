

document.addEventListener('DOMContentLoaded', function() {
    
});

function borrarTexto(elemento) {
    console.log(elemento.value);
    if (elemento.value === "Ingrese algún texto") {
        elemento.value = "";
    }
}