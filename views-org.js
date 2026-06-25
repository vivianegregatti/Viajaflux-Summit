/* ============================================================
   FLY SUMMIT — Organization Views
   ============================================================ */

function renderOrgView(route) {
  const views = {
    'org/dashboard':    orgDashboard,
    'org/participants': orgParticipants,
    'org/sponsors':     orgSponsors,
    'org/operations':   orgOperations,
    'org/communication':orgCommunication,
    'org/nps':          orgNPS,
    'org/files':        orgFiles,
    'org/reports':      orgReports,
  };
  return (views[route] || orgDashboard)();
}

/* ─── DASHBOARD ─── */
function orgDashboard() {
  const m = DATA.metrics;
  const editable = canEdit('dashboard');
  return `
  <div class="page">
    ${!editable ? readOnlyBanner() : ''}
    <!-- Hero -->
    <div class="hero-banner" style="margin-bottom:24px;">
      <div style="position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
        <div>
          <p style="font-size:11px; opacity:.6; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Dashboard Executivo</p>
          <h1 style="font-size:24px; font-weight:800;">Viajaflux Summit 2026</h1>
          <p style="font-size:14px; opacity:.7; margin-top:4px;">Campos do Jordão · 14–15 Set 2026</p>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <div style="text-align:center; background:rgba(255,255,255,.1); border-radius:12px; padding:14px 18px;">
            <div style="font-size:26px; font-weight:800;">${getCountdown().days}</div>
            <div style="font-size:11px; opacity:.6; text-transform:uppercase;">dias</div>
          </div>
          <div style="text-align:center; background:rgba(255,255,255,.1); border-radius:12px; padding:14px 18px;">
            <div style="font-size:26px; font-weight:800;">${m.nps}</div>
            <div style="font-size:11px; opacity:.6; text-transform:uppercase;">NPS</div>
          </div>
          <div style="text-align:center; background:rgba(255,255,255,.1); border-radius:12px; padding:14px 18px;">
            <div style="font-size:26px; font-weight:800;">${m.engagementRate}%</div>
            <div style="font-size:11px; opacity:.6; text-transform:uppercase;">engajamento</div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPIs Row 1: Participants -->
    <div style="margin-bottom:8px;"><p style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:1px;">👥 Participantes</p></div>
    <div class="grid-4" style="margin-bottom:20px;">
      ${[
        { label:'Inscritos', value: m.participants.registered, color:'#1B4FCA', pct:100, icon:'📝' },
        { label:'Confirmados', value: m.participants.confirmed, color:'#7C3AED', pct:Math.round(m.participants.confirmed/m.participants.registered*100), icon:'✅' },
        { label:'Credenciados', value: m.participants.credentialed, color:'#F59E0B', pct:Math.round(m.participants.credentialed/m.participants.registered*100), icon:'🪪' },
        { label:'Presentes', value: m.participants.present, color:'#10B981', pct:Math.round(m.participants.present/m.participants.registered*100), icon:'🎯' },
      ].map(s => `
      <div class="stat-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <span style="font-size:22px;">${s.icon}</span>
          <span style="font-size:13px; font-weight:700; color:${s.color};">${s.pct}%</span>
        </div>
        <div class="stat-value" style="color:${s.color}; font-size:30px;">${s.value.toLocaleString('pt-BR')}</div>
        <div class="stat-label">${s.label}</div>
        <div class="progress" style="margin-top:10px;"><div class="progress-bar" style="width:${s.pct}%; background:${s.color};"></div></div>
      </div>`).join('')}
    </div>

    <!-- KPIs Row 2: Sponsors -->
    <div style="margin-bottom:8px;"><p style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:1px;">🏢 Patrocinadores</p></div>
    <div class="grid-4" style="margin-bottom:24px;">
      <div class="stat-card stat-card-blue">
        <div style="font-size:12px; opacity:.8; margin-bottom:8px;">Total</div>
        <div class="stat-value">${m.sponsors.total}</div>
        <div style="font-size:12px; opacity:.7; margin-top:4px;">Empresas confirmadas</div>
      </div>
      <div class="stat-card stat-card-green">
        <div style="font-size:12px; opacity:.8; margin-bottom:8px;">Receita</div>
        <div class="stat-value" style="font-size:22px;">R$ 1,14M</div>
        <div style="font-size:12px; opacity:.7; margin-top:4px;">Total contratado</div>
      </div>
      <div class="stat-card stat-card-amber">
        <div style="font-size:12px; opacity:.8; margin-bottom:8px;">Contratos</div>
        <div class="stat-value">${m.sponsors.contracts}<span style="font-size:18px; opacity:.7;">/${m.sponsors.total}</span></div>
        <div style="font-size:12px; opacity:.7; margin-top:4px;">${m.sponsors.pending} pendentes</div>
      </div>
      <div class="stat-card stat-card-purple">
        <div style="font-size:12px; opacity:.8; margin-bottom:8px;">NPS Geral</div>
        <div class="stat-value">${m.nps}</div>
        <div style="font-size:12px; opacity:.7; margin-top:4px;">Excelente 🏆</div>
      </div>
    </div>

    <!-- Charts -->
    <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:20px;">
      <div class="card">
        <div class="card-header"><span class="card-title">📈 Inscrições por Semana</span></div>
        <div class="card-body"><canvas id="chart-registrations" height="120"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">🏢 Cotas de Patrocínio</span></div>
        <div class="card-body"><canvas id="chart-quotas" height="180"></canvas></div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <!-- Sponsors table -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Patrocinadores</span>
          <button class="btn btn-ghost btn-sm" onclick="navigate('org/sponsors')">Ver todos →</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Empresa</th><th>Cota</th><th>Status</th></tr></thead>
            <tbody>
              ${DATA.sponsors.slice(0,5).map(s => `
              <tr>
                <td><div style="display:flex; align-items:center; gap:8px;">
                  <div class="avatar avatar-sm" style="background:${s.color}20; color:${s.color};">${s.initials}</div>
                  <span style="font-weight:500;">${s.name}</span>
                </div></td>
                <td>${quotaBadge(s.quota)}</td>
                <td>${s.contracted ? '<span class="badge badge-green">✓ Assinado</span>' : '<span class="badge badge-amber">Pendente</span>'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent participants -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Últimas Inscrições</span>
          <button class="btn btn-ghost btn-sm" onclick="navigate('org/participants')">Ver todas →</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Participante</th><th>Status</th></tr></thead>
            <tbody>
              ${DATA.participants.slice(0,6).map(p => `
              <tr>
                <td><div style="font-weight:500;">${p.name}</div><div style="font-size:12px; color:#64748B;">${p.company}</div></td>
                <td>${statusBadge(p.status)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

function initOrgCharts() {
  const ctx1 = document.getElementById('chart-registrations');
  const ctx2 = document.getElementById('chart-quotas');
  if (!ctx1 || !ctx2) return;

  STATE.charts['registrations'] = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['Jul/1','Jul/8','Jul/15','Jul/22','Ago/1','Ago/8','Ago/15','Ago/22','Set/1','Set/8'],
      datasets: [{
        label: 'Inscrições',
        data: [45, 82, 130, 195, 310, 420, 560, 680, 780, 847],
        borderColor: '#1B4FCA',
        backgroundColor: 'rgba(27,79,202,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#1B4FCA',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: false, grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });

  STATE.charts['quotas'] = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Diamond', 'Gold', 'Silver', 'Bronze'],
      datasets: [{
        data: [1, 2, 2, 3],
        backgroundColor: ['#1B4FCA', '#D97706', '#94A3B8', '#92400E'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 12 } }
      }
    }
  });
}

/* ─── PARTICIPANTS ─── */
function orgParticipants() {
  const statusFilter = STATE.activeTab['participants'] || 'all';
  const filtered = statusFilter === 'all' ? DATA.participants : DATA.participants.filter(p => p.status === statusFilter);
  const editable = canEdit('participants');
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">👥 Gestão de Participantes</h1>
        <p class="page-subtitle">${DATA.participants.length} inscritos · ${DATA.participants.filter(p=>p.status==='checkin').length} credenciados</p>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
        <button class="btn btn-secondary" onclick="showToast('📥 Lista exportada!','success')">📥 Exportar</button>
        ${editable ? `
          <button class="btn btn-secondary" onclick="showToast('📤 Importando...','info')">📤 Importar Lista</button>
          <button class="btn btn-primary" onclick="showAddParticipantModal()">+ Cadastrar</button>
        ` : `<span class="badge badge-amber" style="font-size:13px; padding:8px 14px;">🔒 Somente visualização</span>`}
      </div>
    </div>
    ${!editable ? readOnlyBanner() : ''}

    <!-- Quick stats -->
    <div class="grid-4" style="margin-bottom:20px;">
      ${[
        { label:'Inscritos', n: DATA.participants.length, cls:'badge-gray' },
        { label:'Confirmados', n: DATA.participants.filter(p=>p.status==='confirmed').length, cls:'badge-green' },
        { label:'Check-in', n: DATA.participants.filter(p=>p.status==='checkin').length, cls:'badge-navy' },
        { label:'A confirmar', n: DATA.participants.filter(p=>p.status==='registered').length, cls:'badge-amber' },
      ].map(s => `<div class="stat-card" style="padding:16px; text-align:center;">
        <div style="font-size:28px; font-weight:800; margin-bottom:4px;">${s.n}</div>
        <div><span class="badge ${s.cls}">${s.label}</span></div>
      </div>`).join('')}
    </div>

    <div class="tabs">
      ${[['all','Todos'],['registered','Inscritos'],['confirmed','Confirmados'],['checkin','Check-in']].map(([t,l]) => `
        <div class="tab ${statusFilter===t?'active':''}" data-tab="${t}" data-group="participants">${l}</div>`).join('')}
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Participante</th><th>Empresa</th><th>Cidade</th><th>Ingresso</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>
            ${filtered.map(p => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:10px;">
                  <div class="avatar avatar-sm" style="background:#EFF6FF; color:#1B4FCA;">${p.name[0]}</div>
                  <div>
                    <div style="font-weight:600;">${p.name}</div>
                    <div style="font-size:12px; color:#64748B;">${p.email}</div>
                  </div>
                </div>
              </td>
              <td><div style="font-weight:500;">${p.company}</div><div style="font-size:12px; color:#64748B;">${p.role}</div></td>
              <td style="color:#64748B;">${p.city}</td>
              <td><span class="badge ${p.ticket==='VIP'?'badge-purple':p.ticket==='Premium'?'badge-blue':'badge-gray'}">${p.ticket}</span></td>
              <td>${statusBadge(p.status)}</td>
              <td>
                <div style="display:flex; gap:6px; align-items:center;">
                  ${editable
                    ? (p.status !== 'checkin'
                        ? `<button class="btn btn-success btn-sm" onclick="showToast('✅ Check-in realizado para ${p.name}!','success')">Check-in</button>`
                        : `<span class="badge badge-green" style="font-size:11px;">✓ OK</span>`)
                    : `<span style="font-size:12px; color:#94A3B8;">🔒</span>`}
                  ${editable ? `<button class="btn btn-ghost btn-sm" onclick="showToast('📧 E-mail enviado!','info')">📧</button>` : ''}
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function showAddParticipantModal() {
  openModal(`
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header"><span class="modal-title">Cadastrar Participante</span><button class="btn btn-ghost btn-sm" data-close-modal>✕</button></div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" placeholder="Nome completo" required></div>
      <div class="form-group"><label class="form-label">E-mail *</label><input type="email" class="form-input" placeholder="email@empresa.com" required></div>
    </div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Empresa</label><input class="form-input" placeholder="Empresa"></div>
      <div class="form-group"><label class="form-label">Cargo</label><input class="form-input" placeholder="Cargo"></div>
    </div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Cidade</label><input class="form-input" placeholder="Cidade"></div>
      <div class="form-group"><label class="form-label">Ingresso</label>
        <select class="form-select"><option>Standard</option><option>Premium</option><option>VIP</option></select>
      </div>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
      <button class="btn btn-secondary" data-close-modal>Cancelar</button>
      <button class="btn btn-primary" onclick="document.getElementById('modal-root').innerHTML=''; showToast('✅ Participante cadastrado!','success')">Cadastrar</button>
    </div>
  </div>`);
}

/* ─── SPONSORS ─── */
function orgSponsors() {
  const editable = canEdit('sponsors');
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">🏢 Gestão de Patrocinadores</h1>
        <p class="page-subtitle">Pipeline comercial e controle de contratos</p>
      </div>
      ${editable
        ? `<button class="btn btn-primary" onclick="showToast('➕ Abrindo cadastro de novo patrocinador...','info')">+ Novo Patrocinador</button>`
        : `<span class="badge badge-amber" style="font-size:13px; padding:8px 14px;">🔒 Somente visualização</span>`}
    </div>
    ${!editable ? readOnlyBanner() : ''}

    <!-- Revenue summary -->
    <div class="grid-4" style="margin-bottom:24px;">
      ${[
        ['💰','R$ 1,14M','Receita Total','stat-card-blue'],
        ['📋', DATA.sponsors.filter(s=>s.contracted).length + '/' + DATA.sponsors.length,'Contratos Assinados','stat-card-green'],
        ['⏳', DATA.sponsors.filter(s=>!s.contracted).length,'Pendentes','stat-card-amber'],
        ['📊','R$ 142,5K','Ticket Médio','stat-card-purple'],
      ].map(([i,v,l,cls]) => `
      <div class="stat-card ${cls}">
        <div style="font-size:11px; opacity:.8; margin-bottom:8px;">${i} ${l}</div>
        <div class="stat-value" style="font-size:${String(v).includes('R$')?'20':'30'}px;">${v}</div>
      </div>`).join('')}
    </div>

    <!-- Pipeline -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><span class="card-title">Pipeline Comercial</span></div>
      <div class="card-body">
        <div class="pipeline">
          ${[
            { key:'prospecting', label:'Prospecção', color:'#64748B' },
            { key:'proposal',    label:'Proposta',   color:'#1B4FCA' },
            { key:'negotiation', label:'Negociação',  color:'#F59E0B' },
            { key:'closed',      label:'Fechado ✅',  color:'#10B981' },
          ].map(stage => `
          <div class="pipeline-col">
            <div class="pipeline-col-title" style="color:${stage.color};">
              ${stage.label} (${DATA.pipeline[stage.key].length})
            </div>
            ${DATA.pipeline[stage.key].map(c => `
            <div class="pipeline-card">
              <div class="pipeline-card-name">${c.name}</div>
              <div class="pipeline-card-val">${c.value}</div>
              <div class="pipeline-card-contact">👤 ${c.contact}</div>
            </div>`).join('')}
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Sponsors table -->
    <div class="card">
      <div class="card-header"><span class="card-title">Lista de Patrocinadores</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Empresa</th><th>Cota</th><th>Stand</th><th>Receita</th><th>Contrato</th><th>Aprovações</th><th>Ações</th></tr></thead>
          <tbody>
            ${DATA.sponsors.map(s => `
            <tr>
              <td><div style="display:flex; align-items:center; gap:10px;">
                <div class="avatar avatar-sm" style="background:${s.color}20; color:${s.color};">${s.initials}</div>
                <div><div style="font-weight:600;">${s.name}</div><div style="font-size:12px; color:#64748B;">${s.description.slice(0,40)}...</div></div>
              </div></td>
              <td>${quotaBadge(s.quota)}</td>
              <td style="font-size:13px; color:#64748B;">${s.stand}</td>
              <td style="font-weight:600; color:#059669;">${fmtCurrency(s.revenue)}</td>
              <td>${s.contracted ? '<span class="badge badge-green">✅ Assinado</span>' : '<span class="badge badge-amber">⏳ Pendente</span>'}</td>
              <td>
                ${s.id === 1 ? '<span class="badge badge-green">2/4 ✓</span>' : '<span class="badge badge-gray">—</span>'}
              </td>
              <td>
                ${editable
                  ? `<button class="btn btn-ghost btn-sm" onclick="showToast('📊 Abrindo painel de ${s.name}...','info')">Ver Portal</button>`
                  : `<span style="font-size:12px; color:#94A3B8;">—</span>`}
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ─── OPERATIONS ─── */
function orgOperations() {
  const activeTab = STATE.activeTab['ops'] || 'companies';
  const editable = canEdit('operations');
  return `
  <div class="page">
    ${!editable ? readOnlyBanner() : ''}
    <div class="page-header">
      <h1 class="page-title">⚙️ Gestão Operacional</h1>
      <p class="page-subtitle">Dados de expositores, arquivos de produção e cronograma</p>
    </div>

    <div class="tabs">
      ${[['companies','Expositores'],['quotas','Dados da Cota'],['files','Arquivos de Produção'],['schedule','Cronograma Operacional']].map(([t,l]) => `
        <div class="tab ${activeTab===t?'active':''}" data-tab="${t}" data-group="ops">${l}</div>`).join('')}
    </div>

    ${activeTab === 'companies' ? `
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Empresa</th><th>Responsável</th><th>Contato</th><th>Cota</th><th>Stand</th></tr></thead>
          <tbody>
            ${DATA.sponsors.map(s => `
            <tr>
              <td><div style="display:flex; align-items:center; gap:8px;">
                <div class="avatar avatar-sm" style="background:${s.color}20; color:${s.color};">${s.initials}</div>
                <span style="font-weight:600;">${s.name}</span>
              </div></td>
              <td style="color:#64748B;">Carlos Silva</td>
              <td style="color:#64748B; font-size:12px;">carlos@${s.name.toLowerCase().replace(/\s/g,'')}.com.br</td>
              <td>${quotaBadge(s.quota)}</td>
              <td style="font-size:13px; color:#64748B;">${s.stand}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}

    ${activeTab === 'quotas' ? `
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Cota</th><th>Empresas</th><th>Tamanho Stand</th><th>Convites</th><th>Palestra</th><th>Receita</th></tr></thead>
          <tbody>
            ${[
              { quota:'Diamond', count:1, stand:'6×6m',  inv:10, talk:true,  rev:'R$ 300.000' },
              { quota:'Gold',    count:2, stand:'4×4m',  inv:8,  talk:true,  rev:'R$ 180.000' },
              { quota:'Silver',  count:2, stand:'3×3m',  inv:5,  talk:false, rev:'R$ 120.000' },
              { quota:'Bronze',  count:3, stand:'2×2m',  inv:3,  talk:false, rev:'R$ 80.000' },
            ].map(q => `
            <tr>
              <td>${quotaBadge(q.quota)}</td>
              <td style="font-weight:600;">${q.count}</td>
              <td style="font-weight:500;">${q.stand}</td>
              <td style="color:#64748B;">${q.inv} convites</td>
              <td>${q.talk ? '<span class="badge badge-green">Incluso</span>' : '<span class="badge badge-gray">Não incluso</span>'}</td>
              <td style="font-weight:600; color:#059669;">${q.rev}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}

    ${activeTab === 'files' ? `
    <div class="card">
      <div class="card-header">
        <span class="card-title">Arquivos de Produção</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="showToast('🔍 Filtrar arquivos...','info')">🔍 Filtrar</button>
          <button class="btn btn-primary btn-sm" onclick="showToast('📤 Upload...','info')">📤 Upload</button>
        </div>
      </div>
      <div class="card-body" style="padding:12px 20px;">
        ${DATA.files.filter(f=>['arts','docs'].includes(f.category)).map(f => `
        <div class="file-item">
          <div class="file-icon" style="background:#F1F5F9;">${f.icon}</div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:13.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</div>
            <div style="font-size:12px; color:#64748B;">${f.size} · ${f.date}</div>
          </div>
          <span class="badge badge-gray">${f.category}</span>
          <button class="btn btn-ghost btn-sm" onclick="showToast('📥 Baixando...','success')">📥</button>
        </div>`).join('')}
      </div>
    </div>` : ''}

    ${activeTab === 'schedule' ? `
    <div class="card">
      <div class="card-body">
        <div class="timeline">
          ${[
            { icon:'📋', label:'Confirmação Final de Fornecedores', date:'01/09', color:'#EDE9FE', text:'#7C3AED' },
            { icon:'🎨', label:'Prazo Artes para Impressão',        date:'05/09', color:'#DBEAFE', text:'#1D4ED8' },
            { icon:'📦', label:'Chegada dos Materiais ao Local',    date:'10/09', color:'#FEF3C7', text:'#B45309' },
            { icon:'🏗️', label:'Montagem — Dia 1',                  date:'13/09', color:'#EDE9FE', text:'#7C3AED' },
            { icon:'🏗️', label:'Montagem — Dia 2 + Testes',        date:'14/09', color:'#EDE9FE', text:'#7C3AED' },
            { icon:'🎉', label:'EVENTO DIA 1',                       date:'15/09', color:'#D1FAE5', text:'#065F46' },
            { icon:'🎉', label:'EVENTO DIA 2',                       date:'16/09', color:'#D1FAE5', text:'#065F46' },
            { icon:'📦', label:'Desmontagem',                        date:'17/09', color:'#FEE2E2', text:'#991B1B' },
          ].map(t => `
          <div class="timeline-item">
            <div class="timeline-dot" style="background:${t.color}; color:${t.text}; font-size:18px;">${t.icon}</div>
            <div style="padding-top:6px;">
              <span style="font-size:14px; font-weight:700;">${t.label}</span>
              <span class="badge badge-gray" style="margin-left:10px;">${t.date}/2025</span>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

/* ─── COMMUNICATION ─── */
function orgCommunication() {
  const editable = canEdit('communication');
  return `
  <div class="page">
    ${!editable ? readOnlyBanner() : ''}
    <div class="page-header">
      <h1 class="page-title">📣 Central de Comunicação</h1>
      <p class="page-subtitle">Envie notificações e e-mails segmentados</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <!-- Push Notification -->
      <div class="card">
        <div class="card-header"><span class="card-title">🔔 Push Notification</span><span class="live-dot"></span></div>
        <div class="card-body">
          <form id="push-form">
            <div class="form-group">
              <label class="form-label">Público-alvo</label>
              <select class="form-select">
                <option>Todos os Participantes</option>
                <option>Participantes — Check-in Realizado</option>
                <option>Patrocinadores</option>
                <option>Equipe Interna</option>
                <option>Palestrantes</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Título *</label>
              <input class="form-input" placeholder="Ex: Palestra em 15 minutos!" required>
            </div>
            <div class="form-group">
              <label class="form-label">Mensagem *</label>
              <textarea class="form-textarea" placeholder="Mensagem da notificação..." required style="min-height:80px;"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Tipo</label>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                ${['ℹ️ Info','⚠️ Aviso','✅ Sucesso','🚨 Urgente'].map(t => `
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; padding:6px 12px; border-radius:8px; border:1.5px solid #E2E8F0; font-size:13px; transition:border-color .15s;">
                  <input type="radio" name="push-type" style="cursor:pointer;"> ${t}
                </label>`).join('')}
              </div>
            </div>
            <div style="display:flex; gap:8px; margin-top:4px;">
              <button type="button" class="btn btn-secondary" style="flex:1;" onclick="showToast('📅 Agendamento configurado!','info')">📅 Agendar</button>
              <button type="submit" class="btn btn-primary" style="flex:1;" onclick="event.preventDefault(); showToast('🔔 Notificação enviada para 638 dispositivos!','success')">🔔 Enviar Agora</button>
            </div>
          </form>
        </div>
      </div>

      <!-- E-mail blast -->
      <div class="card">
        <div class="card-header"><span class="card-title">✉️ E-mail Marketing</span></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Destinatários</label>
            <select class="form-select">
              <option>Todos os Inscritos (847)</option>
              <option>Confirmados (623)</option>
              <option>Patrocinadores (8)</option>
              <option>Lista Personalizada</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Assunto *</label>
            <input class="form-input" placeholder="Assunto do e-mail">
          </div>
          <div class="form-group">
            <label class="form-label">Template</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
              ${[
                { icon:'📅', name:'Lembrete de Evento' },
                { icon:'✉️', name:'Boas-vindas' },
                { icon:'📊', name:'Programação' },
                { icon:'⭐', name:'Pesquisa de Satisfação' },
              ].map(t => `
              <div style="border:1.5px solid #E2E8F0; border-radius:8px; padding:10px; cursor:pointer; text-align:center; transition:border-color .15s;" onmouseover="this.style.borderColor='#1B4FCA'" onmouseout="this.style.borderColor='#E2E8F0'" onclick="showToast('📋 Template carregado!','info')">
                <div style="font-size:22px; margin-bottom:4px;">${t.icon}</div>
                <div style="font-size:12px; font-weight:500;">${t.name}</div>
              </div>`).join('')}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Conteúdo</label>
            <textarea class="form-textarea" style="min-height:100px;" placeholder="Corpo do e-mail..."></textarea>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="showToast('👁️ Preview gerado!','info')">👁️ Preview</button>
            <button class="btn btn-primary" style="flex:1;" onclick="showToast('✉️ E-mail enviado para 847 contatos!','success')">✉️ Enviar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification history -->
    <div class="card" style="margin-top:20px;">
      <div class="card-header"><span class="card-title">Histórico de Notificações</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tipo</th><th>Título</th><th>Público</th><th>Enviado</th><th>Entregues</th></tr></thead>
          <tbody>
            ${DATA.notifications.map(n => `
            <tr>
              <td><span class="badge ${n.type==='success'?'badge-green':n.type==='warning'?'badge-amber':n.type==='danger'?'badge-red':'badge-blue'}">${n.type}</span></td>
              <td style="font-weight:500;">${n.title}</td>
              <td style="color:#64748B;">Todos os Participantes</td>
              <td style="color:#64748B;">${n.time} — 15/09</td>
              <td><span style="font-weight:600; color:#10B981;">638 ✓</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ─── NPS ─── */
function orgNPS() {
  const editable = canEdit('nps');
  return `
  <div class="page">
    ${!editable ? readOnlyBanner() : ''}
    <div class="page-header">
      <h1 class="page-title">⭐ NPS & Feedbacks</h1>
      <p class="page-subtitle">Net Promoter Score e avaliações do evento</p>
    </div>

    <!-- NPS Score -->
    <div style="display:grid; grid-template-columns:1fr 2fr; gap:20px; margin-bottom:24px;">
      <div class="card" style="text-align:center; padding:32px;">
        <p style="font-size:13px; color:#64748B; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px;">NPS GERAL</p>
        <div class="nps-score">${DATA.metrics.nps}</div>
        <div style="margin-top:12px;">
          <span class="badge badge-green" style="font-size:13px; padding:6px 16px;">🏆 Excelente</span>
        </div>
        <p style="font-size:12px; color:#64748B; margin-top:16px; line-height:1.6;">Baseado em ${DATA.npsFeedbacks.length} respostas<br>Zona de Excelência: acima de 75</p>
        <div style="margin-top:20px; padding-top:20px; border-top:1px solid #F1F5F9;">
          ${[['Promotores (9–10)', 68, '#10B981'], ['Neutros (7–8)', 22, '#F59E0B'], ['Detratores (0–6)', 10, '#EF4444']].map(([l,p,c]) => `
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <div style="flex:1; font-size:12px; color:#64748B;">${l}</div>
            <div style="width:60px; font-size:12px; font-weight:700; color:${c};">${p}%</div>
            <div style="width:60px; height:4px; background:#F1F5F9; border-radius:2px;"><div style="width:${p}%; height:100%; background:${c}; border-radius:2px;"></div></div>
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Avaliação por Sessão</span></div>
        <div class="card-body"><canvas id="chart-nps" height="200"></canvas></div>
      </div>
    </div>

    <!-- Per category -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><span class="card-title">Avaliação por Categoria</span></div>
      <div class="card-body">
        <div class="grid-2">
          ${[
            { cat:'Evento Geral',        score:4.3, icon:'🏆' },
            { cat:'Conteúdo',            score:4.6, icon:'📚' },
            { cat:'Organização',          score:4.4, icon:'⚙️' },
            { cat:'Estrutura',            score:4.1, icon:'🏗️' },
            { cat:'Alimentação',          score:3.9, icon:'🍽️' },
            { cat:'Networking',           score:4.5, icon:'🤝' },
          ].map(c => `
          <div style="display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid #F1F5F9;">
            <span style="font-size:20px;">${c.icon}</span>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="font-size:13.5px; font-weight:500;">${c.cat}</span>
                <span style="font-size:14px; font-weight:700; color:${c.score>=4.5?'#10B981':c.score>=4?'#1B4FCA':'#F59E0B'};">${c.score.toFixed(1)} ⭐</span>
              </div>
              <div class="progress"><div class="progress-bar" style="width:${(c.score/5)*100}%; background:${c.score>=4.5?'#10B981':c.score>=4?'#1B4FCA':'#F59E0B'};"></div></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Comments -->
    <div class="card">
      <div class="card-header"><span class="card-title">💬 Comentários Recentes</span><button class="btn btn-secondary btn-sm" onclick="showToast('📊 Exportando feedbacks...','success')">📊 Exportar</button></div>
      <div class="card-body" style="padding:16px;">
        ${DATA.npsFeedbacks.map(f => `
        <div style="padding:16px; border-radius:10px; background:#F8FAFC; margin-bottom:12px; border:1px solid #F1F5F9;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="avatar avatar-sm" style="background:#EFF6FF; color:#1B4FCA;">${f.name[0]}</div>
              <span style="font-weight:600;">${f.name}</span>
              <span class="badge badge-gray">${f.session}</span>
            </div>
            <div style="display:flex; gap:2px;">${Array.from({length:5}, (_,i) => `<span style="font-size:14px; ${i<f.score?'':'filter:grayscale(1);opacity:.3'}">⭐</span>`).join('')}</div>
          </div>
          <p style="font-size:13.5px; color:#475569; line-height:1.6;">"${f.comment}"</p>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function initNpsCharts() {
  const ctx = document.getElementById('chart-nps');
  if (!ctx) return;
  STATE.charts['nps'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Liderança Digital', 'Marketing', 'Gestão Fin.', 'IA Generativa', 'Vendas', 'Cultura'],
      datasets: [{
        label: 'NPS por Palestra',
        data: [82, 74, 71, 88, 76, 69],
        backgroundColor: ['#1B4FCA', '#7C3AED', '#059669', '#D97706', '#EF4444', '#06B6D4'],
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}

/* ─── FILES ─── */
function orgFiles() {
  const editable = canEdit('files');
  const activeTab = STATE.activeTab['files-cat'] || 'all';
  const cats = ['all','contracts','arts','presentations','docs','photos'];
  const catLabel = { all:'Todos', contracts:'Contratos', arts:'Artes', presentations:'Apresentações', docs:'Documentos', photos:'Fotos' };
  const filtered = activeTab === 'all' ? DATA.files : DATA.files.filter(f => f.category === activeTab);
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">🗂️ Central de Arquivos</h1>
        <p class="page-subtitle">${DATA.files.length} arquivos · Armazenamento organizado</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-secondary" onclick="showToast('🔍 Busca avançada...','info')">🔍 Buscar</button>
        ${editable ? `<button class="btn btn-primary" onclick="showToast('📤 Enviando arquivo...','info')">📤 Upload</button>` : `<span class="badge badge-amber" style="font-size:13px; padding:8px 14px;">🔒 Somente visualização</span>`}
      </div>
    </div>
    ${!editable ? readOnlyBanner() : ''}

    <!-- Storage summary -->
    <div class="grid-4" style="margin-bottom:20px;">
      ${[
        { icon:'📄', label:'Contratos', n: DATA.files.filter(f=>f.category==='contracts').length },
        { icon:'🎨', label:'Artes', n: DATA.files.filter(f=>f.category==='arts').length },
        { icon:'📊', label:'Apresentações', n: DATA.files.filter(f=>f.category==='presentations').length },
        { icon:'📁', label:'Outros', n: DATA.files.filter(f=>!['contracts','arts','presentations'].includes(f.category)).length },
      ].map(s => `<div class="stat-card" style="padding:16px; text-align:center;">
        <div style="font-size:28px; margin-bottom:4px;">${s.icon}</div>
        <div style="font-size:24px; font-weight:800; color:#1B4FCA;">${s.n}</div>
        <div style="font-size:12px; color:#64748B; margin-top:4px;">${s.label}</div>
      </div>`).join('')}
    </div>

    <div class="tabs">
      ${cats.map(c => `<div class="tab ${activeTab===c?'active':''}" data-tab="${c}" data-group="files-cat">${catLabel[c]}</div>`).join('')}
    </div>

    <div class="card">
      <div class="card-body" style="padding:12px 20px;">
        ${filtered.length ? filtered.map(f => `
        <div class="file-item">
          <div class="file-icon" style="background:${f.category==='contracts'?'#FEE2E2':f.category==='arts'?'#EDE9FE':f.category==='photos'?'#DCFCE7':'#DBEAFE'};">${f.icon}</div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:13.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</div>
            <div style="font-size:12px; color:#64748B; margin-top:2px;">${f.size} · Adicionado em ${f.date}</div>
          </div>
          <span class="badge badge-gray">${catLabel[f.category]||f.category}</span>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-ghost btn-sm" onclick="showToast('📥 Baixando ${f.name}...','success')">📥</button>
            ${editable ? `
              <button class="btn btn-ghost btn-sm" onclick="showToast('📤 Compartilhando...','info')">📤</button>
              <button class="btn btn-ghost btn-sm" onclick="showToast('🗑️ Arquivo removido.','info')">🗑️</button>
            ` : ''}
          </div>
        </div>`).join('')
        : `<div class="empty-state"><p style="font-size:32px; margin-bottom:8px;">📭</p><p>Nenhum arquivo nesta categoria.</p></div>`}
      </div>
    </div>
  </div>`;
}

/* ─── REPORTS ─── */
function orgReports() {
  const activeTab = STATE.activeTab['reports'] || 'executive';
  const editable = canEdit('reports');
  return `
  <div class="page">
    ${!editable ? readOnlyBanner() : ''}
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">📈 Relatórios</h1>
        <p class="page-subtitle">Relatórios executivo, comercial e operacional</p>
      </div>
      <button class="btn btn-primary" onclick="showToast('📥 Relatório completo exportado em PDF!','success')">📥 Exportar PDF</button>
    </div>

    <div class="tabs">
      ${[['executive','Executivo'],['commercial','Comercial'],['operational','Operacional']].map(([t,l]) => `
        <div class="tab ${activeTab===t?'active':''}" data-tab="${t}" data-group="reports">${l}</div>`).join('')}
    </div>

    ${activeTab === 'executive' ? `
    <div>
      <div class="grid-4" style="margin-bottom:20px;">
        ${[
          { label:'NPS Geral', value:'72', sub:'Zona Excelente', color:'#10B981' },
          { label:'Participação', value:'847', sub:`${Math.round(847/1200*100)}% da meta`, color:'#1B4FCA' },
          { label:'Receita', value:'R$ 1,14M', sub:'100% de cotas Diamond/Gold', color:'#D97706' },
          { label:'Engajamento App', value:'84%', sub:'638 acessos únicos', color:'#7C3AED' },
        ].map(s => `
        <div class="stat-card" style="border-top:3px solid ${s.color};">
          <div class="stat-label">${s.label}</div>
          <div class="stat-value" style="color:${s.color}; font-size:${s.value.includes('R$')?'20':'30'}px; margin-top:8px;">${s.value}</div>
          <div style="font-size:12px; color:#94A3B8; margin-top:4px;">${s.sub}</div>
        </div>`).join('')}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="card">
          <div class="card-header"><span class="card-title">Evolução de Inscrições</span></div>
          <div class="card-body"><canvas id="chart-report1" height="140"></canvas></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Receita por Cota</span></div>
          <div class="card-body"><canvas id="chart-report2" height="140"></canvas></div>
        </div>
      </div>
    </div>` : ''}

    ${activeTab === 'commercial' ? `
    <div>
      <div class="grid-3" style="margin-bottom:20px;">
        ${[
          { label:'Total Vendido', value:'R$ 1.140.000', icon:'💰' },
          { label:'Ticket Médio', value:'R$ 142.500', icon:'🎯' },
          { label:'Taxa de Conversão', value:'67%', icon:'📊' },
        ].map(s => `<div class="stat-card" style="text-align:center; padding:24px;">
          <div style="font-size:32px; margin-bottom:8px;">${s.icon}</div>
          <div style="font-size:18px; font-weight:800; margin-bottom:4px;">${s.value}</div>
          <div style="font-size:12px; color:#64748B;">${s.label}</div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Breakdown por Cota</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Cota</th><th>Qtd</th><th>Valor Unit.</th><th>Total</th><th>% Receita</th></tr></thead>
            <tbody>
              ${[
                ['Diamond', 1, 300000, 300000, 26.3],
                ['Gold',    2, 180000, 360000, 31.6],
                ['Silver',  2, 120000, 240000, 21.0],
                ['Bronze',  3, 80000,  240000, 21.1],
              ].map(([q,n,u,t,p]) => `
              <tr>
                <td>${quotaBadge(q)}</td>
                <td style="font-weight:600;">${n}</td>
                <td>${fmtCurrency(u)}</td>
                <td style="font-weight:700; color:#059669;">${fmtCurrency(t)}</td>
                <td><div style="display:flex; align-items:center; gap:8px;">${p}% <div style="width:60px; height:4px; background:#F1F5F9; border-radius:2px;"><div style="width:${p*3}px; height:100%; background:#1B4FCA; border-radius:2px;"></div></div></div></td>
              </tr>`).join('')}
              <tr style="background:#F8FAFC; font-weight:700;"><td>TOTAL</td><td>8</td><td>—</td><td>${fmtCurrency(1140000)}</td><td>100%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>` : ''}

    ${activeTab === 'operational' ? `
    <div class="grid-2" style="gap:20px;">
      <div class="card">
        <div class="card-header"><span class="card-title">Aprovações por Status</span></div>
        <div class="card-body">
          ${[
            { label:'Aprovados', n:4, total:16, color:'#10B981' },
            { label:'Em Análise', n:6, total:16, color:'#1B4FCA' },
            { label:'Ajustes Solicitados', n:3, total:16, color:'#F59E0B' },
            { label:'Pendentes', n:3, total:16, color:'#EF4444' },
          ].map(s => `
          <div style="display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #F1F5F9;">
            <div style="width:8px; height:8px; border-radius:50%; background:${s.color}; flex-shrink:0;"></div>
            <span style="flex:1; font-size:13.5px;">${s.label}</span>
            <span style="font-weight:700; color:${s.color};">${s.n}</span>
            <div style="width:80px; height:4px; background:#F1F5F9; border-radius:2px;"><div style="width:${(s.n/s.total)*80}px; height:100%; background:${s.color}; border-radius:2px;"></div></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Checklist por Patrocinador</span></div>
        <div class="card-body">
          ${DATA.sponsors.slice(0,6).map(s => {
            const done = Math.floor(Math.random()*9)+1;
            const pct = Math.round((done/9)*100);
            return `
          <div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #F1F5F9;">
            <div class="avatar avatar-sm" style="background:${s.color}20; color:${s.color};">${s.initials}</div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="font-size:12.5px; font-weight:500;">${s.name}</span>
                <span style="font-size:12px; color:${pct===100?'#10B981':'#64748B'};">${pct}%</span>
              </div>
              <div class="progress"><div class="progress-bar" style="width:${pct}%; background:${pct===100?'#10B981':'#1B4FCA'};"></div></div>
            </div>
          </div>`;
          }).join('')}
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function initReportCharts() {
  const ctx1 = document.getElementById('chart-report1');
  const ctx2 = document.getElementById('chart-report2');
  if (ctx1 && !STATE.charts['report1']) {
    STATE.charts['report1'] = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['Jul','Ago/1','Ago/2','Set/1'],
        datasets: [{ label:'Inscrições', data: [195, 420, 680, 847], borderColor: '#1B4FCA', backgroundColor: 'rgba(27,79,202,.08)', fill: true, tension: 0.4, pointRadius: 5 }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } } }
    });
  }
  if (ctx2 && !STATE.charts['report2']) {
    STATE.charts['report2'] = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Diamond', 'Gold', 'Silver', 'Bronze'],
        datasets: [{ label: 'Receita', data: [300000, 360000, 240000, 240000], backgroundColor: ['#1B4FCA','#D97706','#94A3B8','#92400E'], borderRadius: 8 }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } } }
    });
  }
}
