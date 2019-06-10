const fs = require('fs');
const create_dir = './json';
const read_dir = '../json';
const create_archivo_aspirantes = create_dir + '/listadoAspirantes.json';
const read_archivo_aspirantes = read_dir + '/listadoAspirantes.json';

listaAspirantes = [];

const crear = (aspirante) => {
    listar();
    let duplicado = listaAspirantes.find(cur => cur.id == aspirante.id);
    if (!duplicado) {
        aspirante.cursos = [];
        listaAspirantes.push(aspirante);
        guardar();
        return true;
    } else {
        return false;
    }
}

const listar = () => {
    try {
        listaAspirantes = require(read_archivo_aspirantes);
    } catch (err) {
        listaAspirantes = [];
    }
    return listaAspirantes;
}

const guardar = () => {
    let datos = JSON.stringify(listaAspirantes);
    if (!fs.existsSync(create_dir)) {
        fs.mkdirSync(create_dir);
    }
    fs.writeFile(create_archivo_aspirantes, datos, (err) => {
        if (err) throw (err);
        console.log('Archivo de aspirantes creado con exito');
    });
}

const buscar = (id) => {
    listar();
    if (aspirante = listaAspirantes.find(cur => cur.id == id)) {
        return aspirante;
    } else
        return false;
}

const listarAspirantesCurso = (idCurso) => {
    listar();
    aspirantesCurso = [];
    listaAspirantes.forEach(aspirante => {
        listaCursos = aspirante.cursos;
        if (listaCursos.find(id_cur => id_cur == idCurso)) {
            aspirantesCurso.push(aspirante);
        }
    });
    return aspirantesCurso;
}

const listarCursosAspirante = (id) => {
    aspirante = buscar(id);
    if (aspirante) {
        return aspirante.cursos;
    } else
        return false;
}

const eliminarCurso = (id, idCurso) => {
    listar();
    if (aspirante = listaAspirantes.find(cur => cur.id == id)) {
        listaCursos = aspirante.cursos;
        out = false;
        console.log(listaCursos);
        listaCursos.forEach((curso, index) => {
            if (curso == idCurso) {
                listaCursos.splice(index, 1);
                console.log(listaCursos);
                guardar();
                out = true;
            }
        });
        return out;
    } else
        return false;
}

const inscribirCurso = (aspirante, idCurso) => {
    listar();
    listaCursos = listarCursosAspirante(aspirante.id);
    let duplicado = listaCursos.find(id_cur => id_cur == idCurso);
    if (!duplicado) {
        listaCursos.push(idCurso);
        guardar();
        return true;
    } else
        return false;
}

const buscarCurso = (id, idCurso) => {
    listar();
    if (aspirante = listaAspirantes.find(cur => cur.id == id)) {
        console.log(aspirante);
        listaCursos = aspirante.cursos;
        console.log(listaCursos);
        listaCursos.forEach((curso, index) => {
            if (curso == idCurso) {
                return true;
            }
        });
        return false;
    } else
        return false;
}

module.exports = {
    guardar,
    crear,
    listar,
    buscar,
    buscarCurso,
    inscribirCurso,
    listarAspirantesCurso,
    eliminarCurso
};