// 2. Declarar un arreglo para almacenar los datos
const mascotas = [];

// Obtener elementos del DOM
const mascotaForm = document.getElementById('mascotaForm');
const listaMascotas = document.getElementById('listaMascotas');
const totalMascotasSpan = document.getElementById('totalMascotas');
const vacunadasSpan = document.getElementById('vacunadas');
const noVacunadasSpan = document.getElementById('noVacunadas');

// Función para renderizar la lista y las estadísticas
function renderizarMascotas() {
    // 3. Mostrar un listado actualizado en pantalla con todas las mascotas
    // Limpiar el contenido actual para evitar duplicados
    listaMascotas.innerHTML = '';

    mascotas.forEach((mascota, index) => { // Se agregó el 'index' para el botón de eliminar
        const listItem = document.createElement('li');
        listItem.classList.add('mascota-item');
        listItem.innerHTML = `
            <p><strong>Nombre:</strong> ${mascota.nombre}</p>
            <p><strong>Tipo:</strong> ${mascota.tipo}</p>
            <p><strong>Edad:</strong> ${mascota.edad} años</p>
            <p><strong>Dueño:</strong> ${mascota.duenio}</p>
            <p><strong>Vacunada:</strong> ${mascota.vacunada ? 'Sí ✅' : 'No ❌'}</p>
            <p><strong>Precio:</strong> $${mascota.precio}</p> 
        `;

        // Crear y añadir el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        // Asignar el índice de la mascota como un atributo 'data-index'
        deleteButton.setAttribute('data-index', index);

        // Añadir el 'event listener' para la acción de eliminar
        deleteButton.addEventListener('click', function (event) {
            // Obtener el índice de la mascota a eliminar del atributo 'data-index'
            const indexToDelete = parseInt(event.target.getAttribute('data-index'));
            // Llamar a la función para eliminar la mascota
            eliminarMascota(indexToDelete);
        });

        // Agregar el botón al elemento de la lista
        listItem.appendChild(deleteButton);
        listaMascotas.appendChild(listItem);
    });

    // 4. Actualizar las estadísticas
    const totalVacunadas = mascotas.filter(mascota => mascota.vacunada).length;
    const totalNoVacunadas = mascotas.length - totalVacunadas;

    totalMascotasSpan.textContent = mascotas.length;
    vacunadasSpan.textContent = totalVacunadas;
    noVacunadasSpan.textContent = totalNoVacunadas;
}

// Función para eliminar una mascota por su índice
function eliminarMascota(index) {
    // Elimina 1 elemento del array 'mascotas' en la posición 'index'
    mascotas.splice(index, 1);
    // Vuelve a renderizar la lista y las estadísticas
    renderizarMascotas();
}

// Escuchar el evento de envío del formulario
mascotaForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que la página se recargue

    // Crear un objeto con los datos del formulario
    const nuevaMascota = {
        nombre: document.getElementById('nombre').value,
        tipo: document.getElementById('tipo').value,
        edad: parseInt(document.getElementById('edad').value),
        duenio: document.getElementById('dueno').value,
        vacunada: document.querySelector('input[name="vacunada"]:checked').value === 'true',
        precio: parseFloat(document.getElementById('precio').value) // Se agregó el precio
    };

    // Añadir el objeto al arreglo mascotas
    mascotas.push(nuevaMascota);

    // Renderizar la lista actualizada y las estadísticas
    renderizarMascotas();

    // Limpiar el formulario
    mascotaForm.reset();
});

// Llamar a la función de renderizado inicialmente para mostrar 0 en las estadísticas
renderizarMascotas();