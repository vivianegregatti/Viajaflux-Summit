/* ============================================================
   FLY SUMMIT — Service Provider Views
   ============================================================ */

function renderServiceView(route) {
  const views = {
    'service/dashboard': serviceDashboard,
    'service/schedule':  serviceSchedule,
    'service/map':       serviceMap,
    'service/contract':  serviceContract,
    'service/upload':    serviceUpload,
  };
  return (views[route] || serviceDashboard)();
}

function serviceDashboard() {
  const u = STATE.user;
  return `
  <div class="page">
    <div class="hero-banner" style="margin-bottom:24px;">
      <div style="position:relative; z-index:1;">
        <p style="font-size:11px; opacity:.6; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Portal do Prestador de Serviço</p>
        <h1 style="font-size:24px; font-weight:800; margin-bottom:6px;">${u.company}</h1>
        <p style="font-size:14px; opacity:.7;">Tipo de Serviço: ${u.serviceType}</p>
        <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
          ${[
            ['📅','Evento','15–16 Set 2025'],
            ['🏗️','Montagem','13–14 Set'],
            ['📦','Desmontagem','17 Set'],
          ].map(([i,l,v]) => `
          <div style="background:rgba(255,255,255,.1); border-radius:10px; padding:10px 16px; display:flex; align-items:center; gap:8px;">
            <span>${i}</span>
            <div>
              <div style="font-size:11px; opacity:.6; text-transform:uppercase; letter-spacing:.5px;">${l}</div>
              <div style="font-size:14px; font-weight:700;">${v}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="grid-2" style="gap:20px;">
      <div class="card">
        <div class="card-header"><span class="card-title">📋 Status do Contrato</span></div>
        <div class="card-body" style="text-align:center; padding:32px;">
          <div style="font-size:52px; margin-bottom:12px;">✅</div>
          <div style="font-size:18px; font-weight:700; color:#065F46; margin-bottom:4px;">Contrato Ativo</div>
          <p style="font-size:13px; color:#64748B; margin-bottom:20px;">Contrato de Serviço Nº FS-SRV-0023<br>Assinado em 20/07/2025</p>
          <button class="btn btn-primary btn-sm" onclick="navigate('service/contract')">Ver Contrato →</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">⚡ Próximas Atividades</span></div>
        <div class="card-body">
          ${[
            { date:'13/09', hora:'08:00', task:'Início da Montagem', status:'pending' },
            { date:'13/09', hora:'20:00', task:'Relatório de Montagem Dia 1', status:'pending' },
            { date:'14/09', hora:'08:00', task:'Finalização + Inspeção', status:'pending' },
            { date:'17/09', hora:'08:00', task:'Início da Desmontagem', status:'pending' },
          ].map(a => `
          <div style="display:flex; gap:14px; padding:12px 0; border-bottom:1px solid #F1F5F9; align-items:center;">
            <div style="width:44px; text-align:center; flex-shrink:0;">
              <div style="font-size:13px; font-weight:700; color:#1B4FCA;">${a.date.split('/')[0]}</div>
              <div style="font-size:10px; color:#94A3B8;">/${a.date.split('/')[1]}</div>
            </div>
            <div style="flex:1;">
              <div style="font-size:13.5px; font-weight:500;">${a.task}</div>
              <div style="font-size:12px; color:#64748B;">${a.hora}</div>
            </div>
            ${statusBadge(a.status)}
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">📞 Contato Operacional</span></div>
        <div class="card-body">
          ${[
            { name:'Coordenador de Produção', contact:'Paulo Mendes', phone:'(11) 99999-1111', email:'paulo@viajaflux.com.br' },
            { name:'Supervisor de Stands', contact:'Ana Carvalho', phone:'(11) 99999-2222', email:'ana@viajaflux.com.br' },
          ].map(c => `
          <div style="padding:14px; background:#F8FAFC; border-radius:10px; margin-bottom:10px;">
            <div style="font-size:11px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px;">${c.name}</div>
            <div style="font-size:14px; font-weight:600;">${c.contact}</div>
            <div style="font-size:12px; color:#1B4FCA; margin-top:4px;">${c.phone} · ${c.email}</div>
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">📤 Envio Rápido</span></div>
        <div class="card-body" style="padding:16px; display:flex; flex-direction:column; gap:10px;">
          ${[
            { icon:'📄', label:'Enviar ART / RRT', route:'service/upload' },
            { icon:'📊', label:'Relatório de Andamento', route:'service/upload' },
            { icon:'📷', label:'Fotos de Execução', route:'service/upload' },
            { icon:'✅', label:'Checklist de Segurança', route:'service/upload' },
          ].map(a => `
          <button class="btn btn-white" style="justify-content:flex-start; gap:10px;" onclick="navigate('${a.route}')">
            <span style="font-size:18px;">${a.icon}</span> ${a.label}
          </button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function serviceSchedule() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📅 Cronograma Operacional</h1>
      <p class="page-subtitle">Datas e horários de acesso ao local</p>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="timeline">
          ${[
            { date:'12/09 (Sex)', time:'14:00–18:00', icon:'📋', color:'#DBEAFE', text:'#1D4ED8', title:'Vistoria Técnica',              desc:'Reconhecimento do espaço com equipe Viajaflux.' },
            { date:'13/09 (Sáb)', time:'07:00–20:00', icon:'🏗️', color:'#EDE9FE', text:'#7C3AED', title:'Montagem Geral — Dia 1',          desc:'Entrada pela portaria de serviço. Crachá obrigatório para todos.' },
            { date:'14/09 (Dom)', time:'07:00–20:00', icon:'🔧', color:'#EDE9FE', text:'#7C3AED', title:'Montagem Geral — Dia 2',          desc:'Finalização, testes de equipamentos e inspeção técnica.' },
            { date:'15/09 (Seg)', time:'06:00–08:00', icon:'🚚', color:'#FEF3C7', text:'#B45309', title:'Últimos Ajustes Pré-Evento',      desc:'Acesso exclusivo de equipes técnicas antes da abertura.' },
            { date:'15/09 (Seg)', time:'Evento',      icon:'🎉', color:'#DCFCE7', text:'#065F46', title:'EVENTO DIA 1',                    desc:'Presença conforme contrato para suporte técnico.' },
            { date:'16/09 (Ter)', time:'Evento',      icon:'🎉', color:'#DCFCE7', text:'#065F46', title:'EVENTO DIA 2',                    desc:'Suporte contínuo durante o evento.' },
            { date:'17/09 (Qua)', time:'08:00–17:00', icon:'📦', color:'#FEE2E2', text:'#DC2626', title:'Desmontagem',                     desc:'Prazo máximo para retirada de equipamentos e materiais.' },
          ].map(t => `
          <div class="timeline-item">
            <div class="timeline-dot" style="background:${t.color}; color:${t.text};">${t.icon}</div>
            <div style="flex:1; padding-top:4px;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; flex-wrap:wrap;">
                <span style="font-size:14px; font-weight:700;">${t.title}</span>
                <span class="badge badge-gray">📅 ${t.date} · ⏰ ${t.time}</span>
              </div>
              <p style="font-size:13px; color:#475569;">${t.desc}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function serviceMap() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">🗺️ Planta Técnica</h1>
      <p class="page-subtitle">Acesso, carga/descarga e área de trabalho</p>
    </div>
    <div class="grid-2" style="gap:20px;">
      <div class="card">
        <div class="card-header"><span class="card-title">Acessos de Serviço</span></div>
        <div class="card-body">
          ${[
            { icon:'🚚', label:'Portão de Carga/Descarga', value:'Portão 4 — Lateral Sul', note:'Aberto: 06:00–22:00 durante montagem' },
            { icon:'👷', label:'Vestiário de Prestadores', value:'Bloco B — Subsolo', note:'Acesso com crachá FS-SRV' },
            { icon:'⚡', label:'Ponto de Energia Principal', value:'Sala Técnica — Ala C', note:'Carga disponível: até 60A trifásico' },
            { icon:'💧', label:'Ponto de Água', value:'Corredor de Serviço', note:'Apenas para uso técnico' },
            { icon:'♻️', label:'Descarte de Resíduos', value:'Container — Área Externa', note:'Reciclagem e entulho separados' },
          ].map(a => `
          <div style="display:flex; gap:14px; padding:12px 0; border-bottom:1px solid #F1F5F9; align-items:flex-start;">
            <span style="font-size:22px; flex-shrink:0;">${a.icon}</span>
            <div>
              <div style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:.5px;">${a.label}</div>
              <div style="font-size:14px; font-weight:600; margin-top:2px;">${a.value}</div>
              <div style="font-size:12px; color:#94A3B8; margin-top:2px;">${a.note}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Downloads Técnicos</span></div>
        <div class="card-body" style="display:flex; flex-direction:column; gap:10px;">
          ${[
            { icon:'📄', name:'Planta Baixa Pavilhão', size:'8.2 MB' },
            { icon:'📐', name:'Memorial Técnico — Instalações', size:'3.4 MB' },
            { icon:'⚡', name:'Diagrama Elétrico', size:'2.1 MB' },
            { icon:'🚒', name:'Plano de Evacuação', size:'1.8 MB' },
          ].map(f => `
          <div class="file-item" style="cursor:pointer;" onclick="showToast('📥 Baixando ${f.name}...','success')">
            <div class="file-icon" style="background:#F1F5F9;">${f.icon}</div>
            <div style="flex:1;"><div style="font-size:13.5px; font-weight:500;">${f.name}</div><div style="font-size:12px; color:#64748B;">${f.size}</div></div>
            <button class="btn btn-primary btn-sm">📥 Baixar</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function serviceContract() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📋 Contrato de Serviço</h1>
      <p class="page-subtitle">Contrato Nº FS-SRV-0023</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 280px; gap:20px; max-width:900px;">
      <div class="card">
        <div class="card-header"><span class="card-title">Contrato</span><span class="badge badge-green">✅ Ativo</span></div>
        <div class="card-body" style="font-size:13.5px; line-height:1.9; color:#374151;">
          <h2 style="text-align:center; font-size:16px; font-weight:700; margin-bottom:4px;">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h2>
          <p style="text-align:center; color:#64748B; margin-bottom:24px;">Viajaflux Summit 2026 — Nº VF-SRV-0023</p>
          <p><strong>CONTRATANTE:</strong> Viajaflux Eventos Ltda</p>
          <p style="margin-top:8px;"><strong>PRESTADOR:</strong> Estrutura Pro Ltda — Montagem de Stands</p>
          <p style="margin-top:16px;"><strong>OBJETO:</strong> Montagem e desmontagem de 20 stands de patrocinadores, incluindo infraestrutura elétrica e acabamento.</p>
          <p style="margin-top:8px;"><strong>PERÍODO:</strong> 12 a 16 de Setembro de 2026</p>
          <p style="margin-top:8px;"><strong>LOCAL:</strong> Campos do Jordão, SP</p>
          <p style="margin-top:8px;"><strong>VALOR TOTAL:</strong> R$ 45.000,00</p>
          <div style="margin-top:24px; padding:20px; background:#F8FAFC; border-radius:10px; text-align:center;">
            <p style="font-size:12px; color:#64748B; margin-bottom:12px;">Assinaturas Eletrônicas</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
              <div style="border-top:2px solid #0D1B2A; padding-top:10px;">
                <p style="font-size:13px; font-weight:700;">Viajaflux Eventos Ltda</p>
                <p style="font-size:11px; color:#64748B;">20/07/2025</p>
                <p style="font-size:10px; color:#10B981;">✅ Verificado</p>
              </div>
              <div style="border-top:2px solid #059669; padding-top:10px;">
                <p style="font-size:13px; font-weight:700;">Estrutura Pro Ltda</p>
                <p style="font-size:11px; color:#64748B;">21/07/2025</p>
                <p style="font-size:10px; color:#10B981;">✅ Verificado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="align-self:flex-start;">
        <div class="card-header"><span class="card-title">Ações</span></div>
        <div class="card-body" style="padding:16px; display:flex; flex-direction:column; gap:10px;">
          <button class="btn btn-primary" onclick="showToast('📥 Contrato baixado!','success')">📥 Download PDF</button>
          <button class="btn btn-secondary" onclick="navigate('service/upload')">📤 Enviar Documentos</button>
        </div>
      </div>
    </div>
  </div>`;
}

function serviceUpload() {
  return `
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">📤 Enviar Documentos</h1>
      <p class="page-subtitle">Documentos técnicos, relatórios e fotos de execução</p>
    </div>
    <div style="max-width:640px;">
      <div class="card" style="margin-bottom:20px;">
        <div class="card-header"><span class="card-title">Tipos de Documento</span></div>
        <div class="card-body">
          <div class="grid-2" style="gap:12px; margin-bottom:20px;">
            ${[
              { icon:'📄', label:'ART / RRT', desc:'Anotação de Responsabilidade Técnica' },
              { icon:'📊', label:'Relatório Diário', desc:'Andamento da obra/montagem' },
              { icon:'📷', label:'Fotos de Execução', desc:'Registro fotográfico das etapas' },
              { icon:'✅', label:'Checklist de Segurança', desc:'NR-18 e normas do evento' },
              { icon:'📋', label:'Medição de Serviço', desc:'Para liberação de pagamento' },
              { icon:'🔧', label:'Manual Técnico', desc:'Instruções de montagem/desmontagem' },
            ].map(t => `
            <div style="border:1px solid #E2E8F0; border-radius:10px; padding:14px; cursor:pointer; transition:border-color .15s;" onmouseover="this.style.borderColor='#1B4FCA'" onmouseout="this.style.borderColor='#E2E8F0'" onclick="showToast('📂 Enviando ${t.label}...','info')">
              <div style="font-size:24px; margin-bottom:6px;">${t.icon}</div>
              <div style="font-size:13px; font-weight:600;">${t.label}</div>
              <div style="font-size:11px; color:#64748B; margin-top:2px;">${t.desc}</div>
            </div>`).join('')}
          </div>
          <div class="upload-area" onclick="showToast('📂 Abrindo seletor de arquivo...','info')">
            <div style="font-size:36px; margin-bottom:10px;">📤</div>
            <p style="font-size:14px; font-weight:500; color:#475569;">Arraste arquivos ou clique para selecionar</p>
            <p style="font-size:12px; color:#94A3B8; margin-top:4px;">PDF, JPG, PNG, DOCX, XLSX · Máx. 50MB cada</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Documentos Enviados</span></div>
        <div class="card-body" style="padding:12px 20px;">
          ${[
            { name:'ART_estrutura_pro_2025.pdf', size:'1.2 MB', date:'22/07', status:'approved' },
            { name:'relatorio_vistoria_12set.pdf', size:'3.4 MB', date:'12/09', status:'review' },
          ].map(f => `
          <div class="file-item">
            <div class="file-icon" style="background:#FEE2E2;">📄</div>
            <div style="flex:1; min-width:0;">
              <div style="font-size:13.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</div>
              <div style="font-size:12px; color:#64748B;">${f.size} · ${f.date}</div>
            </div>
            ${approvalStatusBadge(f.status)}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}
