/* ============================================================
   FLY SUMMIT — Utilities & Shared Helpers
   ============================================================ */

/* ─── STATE ─── */
const STATE = {
  user: null,
  route: 'login',
  activeTab: {},
  charts: {},
  sidebarOpen: false,
};

/* ─── ROUTER ─── */
function navigate(route, opts = {}) {
  // Destroy old charts to prevent canvas reuse errors
  Object.values(STATE.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  STATE.charts = {};
  STATE.route = route;
  STATE.activeTab = {};
  render();
  window.scrollTo(0, 0);
  const mc = document.querySelector('.main-content');
  if (mc) mc.scrollTop = 0;
}

/* ─── RENDER ─── */
function render() {
  const app = document.getElementById('app');
  if (!STATE.user) {
    app.innerHTML = renderLogin();
    bindLoginEvents();
  } else {
    app.innerHTML = renderShell();
    bindNavEvents();
    renderView();
  }
}

function renderView() {
  const main = document.getElementById('main-view');
  if (!main) return;
  const role = STATE.user.role;
  const route = STATE.route;

  let html = '';
  if (role === 'participant')   html = renderParticipantView(route);
  else if (role === 'sponsor')  html = renderSponsorView(route);
  else if (role === 'organization') html = renderOrgView(route);
  else if (role === 'service')  html = renderServiceView(route);

  main.innerHTML = '<div class="fade-in">' + html + '</div>';
  bindViewEvents(role, route);
  initCharts(role, route);
}

/* ─── APP SHELL ─── */
function renderShell() {
  const u = STATE.user;
  const navItems = getNavItems(u.role);
  const topbarTitle = getRouteTitle(STATE.route);

  return `
  <div style="display:flex; height:100vh;">
    <!-- Sidebar -->
    <aside class="sidebar ${STATE.sidebarOpen ? 'open' : ''}" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-mark">
          <img src="assets/logo-viajaflux.png" alt="Viajaflux Summit" style="height:30px; width:auto; max-width:160px; object-fit:contain;">
        </div>
      </div>

      <nav style="flex:1; padding: 8px 0;">
        ${navItems.map(item => {
          if (item.section) return `<div class="nav-section">${item.section}</div>`;
          const active = STATE.route === item.route ? 'active' : '';
          const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
          // For org sub-roles, show lock icon on read-only sections
          const sectionKey = item.route ? item.route.replace('org/','') : '';
          const isOrgSubRole = STATE.user && STATE.user.role === 'organization' && STATE.user.subRole;
          const lockIcon = isOrgSubRole && item.route && item.route.startsWith('org/') && !canEdit(sectionKey)
            ? `<span style="font-size:11px; color:rgba(255,255,255,.25); margin-left:auto;" title="Somente visualização">🔒</span>`
            : '';
          return `
          <div class="nav-item ${active}" onclick="navigate('${item.route}')">
            <span style="font-size:16px;">${item.icon}</span>
            <span>${item.label}</span>
            ${badge}${lockIcon}
          </div>`;
        }).join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user" onclick="showUserMenu()">
          <div class="avatar" style="background:${u.color}20; color:${u.color};">${u.initials}</div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:13px; font-weight:600; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.name}</div>
            <div style="font-size:11px; color:rgba(255,255,255,.4);">${u.subRole ? subRoleLabel(u.subRole) : roleLabel(u.role)}</div>
          </div>
          <span style="color:rgba(255,255,255,.3); font-size:12px;">⚙</span>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <div class="main-content" style="flex:1; min-width:0;">
      <!-- Topbar -->
      <header class="topbar">
        <div style="display:flex; align-items:center; gap:12px;">
          <button class="btn btn-ghost btn-sm" style="display:none;" id="menu-toggle" onclick="toggleSidebar()">☰</button>
          <span class="topbar-title">${topbarTitle}</span>
          <span class="live-dot" title="Ao vivo"></span>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-ghost btn-sm" onclick="navigate('${notifRoute(u.role)}')">
            🔔 <span style="background:#EF4444; color:white; border-radius:99px; padding:0 6px; font-size:11px; font-weight:700;">3</span>
          </button>
          <div class="avatar" style="background:${u.color}20; color:${u.color}; cursor:pointer;" title="${u.name}">${u.initials}</div>
          <button class="btn btn-ghost btn-sm" onclick="logout()" title="Sair">⏏</button>
        </div>
      </header>

      <!-- View content -->
      <div id="main-view" style="flex:1; overflow:auto;"></div>
    </div>
  </div>
  `;
}

/* ─── NAV CONFIG ─── */
function getNavItems(role) {
  if (role === 'participant') return [
    { section: 'INÍCIO' },
    { icon: '🏠', label: 'Home', route: 'participant/home' },
    { icon: '🔔', label: 'Notificações', route: 'participant/notifications', badge: '3' },
    { section: 'EVENTO' },
    { icon: '📅', label: 'Agenda', route: 'participant/agenda' },
    { icon: '🗺️', label: 'Mapa do Evento', route: 'participant/map' },
    { icon: '🎤', label: 'Palestrantes', route: 'participant/speakers' },
    { icon: '🏢', label: 'Patrocinadores', route: 'participant/sponsors' },
    { section: 'CONTEÚDO' },
    { icon: '📚', label: 'Biblioteca', route: 'participant/library' },
    { icon: '📷', label: 'Minhas Fotos', route: 'participant/photos' },
    { section: 'SUPORTE' },
    { icon: '❓', label: 'FAQ', route: 'participant/faq' },
    { icon: '⭐', label: 'Pesquisa de Satisfação', route: 'participant/survey' },
  ];

  if (role === 'sponsor') return [
    { section: 'VISÃO GERAL' },
    { icon: '📊', label: 'Dashboard', route: 'sponsor/dashboard' },
    { icon: '✅', label: 'Checklist', route: 'sponsor/checklist' },
    { section: 'DOCUMENTOS' },
    { icon: '📋', label: 'Proposta', route: 'sponsor/proposal' },
    { icon: '📝', label: 'Dados para Contrato', route: 'sponsor/contract-data' },
    { icon: '🔏', label: 'Contrato', route: 'sponsor/contract' },
    { icon: '📬', label: 'Mailing', route: 'sponsor/mailing' },
    { section: 'EVENTO' },
    { icon: '📅', label: 'Cronograma', route: 'sponsor/schedule' },
    { icon: '🗺️', label: 'Mapa / Stand', route: 'sponsor/map' },
    { section: 'GESTÃO' },
    { icon: '🎟️', label: 'Convites', route: 'sponsor/invites' },
    { icon: '👥', label: 'Equipe', route: 'sponsor/team' },
    { icon: '🎤', label: 'Palestrante', route: 'sponsor/speaker-upload' },
    { section: 'UPLOADS' },
    { icon: '📤', label: 'Apresentação', route: 'sponsor/presentation' },
    { icon: '🏗️', label: 'Design do Stand', route: 'sponsor/stand-design' },
    { icon: '🔍', label: 'Aprovações', route: 'sponsor/approvals' },
  ];

  if (role === 'organization') return [
    { section: 'VISÃO GERAL' },
    { icon: '📊', label: 'Dashboard Executivo', route: 'org/dashboard' },
    { section: 'GESTÃO' },
    { icon: '👥', label: 'Participantes', route: 'org/participants' },
    { icon: '🏢', label: 'Patrocinadores', route: 'org/sponsors' },
    { icon: '⚙️', label: 'Operacional', route: 'org/operations' },
    { section: 'COMUNICAÇÃO' },
    { icon: '📣', label: 'Comunicação', route: 'org/communication' },
    { icon: '⭐', label: 'NPS & Feedbacks', route: 'org/nps' },
    { section: 'ARQUIVOS' },
    { icon: '🗂️', label: 'Central de Arquivos', route: 'org/files' },
    { icon: '📈', label: 'Relatórios', route: 'org/reports' },
  ];

  if (role === 'service') return [
    { section: 'VISÃO GERAL' },
    { icon: '📊', label: 'Dashboard', route: 'service/dashboard' },
    { section: 'EVENTO' },
    { icon: '📅', label: 'Cronograma', route: 'service/schedule' },
    { icon: '🗺️', label: 'Planta Técnica', route: 'service/map' },
    { section: 'DOCUMENTOS' },
    { icon: '📋', label: 'Contrato de Serviço', route: 'service/contract' },
    { icon: '📤', label: 'Enviar Documentos', route: 'service/upload' },
  ];
  return [];
}

function getRouteTitle(route) {
  const map = {
    'participant/home': 'Home', 'participant/agenda': 'Agenda', 'participant/map': 'Mapa do Evento',
    'participant/speakers': 'Palestrantes', 'participant/sponsors': 'Patrocinadores & Expositores',
    'participant/library': 'Biblioteca de Conteúdo', 'participant/photos': 'Minhas Fotos',
    'participant/faq': 'FAQ', 'participant/survey': 'Pesquisa de Satisfação',
    'participant/notifications': 'Notificações',
    'sponsor/dashboard': 'Dashboard', 'sponsor/checklist': 'Checklist',
    'sponsor/proposal': 'Proposta', 'sponsor/contract-data': 'Dados para Contrato',
    'sponsor/contract': 'Contrato', 'sponsor/mailing': 'Mailing',
    'sponsor/schedule': 'Cronograma', 'sponsor/map': 'Mapa / Stand',
    'sponsor/invites': 'Gestão de Convites', 'sponsor/team': 'Upload da Equipe',
    'sponsor/speaker-upload': 'Cadastro de Palestrante', 'sponsor/presentation': 'Upload de Apresentação',
    'sponsor/stand-design': 'Design do Stand', 'sponsor/approvals': 'Aprovações',
    'org/dashboard': 'Dashboard Executivo', 'org/participants': 'Gestão de Participantes',
    'org/sponsors': 'Gestão de Patrocinadores', 'org/operations': 'Gestão Operacional',
    'org/communication': 'Central de Comunicação', 'org/nps': 'NPS & Feedbacks',
    'org/files': 'Central de Arquivos', 'org/reports': 'Relatórios',
    'service/dashboard': 'Dashboard', 'service/schedule': 'Cronograma',
    'service/map': 'Planta Técnica', 'service/contract': 'Contrato de Serviço',
    'service/upload': 'Enviar Documentos',
  };
  return map[route] || 'Viajaflux Summit';
}

function notifRoute(role) {
  if (role === 'participant') return 'participant/notifications';
  if (role === 'organization') return 'org/communication';
  return 'sponsor/dashboard';
}

function roleLabel(role) {
  const m = { participant: 'Participante', sponsor: 'Patrocinador', organization: 'Organização', service: 'Prestador de Serviço' };
  return m[role] || role;
}

/* ─── BIND NAV EVENTS ─── */
function bindNavEvents() {
  const mt = document.getElementById('menu-toggle');
  if (mt) {
    if (window.innerWidth < 768) mt.style.display = 'flex';
  }
}

function toggleSidebar() {
  STATE.sidebarOpen = !STATE.sidebarOpen;
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open', STATE.sidebarOpen);
}

/* ─── AUTH ─── */
function bindLoginEvents() {
  const form = document.getElementById('login-form');
  if (form) form.addEventListener('submit', e => { e.preventDefault(); doLogin(); });

  document.querySelectorAll('.demo-account').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('email').value = el.dataset.email;
      document.getElementById('password').value = '123456';
    });
  });
}

