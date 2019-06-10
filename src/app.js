const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');
const cursos = require('./funciones-cursos');
const aspirantes = require('./funciones-aspirantes');

const directorioPublico = path.join(__dirname, '../public');
const directorioPartials = path.join(__dirname, '../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Pagina de cursos'
    });
});

app.get('/coordinador', (req, res) => {
    res.render('coordinador', {
        titulo: 'Administracion de cursos'
    });
});

app.get('/coordinador/crear-curso', (req, res) => {
    res.render('crear-curso', {
        titulo: 'Creacion de curso'
    });
});

// OPERACIONES COORDINADOR
app.post('/coordinador/operaciones/crear', (req, res) => {
    if (mensaje = cursos.crear(req.body) == true) {
        mensaje = 'El curso ' + req.body.nombre + ' fue creado';
    } else {
        mensaje = 'El curso ' + req.body.nombre + ' ya existe';
    }
    res.render('listado-cursos-coordinador', {
        mensaje: mensaje
    });
});

app.get('/coordinador/operaciones/eliminar-inscripcion', (req, res) => {
    idCurso = req.query.idCurso;
    id = req.query.id;
    eliminar = aspirantes.eliminarCurso(id, idCurso);
    console.log(eliminar);
    if (eliminar == true) {
        mensaje_eliminar = 'Eliminacion de inscripcion realizada';
    } else
        mensaje_eliminar = 'Eliminacion de inscripcion no se pudo realizar';
    res.render('resultado-eliminar-inscripcion', {
        mensaje_eliminar: mensaje_eliminar
    });
});

app.get('/coordinador/listado-cursos', (req, res) => {
    mensaje = '';
    if (typeof req.query.idCurso !== 'undefined') {
        // se ejecutan estas instrucciones
        estado = cursos.cambiaEstado(req.query.idCurso, req.query.cambiaEstado);
        mensaje = 'Curso con ID ' + req.query.idCurso + ' cambio a estado ' + estado;
    }
    res.render('listado-cursos-coordinador', {
        mensaje: mensaje
    });
});

app.get('/coordinador/ver-inscritos-curso', (req, res) => {
    idCurso = req.query.idCurso;
    curso = cursos.buscar(idCurso);
    res.render('listado-inscritos-curso-coordinador', {
        idCurso: idCurso,
        curso: curso
    });
});

app.get('/coordinador/eliminar-inscripcion', (req, res) => {
    res.render('listado-inscritos-coordinador');
});

//OPERACIONES INTERESADO
app.get('/interesado', (req, res) => {
    res.render('interesado');
});

app.get('/interesado/listado-cursos', (req, res) => {
    res.render('listado-cursos-interesado');
});

app.get('/interesado/ver-curso', (req, res) => {
    res.render('ver-curso-interesado', {
        id: req.query.id
    });
});

//OPERACIONES ASPIRANTE
app.get('/aspirante', (req, res) => {
    res.render('aspirante');
});

app.get('/aspirante/listado-cursos', (req, res) => {
    res.render('listado-cursos-aspirante');
});

app.get('/aspirante/inscribir-curso', (req, res) => {
    res.render('inscribir-curso-aspirante', {
        id: req.query.id
    });
});

app.post('/aspirante/operaciones/inscribir-curso', (req, res) => {
    idCurso = req.body.idCurso;
    aspirante = {
        id: req.body.id,
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
    };
    aspirante_out = aspirantes.crear(aspirante);
    inscripcion = aspirantes.inscribirCurso(aspirante, idCurso);
    if (aspirante_out == false) {
        mensaje_aspirante = 'Aspirante ya estaba creado';
    } else
        mensaje_aspirante = 'Aspirante creado';
    if (inscripcion == true) {
        mensaje_inscripcion = 'Inscripcion realizada';
    } else
        mensaje_inscripcion = 'Aspirante ya estaba Inscrito';
    res.render('resultado-inscribir-curso-aspirante', {
        mensaje_aspirante: mensaje_aspirante,
        mensaje_inscripcion: mensaje_inscripcion
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        estudiante: 'pagina no existe'
    });
});

app.listen(3000, () => {
    console.log('Escuchando por el puerto 3000');
});