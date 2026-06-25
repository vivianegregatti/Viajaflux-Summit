/* ============================================================
   FLY SUMMIT — Sponsor / Exhibitor Views
   ============================================================ */

function renderSponsorView(route) {
  const views = {
    'sponsor/dashboard':       sponsorDashboard,
    'sponsor/checklist':       sponsorChecklist,
    'sponsor/proposal':        sponsorProposal,
    'sponsor/contract-data':   sponsorContractData,
    'sponsor/contract':        sponsorContract,
    'sponsor/mailing':         sponsorMailing,
    'sponsor/schedule':        sponsorSchedule,
    'sponsor/map':             sponsorMap,
    'sponsor/invites':         sponsorInvites,
    'sponsor/team':            sponsorTeam,
    'sponsor/speaker-upload':  sponsorSpeakerUpload,
    'sponsor/presentation':    sponsorPresentation,
    'sponsor/stand-design':    sponsorStandDesign,
    'sponsor/approvals':       sponsorApprovals,
  };
  return (views[route] || sponsorDashboard)();
}

/* ─── DASHBOARD ─── */
function sponsorDashboard() {
  const done   = DATA.checklist.filter(c => c.done).length;
  const total  = DATA.checklist.length;
  const pct    = Math.round((done/total)*100);
  const sp     = DATA.sponsors[0];
  const invUsed = DATA.invites.filter(i => i.status !== 'sent').length;
  const invTotal = 10;

  return `
  <div class="page">
    <!-- Welcome banner -->
    <div class="hero-banner" style="margin-bottom:24px;">
      <div style="position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <div class="avatar avatar-lg" style="background:rgba(255,255,255,.15); color:white; font-size:20px;">${sp.initials}</div>
            <div>
              <p style="font-size:11px; opacity:.6; text-transform:uppercase; letter-spacing:1px;">Bem-vindo ao Portal do Patrocinador</p>
              <h1 style="font-size:22px; font-weight:800;">${sp.name}</h1>
            </div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${quotaBadge(sp.quota)}
            <span class="badge badge-gray" style="background:rgba(255,255,255,.1); color:white;">📍 ${sp.stand}</span>
          </div>
        </div>
        <div style="text-align:right;">
          <p style="font-size:12px; opacity:.6; margin-bottom:6px;">Progresso Geral</p>
          <div style="font-size:36px; font-weight:900;">${pct}%</div>
          <div style="margin-top:8px; background:rgba(255,255,255,.15); height:6px; border-radius:99px; width:160px;">
            <div style="background:white; height:100%; border-radius:99px; width:${pct}%;"></div>
          </div>
          <p style="font-size:11px; opacity:.6; margin-top:4px;">${done} de ${total} itens concluídos</p>
        </div>
      </div>
    </div>

    <!-- KPI Stats -->
    <div class="grid-4" style="margin-bottom:24px;">
      <div class="stat-card stat-card-blue">
        <div style="font-size:13px; opacity:.8; margin-bottom:8px;">📅 Dias para o Evento</div>
        <div class="stat-value">${getCountdown().days}</div>
        <div style="font-size:12px; opacity:.7; margin-top:6px;">15 e 16 de Setembro</div>
      </div>
      <div class="stat-card">
        <div style="font-size:12px; color:#64748B; margin-bottom:6px;">🎟️ Convites</div>
        <div class="stat-value">${invUsed}<span style="font-size:18px; color:#94A3B8;">/${invTotal}</span></div>
        <div style="font-size:12px; color:#64748B; margin-top:6px;">${invTotal-invUsed} disponíveis</div>
        <div class="progress" style="margin-top:8px;"><div class="progress-bar" style="width:${(invUsed/invTotal)*100}%; background:#1B4FCA;"></div></div>
      </div>
      <div class="stat-card">
        <div style="font-size:12px; color:#64748B; margin-bottom:6px;">✅ Checklist</div>
        <div class="stat-value">${done}<span style="font-size:18px; color:#94A3B8;">/${total}</span></div>
        <div class="progress" style="margin-top:8px;"><div class="progress-bar" style="width:${pct}%; background:#10B981;"></div></div>
        <div style="font-size:12px; color:#10B981; margin-top:6px;">${pct}% concluído</div>
      </div>
      <div class="stat-card">
        <div style="font-size:12px; color:#64748B; margin-bottom:6px;">🔍 Aprovações</div>
        <div class="stat-value">${DATA.approvals.filter(a=>a.status==='approved').length}<span style="font-size:18px; color:#94A3B8;">/${DATA.approvals.length}</span></div>
        <div style="font-size:12px; color:#F59E0B; margin-top:6px;">${DATA.approvals.filter(a=>a.status==='changes').length} precisam de ajuste</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <!-- Datas importantes -->
      <div class="card">
        <div class="card-header"><span class="card-title">📅 Datas Importantes</span></div>
        <div class="card-body" style="padding:0;">
          ${[
            { date:'01/09', label:'Prazo final — Design do Stand',      status:'done'    },
            { date:'05/09', label:'Prazo final — Artes para impressão', status:'pending' },
            { date:'10/09', label:'Envio de materiais ao local',        status:'pending' },
            { date:'13/09', label:'Montagem do stand (07:00–20:00)',    status:'future'  },
            { date:'14/09', label:'Teste de equipamentos',              status:'future'  },
            { date:'15/09', label:'🎉 EVENTO — DIA 1',                  status:'event'   },
            { date:'16/09', label:'🎉 EVENTO — DIA 2',                  status:'event'   },
            { date:'17/09', label:'Desmontagem (08:00–17:00)',          status:'future'  },
          ].map(d => `
          <div style="display:flex; align-items:center; gap:14px; padding:12px 20px; border-bottom:1px solid #F1F5F9;">
            <div style="width:40px; height:40px; border-radius:10px; background:${d.status==='event'?'#0D1B2A':d.status==='done'?'#D1FAE5':d.status==='pending'?'#FEF3C7':'#F1F5F9'}; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0;">
              <div style="font-size:11px; font-weight:700; color:${d.status==='event'?'white':d.status==='done'?'#065F46':d.status==='pending'?'#92400E':'#64748B'};">${d.date.split('/')[0]}</div>
              <div style="font-size:9px; color:${d.status==='event'?'rgba(255,255,255,.6)':'#94A3B8'};">/${d.date.split('/')[1]}</div>
            </div>
            <span style="font-size:13.5px; ${d.status==='event'?'font-weight:700;':''}">${d.label}</span>
            ${d.status==='done'?'<span class="badge badge-green" style="margin-left:auto;">✓</span>':''}
          </div>`).join('')}
        </div>
      </div>

      <!-- Aprovações recentes + pendências -->
      <div>
        <div class="card" style="margin-bottom:16px;">
          <div class="card-header">
            <span class="card-title">🔍 Aprovações</span>
            <button class="btn btn-ghost btn-sm" onclick="navigate('sponsor/approvals')">Ver todas →</button>
          </div>
          <div class="card-body" style="padding:12px 20px;">
            ${DATA.approvals.map(a => `
            <div class="approval-item" style="padding:12px 0; border:none; border-bottom:1px solid #F1F5F9; border-radius:0;">
              <div style="flex:1;">
                <div style="font-size:13.5px; font-weight:600;">${a.type}</div>
                <div style="font-size:12px; color:#64748B; margin-top:2px;">${a.comments || 'Aguardando envio'}</div>
              </div>
              ${approvalStatusBadge(a.status)}
            </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">⚡ Ações Necessárias</span></div>
          <div class="card-body" style="padding:16px;">
            ${DATA.checklist.filter(c=>!c.done).map(c => `
            <div style="display:flex; align-items:center; gap:10px; padding:10px; border-radius:8px; background:#FFFBEB; border:1px solid #FDE68A; margin-bottom:8px; cursor:pointer;" onclick="navigate('sponsor/checklist')">
              <span style="font-size:16px;">⚠️</span>
              <span style="font-size:13.5px; font-weight:500;">${c.label}</span>
              <span style="margin-left:auto; font-size:12px; color:#1B4FCA;">→ Resolver</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── CHECKLIST ─── */
function sponsorChecklist() {
  const done  = DATA.checklist.filter(c => c.done).length;
  const total = DATA.checklist.length;
  const pct   = Math.round((done/total)*100);
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">✅ Checklist do Patrocinador</h1>
      <p class="page-subtitle">Acompanhe o progresso da sua participação</p>
    </div>

    <div class="card" style="max-width:640px;">
      <div class="card-header">
        <span class="card-title">Progresso Geral</span>
        <span style="font-size:20px; font-weight:800; color:${pct===100?'#10B981':'#1B4FCA'};">${pct}%</span>
      </div>
      <div class="card-body" style="padding:16px 24px 8px;">
        <div class="progress" style="margin-bottom:20px; height:10px;">
          <div class="progress-bar" style="width:${pct}%; background:linear-gradient(90deg,#1B4FCA,#10B981);"></div>
        </div>
        ${DATA.checklist.map(c => `
        <div class="check-item ${c.done?'done':'pending'}" data-id="${c.id}" style="cursor:pointer;">
          <div class="check-circle">
            ${c.done ? '✓' : ''}
          </div>
          <span style="flex:1; font-size:14px; font-weight:500; ${c.done?'text-decoration:line-through; color:#94A3B8;':''}">${c.label}</span>
          ${!c.done ? `
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); navigate('${getChecklistRoute(c.id)}')">
            Completar →
          </button>` : `<span style="color:#10B981; font-size:20px;">✅</span>`}
        </div>`).join('')}

        <div style="margin-top:20px; padding:16px; background:${pct===100?'#F0FDF4':'#EFF6FF'}; border-radius:10px; text-align:center;">
          ${pct === 100
            ? `<p style="color:#065F46; font-weight:600;">🎉 Parabéns! Tudo concluído. Você está pronto para o evento!</p>`
            : `<p style="color:#1E40AF; font-weight:500;">📋 ${total-done} item(ns) pendente(s). Complete para garantir uma participação perfeita!</p>`}
        </div>
      </div>
    </div>
  </div>`;
}

function getChecklistRoute(id) {
  const m = { 1:'sponsor/contract', 2:'sponsor/contract-data', 3:'sponsor/contract', 4:'sponsor/team', 5:'sponsor/speaker-upload', 6:'sponsor/presentation', 7:'sponsor/stand-design', 8:'sponsor/approvals', 9:'sponsor/approvals' };
  return m[id] || 'sponsor/dashboard';
}

/* ─── PROPOSAL ─── */
function sponsorProposal() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📋 Proposta Comercial</h1>
      <p class="page-subtitle">Cota Diamond — TechCorp Brasil</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 300px; gap:20px;">
      <div class="card">
        <div class="card-body">
          <!-- Proposal header -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; padding-bottom:24px; border-bottom:2px solid #F1F5F9;">
            <div>
              <div style="font-size:22px; font-weight:900; color:#0D1B2A;">Viajaflux Summit</div>
              <div style="font-size:13px; color:#64748B;">1ª Edição · Campos do Jordão · Set/2026</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:13px; color:#64748B;">Proposta Nº</div>
              <div style="font-size:20px; font-weight:700; color:#1B4FCA;">FS-2025-0012</div>
              <div style="font-size:12px; color:#94A3B8; margin-top:2px;">Emitida em 10/07/2025</div>
            </div>
          </div>

          <!-- Quota details -->
          <h3 style="font-size:16px; font-weight:700; margin-bottom:16px;">Cota Diamond — Benefícios Contratados</h3>
          <div style="overflow:hidden; border-radius:10px; border:1px solid #E2E8F0; margin-bottom:24px;">
            <table>
              <thead><tr><th>Benefício</th><th>Descrição</th><th style="text-align:center;">✓</th></tr></thead>
              <tbody>
                ${[
                  ['Stand', 'Espaço 6×6m — Entrada Principal (prime location)','✅'],
                  ['Convites', '10 credenciais de participante completo','✅'],
                  ['Palestra', '1 slot de 45min no Palco Principal','✅'],
                  ['Mailing', 'Lista completa de participantes (LGPD)','✅'],
                  ['Branding', 'Logo em todos os materiais e comunicações','✅'],
                  ['Mesa de Reunião', '1 mesa VIP na área de networking','✅'],
                  ['Anúncio no App', 'Destaque na plataforma digital','✅'],
                  ['Relatório Pós-Evento', 'Métricas de engajamento e ROI','✅'],
                ].map(([b,d,c]) => `<tr><td><strong>${b}</strong></td><td style="color:#64748B;">${d}</td><td style="text-align:center;">${c}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>

          <!-- Investment -->
          <div style="background:#F8FAFC; border-radius:12px; padding:20px; text-align:right;">
            <p style="font-size:13px; color:#64748B; margin-bottom:8px;">Valor Total da Cota Diamond</p>
            <p style="font-size:36px; font-weight:900; color:#0D1B2A;">${fmtCurrency(300000)}</p>
            <p style="font-size:13px; color:#64748B; margin-top:4px;">Pagamento em até 3×</p>
          </div>
        </div>
      </div>

      <!-- Actions sidebar -->
      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-header"><span class="card-title">Ações</span></div>
          <div class="card-body" style="padding:16px; display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-primary" onclick="showToast('📥 Proposta em PDF baixada!','success')">📥 Download PDF</button>
            <button class="btn btn-secondary" onclick="showToast('📤 Proposta compartilhada!','info')">📤 Compartilhar</button>
            <button class="btn btn-success" onclick="navigate('sponsor/contract')">✍️ Assinar Contrato →</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Status</span></div>
          <div class="card-body" style="padding:16px;">
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between;"><span style="font-size:13px; color:#64748B;">Proposta</span><span class="badge badge-green">Enviada</span></div>
              <div style="display:flex; justify-content:space-between;"><span style="font-size:13px; color:#64748B;">Aprovação</span><span class="badge badge-green">Aprovada</span></div>
              <div style="display:flex; justify-content:space-between;"><span style="font-size:13px; color:#64748B;">Contrato</span><span class="badge badge-green">Assinado</span></div>
              <div style="display:flex; justify-content:space-between;"><span style="font-size:13px; color:#64748B;">Pagamento</span><span class="badge badge-green">Confirmado</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── CONTRACT DATA ─── */
function sponsorContractData() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📝 Dados para Contrato</h1>
      <p class="page-subtitle">Informações cadastrais para geração do contrato</p>
    </div>
    <div style="max-width:720px;">
      <div class="card">
        <div class="card-header"><span class="card-title">Dados da Empresa</span><span class="badge badge-green">✓ Confirmado</span></div>
        <div class="card-body">
          <form id="contract-data-form">
            <div class="grid-2">
              <div class="form-group"><label class="form-label">Razão Social *</label><input class="form-input" value="TechCorp Brasil Tecnologia Ltda" required></div>
              <div class="form-group"><label class="form-label">Nome Fantasia</label><input class="form-input" value="TechCorp Brasil"></div>
            </div>
            <div class="grid-2">
              <div class="form-group"><label class="form-label">CNPJ *</label><input class="form-input" value="12.345.678/0001-90" required></div>
              <div class="form-group"><label class="form-label">Inscrição Estadual</label><input class="form-input" value="123.456.789.000"></div>
            </div>
            <div class="form-group"><label class="form-label">Endereço Completo *</label><input class="form-input" value="Av. Paulista, 1000, 10º andar — São Paulo, SP — CEP 01310-100" required></div>
            <hr class="divider">
            <h4 style="font-size:14px; font-weight:700; margin-bottom:16px; color:#0D1B2A;">Responsável Legal</h4>
            <div class="grid-2">
              <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" value="Carlos Alberto Silva" required></div>
              <div class="form-group"><label class="form-label">CPF *</label><input class="form-input" value="123.456.789-00" required></div>
            </div>
            <div class="grid-2">
              <div class="form-group"><label class="form-label">E-mail *</label><input type="email" class="form-input" value="carlos.silva@techcorp.com.br" required></div>
              <div class="form-group"><label class="form-label">Telefone *</label><input class="form-input" value="(11) 3000-0000" required></div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
              <button type="button" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary" onclick="event.preventDefault(); showToast('✅ Dados salvos com sucesso!','success')">💾 Salvar Dados</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── CONTRACT ─── */
function sponsorContract() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🔏 Contrato de Patrocínio</h1>
      <p class="page-subtitle">Contrato Nº FS-2025-CT-0012 — Cota Diamond</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 280px; gap:20px;">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Visualização do Contrato</span>
          <span class="badge badge-green">✅ Assinado em 05/08/2025</span>
        </div>
        <div class="card-body" style="font-family:'Georgia',serif; line-height:1.9; color:#374151; font-size:13.5px; padding:32px;">
          <h2 style="text-align:center; font-size:18px; font-weight:700; margin-bottom:4px;">CONTRATO DE PATROCÍNIO</h2>
          <p style="text-align:center; color:#64748B; margin-bottom:32px;">Viajaflux Summit 2026 — 1ª Edição</p>

          <p>Por este instrumento particular, as partes abaixo qualificadas têm entre si justo e contratado o presente <strong>Contrato de Patrocínio</strong>, que se regerá pelas cláusulas e condições seguintes:</p>

          <h3 style="font-size:14px; font-weight:700; margin:20px 0 8px;">CLÁUSULA 1ª — DAS PARTES</h3>
          <p><strong>CONTRATANTE:</strong> Viajaflux Eventos Ltda, CNPJ 98.765.432/0001-10, Campos do Jordão, SP.</p>
          <p style="margin-top:8px;"><strong>PATROCINADOR:</strong> TechCorp Brasil Tecnologia Ltda, CNPJ 12.345.678/0001-90, Av. Paulista, 1000, São Paulo-SP.</p>

          <h3 style="font-size:14px; font-weight:700; margin:20px 0 8px;">CLÁUSULA 2ª — DO OBJETO</h3>
          <p>O presente contrato tem por objeto a participação do PATROCINADOR como <strong>Patrocinador Diamond</strong> do evento Viajaflux Summit 2026, a ser realizado nos dias 14 e 15 de setembro de 2026 em Campos do Jordão, SP...</p>

          <div style="margin:32px 0; padding:24px; background:#F8FAFC; border-radius:12px; border:1px solid #E2E8F0;">
            <p style="text-align:center; color:#64748B; font-size:13px; margin-bottom:16px;">Assinaturas Eletrônicas</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px;">
              <div style="text-align:center; border-top:2px solid #0D1B2A; padding-top:12px;">
                <p style="font-size:13px; font-weight:700;">Viajaflux Eventos Ltda</p>
                <p style="font-size:11px; color:#64748B;">Contratante · 05/08/2025 14:32</p>
                <p style="font-size:10px; color:#10B981;">✅ Assinatura verificada</p>
              </div>
              <div style="text-align:center; border-top:2px solid #1B4FCA; padding-top:12px;">
                <p style="font-size:13px; font-weight:700;">TechCorp Brasil</p>
                <p style="font-size:11px; color:#64748B;">Carlos A. Silva · 05/08/2025 15:47</p>
                <p style="font-size:10px; color:#10B981;">✅ Assinatura verificada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-header"><span class="card-title">Status</span></div>
          <div class="card-body" style="padding:16px;">
            <div style="text-align:center; padding:20px 0;">
              <div style="font-size:48px; margin-bottom:8px;">✅</div>
              <div style="font-size:16px; font-weight:700; color:#065F46;">Contrato Assinado</div>
              <div style="font-size:12px; color:#64748B; margin-top:4px;">05/08/2025</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Ações</span></div>
          <div class="card-body" style="padding:16px; display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-primary" onclick="showToast('📥 Contrato baixado!','success')">📥 Download PDF</button>
            <button class="btn btn-secondary" onclick="showToast('📤 Link copiado!','info')">📤 Compartilhar</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── MAILING ─── */
function sponsorMailing() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📬 Mailing do Evento</h1>
      <p class="page-subtitle">Lista de participantes conforme cota contratada</p>
    </div>
    <div style="max-width:680px;">
      <div class="card" style="margin-bottom:20px;">
        <div class="card-body">
          <div style="display:flex; align-items:center; gap:16px; padding:16px; background:#EFF6FF; border-radius:10px; margin-bottom:16px; border:1px solid #BFDBFE;">
            <span style="font-size:28px;">📋</span>
            <div>
              <p style="font-weight:700; font-size:14px;">Cota Diamond — Mailing Completo</p>
              <p style="font-size:13px; color:#64748B; margin-top:2px;">Acesso à lista completa de participantes confirmados (LGPD Compliance)</p>
            </div>
            <span class="badge badge-green" style="flex-shrink:0;">Disponível</span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px;">
            ${[['847','Inscritos'],['623','Confirmados'],['389','Presentes estimados']].map(([n,l]) =>
              `<div style="text-align:center; padding:16px; background:#F8FAFC; border-radius:10px;">
                <div style="font-size:24px; font-weight:800; color:#1B4FCA;">${n}</div>
                <div style="font-size:12px; color:#64748B; margin-top:4px;">${l}</div>
              </div>`).join('')}
          </div>

          <div style="border:1px solid #E2E8F0; border-radius:10px; overflow:hidden; margin-bottom:20px;">
            <div style="padding:12px 16px; background:#F8FAFC; font-size:12px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:.5px;">Campos disponíveis na lista</div>
            <div style="padding:16px; display:flex; flex-wrap:wrap; gap:8px;">
              ${['Nome Completo','Empresa','Cargo','E-mail Profissional','Cidade','Estado','Tipo de Ingresso'].map(f =>
                `<span class="badge badge-blue">${f}</span>`).join('')}
            </div>
          </div>

          <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:14px; margin-bottom:20px;">
            <p style="font-size:13px; font-weight:600; color:#92400E; margin-bottom:4px;">⚖️ Termos de Uso — LGPD</p>
            <p style="font-size:12.5px; color:#78350F; line-height:1.6;">O mailing só pode ser utilizado para comunicações relacionadas à participação no evento. É vedado o compartilhamento com terceiros. Histórico de downloads é registrado.</p>
          </div>

          <div style="display:flex; gap:10px;">
            <button class="btn btn-primary" onclick="showToast('📥 Mailing (CSV) baixado! Histórico registrado.','success')">📥 Download CSV</button>
            <button class="btn btn-secondary" onclick="showToast('📥 Mailing (XLSX) baixado!','success')">📊 Download Excel</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Histórico de Downloads</span></div>
        <div class="card-body" style="padding:0;">
          <table>
            <thead><tr><th>Data</th><th>Arquivo</th><th>Usuário</th></tr></thead>
            <tbody>
              <tr><td style="color:#64748B;">10/08/2025 09:12</td><td>mailing_flysummit2025.csv</td><td>Carlos Silva</td></tr>
              <tr><td style="color:#64748B;">12/08/2025 14:30</td><td>mailing_flysummit2025.xlsx</td><td>Marina Torres</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── SCHEDULE ─── */
function sponsorSchedule() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📅 Cronograma do Evento</h1>
      <p class="page-subtitle">Datas e horários de montagem, evento e desmontagem</p>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="timeline">
          ${[
            { date:'13/09 (Sáb)', time:'08:00–20:00', icon:'🏗️', color:'#EDE9FE', textColor:'#7C3AED', title:'Montagem dos Stands',       desc:'Acesso de prestadores e equipes de montagem. Entrada pelo Portão 4 (lateral).', type:'setup' },
            { date:'14/09 (Dom)', time:'08:00–20:00', icon:'🔧', color:'#EDE9FE', textColor:'#7C3AED', title:'Finalização e Testes',       desc:'Conclusão da montagem, instalação de equipamentos e testes audiovisuais.', type:'setup' },
            { date:'14/09 (Dom)', time:'14:00–18:00', icon:'👥', color:'#DBEAFE', textColor:'#1D4ED8', title:'Credenciamento da Equipe',    desc:'Credenciamento exclusivo para equipes dos patrocinadores. Leve os documentos listados.', type:'team' },
            { date:'15/09 (Seg)', time:'07:30',       icon:'🚪', color:'#DCFCE7', textColor:'#15803D', title:'Abertura do Pavilhão — Dia 1', desc:'Acesso da equipe e patrocinadores a partir das 07:30. Participantes a partir das 08:00.', type:'event' },
            { date:'14/09 (Seg)', time:'09:00',       icon:'🎉', color:'#DCFCE7', textColor:'#15803D', title:'Viajaflux Summit 2026 — DIA 1', desc:'Abertura oficial. Palestras, workshops e networking.', type:'event' },
            { date:'15/09 (Seg)', time:'19:00–21:00', icon:'🥂', color:'#FEF3C7', textColor:'#B45309', title:'Happy Hour Patrocinadores',   desc:'Networking exclusivo com líderes e palestrantes na Área VIP.', type:'event' },
            { date:'15/09 (Ter)', time:'09:00',       icon:'🎉', color:'#DCFCE7', textColor:'#15803D', title:'Viajaflux Summit 2026 — DIA 2', desc:'Segundo dia de programação. Workshops e encerramento.', type:'event' },
            { date:'16/09 (Ter)', time:'17:00',       icon:'🏆', color:'#FEF3C7', textColor:'#B45309', title:'Encerramento & Premiação',    desc:'Cerimônia de encerramento e premiações especiais.', type:'event' },
            { date:'17/09 (Qua)', time:'08:00–17:00', icon:'📦', color:'#FEE2E2', textColor:'#DC2626', title:'Desmontagem',                 desc:'Prazo máximo para retirada de todos os materiais e equipamentos.', type:'dismantle' },
          ].map((t, i) => `
          <div class="timeline-item">
            <div class="timeline-dot" style="background:${t.color}; color:${t.textColor};">${t.icon}</div>
            <div style="flex:1; padding-top:4px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:6px;">
                <span style="font-size:14px; font-weight:700;">${t.title}</span>
                <span class="badge badge-gray" style="font-size:11px;">📅 ${t.date}</span>
                <span class="badge badge-gray" style="font-size:11px;">⏰ ${t.time}</span>
              </div>
              <p style="font-size:13px; color:#475569; line-height:1.6;">${t.desc}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── MAP ─── */
function sponsorMap() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🗺️ Mapa — Localização do Stand</h1>
      <p class="page-subtitle">Stand 01 — Entrada Principal (Cota Diamond)</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 300px; gap:20px;">
      <div class="card">
        <div class="card-body" style="padding:0; overflow:hidden; border-radius:14px;">
          <div style="position:relative; background:#F0F4F8; height:420px;">
            <svg width="100%" height="100%" viewBox="0 0 700 420">
              <rect width="700" height="420" fill="#EEF2F7"/>
              <rect x="20" y="20" width="660" height="380" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

              <!-- Entrance area -->
              <rect x="280" y="350" width="140" height="35" rx="6" fill="#0D1B2A" stroke="#1B4FCA" stroke-width="2"/>
              <text x="350" y="371" text-anchor="middle" font-size="12" fill="white" font-weight="700">ENTRADA PRINCIPAL</text>

              <!-- Diamond Stand - highlighted -->
              <rect x="40" y="40" width="180" height="140" rx="8" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="3"/>
              <rect x="42" y="42" width="176" height="136" rx="6" fill="none" stroke="#93C5FD" stroke-width="1" stroke-dasharray="4"/>
              <text x="130" y="95" text-anchor="middle" font-size="14" font-weight="800" fill="#1D4ED8">⭐ STAND 01</text>
              <text x="130" y="112" text-anchor="middle" font-size="11" fill="#3B82F6">TechCorp Brasil</text>
              <text x="130" y="128" text-anchor="middle" font-size="10" fill="#93C5FD">6m × 6m — Diamond</text>
              <text x="130" y="143" text-anchor="middle" font-size="10" fill="#60A5FA">📍 Sua localização</text>

              <!-- Other stands -->
              ${[
                [240,40,100,80,'Stand 02','GrowthCo','Gold','#FEF3C7','#D97706'],
                [350,40,100,80,'Stand 03','FinanceHub','Gold','#FEF3C7','#D97706'],
                [460,40,100,80,'Stand 04','SalesMax','Silver','#F3F4F6','#6B7280'],
                [570,40,100,80,'Stand 05','LogisBR','Silver','#F3F4F6','#6B7280'],
                [240,140,100,70,'Stand 06','CloudBase','Bronze','#FFF7ED','#EA580C'],
                [350,140,100,70,'Stand 07','TalentFirst','Bronze','#FFF7ED','#EA580C'],
                [460,140,100,70,'Stand 08','DataViz','Bronze','#FFF7ED','#EA580C'],
              ].map(([x,y,w,h,id,name,q,bg,cl]) => `
                <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${bg}" stroke="${cl}" stroke-width="1.5"/>
                <text x="${x+w/2}" y="${y+h/2-8}" text-anchor="middle" font-size="11" font-weight="600" fill="${cl}">${id}</text>
                <text x="${x+w/2}" y="${y+h/2+8}" text-anchor="middle" font-size="9" fill="${cl}">${name}</text>
              `).join('')}

              <!-- Corridor -->
              <text x="350" y="240" text-anchor="middle" font-size="12" fill="#94A3B8">─── Corredor Principal ───</text>

              <!-- Food area -->
              <rect x="40" y="260" width="200" height="100" rx="8" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
              <text x="140" y="313" text-anchor="middle" font-size="13" font-weight="700" fill="#EA580C">🍽️ Alimentação</text>

              <!-- Palco -->
              <rect x="380" y="260" width="280" height="100" rx="8" fill="#EDE9FE" stroke="#7C3AED" stroke-width="2"/>
              <text x="520" y="313" text-anchor="middle" font-size="13" font-weight="700" fill="#7C3AED">🎭 Palco Principal</text>

              <!-- You are here arrow -->
              <path d="M130,200 L130,180 L150,200 L140,200 L140,220" fill="#EF4444" stroke="#EF4444"/>
              <text x="130" y="240" text-anchor="middle" font-size="10" font-weight="700" fill="#EF4444">📍 Você</text>
            </svg>
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-header"><span class="card-title">Detalhes do Stand</span></div>
          <div class="card-body" style="padding:16px;">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${[
                ['📍','Localização','Stand 01 — Entrada Principal'],
                ['📐','Medidas','6m × 6m = 36m²'],
                ['⬆️','Pé-direito','3,5m'],
                ['⚡','Elétrica','Trifásico 220V — 20A'],
                ['🔌','Pontos','4 tomadas + 1 ponto de internet'],
                ['🚗','Acesso','Portão 1 — Carga/Descarga'],
              ].map(([i,l,v]) => `
                <div style="display:flex; align-items:flex-start; gap:10px;">
                  <span style="font-size:16px; width:22px; flex-shrink:0;">${i}</span>
                  <div>
                    <div style="font-size:12px; color:#64748B;">${l}</div>
                    <div style="font-size:13.5px; font-weight:500; margin-top:1px;">${v}</div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Áreas Vizinhas</span></div>
          <div class="card-body" style="padding:16px;">
            <p style="font-size:13px; color:#475569; line-height:1.7;">
              ↗ <strong>Stand 02</strong> — GrowthCo (Gold)<br>
              ↓ <strong>Corredor</strong> — Acesso principal<br>
              ← <strong>Credenciamento</strong> — 15m<br>
              → <strong>Stand 02</strong> — 0,5m de distância
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── INVITES ─── */
function sponsorInvites() {
  const used   = DATA.invites.filter(i => i.status !== 'sent').length;
  const total  = 10;
  const pct    = (used/total)*100;
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">🎟️ Gestão de Convites</h1>
        <p class="page-subtitle">Controle seus ${total} convites da Cota Diamond</p>
      </div>
      <button class="btn btn-primary" data-invite-action="add">+ Adicionar Convidado</button>
    </div>

    <!-- Stats -->
    <div class="grid-4" style="margin-bottom:24px;">
      ${[
        ['#1B4FCA',total,'Total de Convites','🎟️'],
        ['#10B981',used,'Cadastrados','✅'],
        ['#F59E0B',total-used,'Disponíveis','📭'],
        ['#7C3AED', DATA.invites.filter(i=>i.status==='checkin').length,'Check-in Realizado','✓'],
      ].map(([c,n,l,i]) => `
        <div class="stat-card">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:20px;">${i}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:${c}15; display:flex; align-items:center; justify-content:center; color:${c}; font-weight:700; font-size:14px;">${((n/total)*100).toFixed(0)}%</div>
          </div>
          <div class="stat-value" style="color:${c}; font-size:28px;">${n}</div>
          <div class="stat-label">${l}</div>
        </div>`).join('')}
    </div>

    <!-- Progress bar -->
    <div class="card" style="margin-bottom:20px; padding:20px 24px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="font-size:13px; font-weight:600;">Uso dos Convites</span>
        <span style="font-size:13px; font-weight:700; color:#1B4FCA;">${used}/${total}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:${pct}%; background:linear-gradient(90deg,#1B4FCA,#10B981);"></div></div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Lista de Convidados</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="showToast('📊 Relatório exportado!','success')">📊 Exportar</button>
          <button class="btn btn-primary btn-sm" data-invite-action="add">+ Convidado</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Convidado</th><th>Empresa</th><th>Categoria</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            ${DATA.invites.map(inv => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:10px;">
                  <div class="avatar avatar-sm" style="background:#EFF6FF; color:#1B4FCA;">${inv.name[0]}</div>
                  <div>
                    <div style="font-weight:600;">${inv.name}</div>
                    <div style="font-size:12px; color:#64748B;">${inv.email}</div>
                  </div>
                </div>
              </td>
              <td><div style="font-weight:500;">${inv.company}</div><div style="font-size:12px; color:#64748B;">${inv.role}</div></td>
              <td><span class="badge ${inv.category==='VIP'?'badge-purple':inv.category==='Executive'?'badge-blue':'badge-gray'}">${inv.category}</span></td>
              <td>${statusBadge(inv.status)}</td>
              <td>
                <div style="display:flex; gap:6px;">
                  ${inv.status==='sent'?`<button class="btn btn-secondary btn-sm" data-invite-action="send">📧 Reenviar</button>`:''}
                  <button class="btn btn-ghost btn-sm" onclick="showToast('✏️ Editando convidado...','info')">✏️</button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ─── TEAM UPLOAD ─── */
function sponsorTeam() {
  return `
  <div class="page">
    <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
      <div>
        <h1 class="page-title">👥 Upload da Equipe</h1>
        <p class="page-subtitle">Cadastre os membros da sua equipe para o evento</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-secondary" onclick="showToast('📥 Template Excel baixado!','success')">📥 Template Excel</button>
        <button class="btn btn-primary" data-team-add>+ Adicionar Membro</button>
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nome</th><th>Cargo</th><th>Cidade</th><th>Chegada</th><th>Saída</th><th></th></tr></thead>
          <tbody>
            ${DATA.team.map(m => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:10px;">
                  <div class="avatar avatar-sm" style="background:#EFF6FF; color:#1B4FCA;">${m.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <span style="font-weight:600;">${m.name}</span>
                </div>
              </td>
              <td style="color:#64748B;">${m.role}</td>
              <td><span class="badge badge-gray">📍 ${m.city}</span></td>
              <td style="font-size:13px;">${m.arrivalDate} <span style="color:#94A3B8;">às ${m.arrivalTime}</span></td>
              <td style="font-size:13px;">${m.departDate} <span style="color:#94A3B8;">às ${m.departTime}</span></td>
              <td>
                <div style="display:flex; gap:6px;">
                  <button class="btn btn-ghost btn-sm" onclick="showToast('✏️ Editando...','info')">✏️</button>
                  <button class="btn btn-ghost btn-sm" onclick="showToast('🗑️ Removido.','info')">🗑️</button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ─── SPEAKER UPLOAD ─── */
function sponsorSpeakerUpload() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🎤 Cadastro de Palestrante</h1>
      <p class="page-subtitle">Cota Diamond inclui 1 slot de palestra no Palco Principal</p>
    </div>
    <div style="max-width:680px;">
      <div class="card">
        <div class="card-header"><span class="card-title">Informações do Palestrante</span></div>
        <div class="card-body">
          <form id="speaker-form">
            <div class="grid-2">
              <div class="form-group"><label class="form-label">Nome Completo *</label><input class="form-input" placeholder="Nome do palestrante" required></div>
              <div class="form-group"><label class="form-label">Cargo / Título</label><input class="form-input" placeholder="CEO, Fundador, Especialista..."></div>
            </div>
            <div class="form-group"><label class="form-label">Mini Bio *</label><textarea class="form-textarea" placeholder="Biografia resumida do palestrante (máx. 300 caracteres)" maxlength="300" required></textarea><div class="form-hint">A bio será exibida no app e no site do evento.</div></div>
            <div class="form-group"><label class="form-label">Tema da Palestra *</label><input class="form-input" placeholder="Título da palestra" required></div>
            <div class="grid-2">
              <div class="form-group"><label class="form-label">LinkedIn</label><input type="url" class="form-input" placeholder="https://linkedin.com/in/..."></div>
              <div class="form-group"><label class="form-label">Instagram</label><input class="form-input" placeholder="@usuario"></div>
            </div>
            <div class="form-group"><label class="form-label">Foto do Palestrante</label>
              <div class="upload-area" style="padding:24px;" onclick="showToast('Abrindo seletor de arquivo...','info')">
                <div style="font-size:32px; margin-bottom:8px;">👤</div>
                <p style="font-size:14px; font-weight:500; color:#475569;">Clique para enviar foto</p>
                <p style="font-size:12px; color:#94A3B8; margin-top:4px;">JPG ou PNG · Mín. 400×400px · Máx. 5MB</p>
              </div>
            </div>
            <div class="form-group"><label class="form-label">Necessidades Técnicas</label>
              <textarea class="form-textarea" placeholder="Microfone de lapela, clicker, adaptador HDMI, webcam..."></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
              <button type="button" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary" onclick="event.preventDefault(); showToast('✅ Palestrante cadastrado com sucesso!','success'); DATA.checklist.find(c=>c.id===5).done=true;">✅ Cadastrar Palestrante</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── PRESENTATION UPLOAD ─── */
function sponsorPresentation() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📤 Upload de Apresentação</h1>
      <p class="page-subtitle">Envie os materiais da sua palestra</p>
    </div>
    <div style="max-width:640px;">
      <div class="card" style="margin-bottom:20px;">
        <div class="card-header"><span class="card-title">Enviar Arquivo</span></div>
        <div class="card-body">
          <div class="upload-area" onclick="showToast('📂 Abrindo seletor de arquivo...','info')">
            <div style="font-size:40px; margin-bottom:12px;">📊</div>
            <p style="font-size:15px; font-weight:600; color:#475569; margin-bottom:6px;">Arraste o arquivo ou clique para selecionar</p>
            <p style="font-size:13px; color:#94A3B8;">PPT, PPTX, PDF, MP4 · Máx. 500MB</p>
          </div>

          <div style="margin-top:20px;">
            <h4 style="font-size:13px; font-weight:600; margin-bottom:12px;">Arquivos Enviados</h4>
            ${[
              { name:'apresentacao_techcorp_v1.pptx', size:'18 MB', date:'12/08', status:'changes' },
            ].map(f => `
            <div class="file-item">
              <div class="file-icon" style="background:#DBEAFE;">📊</div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:13.5px; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${f.name}</div>
                <div style="font-size:12px; color:#64748B;">${f.size} · Enviado em ${f.date}</div>
              </div>
              ${approvalStatusBadge(f.status)}
              <button class="btn btn-ghost btn-sm" onclick="showToast('🗑️ Arquivo removido.','info')">🗑️</button>
            </div>`).join('')}
          </div>

          <div style="background:#FEF3C7; border:1px solid #FDE68A; border-radius:10px; padding:14px; margin-top:16px;">
            <p style="font-size:13px; font-weight:600; color:#92400E; margin-bottom:4px;">⚠️ Ajuste Solicitado</p>
            <p style="font-size:12.5px; color:#78350F;">Slide 5: logo precisa ser versão branca sobre fundo escuro. Envie a versão corrigida.</p>
          </div>

          <div style="margin-top:16px; display:flex; justify-content:flex-end;">
            <button class="btn btn-primary" onclick="showToast('📤 Nova versão enviada para análise!','success'); DATA.checklist.find(c=>c.id===6).done=true;">📤 Enviar Nova Versão</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── STAND DESIGN ─── */
function sponsorStandDesign() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🏗️ Design do Stand</h1>
      <p class="page-subtitle">Envie o projeto e artes do seu stand</p>
    </div>
    <div style="max-width:760px;">
      <div class="card" style="margin-bottom:20px;">
        <div class="card-header"><span class="card-title">📁 Tipos de Arquivo</span></div>
        <div class="card-body">
          <div class="grid-2" style="margin-bottom:20px;">
            ${[
              { icon:'🖼️', label:'Layout do Stand',     desc:'Planta baixa, vistas, 3D', accept:'PDF, DWG, SKP, MAX' },
              { icon:'🎨', label:'Artes Gráficas',       desc:'Painéis, banners, totens',  accept:'AI, PSD, PDF, TIFF' },
              { icon:'💡', label:'Mockup / Renderização',desc:'Imagem 3D do projeto',        accept:'JPG, PNG, PDF' },
              { icon:'🏷️', label:'Logos e Identidade',   desc:'Logotipos em alta resolução', accept:'AI, SVG, PDF, EPS' },
            ].map(t => `
            <div style="border:1px solid #E2E8F0; border-radius:10px; padding:16px; cursor:pointer; transition:border-color .15s;" onmouseover="this.style.borderColor='#3B82F6'" onmouseout="this.style.borderColor='#E2E8F0'" onclick="showToast('📂 Abrindo envio de ${t.label}...','info')">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <span style="font-size:22px;">${t.icon}</span>
                <div>
                  <div style="font-size:13.5px; font-weight:600;">${t.label}</div>
                  <div style="font-size:12px; color:#64748B;">${t.desc}</div>
                </div>
              </div>
              <div style="font-size:11px; color:#94A3B8; background:#F8FAFC; padding:4px 8px; border-radius:4px;">${t.accept}</div>
            </div>`).join('')}
          </div>

          <div class="upload-area" onclick="showToast('📂 Selecionando arquivos...','info')">
            <div style="font-size:36px; margin-bottom:10px;">🏗️</div>
            <p style="font-size:14px; font-weight:500; color:#475569;">Arraste todos os arquivos aqui</p>
            <p style="font-size:12px; color:#94A3B8; margin-top:4px;">Múltiplos arquivos · Máx. 200MB cada</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Arquivos Enviados</span><span class="badge badge-green">✓ Design Aprovado</span></div>
        <div class="card-body" style="padding:12px 20px;">
          ${[
            { name:'stand_techcorp_layout_v2.pdf',  size:'14 MB',  type:'pdf', date:'10/08', status:'approved' },
            { name:'techcorp_banner_3x2m_v2.ai',    size:'45 MB',  type:'ai',  date:'10/08', status:'approved' },
            { name:'logo_techcorp_branca.svg',       size:'156 KB', type:'svg', date:'08/08', status:'approved' },
            { name:'mockup_3d_stand.jpg',            size:'8 MB',   type:'jpg', date:'10/08', status:'approved' },
          ].map(f => `
          <div class="file-item">
            <div class="file-icon" style="background:${f.type==='pdf'?'#FEE2E2':f.type==='ai'?'#EDE9FE':'#DBEAFE'};">${fileIcon(f.type)}</div>
            <div style="flex:1; min-width:0;">
              <div style="font-size:13.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</div>
              <div style="font-size:12px; color:#64748B;">${f.size} · ${f.date}</div>
            </div>
            ${approvalStatusBadge(f.status)}
            <button class="btn btn-ghost btn-sm" onclick="showToast('📥 Baixando...','info')">📥</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ─── APPROVALS ─── */
function sponsorApprovals() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🔍 Aprovações</h1>
      <p class="page-subtitle">Acompanhe o status dos seus materiais</p>
    </div>

    <div style="display:flex; flex-direction:column; gap:16px; max-width:760px;">
      ${DATA.approvals.map(a => {
        const colors = { approved:'#F0FDF4', review:'#EFF6FF', changes:'#FFFBEB', pending:'#F8FAFC' };
        const borderColors = { approved:'#BBF7D0', review:'#BFDBFE', changes:'#FDE68A', pending:'#E2E8F0' };
        return `
        <div class="card" style="border-color:${borderColors[a.status]}; background:${colors[a.status]};">
          <div class="card-body">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px;">
              <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap;">
                  <h3 style="font-size:16px; font-weight:700;">${a.type}</h3>
                  ${approvalStatusBadge(a.status)}
                  <span class="badge badge-gray">${a.version}</span>
                  ${a.date ? `<span style="font-size:12px; color:#94A3B8;">📅 ${a.date}</span>` : ''}
                </div>
                <p style="font-size:13.5px; color:#475569;">${a.comments || 'Aguardando envio de arquivo.'}</p>

                <!-- Timeline for this item -->
                <div style="display:flex; gap:0; margin-top:16px; align-items:center;">
                  ${['Enviado','Em Análise','Feedback','Aprovado'].map((step, i) => {
                    const stepDone = (a.status==='approved' && i<=3) || (a.status==='changes' && i<=2) || (a.status==='review' && i<=1) || (a.status==='pending' && i<=0);
                    return `
                    <div style="display:flex; align-items:center; flex:1;">
                      <div style="text-align:center; flex:1;">
                        <div style="width:28px; height:28px; border-radius:50%; background:${stepDone?'#1B4FCA':'#E2E8F0'}; color:${stepDone?'white':'#94A3B8'}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; margin:0 auto 4px;">
                          ${stepDone?'✓':(i+1)}
                        </div>
                        <div style="font-size:10px; color:${stepDone?'#1B4FCA':'#94A3B8'}; font-weight:${stepDone?'600':'400'};">${step}</div>
                      </div>
                      ${i<3?`<div style="height:2px; flex:1; background:${stepDone?'#BFDBFE':'#E2E8F0'}; margin-bottom:16px;"></div>`:''}
                    </div>`;
                  }).join('')}
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
                ${a.file ? `<button class="btn btn-ghost btn-sm" onclick="showToast('📥 Baixando ${a.file}...','info')">📥 ${a.file}</button>` : ''}
                ${a.status === 'changes' ? `<button class="btn btn-primary btn-sm" onclick="navigate('sponsor/presentation')">📤 Enviar Nova Versão</button>` : ''}
                ${a.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="navigate('sponsor/stand-design')">📤 Enviar Arquivo</button>` : ''}
              </div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}
