/* ============================================================
   FLY SUMMIT — Login / Auth View
   ============================================================ */

function renderLogin() {
  return `
  <div class="login-page">
    <!-- Left panel -->
    <div class="login-left">
      <div style="position:relative; z-index:1;">
        <div class="logo-mark" style="margin-bottom:48px;">
          <img src="assets/logo-viajaflux.png" alt="Viajaflux Summit" style="height:38px; width:auto; max-width:220px; object-fit:contain;">
        </div>

        <div class="login-tagline">
          Eventos corporativos<br>de <span>alto impacto</span>,<br>gestão inteligente.
        </div>
        <p style="color:rgba(255,255,255,.55); font-size:15px; line-height:1.7; margin-bottom:48px;">
          Plataforma completa para organizadores, patrocinadores<br>e participantes de eventos corporativos premium.
        </p>

        <div style="margin-bottom:16px;">
          <p style="font-size:11px; font-weight:600; color:rgba(255,255,255,.3); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:12px;">ACESSO RÁPIDO — DEMONSTRAÇÃO</p>
          <div class="demo-account" data-email="participante@demo.com">
            <div class="avatar" style="background:rgba(59,130,246,.2); color:#60A5FA;">AL</div>
            <div class="da-info">
              <div class="da-role">Participante</div>
              <div class="da-email">participante@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <div class="demo-account" data-email="patrocinador@demo.com">
            <div class="avatar" style="background:rgba(245,166,35,.2); color:#F5A623;">TC</div>
            <div class="da-info">
              <div class="da-role">Patrocinador Diamond</div>
              <div class="da-email">patrocinador@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <div class="demo-account" data-email="admin@demo.com">
            <div class="avatar" style="background:rgba(124,58,237,.2); color:#A78BFA;">AF</div>
            <div class="da-info">
              <div class="da-role">Organização — Admin</div>
              <div class="da-email">admin@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <div class="demo-account" data-email="gerente.patrocinadores@demo.com">
            <div class="avatar" style="background:rgba(245,166,35,.2); color:#F5A623;">MR</div>
            <div class="da-info">
              <div class="da-role">Organização — Alçada Patrocinadores</div>
              <div class="da-email">gerente.patrocinadores@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <div class="demo-account" data-email="gerente.participantes@demo.com">
            <div class="avatar" style="background:rgba(5,150,105,.2); color:#34D399;">FA</div>
            <div class="da-info">
              <div class="da-role">Organização — Alçada Participantes</div>
              <div class="da-email">gerente.participantes@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <div class="demo-account" data-email="prestador@demo.com">
            <div class="avatar" style="background:rgba(5,150,105,.2); color:#34D399;">EP</div>
            <div class="da-info">
              <div class="da-role">Prestador de Serviço</div>
              <div class="da-email">prestador@demo.com</div>
            </div>
            <span style="color:rgba(255,255,255,.25); font-size:12px;">→</span>
          </div>
          <p style="font-size:11px; color:rgba(255,255,255,.25); margin-top:10px;">Senha para todos: <strong style="color:rgba(255,255,255,.4);">123456</strong></p>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="login-right">
      <div class="login-form-wrap">
        <div style="margin-bottom:32px;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <img src="assets/logo-viajaflux.png" alt="Viajaflux Summit" style="height:30px; width:auto; max-width:200px; object-fit:contain;">
          </div>
          <h1 style="font-size:26px; font-weight:800; color:#0D1B2A; margin-top:20px;">Bem-vindo de volta 👋</h1>
          <p style="font-size:14px; color:#64748B; margin-top:6px;">Entre com suas credenciais para acessar a plataforma.</p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input id="email" type="email" class="form-input" placeholder="seu@email.com" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label class="form-label" style="display:flex; justify-content:space-between;">
              Senha
              <a href="#" style="font-size:12px; color:#1B4FCA; text-decoration:none;">Esqueci a senha</a>
            </label>
            <input id="password" type="password" class="form-input" placeholder="••••••••" autocomplete="current-password" required>
          </div>

          <div style="display:flex; align-items:center; gap:8px; margin-bottom:24px;">
            <input type="checkbox" id="remember" style="width:15px;height:15px;cursor:pointer;">
            <label for="remember" style="font-size:13px; color:#64748B; cursor:pointer;">Manter conectado</label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">
            Entrar na plataforma →
          </button>
        </form>

        <div style="margin-top:32px; padding-top:24px; border-top:1px solid #E2E8F0; text-align:center;">
          <p style="font-size:12px; color:#94A3B8;">
            Viajaflux Summit &nbsp;·&nbsp; Campos do Jordão 2026
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}
