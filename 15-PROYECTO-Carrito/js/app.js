// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas cursos precionando agreagar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Cuando borras cursos
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        console.log('vaciando carrito...');
        articulosCarrito =[]; // reset el arreglo

        limpiarHTML(); //eliminamos html

    })
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
    
}
//Eliminar
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
       
        const cursoId = e.target.getAttribute('data-id');
        //console.log(cursoId);

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //console.log(articulosCarrito);
        carritoHTML();
    }
}

function leerDatosCurso(curso) {
   

    //Crear objeto con los datos del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Revisar si ya existe y sumar otro si ocupara
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
        //Actualizamos cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }
    else{
        //Agregaa elementos al carrito
        articulosCarrito=[...articulosCarrito, infoCurso];
    }
    
    

    carritoHTML();


}


//Muestra infoCurso en el carrito
function carritoHTML(){
    limpiarHTML();




    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width ="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> 
            </td>
        `;
        //Agrega el HTML al carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}


function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}