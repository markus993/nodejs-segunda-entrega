const hbs = require('hbs');
const cursos = require('./funciones-cursos');
const aspirantes = require('./funciones-aspirantes');

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
})

hbs.registerHelper('listado-cursos-coordinador', () => {
    listaCursos = cursos.listar();

    var tableData = '';
    listaCursos.forEach(curso => {
        if (curso.estado == 'disponible') {
            label_estado = 'Cerrar';
            cambia_estado = false;
        } else {
            label_estado = 'Abrir';
            cambia_estado = true;
        }
        tableData = tableData +
            '<tr>' +
            '<td>' + curso.id + '</td>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.intensidad + '</td>' +
            '<td>' + curso.estado + '</td>' +
            '<td><a href="/coordinador/listado-cursos?idCurso=' + curso.id + '&cambiaEstado=' + cambia_estado + '">' + label_estado + ' curso</a></td>' +
            '<td><a href="/coordinador/ver-inscritos-curso?idCurso=' + curso.id + '">Ver inscritos</a></td>' +
            '<tr>';
    });
    let table =
        '<table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Descripcion</th>\
                <th>Valor</th>\
                <th>Modalidad</th>\
                <th>Intensidad</th>\
                <th>Estado</th>\
                <th>Cambiar estado</th>\
                <th>Inscritos</th>\
            </thead>\
            <tbody>' +
        tableData +
        '</tbody>\
        </table>';
    return table;
});

hbs.registerHelper('listado-inscritos-curso-coordinador', (idCurso) => {
    aspirantesCurso = aspirantes.listarAspirantesCurso(idCurso);
    var tableData = '';
    aspirantesCurso.forEach(aspiranteCurso => {
        tableData = tableData +
            '<tr>' +
            '<td>' + aspiranteCurso.id + '</td>' +
            '<td>' + aspiranteCurso.nombre + '</td>' +
            '<td>' + aspiranteCurso.telefono + '</td>' +
            '<td>' + aspiranteCurso.email + '</td>' +
            '<tr>';
    });
    let table =
        '<table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Telefono</th>\
                <th>Correo Electronico</th>\
            </thead>\
            <tbody>' +
        tableData +
        '</tbody>\
        </table>';
    return table;
});

hbs.registerHelper('listado-inscritos-coordinador', () => {
    listaCursos = cursos.listar();
    tables = '';
    listaCursos.forEach(curso => {
        aspirantesCurso = aspirantes.listarAspirantesCurso(curso.id);
        var tableData = '';
        aspirantesCurso.forEach(aspiranteCurso => {
            tableData = tableData +
                '<tr>' +
                '<td>' + aspiranteCurso.id + '</td>' +
                '<td>' + aspiranteCurso.nombre + '</td>' +
                '<td>' + aspiranteCurso.telefono + '</td>' +
                '<td>' + aspiranteCurso.email + '</td>' +
                '<td><a href="/coordinador/operaciones/eliminar-inscripcion?id=' + aspiranteCurso.id + '&idCurso=' + curso.id + '">Eliminar</a></td>' +
                '<tr>';
        });
        let table =
            '<h3>' + curso.nombre + '</h3>\
            <table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Telefono</th>\
                <th>Correo Electronico</th>\
                <th>Eliminar inscripcion</th>\
            </thead>\
            <tbody>' +
            tableData +
            '</tbody>\
        </table><br>';

        tables = tables + table
    });


    return tables;
});

hbs.registerHelper('listado-cursos-interesado', () => {
    listaCursos = cursos.listar();

    var tableData = '';
    listaCursos.forEach(curso => {
        if (curso.estado == 'disponible') {
            tableData = tableData +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td><a href="/interesado/ver-curso?id=' + curso.id + '">Ver mas</a></td>' +
                '<tr>';
        }
    });
    let table =
        '<table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Descripcion</th>\
                <th>Valor</th>\
                <th>Mas</th>\
            </thead>\
            <tbody>' +
        tableData +
        '</tbody>\
        </table>';
    return table;
});

hbs.registerHelper('ver-curso-interesado', (id) => {
    curso = cursos.buscar(id);

    tableData =
        '<tr>' +
        '<td>' + curso.id + '</td>' +
        '<td>' + curso.nombre + '</td>' +
        '<td>' + curso.descripcion + '</td>' +
        '<td>' + curso.valor + '</td>' +
        '<td>' + curso.modalidad + '</td>' +
        '<td>' + curso.intensidad + '</td>' +
        '<td>' + curso.estado + '</td>' +
        '<tr>';

    let table =
        '<table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Descripcion</th>\
                <th>Valor</th>\
                <th>Modalidad</th>\
                <th>Intensidad</th>\
                <th>Estado</th>\
            </thead>\
            <tbody>' +
        tableData +
        '</tbody>\
        </table>';
    return table;
});


hbs.registerHelper('listado-cursos-aspirante', () => {
    listaCursos = cursos.listar();

    var tableData = '';
    listaCursos.forEach(curso => {
        if (curso.estado == 'disponible') {
            tableData = tableData +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td><a href="/aspirante/inscribir-curso?id=' + curso.id + '">inscribirme</a></td>' +
                '<tr>';
        }
    });
    let table =
        '<table>\
            <thead>\
                <th>Id</th>\
                <th>Nombre</th>\
                <th>Descripcion</th>\
                <th>Valor</th>\
                <th>Inscripcion</th>\
            </thead>\
            <tbody>' +
        tableData +
        '</tbody>\
        </table>';
    return table;
});