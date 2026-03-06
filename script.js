/* ============================================================
   SPARSH GUPTA — PORTFOLIO SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── CURSOR ──────────────────────────────────────────────
  var dot = document.getElementById('sg-cursor-dot');
  var ring = document.getElementById('sg-cursor-ring');
  var mx = 0, my = 0, rx = 0, ry = 0, started = false;

  if (dot && ring) {
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', mx + 'px');
      document.documentElement.style.setProperty('--mouse-y', my + 'px');
      if (!started) {
        started = true;
        document.body.classList.add('cursor-active');
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        rx = mx; ry = my;
      }
    });

    (function loop() {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .glass').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hovered'); });
    });
  }

  // ── MAGNETIC BUTTONS ────────────────────────────────────
  document.querySelectorAll('.magnetic').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var moveX = (x - rect.width / 2) * 0.25;
      var moveY = (y - rect.height / 2) * 0.25;
      el.style.transform = 'translate(' + moveX + 'px,' + moveY + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'translate(0,0)';
    });
  });

  // ── SCROLL PROGRESS ─────────────────────────────────────
  var progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progress) progress.style.width = (scrollTop / height) * 100 + '%';
  });

  // ── FADE IN ──────────────────────────────────────────────
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(function (el) {
    el.classList.add('animate-ready');
    observer.observe(el);
  });

  // ── ACTIVE NAV ───────────────────────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(function (a) {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });

  // ── TERMINAL TYPEWRITER ──────────────────────────────────
  var lines = [
    { text: '$ whoami',                                        type: 'cmd' },
    { text: 'sparsh_gupta',                                    type: 'out' },
    { text: '',                                                type: 'out' },
    { text: '$ cat role.txt',                                  type: 'cmd' },
    { text: 'SysAdmin @ D.E. Shaw & Co.',                      type: 'out' },
    { text: '',                                                type: 'out' },
    { text: '$ skills --top',                                  type: 'cmd' },
    { text: 'windows  linux  networking  automation  fleet-mgmt', type: 'out' },
    { text: '',                                                type: 'out' },
    { text: '$ tickets_resolved',                              type: 'cmd' },
    { text: '2,500+  (and counting)',                          type: 'out' },
    { text: '',                                                type: 'out' },
    { text: '$ echo $PHILOSOPHY',                              type: 'cmd' },
    { text: 'automate everything you hate doing twice',        type: 'out' },
    { text: '',                                                type: 'out' },
    { text: '$ _',                                             type: 'cmd' },
  ];

  var termEl = document.getElementById('terminalOutput');
  if (termEl) {
    var lineIndex = 0, charIndex = 0;
    var cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';

    function typeNext() {
      if (lineIndex >= lines.length) { termEl.appendChild(cursor); return; }
      var line = lines[lineIndex];
      if (charIndex === 0) {
        var span = document.createElement('span');
        span.className = line.type;
        span.id = 'tl-' + lineIndex;
        termEl.appendChild(span);
      }
      var span = document.getElementById('tl-' + lineIndex);
      if (charIndex < line.text.length) {
        span.textContent += line.text.charAt(charIndex);
        charIndex++;
        setTimeout(typeNext, line.type === 'cmd' ? 40 : 22);
      } else {
        termEl.appendChild(document.createTextNode('\n'));
        charIndex = 0;
        lineIndex++;
        setTimeout(typeNext, line.text === '' ? 80 : 280);
      }
    }

    // Start typing only when terminal scrolls into view
    var termObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { typeNext(); termObserver.disconnect(); }
    }, { threshold: 0.3 });
    termObserver.observe(termEl);
  }

});

// ── CONTACT FORM ─────────────────────────────────────────
function handleSubmit() {
  var name    = document.getElementById('fname').value.trim();
  var email   = document.getElementById('femail').value.trim();
  var subject = document.getElementById('fsubject').value.trim();
  var message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in your name, email and message.');
    return;
  }

  var mailto = 'mailto:me@sparsh.work'
    + '?subject=' + encodeURIComponent(subject || 'Portfolio Contact')
    + '&body='    + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);

  window.location.href = mailto;
  document.getElementById('formSuccess').style.display = 'block';
}
