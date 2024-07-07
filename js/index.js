

document.addEventListener('DOMContentLoaded', function() {
    
    //Accion para el boton ENCRIPTAR
    const btn_encrip = document.getElementById('btn-encrip');
    btn_encrip.addEventListener('click', function() {
        borrarElementos('container-res');

        inputContenido = obtenerInfo("input-text");
        let valorTexto = validarTexto(inputContenido);
        if (valorTexto == true) {
            let datoEncriptado = encriptarTexto(inputContenido);
            agregarElemento('container-res',datoEncriptado);
        }
    });
    
    //Accion para el boton DESENCRIPTAR
    const btn_desencrip = document.getElementById('btn-desenc');
    btn_desencrip.addEventListener('click', function() {
        borrarElementos('container-res');
        inputContenido = obtenerInfo("input-text");
        let valorReinvertido = desencriptarTexto(inputContenido);
        agregarElemento('container-res',valorReinvertido);
    });

    // Accion para el boton COPIAR
    
    
});//FIN DE EVENT LISTENING

// Borrar Texto de input principal
function borrarTexto(elemento) {
    if (elemento.value === "Ingrese algún texto") {
        elemento.value = "";
    }
};

// Borrar elementos de un div especifico para mostrar resultado
function borrarElementos(idDiv){
    var div = document.getElementById(idDiv);
    while (div.firstChild){
        div.removeChild(div.firstChild);
    }
};

// Agregar elemento para visualizar respuesta
function agregarElemento(idDiv, valor) {
    var div = document.getElementById(idDiv);
    
    // Crear y agregar el h2
    var h2 = document.createElement("h2");
    h2.textContent = "Resultado:"; 
    h2.className = 'tituloValorFinal';
    div.appendChild(h2);
    
    // Crear y agregar el input
    var input = document.createElement("textarea");
    input.value = valor;
    // Definir las clases directamente
    var clases = ['valorFinal'];
    input.className = clases.join(' ');
    div.appendChild(input);

    // Crear button de copiar
    var btnCopiar = document.createElement("button");
    btnCopiar.textContent = "Copiar";
    btnCopiar.className = 'btn-copiar';
    div.appendChild(btnCopiar);

    //EVENTO DE BUTTON COPIAR
    btnCopiar.addEventListener('click', function() {
        // Seleccionar el texto del input
        input.select();
        input.setSelectionRange(0, 99999);

        // Copiar el texto al portapapeles
        navigator.clipboard.writeText(input.value)
            .then(() => {            
                btnCopiar.textContent = "¡Copiado!";
                setTimeout(() => {
                    btnCopiar.textContent = "Copiar";
                }, 2000); 
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    });
}

//Verificar si en el input principal contiene info
function obtenerInfo(idDiv) {
    var div = document.getElementById(idDiv);
    respuesta = div.value;
    return respuesta
}

// Verificar texto ingresado sea valido

function validarTexto(texto) {
    if (inputContenido != 'Ingrese algún texto') {
        return true
    } else {
        return false
    }
}

// Encriptar texto ingresado
function encriptarTexto(texto) {
    // Convierte el mensaje en un array de caracteres
    let array = texto.split('');
    // ciclo que desplaza 5 posiciones en la tabla ASCII
    for (let i = 0; i < array.length; i++) {
        array[i] = String.fromCharCode(array[i].charCodeAt(0) + 5);
    }
    let encriptado = array.join('');

    return encriptado;
}

//Desencriptar texto ingresado
function desencriptarTexto(textoEncriptado) {
    // Convierte el mensaje en un array de caracteres
    let array = textoEncriptado.split('');
    // ciclo que desplaza 5 posiciones hacia atrás en la tabla ASCII
    for (let i = 0; i < array.length; i++) {
        array[i] = String.fromCharCode(array[i].charCodeAt(0) - 5);
    }
    let desencriptado = array.join('');

    return desencriptado;
}

// Copiar resultado
async function copiarResultado(idInput) {
    const inputElement = document.getElementById(idInput);
    
    if (!inputElement) {
        console.error(`No se encontró el elemento con id: ${idInput}`);
        return;
    }

    const textoCopiado = inputElement.value.trim();

    if (!textoCopiado) {
        alert('No hay texto para copiar.');
        return;
    }

    try {
        await navigator.clipboard.writeText(textoCopiado);
        alert(`Texto copiado al portapapeles: ${textoCopiado}`);
    } catch (err) {
        console.error('Error al copiar el texto:', err);
        alert('No se pudo copiar el texto. Por favor, inténtalo de nuevo.');
    }
}