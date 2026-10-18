(() => {
  'use strict';
  const button = document.getElementById('vinyl-toggle');
  const label = document.getElementById('vinyl-label');
  const note = document.getElementById('vinyl-note');
  const link = document.getElementById('vinyl-track-link');
  const tracks = window.musicPreviews || [];
  const audio = new Audio();
  audio.preload = 'none';
  audio.volume = 0.7;
  let index = -1;
  let active = false;
  let generation = 0;
  let stopTimer;
  let loadTimer;
  function stop(message) {
    active = false;
    generation++;
    clearTimeout(stopTimer);
    clearTimeout(loadTimer);
    audio.pause();
    button.classList.remove('spinning');
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-busy', 'false');
    button.setAttribute('aria-label', 'Play another 15-second song preview');
    label.textContent = 'Spin & listen +';
    if (message) note.textContent = message;
  }
  function complete() {
    stop('A little taste of my soundtrack. Tap again for another song.');
  }
  function unavailable() {
    if (active) stop('This preview couldn’t load. Tap again for another, or open the song on Apple Music below.');
  }
  function toggle() {
    if (active) { stop('Paused. Tap again to discover another song.'); return; }
    if (!tracks.length) { note.textContent = 'Open my playlists below to listen on Apple Music.'; return; }
    index = (index + 1) % tracks.length;
    const track = tracks[index];
    active = true;
    const request = ++generation;
    button.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-busy', 'true');
    button.setAttribute('aria-label', 'Stop the song preview');
    label.textContent = 'Stop preview −';
    note.textContent = 'Finding the groove… ' + track.title;
    link.hidden = false;
    link.href = track.trackUrl;
    link.textContent = 'Hear “' + track.title + '” on Apple Music ↗';
    audio.src = track.previewUrl;
    // play() is called synchronously from the tap, including on mobile browsers.
    const playing = audio.play();
    if (playing) playing.catch(() => { if (request === generation) unavailable(); });
    loadTimer = setTimeout(unavailable, 12000);
  }
  audio.addEventListener('playing', () => {
    if (!active) { audio.pause(); return; }
    clearTimeout(loadTimer);
    clearTimeout(stopTimer);
    button.setAttribute('aria-busy', 'false');
    button.classList.add('spinning');
    const track = tracks[index];
    note.textContent = '15-second preview · ' + track.title + ' — ' + track.artist + '. From “' + track.playlist + '”.';
    stopTimer = setTimeout(complete, Math.max(0, 15 - audio.currentTime) * 1000);
  });
  audio.addEventListener('timeupdate', () => { if (active && audio.currentTime >= 15) complete(); });
  audio.addEventListener('ended', () => { if (active) complete(); });
  audio.addEventListener('error', unavailable);
  document.addEventListener('visibilitychange', () => { if (document.hidden && active) stop('Paused while you were away. Tap for another song.'); });
  window.addEventListener('pagehide', () => stop());
  button.addEventListener('click', toggle);
  label.addEventListener('click', toggle);
})();
