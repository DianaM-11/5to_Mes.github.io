const musica = document.getElementById('musica');

if (musica) {
  musica.volume = 0.25;

  const startMusic = () => {
    if (musica.paused) {
      musica.play().catch(err => {
        console.log('Error al intentar reproducir la música:', err);
      });
    }
  };

  document.addEventListener('pointerdown', startMusic, { once: true });

  document.querySelectorAll('[data-action="start-music"]').forEach(btn => {
    btn.addEventListener('click', () => {
      startMusic();
      btn.textContent = '♪ Música encendida';
      btn.disabled = true;
    });
  });
}

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = modal.querySelector('.modal-close');

const letterModal = document.getElementById('letterModal');
const letterClose = letterModal.querySelector('.letter-close');

function openModal(contentNode) {
  modalBody.innerHTML = '';
  modalBody.appendChild(contentNode);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  // Detener iframes/videos
  const iframe = modalBody.querySelector('iframe');
  if (iframe) iframe.src = 'about:blank';

  const video = modalBody.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';

  if (musica && musica.paused) {
    musica.play().catch(err => {
      console.log('No se pudo reanudar la música:', err);
    });
  }
}

function openLetterModal() {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden', 'false');
  if (musica && !musica.paused) {
    musica.pause();
  }
}

function closeLetterModal() {
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden', 'true');
  if (musica && musica.paused) {
    musica.play().catch(err => {
      console.log('No se pudo reanudar la música:', err);
    });
  }
}

// Cerrar modales
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

letterClose.addEventListener('click', closeLetterModal);
letterModal.addEventListener('click', (e) => {
  if (e.target === letterModal) closeLetterModal();
});

// Manejar click en cartas (películas, canciones, videos)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (musica && !musica.paused) {
      musica.pause();
    }

    const type = card.dataset.type;
    if (type === 'movie') {
      const title = card.dataset.title || 'Título';
      const desc = card.dataset.desc || '';
      const video = card.dataset.video || '';

      const wrap = document.createElement('div');
      if (video) {
        const iframe = document.createElement('iframe');
        iframe.className = 'frame';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.src = video;
        wrap.appendChild(iframe);
      }
      const content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
      wrap.appendChild(content);
      openModal(wrap);
    }

    if (type === 'song') {
      const title = card.dataset.title || 'Canción';
      const song = card.dataset.song;
      const wrap = document.createElement('div');
      if (song) {
        const iframe = document.createElement('iframe');
        iframe.className = 'frame';
        iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.src = song;
        wrap.appendChild(iframe);
      }
      const content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = `<h3>${title}</h3><p>Para escuchar juntitas 💖</p>`;
      wrap.appendChild(content);
      openModal(wrap);
    }

    if (type === 'video') {
      const file = card.dataset.file;
      const title = card.dataset.title || 'Video';
      const wrap = document.createElement('div');
      const video = document.createElement('video');
      video.className = 'frame';
      video.controls = true;
      video.src = file;
      wrap.appendChild(video);
      const content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = `<h3>${title}</h3><p>Un mensajito para ti 💌</p>`;
      wrap.appendChild(content);
      openModal(wrap);
    }
  });
});

// Manejar click en botón de carta para abrir modal carta
document.querySelectorAll('[data-action="open-letter"]').forEach(btn => {
  btn.addEventListener('click', () => {
    openLetterModal();
  });
});