function doLogin() {
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value;
  const user  = DATA.users.find(u => u.email === email && u.password === pass);
  if (!user) { showToast('E-mail ou senha inválidos.', 'error'); return; }
  STATE.user = user;
  const defaultRoute = { participant: 'participant/home', sponsor: 'sponsor/dashboard', organization: 'org/dashboard', service: 'service/dashboard' };
  STATE.route = user.subRole ? subRoleHomeRoute(user.subRole) : defaultRoute[user.role];
  render();
  showToast(`Bem-vindo(a), ${user.name.split(' ')[0]}! 👋`, 'success');
}

function logout() {
  STATE.user = null;
  STATE.route = 'login';
  render();
}

/* ─── BIND VIEW EVENTS ─── */
function bindViewEvents(role, route) {
  // FAQ toggles
  document.querySelectorAll('.faq-question').forEach(el => {
    el.addEventListener('click', () => el.parentElement.classList.toggle('open'));
  });

  // Tabs — update state and re-render view so filtered content reflects new tab
  document.querySelectorAll('.tab[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
      const group = el.dataset.group || 'default';
      const tab   = el.dataset.tab;
      STATE.activeTab[group] = tab;
      renderView();
    });
  });

  // Checklist toggles
  document.querySelectorAll('.check-item[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id);
      const item = DATA.checklist.find(c => c.id === id);
      if (item) {
        item.done = !item.done;
        renderView();
        showToast(item.done ? '✅ Item marcado como concluído!' : 'Item desmarcado.', item.done ? 'success' : 'info');
      }
    });
  });

  // Modal close
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => { document.getElementById('modal-root').innerHTML = ''; });
  });

  // Generic add/remove row buttons
  bindTableActions();
  bindSurveyEvents();
}

