const form = document.getElementById('formPreventivo');

form.addEventListener('submit', async function(event) {
  event.preventDefault(); // blocca l’invio normale

  // 1. recupera gli UUID di Uploadcare
  const uuidFront = form.querySelector('[name="libretto_fronte"]').value;
  const uuidBack  = form.querySelector('[name="libretto_retro"]').value;

  // 2. costruisci i link ai file
  const urlFront = `https://ucarecdn.com/${uuidFront}/`;
  const urlBack  = `https://ucarecdn.com/${uuidBack}/`;

  // 3. prepara i dati da inviare
  const data = new FormData(form);
  // sostituisci gli UUID con i veri URL
  data.set('libretto_fronte', urlFront);
  data.set('libretto_retro', urlBack);

  try {
    // 4. invia a Formspree
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('Grazie! La tua richiesta è stata inviata.');
      form.reset();          // pulisci i campi
    } else {
      alert('Si è verificato un errore. Riprova più tardi.');
    }
  } catch (error) {
    alert('Errore di rete. Controlla la tua connessione.');
  }
});

