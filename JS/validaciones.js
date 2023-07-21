export function valida(input){
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ''
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


const mensajesDeError ={
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido" ,
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número telefonico no puede estar vacio",
        patternMismatch: "El formato requirido es XXXXXXXXXX 10 números",
    },
    direccion:{
        valueMissing: "El campo dirección no puede estar vacio",
        patternMismatch: "El campo dirección debe contener entre 10 a 40 caracteres.",    
    },
    ciudad:{
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "El campo ciudad debe contener entre 10 a 40 caracteres.",    
    },
    estado:{
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El campo estado debe contener entre 10 a 40 caracteres.",    
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tiposDeErrores.forEach( error => {
        if(input.validity[error]){
            // console.log(tipoDeInput, error);
            // console.log(input.validity[error]);
            // console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje ="Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFecha <= fechaActual
}