function bindTableActions() {
  // invite actions
  document.querySelectorAll('[data-invite-action]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.dataset.inviteAction;
      if (action === 'add') showAddInviteModal();
      if (action === 'send') { showToast('Convite enviado por e-mail! 📧', 'success'); }
    });
  });

  // team add
  document.querySelector('[data-team-add]')?.addEventListener('click', showAddTeamModal);
}

function bindSurveyEvents() {
  const form = document.getElementById('survey-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Pesquisa enviada! Obrigado pelo feedback. ⭐', 'success');
    form.reset();
    document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected'));
  });

  document.querySelectorAll('.nps-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('nps-hidden')?.setAttribute('value', btn.dataset.score);
    });
  });
}

/* ─── CHARTS INIT ─── */
function initCharts(role, route) {
  if (role === 'organization' && route === 'org/dashboard') initOrgCharts();
  if (role === 'organization' && route === 'org/nps')       initNpsCharts();
  if (role === 'organization' && route === 'org/reports')   initReportCharts();
}

/* ─── TOAST ─── */
function showToast(msg, type = 'info') {
  const root = document.getElementById('toast-root');
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  root.innerHTML = `<div class="toast ${type}">${icons[type] || ''} ${msg}</div>`;
  setTimeout(() => { if (root) root.innerHTML = ''; }, 3200);
}

