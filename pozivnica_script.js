// Navigacija kroz korake
function nextStep(stepNumber) {
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

// Skupljanje podataka i slanje
function submitData() {
const data = {
        exam_driver: document.querySelector('input[name="exam_driver"]:checked').value,
        driver: "antonio", 
        date: document.getElementById('trip-date').value || 'Nije izabrano',
        route: document.querySelector('input[name="route"]:checked').value,
        role: document.querySelector('input[name="role"]:checked').value
        
        // OBRISANO: wedding: document.querySelector('input[name="wedding"]:checked').value
    };

    console.log("Prikupljeni podaci:", data);

    // 2. Slanje podataka (Primer sa Formspree)
    // Otvori besplatan nalog na formspree.io, napravi formu i ubaci svoj endpoint ispod:
    const formspreeEndpoint = 'https://formspree.io/f/mdayadnp'; 
    
     // OTKOMENTARIŠI OVO KADA UNESEŠ ENDPOINT
fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.ok) {
            // Ako je sve u redu, prelazimo na korak 6 i BUM! Konfete!
            nextStep(6);
            fireConfetti(); 
        } else {
            response.json().then(err => {
                console.error("Formspree odbio zahtev:", err);
                alert("Greška sa slanjem! Pogledaj konzolu.");
                btn.innerText = originalText;
                btn.disabled = false;
            });
        }
    })
    

   // Za sada, samo prebaci na poslednji korak zbog demonstracije
   nextStep(6);
}

// Inicijalizacija modernog kalendara
document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#trip-date", {
        locale: "sr", // Aktivira čist srpski jezik (april, maj, pon, uto...)
        minDate: "2026-04-29", // Ne može da izabere pre ispita
        dateFormat: "d. F Y.", // Formatira datum prelepo: npr. "29. april 2026."
        disableMobile: "true", // Forsira ovaj lep dizajn čak i na telefonima (isključuje ružni sistemski)
        animate: true
    });
});

// Magija za konfete
function fireConfetti() {
    var duration = 3 * 1000; // Traje 3 sekunde
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // Puca sa leve strane
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        // Puca sa desne strane
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}
