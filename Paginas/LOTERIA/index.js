let presio="1.500";
let canti=1;

function btnx3() {
	document.getElementById('txtpreciorif0').innerHTML = "4.500";
	presio = "4.500";
	canti = 3;
}

function btnx6() {
	document.getElementById('txtpreciorif0').innerHTML = "9.000";
	presio = "9.000";
	canti = 6;
}

function btnx9() {
	document.getElementById('txtpreciorif0').innerHTML = "13.500";
	presio = "13.500";
	canti = 9;
}

function btnx12() {
	document.getElementById('txtpreciorif0').innerHTML = "18.000";
	presio = "18.000";
	canti = 12;
}



function comprarBoleta() {
	if (presio !== null && presio !== undefined) {
		const contenedorFormulario = document.getElementById('contenedorFormulario');
		const presioForm = document.getElementById('valorBoletaForm');

		presioForm.value = presio;
		contenedorFormulario.style.display = 'block';
	}
}

const cerrarFormulario = document.querySelector('.cerrar-formulario');

cerrarFormulario.addEventListener('click', (event) => {
	event.preventDefault(); // Evitar que se envíe el formulario al cerrar
	const formulario = document.querySelector('.contenedor-formulario');
	formulario.style.display = 'none';
});

function generarNumerosRifa(cantidad) {
	let numerosRifa = [];
	let numerosUsados = new Set();

	while (numerosRifa.length < cantidad) {
		let numero = Math.floor(Math.random() * 100000);
		let numeroStr = numero.toString().padStart(5, '0');

		if (!numerosUsados.has(numeroStr)) {
			numerosRifa.push(numeroStr);
			numerosUsados.add(numeroStr);
		}
	}

	return numerosRifa;
}


function enviarCorreo(email, numerosRifa, valorBoleta) {
	const btn = document.getElementById('button');
	btn.value = 'Enviando...';

	const serviceID = 'service_ucm4y6c';
	const templateID = 'template_ipuqp4h'; // Reemplaza 'template_id' con el ID de tu plantilla en EmailJS

	// Plantilla de correo para el usuario
	const templateParamsUsuario = {
		to_email: email,
		from_name: document.getElementById('from_name').value,
		email_id: document.getElementById('email_id').value,
		numerosRifa: numerosRifa.join(', '),
		valorBoleta: valorBoleta
	};

	// Plantilla de correo para el administrador
	const templateParamsAdmin = {
		to_email: 'santiagoamirez9@gmail.com', // Tu correo personal
		from_name: document.getElementById('from_name').value,
		email_id: document.getElementById('email_id').value,
		numerosRifa: numerosRifa.join(', '),
		valorBoleta: valorBoleta
	};

	// Enviar correo al usuario
	emailjs.send(serviceID, templateID, templateParamsUsuario)
		.then(function (response) {
			console.log('Correo enviado al usuario con éxito:', response);
			btn.value = 'Enviar';
			alert('¡Gracias por tu compra! Revisa tu correo electrónico.');
		}, function (error) {
			console.error('Error al enviar el correo al usuario:', error);
			btn.value = 'Enviar';
			alert('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
		});

	// Enviar correo al administrador
	emailjs.send(serviceID, templateID, templateParamsAdmin)
		.then(function (response) {
			console.log('Correo enviado al administrador con éxito:', response);
		}, function (error) {
			console.error('Error al enviar el correo al administrador:', error);
		});
}

document.getElementById('formulario').addEventListener('submit', function (event) {
	event.preventDefault();
	const email = document.getElementById('email_id').value; // Obtener el correo electrónico del formulario
	const numerosRifa = generarNumerosRifa(canti);
	const valorBoleta = presio;

	enviarCorreo(email, numerosRifa, valorBoleta); // Enviar correo al correo ingresado por la persona y al administrador
});