/* ─── MODAL HELPER ─── */
function openModal(html) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="modal-overlay" onclick="closeModalOnOverlay(event)">${html}</div>`;
  root.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', () => root.innerHTML = ''));
}
function closeModalOnOverlay(e) {
  if (e.target === e.currentTarget) document.getElementById('modal-root').innerHTML = '';
}

/* ─── USER MENU ─── */
function showUserMenu() {
  const u = STATE.user;
  const isOrgAdmin = u.role === 'organization' && !u.subRole;
  openModal(`
  <div class="modal" style="max-width:340px;" onclick="event.stopPropagation()">
    <div style="text-align:center; padding-bottom:20px; border-bottom:1px solid #E2E8F0; margin-bottom:20px;">
      <div class="avatar avatar-xl" style="background:${u.color}20; color:${u.color}; margin:0 auto 12px;">${u.initials}</div>
      <div style="font-size:17px; font-weight:700;">${u.name}</div>
      <div style="font-size:13px; color:#64748B;">${u.email}</div>
      <div style="margin-top:8px; display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
        <span class="badge badge-blue">${roleLabel(u.role)}</span>
        ${u.subRole ? `<span class="badge badge-amber">🔒 ${subRoleLabel(u.subRole)}</span>` : ''}
        ${isOrgAdmin ? `<span class="badge badge-purple">👑 Admin</span>` : ''}
      </div>
    </div>
    ${isOrgAdmin ? `
    <button class="btn btn-secondary" style="width:100%; margin-bottom:10px;" onclick="document.getElementById('modal-root').innerHTML=''; showAlcadaModal()">
      🔑 Gerenciar Alçadas
    </button>` : ''}
    <button class="btn btn-danger" style="width:100%;" onclick="logout()">⏏ Sair da plataforma</button>
  </div>`);
}

/* ─── ALÇADA MANAGEMENT MODAL (Admin only) ─── */
function showAlcadaModal() {
  const orgUsers = DATA.users.filter(u => u.role === 'organization');
  const subRoleOptions = [
    { value: '',                  label: '👑 Admin — Acesso total' },
    { value: 'org_sponsors',      label: '🏢 Alçada: Patrocinadores' },
    { value: 'org_participants',  label: '👥 Alçada: Participantes' },
  ];

  openModal(`
  <div class="modal modal-lg" onclick="event.stopPropagation()">
    <div class="modal-header">
      <span class="modal-title">🔑 Gerenciar Alçadas</span>
      <button class="btn btn-ghost btn-sm" data-close-modal>✕</button>
    </div>
    <p style="font-size:13.5px; color:#64748B; margin-bottom:20px;">
      Defina o nível de acesso de cada usuário da Organização. Usuários com alçada têm acesso de
      <strong>edição apenas na seção atribuída</strong> e <strong>somente visualização</strong> nas demais.
    </p>

    <!-- Existing users -->
    <h4 style="font-size:13px; font-weight:700; color:#0D1B2A; margin-bottom:12px; text-transform:uppercase; letter-spacing:.5px;">Usuários da Organização</h4>
    <div style="border:1px solid #E2E8F0; border-radius:10px; overflow:hidden; margin-bottom:24px;">
      ${orgUsers.map((u, i) => `
      <div style="display:flex; align-items:center; gap:14px; padding:14px 16px; ${i < orgUsers.length-1 ? 'border-bottom:1px solid #F1F5F9;' : ''}">
        <div class="avatar" style="background:${u.color}20; color:${u.color}; flex-shrink:0;">${u.initials}</div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:14px; font-weight:600;">${u.name}</div>
          <div style="font-size:12px; color:#64748B;">${u.email}</div>
        </div>
        <select class="form-select" style="width:220px; flex-shrink:0;" onchange="updateAlcada(${u.id}, this.value)">
          ${subRoleOptions.map(o => `<option value="${o.value}" ${(u.subRole||'') === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
      </div>`).join('')}
    </div>

    <!-- Add new org user -->
    <h4 style="font-size:13px; font-weight:700; color:#0D1B2A; margin-bottom:12px; text-transform:uppercase; letter-spacing:.5px;">Cadastrar Novo Usuário</h4>
    <form id="new-org-user-form">
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Nome *</label>
          <input id="new-org-name" class="form-input" placeholder="Nome completo" required>
        </div>
        <div class="form-group">
          <label class="form-label">E-mail *</label>
          <input id="new-org-email" type="email" class="form-input" placeholder="usuario@empresa.com" required>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Senha inicial *</label>
          <input id="new-org-pass" type="password" class="form-input" placeholder="••••••••" required>
        </div>
        <div class="form-group">
          <label class="form-label">Alçada</label>
          <select id="new-org-role" class="form-select">
            ${subRoleOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:4px;">
        <button type="button" class="btn btn-secondary" data-close-modal>Cancelar</button>
        <button type="submit" class="btn btn-primary">➕ Cadastrar Usuário</button>
      </div>
    </form>
  </div>`);

  document.getElementById('new-org-user-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('new-org-name').value.trim();
    const email   = document.getElementById('new-org-email').value.trim();
    const subRole = document.getElementById('new-org-role').value || null;
    const colors  = ['#1B4FCA','#7C3AED','#059669','#D97706','#EF4444'];
    const newUser = {
      id:       DATA.users.length + 1,
      name,
      email,
      password: document.getElementById('new-org-pass').value,
      role:     'organization',
      subRole,
      initials: name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
      color:    colors[DATA.users.length % colors.length],
      company:  'Viajaflux',
    };
    DATA.users.push(newUser);
    document.getElementById('modal-root').innerHTML = '';
    showToast(`✅ Usuário "${name}" cadastrado com alçada: ${subRoleOptions.find(o=>o.value===(subRole||'')).label}`, 'success');
  });
}

