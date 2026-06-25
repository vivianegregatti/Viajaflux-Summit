/* ============================================================
   FLY SUMMIT — Application Entry Point
   ============================================================ */

// Tailwind config (must be set before Tailwind processes)
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          navy: '#0D1B2A',
          brand: '#1B4FCA',
        }
      }
    }
  };
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  render();

  // Handle countdown timer auto-refresh on home
  setInterval(() => {
    if (STATE.user?.role === 'participant' && STATE.route === 'participant/home') {
      const cd = getCountdown();
      const boxes = document.querySelectorAll('.countdown-box .countdown-num');
      if (boxes.length === 4) {
        boxes[0].textContent = cd.days;
        boxes[1].textContent = cd.hours;
        boxes[2].textContent = cd.minutes;
        boxes[3].textContent = cd.seconds;
      }
    }
  }, 1000);

  // Handle window resize for mobile sidebar
  window.addEventListener('resize', () => {
    const mt = document.getElementById('menu-toggle');
    if (mt) mt.style.display = window.innerWidth < 768 ? 'flex' : 'none';
    if (window.innerWidth >= 768) {
      STATE.sidebarOpen = false;
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.remove('open');
    }
  });

  // NPS star rating interaction
  document.addEventListener('click', (e) => {
    const label = e.target.closest('label[for^="r_"]');
    if (label) {
      const forAttr = label.getAttribute('for');
      const [, cat, scoreStr] = forAttr.split('_');
      const score = parseInt(scoreStr);
      document.querySelectorAll(`label[for^="r_${cat}_"]`).forEach((l, i) => {
        l.style.filter = i <= score ? '' : 'grayscale(1)';
      });
    }
  });
});

/* ─── KEYBOARD SHORTCUTS ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal-root').innerHTML = '';
    STATE.sidebarOpen = false;
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.remove('open');
  }
});
