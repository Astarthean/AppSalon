
let paso = 1
const pasoInicial = 1
const pasoFinal = 3

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})

function iniciarApp() {
    mostrarSeccion()
    tabs() //cambia la seccion cuando se presione en los tabs
    botonesPaginador() //cambia la seccion cuando se presione en los botones
    paginaSiguiente()
    paginaAnterior()

    consultarAPI(); //Consulta la API en el backend de PHP

    idCliente()
    nombreCliente()
    seleccionarFecha()
    seleccionarHora()

    mostrarResumen()
}

function mostrarSeccion() {
    //Ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar')
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar')
    }

    const pasoSelector = `#paso-${paso}`
    const seccion = document.querySelector(pasoSelector)
    seccion.classList.add('mostrar')

    //Quitar la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual')
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    //Resaltado del tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`)
    tab.classList.add('actual')
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button')
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            paso = parseInt(e.target.dataset.paso)
            mostrarSeccion()
            botonesPaginador()
        })
    })
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior')
    const paginaSiguiente = document.querySelector('#siguiente')

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar')
        mostrarResumen()
    } else {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    }

    mostrarSeccion()
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return
        paso--
        botonesPaginador()

    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return
        paso++
        botonesPaginador()

    })

}

async function consultarAPI() {
    try {
        const url = 'http://localhost:3000/api/servicios'
        const resultado = await fetch(url)
        const servicios = await resultado.json()
        mostrarServicios(servicios)

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio

        //Nombre
        const nombreServicio = document.createElement('p')
        nombreServicio.classList.add('nombre-servicio')
        nombreServicio.textContent = nombre

        //Precio
        const precioServicio = document.createElement('p')
        precioServicio.classList.add('precio-servicio')
        precioServicio.textContent = `${precio}€`

        //Crear el DIV que contenga estos servicios
        const servicioDiv = document.createElement('div')
        servicioDiv.classList.add('servicio')
        servicioDiv.dataset.idServicio = id
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        }

        servicioDiv.appendChild(nombreServicio)
        servicioDiv.appendChild(precioServicio)

        document.querySelector('#servicios').appendChild(servicioDiv)
    })
}

function seleccionarServicio(servicio) {
    const { id } = servicio
    const { servicios } = cita
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)

    //Comprobar si un servicio ya fue seleccionado
    if (servicios.some(agregado => agregado.id === id)) {
        //Eliminar el servicio
        cita.servicios = servicios.filter(agregado => agregado.id !== id)
        divServicio.classList.remove('seleccionado')
    } else {
        //Agregar el servicio
        cita.servicios = [...servicios, servicio] //L sintaxis ... lo que hace es recoger en memoria lo que ya tiene el array
        divServicio.classList.add('seleccionado')
    }
}

function idCliente() {
    cita.id = document.querySelector('#id').value
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha')

    inputFecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay()

        if ([0, 6].includes(dia)) {
            e.target.value = ''
            mostrarAlerta('Fines de semana no abrimos', 'error', '.formulario')
        } else {
            cita.fecha = e.target.value
        }
    })
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora')
    inputHora.addEventListener('input', function (e) {
        const horaCita = e.target.value
        const hora = horaCita.split(':')[0]
        if (hora < 10 || hora > 20) {
            e.target.value = ''
            mostrarAlerta('Hora no válida, abrimos a las 10:00 y cerramos a las 20:00', 'error', '.formulario')
        } else {
            cita.hora = e.target.value
        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    //Prevenir que se genere mas de una alerta
    const alertaPrevia = document.querySelector('.alerta')
    if (alertaPrevia) {
        alertaPrevia.remove()
    }

    const alerta = document.createElement('div')
    alerta.textContent = mensaje
    alerta.classList.add('alerta')
    alerta.classList.add(tipo)

    const referencia = document.querySelector(elemento)
    referencia.appendChild(alerta)

    if (desaparece) {
        setTimeout(() => {
            alerta.remove()
        }, 3000)
    }
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen')

    //Limpiar el contenido de resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild)
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Todos los campos son obligatorios', 'error', '.contenido-resumen', false)
        return
    }

    //Formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita

    //Headin para servicios en resumen
    const headingServicios = document.createElement('h3')
    headingServicios.textContent = 'Resumen de Servicios: '
    resumen.appendChild(headingServicios)

    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio
        const contenedorServicio = document.createElement('div')
        contenedorServicio.classList.add('contenedor-servicio')

        const textoServicio = document.createElement('p')
        textoServicio.textContent = nombre

        const precioServicio = document.createElement('p')
        precioServicio.innerHTML = `<span>Precio: </span>${precio}€`

        contenedorServicio.appendChild(textoServicio)
        contenedorServicio.appendChild(precioServicio)

        resumen.appendChild(contenedorServicio)
    })

    //Headin para cita en resumen
    const headingCita = document.createElement('h3')
    headingCita.textContent = 'Resumen de Cita: '
    resumen.appendChild(headingCita)

    const nombreCliente = document.createElement('p')
    nombreCliente.innerHTML = `<span>Nombre: </span>${nombre}`

    //Formatear la fecha
    const fechaObj = new Date(fecha)
    const mes = fechaObj.getMonth()
    const dia = fechaObj.getDate()
    const anno = fechaObj.getFullYear()

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaUTC = new Date(Date.UTC(anno, mes, dia))
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones)

    const fechaCita = document.createElement('p')
    fechaCita.innerHTML = `<span>Fecha: </span>${fechaFormateada}`

    const horaCita = document.createElement('p')
    horaCita.innerHTML = `<span>Hora: </span>${hora}`

    const botonReservar = document.createElement('button')
    botonReservar.textContent = 'Reservar Cita'
    botonReservar.classList.add('boton')
    botonReservar.onclick = reservarCita

    resumen.appendChild(nombreCliente)
    resumen.appendChild(fechaCita)
    resumen.appendChild(horaCita)
    resumen.appendChild(botonReservar)

}

async function reservarCita() {
    const { nombre, fecha, hora, servicios, id } = cita
    const idServicios = servicios.map(servicio => servicio.id)

    const datos = new FormData()
    datos.append('usuarioId', id)
    datos.append('fecha', fecha)
    datos.append('hora', hora)
    datos.append('servicios', idServicios)

    try {
        //Peticion hacia la API
        const url = 'http://localhost:3000/api/citas'

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        })

        const resultado = await respuesta.json()
        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu Cita fue creada correctamente"
            }).then(() => {
                window.location.reload()
            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita"
        });
    }
}