function updateAlcada(userId, newSubRole) {
  const user = DATA.users.find(u => u.id === userId);
  if (!user) return;
  const prev = user.subRole;
  user.subRole = newSubRole || null;
  const labels = { '': 'Admin (acesso total)', 'org_sponsors': 'Alçada Patrocinadores', 'org_participants': 'Alçada Participantes' };
  showToast(`🔑 ${user.name}: alçada alterada para "${labels[newSubRole] || 'Admin'}"`, 'success');
  // If this is the currently logged-in user, update state too
  if (STATE.user && STATE.user.id === userId) {
    STATE.user.subRole = user.subRole;
  }
}

/* ─── ADD INVITE MODAL ─── */
function showAddInviteModal() {
  openModal(`
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header">
      <span class="modal-title">Adicionar Convidado</span>
      <button class="btn btn-ghost btn-sm" data-close-modal>✕</button>
    </div>
    <form id="add-invite-form">
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" placeholder="Nome completo" required></div>
        <div class="form-group"><label class="form-label">Empresa *</label><input class="form-input" placeholder="Empresa" required></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Cargo</label><input class="form-input" placeholder="Cargo"></div>
        <div class="form-group"><label class="form-label">Categoria</label>
          <select class="form-select"><option>Standard</option><option>Executive</option><option>VIP</option></select>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">E-mail *</label><input type="email" class="form-input" placeholder="email@empresa.com" required></div>
        <div class="form-group"><label class="form-label">Telefone</label><input class="form-input" placeholder="(11) 99999-9999"></div>
      </div>
      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:8px;">
        <button type="button" class="btn btn-secondary" data-close-modal>Cancelar</button>
        <button type="submit" class="btn btn-primary">📧 Enviar Convite</button>
      </div>
    </form>
  </div>`);
  document.getElementById('add-invite-form')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('modal-root').innerHTML = '';
    showToast('Convite enviado com sucesso! 🎉', 'success');
  });
}

