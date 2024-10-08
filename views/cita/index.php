<h1 class="nombre-pagina">Crear nueva cita</h1>

<div class="barra">
    <p>Hola: <?php echo $nombre ?? '' ;?></p>
    <a class="boton" href="/logout">Cerrar Sesión</a>
</div>

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
        <form action="" class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre" name="nombre" value="<?php echo $nombre; ?>" disabled>
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora">
            </div>

            <input type="hidden" id="id" value=" <?php echo $id; ?> ">
        </form>
    </div>

    <div class="seccion contenido-resumen" id="paso-3">
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
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script src='build/js/app.js'></script>

" ?>