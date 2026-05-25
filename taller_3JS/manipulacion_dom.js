const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");
const listaNotas = document.getElementById("listaNotas");

let notas = [];

function cargarNotas() {
    const notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notas.length} notas desde Local Storage.`);
        renderizarNotas();
    } else {
        console.log("No se encontraron notas guardadas.");
    }
}

function renderizarNotas() {
    listaNotas.innerHTML = "";

    notas.forEach((nota, index) => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            <span>${nota}</span>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        
        listaNotas.appendChild(li);
    });
}

function agregarNota() {
    const texto = inputNota.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una nota antes de agregar.");
        return;
    }

    notas.push(texto);
    localStorage.setItem("notas", JSON.stringify(notas));
    renderizarNotas();
    
    inputNota.value = "";
    inputNota.focus();

    console.log(`Nota agregada: "${texto}"`);
}

function eliminarNota(index) {
    const notaEliminada = notas[index];
    notas.splice(index, 1);
    
    localStorage.setItem("notas", JSON.stringify(notas));
    renderizarNotas();
    
    console.log(`Nota eliminada: "${notaEliminada}"`);
}

btnAgregar.addEventListener("click", agregarNota);

listaNotas.addEventListener("click", function(e) {
    if (e.target.classList.contains("eliminar")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        eliminarNota(index);
    }
});

inputNota.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        agregarNota();
    }
});

cargarNotas();

console.log("Aplicación cargada completamente. Listo para usar.");