function showAddTeamModal() {
  openModal(`
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header">
      <span class="modal-title">Cadastrar Membro da Equipe</span>
      <button class="btn btn-ghost btn-sm" data-close-modal>✕</button>
    </div>
    <form id="add-team-form">
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" placeholder="Nome completo" required></div>
        <div class="form-group"><label class="form-label">Cargo *</label><input class="form-input" placeholder="Cargo na equipe" required></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Cidade de Origem</label><input class="form-input" placeholder="Cidade"></div>
        <div class="form-group"><label class="form-label">Data de Chegada</label><input type="date" class="form-input"></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Horário de Chegada</label><input type="time" class="form-input"></div>
        <div class="form-group"><label class="form-label">Data de Saída</label><input type="date" class="form-input"></div>
      </div>
      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:8px;">
        <button type="button" class="btn btn-secondary" data-close-modal>Cancelar</button>
        <button type="submit" class="btn btn-primary">✅ Cadastrar</button>
      </div>
    </form>
  </div>`);
  document.getElementById('add-team-form')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('modal-root').innerHTML = '';
    showToast('Membro da equipe cadastrado! 👥', 'success');
  });
}

/* ─── COUNTDOWN ─── */
function getCountdown() {
  const now = new Date();
  const target = DATA.event.date;
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
    past: false,
  };
}

