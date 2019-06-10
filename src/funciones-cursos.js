const fs = require('fs');
const create_dir = './json';
const read_dir = '../json';
const create_archivo_cursos = create_dir + '/listadoCursos.json';
const read_archivo_cursos = read_dir + '/listadoCursos.json';

listaCursos = [];

const crear = (curso) => {
    listar();
    let duplicado = listaCursos.find(cur => cur.id == curso.id);
    if (!duplicado) {
        listaCursos.push(curso);
        guardar();
        return true;
    } else {
        return false;
    }
}

const listar = () => {
    try {
        listaCursos = require(read_archivo_cursos);
    } catch (err) {
        listaCursos = [];
    }
    return listaCursos;
}

const guardar = () => {
    let datos = JSON.stringify(listaCursos);
    if (!fs.existsSync(create_dir)) {
        fs.mkdirSync(create_dir);
    }
    fs.writeFile(create_archivo_cursos, datos, (err) => {
        if (err) throw (err);
        console.log('Archivo de cursos creado con exito');
    });
}

const cambiaEstado = (idCurso, cambiaEstado) => {
    curso = buscar(idCurso);
    console.log(idCurso);

    if (cambiaEstado == 'true') {
        curso.estado = 'disponible';
    } else {
        curso.estado = 'cerrado';
    }
    guardar();
    return curso.estado;
}

const buscar = (id) => {
    listar();
    if (curso = listaCursos.find(cur => cur.id == id)) {
        return curso;
    } else
        return false;
}

module.exports = {
    guardar,
    crear,
    listar,
    buscar,
    cambiaEstado
};