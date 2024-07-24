<h1 class="nombre-pagina">Crear nueva cita</h1>
<p class="descripcion-pagina text-center">Elige los servicios</p>

<div class="app">

    <nav class="tabs">
        <button type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>

    <div class="seccion" id="paso-1">
        <h2>Selecciona tus servicios</h2>
        <p class="text-center" >Elige tus servicios a continuación</p>
        <div class="listado-servicios" id="servicios"></div>
    </div>


    <div class="seccion" id="paso-2">
        <h2>Tus datos y cita</h2>
        <p class="text-center">Elige tu cita y rellena tus datos</p>
        <form action="" class="formularios">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre" name="nombre" value="<?php echo $nombre; ?>" disabled>
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha">
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora">
            </div>
        </form>
    </div>


    <div class="seccion" id="paso-3">
        <h2>Resumen de tu cita</h2>
        <p class="text-center">Revisa que la información sea correcta</p>
    </div>


    <div class="paginacion">
        <button id="anterior" class="boton">
            &laquo; Anterior
        </button>
        <button id="siguiente" class="boton">
            Siguiente &raquo;
        </button>
    </div>
</div>

<?php $script = "

    <script src='build/js/app.js'></script>

" ?>