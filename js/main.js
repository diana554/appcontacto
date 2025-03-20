
import { facturas } from "./utilties.js";

function renderFacturas(facturasFiltradas) {
    const tablaBody = document.querySelector("#tablaFacturas tbody");
    tablaBody.innerHTML = ""; 
    
    facturasFiltradas.forEach(factura => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${factura.id}</td>
            <td>${factura.numeroFactura}</td>
            <td>${factura.descripcion}</td>
            <td style="color: ${factura.estado === 'pagada' ? '#00ce00' : '#ff0000'};">${factura.estado}</td>
            <td>${factura.fecha}</td>
            <td><button class="action">Del</button></td>
        `;
        tablaBody.appendChild(fila);
    });

    document.querySelectorAll(".action").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            facturas.splice(index, 1);
            todos(); 
        });
    });
}
//* @description Dentro  de una funcion llamada todos: itera el array facturas e  imprime en consola cada uno de los objetos que se encuentran dentro del array. 

function todos() {
    //*facturas.forEach(factura => console.log(factura));
    renderFacturas(facturas);
}


/**
* @description Dentro  de una funcion llamada pendientes: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pendiente 
*/

function pendientes() {
    //*facturas.filter(factura => factura.estado === "pendiente").forEach(factura => console.log(factura));
    renderFacturas(facturas.filter(factura => factura.estado === "pendiente"));

}

pendientes();


/**
* @description Dentro  de una funcion llamada pagadas: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pagadas 
*/
function pagadas() {
    //*facturas.filter(factura => factura.estado === "pagada").forEach(factura => console.log(factura));
    renderFacturas(facturas.filter(factura => factura.estado === "pagada"));

}

pagadas();

/**
 * @description En el html encontraras un  ul que contiene tres li.  A cada uno de esos li agregaras un escuchador de evento click y utilizaras las fuciones creadas en los pasos anteriores.
 *  
 */
document.getElementById("todos").addEventListener("click", todos);
document.getElementById("pendientes").addEventListener("click", pendientes);
document.getElementById("pagada").addEventListener("click", pagadas);

todos();


//modal

document.getElementById("addContacBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const numeroFactura = document.getElementById("factura").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value.toLowerCase();
    const fecha = document.getElementById("fecha").value;
    
    if (estado !== "pagada" && estado !== "pendiente") {
        alert("El estado debe ser 'pagada' o 'pendiente'");
        return;
    }
    
    const nuevaFactura = {
        id: facturas.length + 1,
        numeroFactura,
        descripcion,
        estado,
        fecha
    };
    
    facturas.push(nuevaFactura);
    todos(); 
    document.getElementById("modal").style.display = "none"; 
    document.getElementById("contactForm").reset();
});


