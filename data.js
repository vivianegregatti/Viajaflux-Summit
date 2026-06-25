/* ============================================================
   FLY SUMMIT — Mock Data Layer
   ============================================================ */

const DATA = {

  event: {
    name: 'Viajaflux Summit - Campos do Jordão 2026',
    edition: '1ª Edição',
    date: new Date('2026-09-14T09:00:00'),
    dateEnd: new Date('2026-09-15T22:00:00'),
    dateDisplay: '14 e 15 de Setembro de 2026',
    location: 'Campos do Jordão — SP',
    expectedAttendees: 1200,
    theme: 'Liderança, Inovação e Resultado',
  },

  users: [
    { id: 1, name: 'Ana Lima',               email: 'participante@demo.com',           password: '123456', role: 'participant',   subRole: null,              initials: 'AL', color: '#1B4FCA', company: 'StartupXP',      jobTitle: 'CEO' },
    { id: 2, name: 'TechCorp Brasil',         email: 'patrocinador@demo.com',           password: '123456', role: 'sponsor',       subRole: null,              initials: 'TC', color: '#1B4FCA', company: 'TechCorp Brasil', quota: 'Diamond', contactName: 'Carlos Silva' },
    { id: 3, name: 'Admin Viajaflux',        email: 'admin@demo.com',                  password: '123456', role: 'organization',  subRole: null,              initials: 'AV', color: '#7C3AED', company: 'Viajaflux' },
    { id: 4, name: 'Estrutura Pro',          email: 'prestador@demo.com',              password: '123456', role: 'service',       subRole: null,              initials: 'EP', color: '#059669', company: 'Estrutura Pro Ltda', serviceType: 'Montagem de Stands' },
    { id: 5, name: 'Mariana Rocha',          email: 'gerente.patrocinadores@demo.com', password: '123456', role: 'organization',  subRole: 'org_sponsors',    initials: 'MR', color: '#D97706', company: 'Viajaflux' },
    { id: 6, name: 'Felipe Andrade',         email: 'gerente.participantes@demo.com',  password: '123456', role: 'organization',  subRole: 'org_participants', initials: 'FA', color: '#059669', company: 'Viajaflux' },
  ],

  speakers: [
    { id: 1, name: 'Ricardo Almeida', title: 'CEO & Founder', company: 'InovaTech', topic: 'Liderança na Era Digital', bio: 'Empreendedor serial com mais de 20 anos em transformação digital. Fundador de 3 empresas avaliadas em mais de R$ 500M. Palestrante em mais de 50 eventos no Brasil e exterior.', time: '09:00', room: 'Palco Principal', initials: 'RA', color: '#1B4FCA', linkedin: '#', instagram: '#', twitter: '#' },
    { id: 2, name: 'Fernanda Costa', title: 'CMO', company: 'GrowthCo', topic: 'Marketing de Resultado em 2025', bio: 'Especialista em growth marketing com histórico comprovado de escalar empresas de R$ 1M para R$ 100M em receita anual. Forbes Under 30.', time: '10:30', room: 'Palco A', initials: 'FC', color: '#059669', linkedin: '#', instagram: '#', twitter: '#' },
    { id: 3, name: 'Marcos Oliveira', title: 'CTO', company: 'FutureStack', topic: 'IA Generativa nos Negócios', bio: 'Engenheiro de software sênior e pesquisador em IA. PhD em Ciência da Computação pela USP. Consultor de empresas como Google e Meta no Brasil.', time: '14:00', room: 'Palco Principal', initials: 'MO', color: '#7C3AED', linkedin: '#', instagram: '#', twitter: '#' },
    { id: 4, name: 'Juliana Santos', title: 'VP Comercial', company: 'SalesMax', topic: 'Vendas de Alta Performance', bio: 'Liderança de times de alto desempenho com 15+ anos em vendas B2B. Responsável por R$ 2B+ em contratos fechados ao longo da carreira.', time: '15:30', room: 'Palco B', initials: 'JS', color: '#EF4444', linkedin: '#', instagram: '#', twitter: '#' },
    { id: 5, name: 'Carlos Mendes', title: 'CFO', company: 'FinanceHub', topic: 'Gestão Financeira para Scale-ups', bio: 'CFO experiente em mais de 50 fusões e aquisições. Especialista em estruturação financeira para startups em fase de escala. Conselheiro de 8 empresas.', time: '11:30', room: 'Workshop 1', initials: 'CM', color: '#D97706', linkedin: '#', instagram: '#', twitter: '#' },
    { id: 6, name: 'Patricia Rocha', title: 'Chief People Officer', company: 'TalentFirst', topic: 'Cultura que Retém Talentos', bio: 'Especialista em People & Culture com foco em atração e retenção de talentos em ambientes de alta performance. Co-autora do livro "Liderança Humana".', time: '16:30', room: 'Palco A', initials: 'PR', color: '#06B6D4', linkedin: '#', instagram: '#', twitter: '#' },
  ],

  sessions: [
    { id: 1,  title: 'Credenciamento e Café da Manhã', time: '07:30', endTime: '09:00', room: 'Entrada Principal',  type: 'break',    speakerId: null, day: 1 },
    { id: 2,  title: 'Abertura Oficial — Viajaflux Summit 2026', time: '09:00', endTime: '09:30', room: 'Palco Principal', type: 'keynote',  speakerId: null, day: 1 },
    { id: 3,  title: 'Liderança na Era Digital',         time: '09:30', endTime: '10:30', room: 'Palco Principal', type: 'keynote',  speakerId: 1,    day: 1 },
    { id: 4,  title: 'Marketing de Resultado em 2025',   time: '10:30', endTime: '11:30', room: 'Palco A',         type: 'talk',     speakerId: 2,    day: 1 },
    { id: 5,  title: 'Gestão Financeira para Scale-ups', time: '11:30', endTime: '12:30', room: 'Workshop 1',      type: 'workshop', speakerId: 5,    day: 1 },
    { id: 6,  title: 'Almoço e Networking',              time: '12:30', endTime: '14:00', room: 'Praça de Alimentação', type: 'break', speakerId: null, day: 1 },
    { id: 7,  title: 'IA Generativa nos Negócios',       time: '14:00', endTime: '15:00', room: 'Palco Principal', type: 'keynote',  speakerId: 3,    day: 1 },
    { id: 8,  title: 'Vendas de Alta Performance',       time: '15:30', endTime: '16:30', room: 'Palco B',         type: 'talk',     speakerId: 4,    day: 1 },
    { id: 9,  title: 'Coffee Break & Visita Expo',       time: '16:00', endTime: '16:30', room: 'Área de Expositores', type: 'break', speakerId: null, day: 1 },
    { id: 10, title: 'Cultura que Retém Talentos',       time: '16:30', endTime: '17:30', room: 'Palco A',         type: 'talk',     speakerId: 6,    day: 1 },
    { id: 11, title: 'Painel de Encerramento do Dia',    time: '17:30', endTime: '18:30', room: 'Palco Principal', type: 'keynote',  speakerId: null, day: 1 },
    { id: 12, title: 'Happy Hour & Networking VIP',      time: '19:00', endTime: '21:00', room: 'Área VIP',        type: 'break',    speakerId: null, day: 1 },
    { id: 13, title: 'Abertura Dia 2',                   time: '09:00', endTime: '09:30', room: 'Palco Principal', type: 'keynote',  speakerId: null, day: 2 },
    { id: 14, title: 'Workshop: Vendas Consultivas',     time: '10:00', endTime: '12:00', room: 'Workshop 1',      type: 'workshop', speakerId: 4,    day: 2 },
    { id: 15, title: 'Workshop: IA Prática',             time: '10:00', endTime: '12:00', room: 'Workshop 2',      type: 'workshop', speakerId: 3,    day: 2 },
    { id: 16, title: 'Almoço e Premiação',               time: '12:30', endTime: '14:30', room: 'Praça de Alimentação', type: 'break', speakerId: null, day: 2 },
    { id: 17, title: 'Encerramento Viajaflux Summit 2026',     time: '15:00', endTime: '16:00', room: 'Palco Principal', type: 'keynote',  speakerId: null, day: 2 },
  ],

  sponsors: [
    { id: 1, name: 'TechCorp Brasil',  quota: 'Diamond', initials: 'TC', color: '#1B4FCA', stand: 'Stand 01 — Entrada Principal',    description: 'Líder em soluções de transformação digital para médias e grandes empresas.',    contracted: true,  revenue: 300000 },
    { id: 2, name: 'FinanceHub',       quota: 'Gold',    initials: 'FH', color: '#D97706', stand: 'Stand 05 — Ala B',                description: 'Plataforma financeira completa para gestão empresarial integrada.',             contracted: true,  revenue: 180000 },
    { id: 3, name: 'GrowthCo',        quota: 'Gold',    initials: 'GC', color: '#059669', stand: 'Stand 06 — Ala B',                description: 'Aceleradora de crescimento para empresas em fase de escala.',                  contracted: true,  revenue: 180000 },
    { id: 4, name: 'SalesMax',        quota: 'Silver',  initials: 'SM', color: '#7C3AED', stand: 'Stand 12 — Ala C',               description: 'CRM e automação de vendas para times de alta performance.',                   contracted: true,  revenue: 120000 },
    { id: 5, name: 'LogisBR',        quota: 'Silver',   initials: 'LB', color: '#EF4444', stand: 'Stand 13 — Ala C',               description: 'Soluções logísticas inteligentes para e-commerce e varejo.',                  contracted: true,  revenue: 120000 },
    { id: 6, name: 'CloudBase',      quota: 'Bronze',   initials: 'CB', color: '#F59E0B', stand: 'Stand 18 — Ala D',               description: 'Infraestrutura em nuvem segura e escalável para startups e PMEs.',            contracted: false, revenue: 80000  },
    { id: 7, name: 'TalentFirst',    quota: 'Bronze',   initials: 'TF', color: '#06B6D4', stand: 'Stand 19 — Ala D',               description: 'Plataforma de gestão de talentos e cultura organizacional.',                  contracted: true,  revenue: 80000  },
    { id: 8, name: 'DataViz',        quota: 'Bronze',   initials: 'DV', color: '#84CC16', stand: 'Stand 20 — Ala D',               description: 'Business Intelligence e visualização de dados em tempo real.',                contracted: false, revenue: 80000  },
  ],

  participants: [
    { id: 1,  name: 'Ana Lima',       email: 'ana@startupxp.com',     company: 'StartupXP',    role: 'CEO',               city: 'São Paulo',      status: 'checkin',    ticket: 'VIP',      registered: '01/08' },
    { id: 2,  name: 'Bruno Martins',  email: 'bruno@inovacao.com',    company: 'Inovação SA',  role: 'CTO',               city: 'Rio de Janeiro', status: 'confirmed',  ticket: 'Premium',  registered: '03/08' },
    { id: 3,  name: 'Camila Souza',   email: 'camila@acme.com',       company: 'ACME Corp',    role: 'CMO',               city: 'São Paulo',      status: 'checkin',    ticket: 'VIP',      registered: '28/07' },
    { id: 4,  name: 'Daniel Ferreira',email: 'daniel@fintech.com',    company: 'FinTech BR',   role: 'CFO',               city: 'Curitiba',       status: 'confirmed',  ticket: 'Standard', registered: '10/08' },
    { id: 5,  name: 'Elena Ramos',    email: 'elena@saas.io',         company: 'SaaS.io',      role: 'Product Manager',   city: 'São Paulo',      status: 'registered', ticket: 'Standard', registered: '15/08' },
    { id: 6,  name: 'Felipe Nunes',   email: 'felipe@grow.co',        company: 'Grow.co',      role: 'Head Comercial',    city: 'BH',             status: 'confirmed',  ticket: 'Premium',  registered: '12/08' },
    { id: 7,  name: 'Gabriela Torres',email: 'gabi@tech.br',          company: 'TechBR',       role: 'Desenvolvedora',    city: 'Florianópolis',  status: 'checkin',    ticket: 'Standard', registered: '20/07' },
    { id: 8,  name: 'Henrique Lima',  email: 'henrique@big.co',       company: 'BigCo',        role: 'Diretor de RH',     city: 'São Paulo',      status: 'registered', ticket: 'Premium',  registered: '18/08' },
    { id: 9,  name: 'Isabela Costa',  email: 'isabela@brand.co',      company: 'Brand.co',     role: 'Designer',          city: 'São Paulo',      status: 'confirmed',  ticket: 'Standard', registered: '05/08' },
    { id: 10, name: 'João Pedro',     email: 'joao@market.br',        company: 'Market BR',    role: 'Analista',          city: 'Porto Alegre',   status: 'registered', ticket: 'Standard', registered: '20/08' },
    { id: 11, name: 'Karen Dias',     email: 'karen@nexo.com',        company: 'Nexo Ventures','role': 'Investidora',     city: 'São Paulo',      status: 'checkin',    ticket: 'VIP',      registered: '01/07' },
    { id: 12, name: 'Lucas Andrade',  email: 'lucas@labs.io',         company: 'Labs.io',      role: 'Head de Produto',   city: 'Recife',         status: 'confirmed',  ticket: 'Premium',  registered: '07/08' },
  ],

  invites: [
    { id: 1, name: 'Roberto Alves',   company: 'Mega Corp',      role: 'CEO',    email: 'roberto@mega.com',    phone: '(11) 99999-0001', category: 'VIP',       status: 'checkin'    },
    { id: 2, name: 'Patrícia Lopes',  company: 'Tech Solutions', role: 'CTO',    email: 'patricia@tech.com',   phone: '(11) 99999-0002', category: 'Executive', status: 'registered' },
    { id: 3, name: 'Marcus Andrade',  company: 'Invest SA',      role: 'CFO',    email: 'marcus@invest.com',   phone: '(11) 99999-0003', category: 'VIP',       status: 'sent'       },
    { id: 4, name: 'Luciana Pinto',   company: 'Brand Agency',   role: 'CMO',    email: 'luciana@brand.com',   phone: '(11) 99999-0004', category: 'Standard',  status: 'confirmed'  },
    { id: 5, name: 'Eduardo Faria',   company: 'StartupXP',      role: 'COO',    email: 'eduardo@startup.com', phone: '(11) 99999-0005', category: 'Executive', status: 'registered' },
  ],

  team: [
    { id: 1, name: 'Carlos Silva',   role: 'Gerente de Stand',    city: 'São Paulo',      arrivalDate: '14/09', arrivalTime: '14:00', departDate: '16/09', departTime: '20:00' },
    { id: 2, name: 'Marina Torres',  role: 'Assistente Comercial', city: 'São Paulo',     arrivalDate: '15/09', arrivalTime: '07:00', departDate: '16/09', departTime: '19:00' },
    { id: 3, name: 'Roberto Lima',   role: 'Técnico de TI',       city: 'Rio de Janeiro', arrivalDate: '14/09', arrivalTime: '16:00', departDate: '15/09', departTime: '22:00' },
  ],

  checklist: [
    { id: 1, label: 'Contrato assinado',         done: true  },
    { id: 2, label: 'Dados cadastrais enviados', done: true  },
    { id: 3, label: 'Pagamento realizado',        done: true  },
    { id: 4, label: 'Equipe cadastrada',          done: true  },
    { id: 5, label: 'Palestrante cadastrado',     done: false },
    { id: 6, label: 'Apresentação enviada',       done: false },
    { id: 7, label: 'Design do stand enviado',    done: true  },
    { id: 8, label: 'Design aprovado',            done: false },
    { id: 9, label: 'Material gráfico aprovado',  done: false },
  ],

  approvals: [
    { id: 1, type: 'Design do Stand',         version: 'v2', status: 'approved',  date: '10/08', comments: 'Aprovado! Design excelente.', file: 'stand_design_v2.pdf'      },
    { id: 2, type: 'Banner 3x2m',             version: 'v1', status: 'review',    date: '14/08', comments: 'Em análise pela equipe.',    file: 'banner_3x2_v1.pdf'        },
    { id: 3, type: 'Apresentação Principal',  version: 'v1', status: 'changes',   date: '12/08', comments: 'Slide 5: logo precisa ser versão branca sobre fundo escuro.', file: 'apresentacao_v1.pptx' },
    { id: 4, type: 'Comunicação Visual',      version: '-',  status: 'pending',   date: null,    comments: 'Aguardando envio.',          file: null                       },
  ],

  notifications: [
    { id: 1, title: 'Credenciamento Aberto!', message: 'O credenciamento do Viajaflux Summit 2026 está aberto. Apresente seu QR Code na entrada principal.', time: '08:00', type: 'info',    read: false },
    { id: 2, title: 'Palestra em 15 min',     message: '"Liderança na Era Digital" com Ricardo Almeida começa em 15 min no Palco Principal.', time: '08:45', type: 'warning', read: false },
    { id: 3, title: 'Palestra Iniciada',      message: 'A abertura oficial do Viajaflux Summit 2026 está acontecendo agora no Palco Principal.', time: '09:00', type: 'success', read: true  },
    { id: 4, title: 'Horário de Almoço',      message: 'Praça de alimentação disponível das 12:30 às 14:00. Bon appétit!', time: '12:30', type: 'info',    read: true  },
    { id: 5, title: 'Happy Hour Liberado!',   message: 'Happy Hour começa às 19:00 na Área VIP. Networking e open bar!', time: '19:00', type: 'success', read: false },
  ],

  faq: [
    { category: 'Credenciamento', items: [
      { q: 'Como funciona o credenciamento?', a: 'O credenciamento é realizado na entrada principal. Apresente seu QR Code (disponível no app) ou documento de identidade. O processo dura em média 2 minutos.' },
      { q: 'Qual o horário do credenciamento?', a: 'Dia 1: a partir das 07:30. Dia 2: a partir das 08:00.' },
      { q: 'Posso credenciar outra pessoa?', a: 'Não. O credenciamento é individual e intransferível.' },
    ]},
    { category: 'Hospedagem & Transporte', items: [
      { q: 'O evento oferece hospedagem?', a: 'Temos parceria com hotéis de Campos do Jordão com tarifas especiais. Use o código VIAJAFLUX2026.' },
      { q: 'Como chegar ao evento?', a: 'Campos do Jordão fica a ~180 km de São Paulo. Acesso pela Rodovia Floriano Rodrigues Pinheiro (SP-123). Haverá transfer oficial dos principais hotéis.' },
    ]},
    { category: 'Alimentação', items: [
      { q: 'A alimentação está inclusa?', a: 'Café da manhã e coffee breaks estão inclusos. Almoço incluso para ingressos Premium e VIP.' },
      { q: 'Há opções vegetarianas?', a: 'Sim! Todas as refeições têm opções vegetarianas, veganas e sem glúten. Alergias: eventos@viajaflux.com.br.' },
    ]},
    { category: 'Programação', items: [
      { q: 'Posso assistir qualquer palestra?', a: 'Sim, respeitando a capacidade da sala. Sessões VIP são exclusivas para essa categoria.' },
      { q: 'As palestras serão gravadas?', a: 'O Palco Principal será gravado e disponibilizado na biblioteca em até 30 dias.' },
    ]},
    { category: 'Regras do Evento', items: [
      { q: 'É permitido fotografar as palestras?', a: 'Sim, desde que não atrapalhe outros participantes. Câmeras profissionais precisam de credencial de imprensa.' },
      { q: 'Animais são permitidos?', a: 'Apenas animais de suporte emocional com documentação. Informe com antecedência.' },
    ]},
  ],

  library: [
    { id: 1, title: 'Slides: Liderança na Era Digital',       speaker: 'Ricardo Almeida', type: 'pdf',  size: '12 MB', category: 'slides' },
    { id: 2, title: 'Slides: Marketing de Resultado 2025',     speaker: 'Fernanda Costa',  type: 'pdf',  size: '8 MB',  category: 'slides' },
    { id: 3, title: 'E-book: Gestão Financeira Avançada',      speaker: 'Carlos Mendes',   type: 'pdf',  size: '5 MB',  category: 'ebook'  },
    { id: 4, title: 'Workshop: Vendas de Alta Performance',     speaker: 'Juliana Santos',  type: 'pptx', size: '18 MB', category: 'slides' },
    { id: 5, title: 'E-book: IA para Líderes de Negócio',      speaker: 'Marcos Oliveira', type: 'pdf',  size: '7 MB',  category: 'ebook'  },
    { id: 6, title: 'Checklist: Cultura Organizacional',        speaker: 'Patricia Rocha',  type: 'pdf',  size: '2 MB',  category: 'ebook'  },
  ],

  pipeline: {
    prospecting:  [{ name: 'DigitalX', value: 'R$ 80.000', contact: 'João Santos' }, { name: 'StartupHub', value: 'R$ 50.000', contact: 'Maria Leal' }],
    proposal:     [{ name: 'CloudBase', value: 'R$ 120.000', contact: 'Petra Novak' }],
    negotiation:  [{ name: 'DataViz', value: 'R$ 95.000', contact: 'Alex Pinto' }, { name: 'SecureIT', value: 'R$ 60.000', contact: 'Carlos Braga' }],
    closed:       [{ name: 'TechCorp', value: 'R$ 300.000', contact: 'Ana Lima' }, { name: 'FinanceHub', value: 'R$ 180.000', contact: 'Bruno Cruz' }, { name: 'GrowthCo', value: 'R$ 180.000', contact: 'Carla Silva' }, { name: 'SalesMax', value: 'R$ 120.000', contact: 'Daniel Rocha' }, { name: 'LogisBR', value: 'R$ 120.000', contact: 'Elena Matos' }, { name: 'TalentFirst', value: 'R$ 80.000', contact: 'Felipe Souza' }],
  },

  files: [
    { id: 1, name: 'Contrato TechCorp Diamond.pdf',    category: 'contracts',      size: '2.4 MB', date: '01/08', icon: '📄' },
    { id: 2, name: 'Arte Banner Principal.ai',          category: 'arts',           size: '45 MB',  date: '05/08', icon: '🎨' },
    { id: 3, name: 'Apresentação Ricardo Almeida.pptx', category: 'presentations', size: '18 MB',  date: '10/08', icon: '📊' },
    { id: 4, name: 'Planta Baixa Pavilhão.pdf',         category: 'docs',           size: '8.2 MB', date: '25/07', icon: '📄' },
    { id: 5, name: 'Logo TechCorp Branca.svg',          category: 'arts',           size: '156 KB', date: '03/08', icon: '🎨' },
    { id: 6, name: 'Contrato GrowthCo Gold.pdf',        category: 'contracts',      size: '2.1 MB', date: '02/08', icon: '📄' },
    { id: 7, name: 'Cronograma Operacional.xlsx',        category: 'docs',           size: '320 KB', date: '08/08', icon: '📋' },
    { id: 8, name: 'Apresentação Fernanda Costa.pdf',   category: 'presentations',  size: '12 MB',  date: '12/08', icon: '📊' },
    { id: 9, name: 'Fotos Dia 1 - Palco Principal.zip','category': 'photos',        size: '1.2 GB', date: '15/09', icon: '📷' },
  ],

  metrics: {
    participants: { registered: 847, confirmed: 623, credentialed: 412, present: 389 },
    sponsors:     { total: 8, revenue: 1140000, contracts: 6, pending: 2 },
    nps: 72,
    satisfaction: 4.3,
    engagementRate: 84,
    appAccess: 638,
  },

  npsFeedbacks: [
    { name: 'Camila S.', score: 10, comment: 'Evento incrível! Organização impecável e conteúdo de altíssimo nível.', session: 'Geral' },
    { name: 'Rafael M.', score: 9,  comment: 'Excelentes palestrantes. Networking valioso. Voltarei com certeza.', session: 'Liderança na Era Digital' },
    { name: 'Beatriz L.', score: 8, comment: 'Muito bom! Só achei que faltou mais tempo para Q&A nas palestras.', session: 'Marketing de Resultado' },
    { name: 'Thiago R.',  score: 10, comment: 'Superou todas as expectativas. O workshop de IA foi transformador.', session: 'IA Generativa' },
    { name: 'Amanda P.',  score: 7,  comment: 'Bom evento. A praça de alimentação poderia ter mais opções.', session: 'Geral' },
  ],
};
