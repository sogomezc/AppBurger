document.addEventListener('DOMContentLoaded', () => {

    // --- GUARDIA DE ACCESO ---
    // 1. Revisa si el usuario ha iniciado sesión.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 2. Si no ha iniciado sesión, lo redirige a la página de login y detiene el script.
    if (!isLoggedIn) {
        window.location.href = '/login.html';
        return; 
    }
    // --- CAPTURA DE ELEMENTOS DEL FORMULARIO ---
    const profileForm = document.getElementById('profileForm');
    const nombreInput = document.getElementById('profile-nombre');
    const apellidosInput = document.getElementById('profile-apellidos');
    const emailInput = document.getElementById('profile-email');
    const runInput = document.getElementById('profile-run');
    const fechaNacimientoInput = document.getElementById('profile-fechaNacimiento');
    const direccionInput = document.getElementById('profile-direccion');
    const feedbackDiv = document.getElementById('profile-feedback');

    // --- CARGAR DATOS DEL USUARIO ---
    // 3. Obtenemos el email del usuario que inició sesión para identificarlo.
    // Usaremos el nombre por ahora, ya que es lo que guardamos en el login.
    const loggedInUserName = localStorage.getItem('userName');
    
    // 4. Traemos la lista completa de usuarios desde localStorage.
    let allUsers = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 5. Buscamos el objeto completo del usuario actual en esa lista.
    const currentUser = allUsers.find(user => user.nombre === loggedInUserName);

    // 6. Si encontramos al usuario, llenamos el formulario con sus datos.
    if (currentUser) {
        nombreInput.value = currentUser.nombre;
        emailInput.value = currentUser.email; // El email no se puede editar.
        
        // Para los campos nuevos, usamos || '' para que muestre un campo vacío si aún no existen.
        apellidosInput.value = currentUser.apellidos || '';
        runInput.value = currentUser.run || '';
        fechaNacimientoInput.value = currentUser.fechaNacimiento || '';
        direccionInput.value = currentUser.direccion || '';
    }

// --- GUARDAR CAMBIOS (dentro de tu addEventListener 'DOMContentLoaded') ---
profileForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue.

    // 1. OBTENEMOS Y LIMPIAMOS LOS VALORES DEL FORMULARIO
    // .trim() elimina espacios en blanco al inicio y al final
    const nombre = nombreInput.value.trim();
    const apellidos = apellidosInput.value.trim();
    const run = runInput.value.trim();
    const direccion = direccionInput.value.trim();

    // --- 2. BLOQUE DE VALIDACIONES ---

    // Validar Nombre: entre 4 y 100 caracteres
    if (nombre.length < 4 || nombre.length > 100) {
        feedbackDiv.innerHTML = `<div class="alert alert-danger">El nombre debe tener entre 4 y 100 caracteres.</div>`;
        return; // Detiene la ejecución si no es válido
    }

    // Validar Apellidos: entre 4 y 100 caracteres
    if (apellidos.length < 4 || apellidos.length > 100) {
        feedbackDiv.innerHTML = `<div class="alert alert-danger">Los apellidos deben tener entre 4 y 100 caracteres.</div>`;
        return; // Detiene la ejecución
    }

    // Validar RUN: 8-9 dígitos y solo números (campo opcional)
    const runRegex = /^[0-9]+$/; // Expresión regular que solo permite números
    if (run.length > 0 && (!runRegex.test(run) || run.length < 8 || run.length > 9)) {
        feedbackDiv.innerHTML = `<div class="alert alert-danger">El RUN debe tener entre 8 y 9 dígitos y solo contener números (sin puntos ni guión).</div>`;
        return; // Detiene la ejecución
    }

    // Validar Dirección: máximo 300 caracteres
    if (direccion.length > 300) {
        feedbackDiv.innerHTML = `<div class="alert alert-danger">La dirección no puede exceder los 300 caracteres.</div>`;
        return; // Detiene la ejecución
    }

    // --- 3. SI TODAS LAS VALIDACIONES PASAN, GUARDAMOS LOS DATOS ---
    
    // Buscamos el índice del usuario actual en el array.
    const userIndex = allUsers.findIndex(user => user.nombre === loggedInUserName);

    if (userIndex > -1) {
        // Actualizamos los datos del objeto de usuario.
        allUsers[userIndex].nombre = nombre;
        allUsers[userIndex].apellidos = apellidos;
        allUsers[userIndex].run = run;
        allUsers[userIndex].fechaNacimiento = fechaNacimientoInput.value;
        allUsers[userIndex].direccion = direccion;
        
        // Guardamos el array COMPLETO de usuarios de vuelta en localStorage.
        localStorage.setItem('usuarios', JSON.stringify(allUsers));
        
        // Actualizamos el 'userName' por si el usuario cambió su nombre.
        localStorage.setItem('userName', nombre);

        // Mostramos un mensaje de éxito.
        feedbackDiv.innerHTML = `<div class="alert alert-success">Perfil actualizado con éxito.</div>`;
        
        // Opcional: recargar el header para que muestre el nuevo nombre.
        if(typeof window.actualizarEstadoHeader === 'function') {
            window.actualizarEstadoHeader();
        }
    } else {
        feedbackDiv.innerHTML = `<div class="alert alert-danger">Error: No se pudo encontrar el usuario para guardar los datos.</div>`;
    }
});
});