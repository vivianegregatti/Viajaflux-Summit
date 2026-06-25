/* ============================================================
   FLY SUMMIT — Participant Views
   ============================================================ */

function renderParticipantView(route) {
  const views = {
    'participant/home':          participantHome,
    'participant/agenda':        participantAgenda,
    'participant/map':           participantMap,
    'participant/speakers':      participantSpeakers,
    'participant/sponsors':      participantSponsors,
    'participant/library':       participantLibrary,
    'participant/photos':        participantPhotos,
    'participant/faq':           participantFAQ,
    'participant/survey':        participantSurvey,
    'participant/notifications': participantNotifications,
  };
  return (views[route] || participantHome)();
}

/* ─── HOME ─── */
function participantHome() {
  const cd = getCountdown();
  const u  = STATE.user;
  const unread = DATA.notifications.filter(n => !n.read).length;

  return `
  <div class="page">
    <!-- Hero banner -->
    <div class="hero-banner" style="margin-bottom:24px;">
      <div style="position:relative; z-index:1;">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:16px;">
          <div>
            <p style="font-size:13px; opacity:.7; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">🏔️ Viajaflux Summit — Campos do Jordão 2026</p>
            <h1 style="font-size:26px; font-weight:800; margin-bottom:8px;">Olá, ${u.name.split(' ')[0]}! 👋</h1>
            <p style="font-size:14px; opacity:.8;">${DATA.event.location}</p>
            <p style="font-size:14px; opacity:.8;">${DATA.event.dateDisplay}</p>
          </div>
          <div>
            <p style="font-size:11px; opacity:.6; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; text-align:center;">⏱ Contagem Regressiva</p>
            <div class="countdown-wrap">
              <div class="countdown-box"><div class="countdown-num">${cd.days}</div><div class="countdown-lbl">dias</div></div>
              <div class="countdown-box"><div class="countdown-num">${cd.hours}</div><div class="countdown-lbl">horas</div></div>
              <div class="countdown-box"><div class="countdown-num">${cd.minutes}</div><div class="countdown-lbl">min</div></div>
              <div class="countdown-box"><div class="countdown-num">${cd.seconds}</div><div class="countdown-lbl">seg</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 320px; gap:20px;">
      <!-- Left column -->
      <div>
        <!-- Avisos importantes -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <span class="card-title">📢 Avisos Importantes</span>
            <span class="badge badge-red">🔴 Ao Vivo</span>
          </div>
          <div class="card-body">
            <div style="border-left:3px solid #1B4FCA; padding:12px 16px; background:#EFF6FF; border-radius:0 8px 8px 0; margin-bottom:12px;">
              <p style="font-weight:600; font-size:14px;">Credenciamento aberto das 07:30 às 09:00</p>
              <p style="font-size:13px; color:#64748B; margin-top:4px;">Dirija-se à Entrada Principal com seu QR Code. Traga documento de identidade.</p>
            </div>
            <div style="border-left:3px solid #F59E0B; padding:12px 16px; background:#FFFBEB; border-radius:0 8px 8px 0; margin-bottom:12px;">
              <p style="font-weight:600; font-size:14px;">🎤 Próxima palestra: Liderança na Era Digital — 09:30</p>
              <p style="font-size:13px; color:#64748B; margin-top:4px;">Ricardo Almeida no Palco Principal. Reserve seu lugar!</p>
            </div>
            <div style="border-left:3px solid #10B981; padding:12px 16px; background:#F0FDF4; border-radius:0 8px 8px 0;">
              <p style="font-weight:600; font-size:14px;">🎉 Happy Hour às 19:00 — Área VIP</p>
              <p style="font-size:13px; color:#64748B; margin-top:4px;">Open bar e networking com os melhores líderes do Brasil.</p>
            </div>
          </div>
        </div>

        <!-- Destaques do dia -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <span class="card-title">⭐ Destaques do Dia</span>
            <button class="btn btn-ghost btn-sm" onclick="navigate('participant/agenda')">Ver agenda completa →</button>
          </div>
          <div class="card-body" style="padding:12px 24px;">
            ${DATA.sessions.filter(s => s.day === 1).slice(0,5).map(s => {
              const speaker = s.speakerId ? DATA.speakers.find(sp => sp.id === s.speakerId) : null;
              const typeClass = { keynote:'sb-keynote', talk:'sb-talk', workshop:'sb-workshop', break:'sb-break' }[s.type] || 'sb-talk';
              return `
              <div style="display:flex; align-items:center; gap:16px; padding:12px 0; border-bottom:1px solid #F1F5F9; cursor:pointer;" onclick="navigate('participant/agenda')">
                <div style="width:52px; text-align:center; flex-shrink:0;">
                  <div style="font-size:12px; font-weight:700; color:#1B4FCA;">${s.time}</div>
                  <div style="font-size:10px; color:#94A3B8;">${s.room.split(' ')[0]} ${s.room.split(' ')[1]||''}</div>
                </div>
                <div style="width:3px; height:36px; border-radius:2px; background:${s.type==='keynote'?'#D97706':s.type==='workshop'?'#7C3AED':s.type==='break'?'#10B981':'#1B4FCA'}; flex-shrink:0;"></div>
                <div style="flex:1; min-width:0;">
                  <div style="font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.title}</div>
                  ${speaker ? `<div style="font-size:12px; color:#64748B;">${speaker.name} · ${speaker.company}</div>` : `<div style="font-size:12px; color:#64748B;">${s.room}</div>`}
                </div>
                ${sessionTypeBadge(s.type)}
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div>
        <!-- Quick actions -->
        <div class="card" style="margin-bottom:16px;">
          <div class="card-header"><span class="card-title">Acesso Rápido</span></div>
          <div class="card-body" style="padding:16px;">
            ${[
              { icon:'📅', label:'Agenda', route:'participant/agenda' },
              { icon:'🗺️', label:'Mapa',   route:'participant/map' },
              { icon:'🎤', label:'Palestrantes', route:'participant/speakers' },
              { icon:'📚', label:'Biblioteca', route:'participant/library' },
              { icon:'📷', label:'Minhas Fotos', route:'participant/photos' },
              { icon:'⭐', label:'Pesquisa', route:'participant/survey' },
            ].map(a => `
              <div onclick="navigate('${a.route}')" style="display:flex; align-items:center; gap:10px; padding:10px; border-radius:8px; cursor:pointer; transition:background .15s;" onmouseover="this.style.background='#F1F5F9'" onmouseout="this.style.background=''">
                <span style="font-size:20px;">${a.icon}</span>
                <span style="font-size:13.5px; font-weight:500;">${a.label}</span>
                <span style="margin-left:auto; color:#CBD5E1;">›</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Notificações -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🔔 Notificações</span>
            <span class="badge badge-red">${unread}</span>
          </div>
          <div class="card-body" style="padding:12px 16px;">
            ${DATA.notifications.slice(0,3).map(n => `
            <div class="notif-item ${n.read?'':'unread'}" style="margin-bottom:8px;">
              <div>
                <div style="font-size:13px; font-weight:600;">${n.title}</div>
                <div style="font-size:12px; color:#64748B; margin-top:2px;">${n.message.slice(0,60)}...</div>
                <div style="font-size:11px; color:#94A3B8; margin-top:4px;">${n.time}</div>
              </div>
            </div>`).join('')}
            <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:4px;" onclick="navigate('participant/notifications')">Ver todas →</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── AGENDA ─── */
function participantAgenda() {
  const activeDay = STATE.activeTab['agenda-day'] || '1';
  const sessions  = DATA.sessions.filter(s => s.day === parseInt(activeDay));

  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📅 Agenda</h1>
      <p class="page-subtitle">Programação completa do Viajaflux Summit 2026</p>
    </div>

    <div class="tabs">
      <div class="tab ${activeDay==='1'?'active':''}" data-tab="1" data-group="agenda-day">📆 Dia 1 — 15/09</div>
      <div class="tab ${activeDay==='2'?'active':''}" data-tab="2" data-group="agenda-day">📆 Dia 2 — 16/09</div>
    </div>

    <div class="card">
      <div class="card-body" style="padding:0;">
        ${sessions.map(s => {
          const speaker = s.speakerId ? DATA.speakers.find(sp => sp.id === s.speakerId) : null;
          const typeClass = { keynote:'sb-keynote', talk:'sb-talk', workshop:'sb-workshop', break:'sb-break' }[s.type];
          return `
          <div class="schedule-row" style="cursor:pointer;" onclick="showSessionDetail(${s.id})" title="Ver detalhes">
            <div class="schedule-time">${s.time}<br><span style="font-size:10px;color:#CBD5E1;">${s.endTime}</span></div>
            <div class="schedule-slots">
              <div class="session-block ${typeClass}" style="max-width:${s.type==='break'?'100%':'580px'};">
                <div class="sb-title">${s.title}</div>
                <div class="sb-sub">
                  ${speaker ? `${speaker.name} · ${speaker.company}` : s.room}
                  ${s.type !== 'break' ? ` · <strong>${s.room}</strong>` : ''}
                </div>
              </div>
            </div>
            <div style="padding:12px 16px 12px 0; display:flex; align-items:center; gap:8px; flex-shrink:0;">
              ${sessionTypeBadge(s.type)}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:20px;">
      ${[
        { color:'#FEF3C7', border:'#D97706', label:'Keynote',   desc:'Palestra principal' },
        { color:'#DBEAFE', border:'#1D4ED8', label:'Palestra',  desc:'Talk regular' },
        { color:'#EDE9FE', border:'#7C3AED', label:'Workshop',  desc:'Sessão prática' },
        { color:'#F0FDF4', border:'#10B981', label:'Intervalo', desc:'Break / refeição' },
      ].map(l => `
        <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; background:${l.color}; border-left:3px solid ${l.border};">
          <div><div style="font-size:13px; font-weight:600;">${l.label}</div><div style="font-size:11px; opacity:.7;">${l.desc}</div></div>
        </div>`).join('')}
    </div>
  </div>`;
}

function showSessionDetail(id) {
  const s = DATA.sessions.find(s => s.id === id);
  if (!s) return;
  const speaker = s.speakerId ? DATA.speakers.find(sp => sp.id === s.speakerId) : null;
  openModal(`
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header">
      <span class="modal-title">${s.title}</span>
      <button class="btn btn-ghost btn-sm" data-close-modal>✕</button>
    </div>
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px;">
      ${sessionTypeBadge(s.type)}
      <span class="badge badge-gray">⏰ ${s.time} – ${s.endTime}</span>
      <span class="badge badge-blue">📍 ${s.room}</span>
      <span class="badge badge-gray">📆 Dia ${s.day}</span>
    </div>
    ${speaker ? `
    <div style="display:flex; align-items:center; gap:14px; padding:16px; background:#F8FAFC; border-radius:10px; margin-bottom:16px;">
      <div class="avatar avatar-lg" style="background:${speaker.color}20; color:${speaker.color};">${speaker.initials}</div>
      <div>
        <div style="font-weight:700; font-size:15px;">${speaker.name}</div>
        <div style="font-size:13px; color:#64748B;">${speaker.title} · ${speaker.company}</div>
        <div style="margin-top:6px; font-size:13px; color:#1B4FCA;">${speaker.topic}</div>
      </div>
    </div>
    ${speaker.bio ? `<p style="font-size:13.5px; color:#475569; line-height:1.7;">${speaker.bio}</p>` : ''}
    ` : `<p style="color:#64748B;">Este é um momento de pausa ou intervalo do evento.</p>`}
    <div style="margin-top:20px; display:flex; justify-content:flex-end;">
      <button class="btn btn-primary btn-sm" onclick="showToast('Adicionado à sua agenda pessoal! 📅','success'); document.getElementById('modal-root').innerHTML=''">📅 Adicionar à Agenda</button>
    </div>
  </div>`);
}

/* ─── MAP ─── */
function participantMap() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🗺️ Mapa do Evento</h1>
      <p class="page-subtitle">Campos do Jordão — SP</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 280px; gap:20px;">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Planta Interativa</span>
          <span class="badge badge-green">Interativa</span>
        </div>
        <div class="card-body" style="padding:0; overflow:hidden; border-radius:0 0 14px 14px;">
          <div style="position:relative; background:#F0F4F8; height:480px; overflow:hidden;">
            <!-- SVG Map -->
            <svg width="100%" height="100%" viewBox="0 0 800 480" style="display:block;">
              <!-- Background -->
              <rect width="800" height="480" fill="#EEF2F7"/>
              <!-- Main hall outline -->
              <rect x="20" y="20" width="760" height="440" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

              <!-- Palco Principal -->
              <rect x="40" y="40" width="260" height="160" rx="8" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2"/>
              <text x="170" y="110" text-anchor="middle" font-size="14" font-weight="700" fill="#1D4ED8">🎭 Palco Principal</text>
              <text x="170" y="128" text-anchor="middle" font-size="11" fill="#3B82F6">Keynotes · Abertura · Encerramento</text>

              <!-- Palco A -->
              <rect x="320" y="40" width="180" height="110" rx="8" fill="#EDE9FE" stroke="#7C3AED" stroke-width="2"/>
              <text x="410" y="91" text-anchor="middle" font-size="13" font-weight="700" fill="#7C3AED">🎤 Palco A</text>
              <text x="410" y="107" text-anchor="middle" font-size="10" fill="#8B5CF6">Talks · Painéis</text>

              <!-- Palco B -->
              <rect x="520" y="40" width="180" height="110" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
              <text x="610" y="91" text-anchor="middle" font-size="13" font-weight="700" fill="#D97706">🎤 Palco B</text>
              <text x="610" y="107" text-anchor="middle" font-size="10" fill="#F59E0B">Talks · Debates</text>

              <!-- Workshop rooms -->
              <rect x="40" y="220" width="130" height="90" rx="8" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
              <text x="105" y="261" text-anchor="middle" font-size="12" font-weight="700" fill="#DB2777">Workshop 1</text>
              <text x="105" y="277" text-anchor="middle" font-size="10" fill="#EC4899">Sala Fechada</text>

              <rect x="185" y="220" width="130" height="90" rx="8" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
              <text x="250" y="261" text-anchor="middle" font-size="12" font-weight="700" fill="#DB2777">Workshop 2</text>
              <text x="250" y="277" text-anchor="middle" font-size="10" fill="#EC4899">Sala Fechada</text>

              <!-- Expositors area -->
              <rect x="330" y="160" width="370" height="200" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
              <text x="515" y="240" text-anchor="middle" font-size="14" font-weight="700" fill="#15803D">🏢 Área de Expositores</text>
              <text x="515" y="258" text-anchor="middle" font-size="11" fill="#22C55E">20 Stands · Patrocinadores</text>
              <!-- Stand grid -->
              ${Array.from({length:4}, (_,i) => Array.from({length:5}, (_,j) => `
                <rect x="${345+j*68}" y="${270+i*20}" width="55" height="15" rx="3" fill="${['#DBEAFE','#FEF3C7','#EDE9FE','#F0FDF4'][i]}" stroke="${['#93C5FD','#FCD34D','#C4B5FD','#86EFAC'][i]}" stroke-width="1"/>
              `).join('')).join('')}

              <!-- Food court -->
              <rect x="40" y="330" width="270" height="110" rx="8" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
              <text x="175" y="381" text-anchor="middle" font-size="14" font-weight="700" fill="#EA580C">🍽️ Praça de Alimentação</text>
              <text x="175" y="397" text-anchor="middle" font-size="11" fill="#F97316">Almoço · Coffee · Bar</text>

              <!-- VIP area -->
              <rect x="710" y="160" width="70" height="100" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2" stroke-dasharray="4"/>
              <text x="745" y="206" text-anchor="middle" font-size="10" font-weight="700" fill="#D97706">👑 VIP</text>

              <!-- Entrance -->
              <rect x="340" y="420" width="120" height="30" rx="6" fill="#0D1B2A" stroke="#1B4FCA" stroke-width="2"/>
              <text x="400" y="440" text-anchor="middle" font-size="12" font-weight="700" fill="white">🚪 ENTRADA</text>

              <!-- Bathrooms -->
              <rect x="720" y="300" width="60" height="35" rx="6" fill="#E0E7FF" stroke="#6366F1" stroke-width="1.5"/>
              <text x="750" y="322" text-anchor="middle" font-size="11" fill="#4F46E5">🚻 WC</text>

              <!-- Emergency exits -->
              <rect x="720" y="350" width="60" height="30" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
              <text x="750" y="369" text-anchor="middle" font-size="9" font-weight="700" fill="#DC2626">🚨 SAÍDA</text>

              <!-- Credentialing -->
              <rect x="500" y="420" width="120" height="30" rx="6" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2"/>
              <text x="560" y="440" text-anchor="middle" font-size="11" font-weight="700" fill="#1D4ED8">🪪 Credenciamento</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-header"><span class="card-title">Legenda</span></div>
          <div class="card-body" style="padding:16px;">
            ${[
              { color:'#DBEAFE', border:'#1D4ED8', icon:'🎭', label:'Palco Principal' },
              { color:'#EDE9FE', border:'#7C3AED', icon:'🎤', label:'Palco A' },
              { color:'#FEF3C7', border:'#D97706', icon:'🎤', label:'Palco B' },
              { color:'#FCE7F3', border:'#DB2777', icon:'📚', label:'Workshops' },
              { color:'#DCFCE7', border:'#16A34A', icon:'🏢', label:'Área de Expositores' },
              { color:'#FFF7ED', border:'#EA580C', icon:'🍽️', label:'Praça de Alimentação' },
              { color:'#FEF3C7', border:'#D97706', icon:'👑', label:'Área VIP' },
              { color:'#E0E7FF', border:'#6366F1', icon:'🚻', label:'Banheiros' },
              { color:'#FEE2E2', border:'#EF4444', icon:'🚨', label:'Saídas de Emergência' },
            ].map(l => `
              <div style="display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid #F1F5F9;">
                <div style="width:16px;height:16px;border-radius:4px;background:${l.color};border:1.5px solid ${l.border};flex-shrink:0;"></div>
                <span style="font-size:13px;">${l.icon} ${l.label}</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">📍 Seu Stand</span></div>
          <div class="card-body" style="padding:16px;">
            <p style="font-size:13px; color:#64748B; line-height:1.6;">Como participante, seu acesso é livre em todas as áreas públicas do evento.<br><br>Para encontrar um expositor específico, consulte a seção <strong>Patrocinadores</strong>.</p>
            <button class="btn btn-primary btn-sm" style="width:100%; margin-top:12px;" onclick="navigate('participant/sponsors')">Ver Expositores →</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── SPEAKERS ─── */
function participantSpeakers() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🎤 Palestrantes</h1>
      <p class="page-subtitle">${DATA.speakers.length} especialistas confirmados para o Viajaflux Summit 2026</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
      ${DATA.speakers.map(sp => `
      <div class="speaker-card" onclick="showSpeakerDetail(${sp.id})">
        <div style="padding:24px 24px 16px; text-align:center; background:linear-gradient(135deg,${sp.color}15,${sp.color}05); border-bottom:1px solid #F1F5F9;">
          <div class="avatar avatar-xl" style="background:${sp.color}20; color:${sp.color}; margin:0 auto 14px;">${sp.initials}</div>
          <h3 style="font-size:16px; font-weight:700;">${sp.name}</h3>
          <p style="font-size:12px; color:#64748B; margin-top:3px;">${sp.title} · ${sp.company}</p>
        </div>
        <div style="padding:16px 24px;">
          <p style="font-size:13.5px; font-weight:600; color:#1B4FCA; margin-bottom:8px;">📌 ${sp.topic}</p>
          <p style="font-size:12.5px; color:#64748B; line-height:1.6; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${sp.bio}</p>
          <div style="display:flex; gap:8px; margin-top:12px; flex-wrap:wrap;">
            <span class="badge badge-gray">⏰ ${sp.time}</span>
            <span class="badge badge-blue">${sp.room}</span>
          </div>
          <div style="display:flex; gap:8px; margin-top:12px;">
            <a href="${sp.linkedin}" class="btn btn-secondary btn-sm" onclick="event.stopPropagation()">in LinkedIn</a>
            <a href="${sp.instagram}" class="btn btn-secondary btn-sm" onclick="event.stopPropagation()">📷 Instagram</a>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function showSpeakerDetail(id) {
  const sp = DATA.speakers.find(s => s.id === id);
  if (!sp) return;
  openModal(`
  <div class="modal modal-lg" onclick="event.stopPropagation()">
    <div class="modal-header">
      <span class="modal-title">Perfil do Palestrante</span>
      <button class="btn btn-ghost btn-sm" data-close-modal>✕</button>
    </div>
    <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
      <div style="text-align:center; flex-shrink:0;">
        <div class="avatar" style="width:80px;height:80px;font-size:28px;background:${sp.color}20;color:${sp.color};margin:0 auto 10px;">${sp.initials}</div>
        <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin-top:8px;">
          <a href="${sp.linkedin}" class="btn btn-secondary btn-sm">in</a>
          <a href="${sp.instagram}" class="btn btn-secondary btn-sm">📷</a>
          <a href="${sp.twitter}" class="btn btn-secondary btn-sm">𝕏</a>
        </div>
      </div>
      <div style="flex:1; min-width:200px;">
        <h2 style="font-size:22px; font-weight:800;">${sp.name}</h2>
        <p style="font-size:14px; color:#64748B; margin-top:4px;">${sp.title} · ${sp.company}</p>
        <div style="display:flex; gap:8px; margin:12px 0; flex-wrap:wrap;">
          <span class="badge badge-blue">⏰ ${sp.time}</span>
          <span class="badge badge-purple">${sp.room}</span>
        </div>
        <div style="background:#EFF6FF; border-radius:10px; padding:14px; margin-bottom:14px;">
          <p style="font-size:12px; font-weight:700; color:#1B4FCA; text-transform:uppercase; letter-spacing:.5px;">Tema da Palestra</p>
          <p style="font-size:15px; font-weight:600; color:#0D1B2A; margin-top:4px;">${sp.topic}</p>
        </div>
        <p style="font-size:13.5px; color:#475569; line-height:1.75;">${sp.bio}</p>
      </div>
    </div>
  </div>`);
}

/* ─── SPONSORS ─── */
function participantSponsors() {
  const byQuota = (q) => DATA.sponsors.filter(s => s.quota === q);
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🏢 Patrocinadores & Expositores</h1>
      <p class="page-subtitle">${DATA.sponsors.length} empresas presentes no Viajaflux Summit 2026</p>
    </div>
    ${['Diamond','Gold','Silver','Bronze'].map(q => {
      const sp = byQuota(q);
      if (!sp.length) return '';
      return `
      <div style="margin-bottom:28px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
          ${quotaBadge(q)}
          <h2 style="font-size:16px; font-weight:700;">Cota ${q}</h2>
          <div class="divider" style="flex:1; margin:0;"></div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(${q==='Diamond'?'1':q==='Gold'?'2':'3'},1fr); gap:16px;">
          ${sp.map(s => `
          <div class="sponsor-card" style="${q==='Diamond'?'display:flex;align-items:center;gap:20px;text-align:left;padding:28px;':''}">
            <div class="sponsor-logo" style="background:linear-gradient(135deg,${s.color},${s.color}cc); ${q==='Diamond'?'width:90px;height:90px;font-size:28px;flex-shrink:0;':''}">
              ${s.initials}
            </div>
            <div style="${q==='Diamond'?'flex:1;':''}">
              <h3 style="font-size:${q==='Diamond'?'18':'15'}px; font-weight:700; margin-bottom:6px;">${s.name}</h3>
              <p style="font-size:12.5px; color:#64748B; line-height:1.6; margin-bottom:10px;">${s.description}</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:${q==='Diamond'?'flex-start':'center'};">
                ${quotaBadge(s.quota)}
                <span class="badge badge-gray">📍 ${s.stand}</span>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

/* ─── LIBRARY ─── */
function participantLibrary() {
  const activeTab = STATE.activeTab['library'] || 'all';
  const filtered = activeTab === 'all' ? DATA.library : DATA.library.filter(f => f.category === activeTab);
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📚 Biblioteca de Conteúdo</h1>
      <p class="page-subtitle">Materiais e apresentações das palestras</p>
    </div>

    <div class="tabs">
      ${[['all','Todos'],['slides','Slides'],['ebook','E-books']].map(([t,l]) => `
        <div class="tab ${activeTab===t?'active':''}" data-tab="${t}" data-group="library">${l}</div>`).join('')}
    </div>

    <div class="card">
      <div class="card-body">
        <div class="tab-panel" data-group="library" data-panel="${activeTab}">
          ${filtered.map(f => `
          <div class="file-item" style="cursor:pointer;" onclick="showToast('📥 Download iniciado: ${f.title}', 'success')">
            <div class="file-icon" style="background:${f.type==='pdf'?'#FEE2E2':'#DBEAFE'};">
              ${fileIcon(f.type)}
            </div>
            <div style="flex:1; min-width:0;">
              <div style="font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.title}</div>
              <div style="font-size:12px; color:#64748B; margin-top:2px;">${f.speaker} · ${f.size}</div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span class="badge badge-gray">${f.type.toUpperCase()}</span>
              <button class="btn btn-primary btn-sm">📥 Download</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── PHOTOS ─── */
function participantPhotos() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📷 Minhas Fotos</h1>
      <p class="page-subtitle">Fotos vinculadas ao seu QR Code individual</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <div class="card">
        <div class="card-header"><span class="card-title">🔲 Seu QR Code</span></div>
        <div class="card-body" style="text-align:center; padding:40px 24px;">
          <!-- QR Code SVG mockup -->
          <div style="width:160px; height:160px; margin:0 auto 16px; background:#0D1B2A; border-radius:12px; display:flex; align-items:center; justify-content:center; position:relative;">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <!-- QR code pattern (decorative) -->
              <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke="white" stroke-width="3"/>
              <rect x="18" y="18" width="24" height="24" rx="2" fill="white"/>
              <rect x="90" y="10" width="40" height="40" rx="4" fill="none" stroke="white" stroke-width="3"/>
              <rect x="98" y="18" width="24" height="24" rx="2" fill="white"/>
              <rect x="10" y="90" width="40" height="40" rx="4" fill="none" stroke="white" stroke-width="3"/>
              <rect x="18" y="98" width="24" height="24" rx="2" fill="white"/>
              ${Array.from({length:6}, (_,i) => Array.from({length:6}, (_,j) => Math.random()>.5 ? `<rect x="${52+j*6}" y="${52+i*6}" width="5" height="5" rx="1" fill="white"/>` : '').join('')).join('')}
              <circle cx="70" cy="70" r="10" fill="#1B4FCA"/>
              <text x="70" y="75" text-anchor="middle" font-size="10" font-weight="900" fill="white">FS</text>
            </svg>
          </div>
          <p style="font-size:14px; font-weight:600;">Ana Lima</p>
          <p style="font-size:12px; color:#64748B; margin-top:2px;">ID: FS2025-1042</p>
          <div style="margin-top:16px; display:flex; gap:8px; justify-content:center;">
            <button class="btn btn-primary btn-sm" onclick="showToast('QR Code salvo na galeria! 📱','success')">💾 Salvar</button>
            <button class="btn btn-secondary btn-sm" onclick="showToast('QR Code compartilhado! 📤','info')">📤 Compartilhar</button>
          </div>
          <p style="font-size:12px; color:#94A3B8; margin-top:16px; line-height:1.6;">Apresente este QR Code aos fotógrafos do evento para que suas fotos sejam vinculadas automaticamente.</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">🖼️ Minhas Fotos (12)</span>
          <button class="btn btn-primary btn-sm" onclick="showToast('📥 Download de todas as fotos iniciado!','success')">📥 Baixar Todas</button>
        </div>
        <div class="card-body">
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
            ${Array.from({length:9}, (_,i) => `
            <div style="aspect-ratio:1; border-radius:8px; background:linear-gradient(135deg,${['#DBEAFE','#EDE9FE','#DCFCE7','#FEF3C7','#FCE7F3'][i%5]},${['#BFDBFE','#C4B5FD','#BBF7D0','#FDE68A','#FBCFE8'][i%5]}); display:flex; align-items:center; justify-content:center; font-size:28px; cursor:pointer; position:relative; overflow:hidden;"
              onclick="showToast('🖼️ Foto ampliada!','info')">
              🖼️
              <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent,rgba(0,0,0,.4)); padding:8px 6px 4px; font-size:10px; color:white;">Dia ${i<5?1:2}</div>
            </div>`).join('')}
          </div>
          <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:12px;" onclick="showToast('Carregando mais fotos...','info')">Carregar mais fotos</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── FAQ ─── */
function participantFAQ() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">❓ FAQ — Perguntas Frequentes</h1>
      <p class="page-subtitle">Tudo que você precisa saber sobre o Viajaflux Summit 2026</p>
    </div>
    <div style="max-width:760px;">
      ${DATA.faq.map(cat => `
      <div style="margin-bottom:28px;">
        <h2 style="font-size:15px; font-weight:700; margin-bottom:12px; color:#0D1B2A;">📂 ${cat.category}</h2>
        ${cat.items.map(item => `
        <div class="faq-item">
          <div class="faq-question">
            <span>${item.q}</span>
            <span style="color:#94A3B8; font-size:18px; transition:transform .2s;">⌄</span>
          </div>
          <div class="faq-answer">${item.a}</div>
        </div>`).join('')}
      </div>`).join('')}

      <div class="card" style="margin-top:24px;">
        <div class="card-body" style="text-align:center; padding:32px;">
          <p style="font-size:32px; margin-bottom:12px;">💬</p>
          <h3 style="font-size:16px; font-weight:700; margin-bottom:8px;">Não encontrou o que procura?</h3>
          <p style="font-size:14px; color:#64748B; margin-bottom:20px;">Nossa equipe está disponível para ajudar durante o evento.</p>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="showToast('Abrindo WhatsApp de suporte...','info')">📱 WhatsApp</button>
            <button class="btn btn-secondary" onclick="showToast('Abrindo e-mail de suporte...','info')">✉️ E-mail</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── SURVEY ─── */
function participantSurvey() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">⭐ Pesquisa de Satisfação</h1>
      <p class="page-subtitle">Sua opinião é fundamental para evoluirmos a cada edição</p>
    </div>
    <div style="max-width:680px;">
      <form id="survey-form">
        <!-- NPS -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header"><span class="card-title">📊 NPS — Net Promoter Score</span></div>
          <div class="card-body">
            <p style="font-size:14px; color:#475569; margin-bottom:16px;">Em uma escala de 0 a 10, o quanto você recomendaria o Viajaflux Summit a um amigo ou colega?</p>
            <input type="hidden" id="nps-hidden" name="nps" value="">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${Array.from({length:11}, (_,i) => `
              <button type="button" class="nps-btn" data-score="${i}" style="
                width:44px; height:44px; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer;
                background:${i<=6?'#FEE2E2':i<=8?'#FEF3C7':'#D1FAE5'};
                color:${i<=6?'#991B1B':i<=8?'#92400E':'#065F46'};
                border:2px solid ${i<=6?'#FECACA':i<=8?'#FDE68A':'#A7F3D0'};
                transition:all .15s;
              ">
                ${i}
              </button>`).join('')}
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:11px; color:#94A3B8;">
              <span>0 — Muito improvável</span><span>10 — Com certeza!</span>
            </div>
          </div>
        </div>

        <!-- Avaliações -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header"><span class="card-title">Avaliação por Categoria</span></div>
          <div class="card-body">
            ${[
              { key:'event',    label:'Evento Geral',        icon:'🏆' },
              { key:'structure',label:'Estrutura & Espaço',  icon:'🏗️' },
              { key:'org',      label:'Organização',          icon:'⚙️' },
              { key:'content',  label:'Conteúdo Programático',icon:'📚' },
              { key:'food',     label:'Alimentação',          icon:'🍽️' },
            ].map(cat => `
            <div style="display:flex; align-items:center; gap:16px; padding:12px 0; border-bottom:1px solid #F1F5F9;">
              <span style="font-size:20px; width:28px;">${cat.icon}</span>
              <span style="flex:1; font-size:14px; font-weight:500;">${cat.label}</span>
              <div style="display:flex; gap:4px;">
                ${Array.from({length:5}, (_,i) => `
                <input type="radio" name="r_${cat.key}" value="${i+1}" id="r_${cat.key}_${i}" style="display:none;">
                <label for="r_${cat.key}_${i}" style="font-size:22px; cursor:pointer; filter:grayscale(1); transition:filter .15s;" onmouseover="this.style.filter=''" onmouseout="if(!document.getElementById('r_${cat.key}_${i}').checked)this.style.filter='grayscale(1)'">⭐</label>
                `).join('')}
              </div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Comentários -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-header"><span class="card-title">💬 Comentários & Sugestões</span></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">O que você mais gostou no evento?</label>
              <textarea class="form-textarea" placeholder="Compartilhe os pontos positivos..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">O que podemos melhorar?</label>
              <textarea class="form-textarea" placeholder="Suas sugestões são muito valiosas..."></textarea>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Alguma palestra foi especialmente marcante? Qual e por quê?</label>
              <textarea class="form-textarea" placeholder="Conte-nos sobre a palestra que mais impactou você..."></textarea>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button type="submit" class="btn btn-primary btn-lg">⭐ Enviar Pesquisa</button>
        </div>
      </form>
    </div>
  </div>`;
}

/* ─── NOTIFICATIONS ─── */
function participantNotifications() {
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:center; justify-content:space-between;">
      <div>
        <h1 class="page-title">🔔 Notificações</h1>
        <p class="page-subtitle">${DATA.notifications.filter(n=>!n.read).length} não lidas</p>
      </div>
      <button class="btn btn-secondary" onclick="showToast('Todas as notificações marcadas como lidas.','info')">✓ Marcar todas como lidas</button>
    </div>

    <div style="max-width:680px;">
      ${DATA.notifications.map(n => {
        const colors = { info:'#3B82F6', warning:'#F59E0B', success:'#10B981', danger:'#EF4444' };
        const icons  = { info:'ℹ️', warning:'⚠️', success:'✅', danger:'🚨' };
        return `
        <div class="notif-item ${n.read?'':'unread'}" style="margin-bottom:10px; border-left:3px solid ${colors[n.type]||colors.info};">
          <div style="font-size:22px; flex-shrink:0;">${icons[n.type]||'🔔'}</div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:14px; font-weight:600;">${n.title}</span>
              ${!n.read ? `<span class="badge badge-red" style="font-size:10px;">Nova</span>` : ''}
            </div>
            <p style="font-size:13px; color:#475569; line-height:1.6;">${n.message}</p>
            <span style="font-size:11px; color:#94A3B8; margin-top:4px; display:block;">⏰ ${n.time}</span>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}
