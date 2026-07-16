// --- CONFIGURACIÓN DE AUDIO OPTIMIZADA ---
const musica = new Audio("Golden.mp3");
musica.loop = true;
musica.volume = 0.6; // Volumen al 60% para que sea agradable

// 🔥 TRUCO EXCLUSIVO: Forzar activación de audio en el primer toque de pantalla
document.addEventListener("DOMContentLoaded", () => {
    const portada = document.getElementById("pantalla1");
    if (portada) {
        portada.addEventListener("click", () => {
            if (musica.paused) {
                musica.play()
                    .then(() => {
                        document.getElementById("btn-silencio").textContent = "🔊";
                    })
                    .catch(err => console.log("Reintento de audio fallido:", err));
            }
        }, { once: true }); // "{ once: true }" hace que este truco corra SOLO la primera vez
    }
});

// --- FUNCIÓN DE NAVEGACIÓN COMPACTA CON TRANSICIÓN LENTA ---
function irAPantalla(pantallaActual, pantallaSiguiente) {
    const actual = document.getElementById(`pantalla${pantallaActual}`);
    const siguiente = document.getElementById(`pantalla${pantallaSiguiente}`);
    
    if (!actual || !siguiente) return;

    // 1. Inicia la animación de salida lenta en la pantalla actual
    actual.classList.add("animacion-salir");
    
    // 2. Espera el tiempo de la transición para apagar la tarjeta vieja y prender la nueva
    setTimeout(() => {
        actual.classList.add("oculta");
        actual.classList.remove("animacion-salir"); 
        
        // ✨ CORRECCIÓN INTEGRAL: Borra propiedades inline que causaban que las tarjetas se encimaran
        siguiente.style.removeProperty("display");
        
        // Quita la clase oculta y deja que el CSS controle el despliegue individual
        siguiente.classList.remove("oculta");
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600); /* Empata perfecto con tus 600ms de transición lenta de CSS */
}

// --- FUNCIÓN DEL BOTÓN FLOTANTE DE LA BOCINA ---
function alternarMusica() {
    const btn = document.getElementById("btn-silencio");
    if (musica.paused) {
        musica.play().catch(e => console.log(e));
        btn.textContent = "🔊";
    } else {
        musica.pause();
        btn.textContent = "🔈";
    }
}

// 19 de Septiembre de 2026 a las 4:00 PM (16:00 horas)
const fechaEvento = new Date("Sep 19, 2026 16:00:00").getTime();

// --- CONTADOR REGRESIVO CORREGIDO ---
const cuentaRegresiva = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    // Cálculos de tiempo exactos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Buscamos el contenedor del contador en el HTML
    const elementoContador = document.getElementById("contador");
    
    if (elementoContador) {
        if (distancia < 0) {
            clearInterval(cuentaRegresiva);
            elementoContador.innerHTML = "¡Llegó el gran día! 🎉";
        } else {
            // Formato limpio: añade un cero a la izquierda si el número es menor a 10
            const d = dias < 10 ? "0" + dias : dias;
            const h = horas < 10 ? "0" + horas : horas;
            const m = minutos < 10 ? "0" + minutos : minutos; 
            const s = segundos < 10 ? "0" + segundos : segundos;
            
            elementoContador.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
        }
    } else {
        console.log("Error: No se encontró ningún elemento con el ID 'contador' en el HTML.");
    }
}, 1000);