/* ─── PERMISSIONS / ALÇADA ─── */

// Sections that have edit controls
const SECTIONS = ['dashboard','participants','sponsors','operations','communication','nps','files','reports'];

// Returns true if the current org user can perform write/edit actions in a section
function canEdit(section) {
  const u = STATE.user;
  if (!u || u.role !== 'organization') return false;
  if (!u.subRole) return true; // Admin — full access
  if (u.subRole === 'org_sponsors'     && section === 'sponsors')     return true;
  if (u.subRole === 'org_participants' && section === 'participants')  return true;
  return false; // All other sections are read-only for sub-role users
}

// Returns true if the current org user can see a nav section at all
function canView(section) {
  const u = STATE.user;
  if (!u || u.role !== 'organization') return false;
  return true; // All org users can view all sections (read-only where canEdit=false)
}

// Renders a "read-only" banner to show at the top of restricted views
function readOnlyBanner() {
  return `
  <div style="display:flex; align-items:center; gap:10px; padding:10px 16px; background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; margin-bottom:20px;">
    <span style="font-size:18px;">🔒</span>
    <div>
      <span style="font-size:13.5px; font-weight:600; color:#92400E;">Somente visualização</span>
      <span style="font-size:13px; color:#78350F; margin-left:6px;">— Sua alçada não permite edições nesta seção.</span>
    </div>
  </div>`;
}

// Label for sub-role displayed in sidebar footer
function subRoleLabel(subRole) {
  const m = {
    'org_sponsors':    'Alçada: Patrocinadores',
    'org_participants':'Alçada: Participantes',
  };
  return m[subRole] || 'Administrador';
}

// Which org route a sub-role "owns" (has edit access to)
function subRoleHomeRoute(subRole) {
  if (subRole === 'org_sponsors')    return 'org/sponsors';
  if (subRole === 'org_participants') return 'org/participants';
  return 'org/dashboard';
}

/* ─── HELPERS ─── */
function quotaBadge(quota) {
  const cls = { Diamond: 'badge-diamond', Gold: 'badge-gold', Silver: 'badge-silver', Bronze: 'badge-bronze' };
  return `<span class="badge ${cls[quota] || 'badge-gray'}">${quota}</span>`;
}

function statusBadge(status) {
  const map = {
    registered:  ['badge-blue',  'Inscrito'],
    confirmed:   ['badge-green', 'Confirmado'],
    checkin:     ['badge-navy',  'Check-in ✓'],
    sent:        ['badge-amber', 'Enviado'],
    pending:     ['badge-gray',  'Pendente'],
    approved:    ['badge-green', 'Aprovado'],
    review:      ['badge-blue',  'Em Análise'],
    changes:     ['badge-amber', 'Ajustes'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

function sessionTypeBadge(type) {
  const m = { keynote: ['badge-amber','Keynote'], talk: ['badge-blue','Palestra'], workshop: ['badge-purple','Workshop'], break: ['badge-green','Intervalo'] };
  const [cls, lbl] = m[type] || ['badge-gray', type];
  return `<span class="badge ${cls}">${lbl}</span>`;
}

function fileIcon(type) {
  const m = { pdf: '📄', pptx: '📊', ppt: '📊', xlsx: '📋', xls: '📋', svg: '🎨', ai: '🎨', zip: '🗜️', mp4: '🎥' };
  return m[type] || '📁';
}

function fmtCurrency(n) {
  return 'R$ ' + n.toLocaleString('pt-BR');
}

function approvalStatusBadge(status) {
  const m = { approved: ['badge-green','✅ Aprovado'], review: ['badge-blue','🔍 Em Análise'], changes: ['badge-amber','⚠️ Ajustes'], pending: ['badge-gray','⏳ Pendente'] };
  const [cls, lbl] = m[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${lbl}</span>`;
}
