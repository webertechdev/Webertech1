// Lightweight, dependency-free chat notification helpers.
// Audio playback is best-effort because browsers may block sounds before
// the user has interacted with the page.
export function playMessageNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(660, context.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
    oscillator.addEventListener("ended", () => context.close().catch(() => {}), { once: true });
  } catch (error) {
    console.debug("Message notification sound was blocked:", error);
  }
}

export function toMessageMillis(timestamp) {
  return timestamp?.toMillis?.() || timestamp?.toDate?.()?.getTime?.() || 0;
}
