//solo hacemos que la funcion genere el valor en el <p> y en la variable precio que va a ser general para todos se le pone como valor el precio
let presio;

function btnx2() {

	document.getElementById('txtpreciorif0').innerHTML = "3.000";
	presio = "3000";

}

function btnx4() {

	document.getElementById('txtpreciorif0').innerHTML = "6.000";
	presio = "6000";

}

function btnx6() {

	document.getElementById('txtpreciorif0').innerHTML = "9.000";
	presio = "9000";


}

function btnx8() {

	document.getElementById('txtpreciorif0').innerHTML = "12.000";
	presio = "12000";


}

function btnx10() {

	document.getElementById('txtpreciorif0').innerHTML = "15.000";
	presio = "15000";

}


function comprarBoleta() {
	if (presio !== null) {
	  const contenedorFormulario = document.getElementById('contenedorFormulario');
	  const presioForm = document.getElementById('valorBoletaForm');
	  
	  presioForm.value = presio;
	  contenedorFormulario.style.display = 'block';
	}
  }
  
  const cerrarFormulario = document.querySelector('.cerrar-formulario');

  cerrarFormulario.addEventListener('click', () => {
	const formulario = document.querySelector('.contenedor-formulario');
	formulario.style.display = 'none';
  });