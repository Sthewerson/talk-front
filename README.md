# TalkFront

Frontend moderno para aplicação de chat em tempo real, construído com Next.js 14, React e Socket.IO.

## Tecnologias

- **Framework**: Next.js 14.2.3 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: TailwindCSS 3.4 + Tailwind Animate
- **UI Components**: Radix UI (Avatar, Dialog, Dropdown Menu, Label, Slot)
- **Gerenciamento de Estado**: Zustand 4.5
- **Comunicação em Tempo Real**: Socket.IO Client 4.7
- **Validação de Formulários**: React Hook Form + Zod 3.23
- **Requisições HTTP**: Axios 1.7
- **Utilitários**:
  - Day.js (manipulação de datas)
  - Emoji Mart (seletor de emojis)
  - Lucide React (ícones)
  - Next Themes (modo escuro/claro)
  - Sonner (notificações toast)
  - React Spinners (loading states)

## Funcionalidades

- Autenticação de usuários (SignIn/SignUp)
- Chat em tempo real com Socket.IO
- Interface responsiva e moderna
- Suporte a modo escuro
- Seletor de emojis para mensagens
- Gerenciamento de conversas
- Upload de anexos
- Notificações toast
- Animações suaves
- Criptografia de ponta a ponta (UI)

## Pré-requisitos

- Node.js 20 ou superior
- npm, yarn, pnpm ou bun
- Backend API rodando (veja configuração abaixo)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd talkfront
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_AUTH_KEY=access_token
```

**Variáveis:**
- `NEXT_PUBLIC_API_BASE_URL`: URL base da API backend (padrão: http://127.0.0.1:8000)
- `NEXT_PUBLIC_AUTH_KEY`: Nome da chave para armazenar o token de autenticação nos cookies (padrão: access_token)

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev       # Inicia servidor de desenvolvimento em http://localhost:3000

# Produção
npm run build     # Cria build otimizado para produção
npm run start     # Inicia servidor de produção

# Qualidade de código
npm run lint      # Executa ESLint para verificar código
```

## Estrutura do Projeto

```
talkfront/
├── public/                 # Arquivos estáticos
├── src/
│   ├── app/               # App Router (Next.js 14)
│   │   ├── auth/          # Páginas de autenticação
│   │   ├── account/       # Página de conta do usuário
│   │   ├── layout.tsx     # Layout raiz
│   │   └── page.tsx       # Página inicial
│   ├── components/        # Componentes React
│   │   ├── Chat/          # Componentes do chat
│   │   ├── Layouts/       # Layouts e providers
│   │   ├── Pages/         # Componentes de página
│   │   └── ui/            # Componentes UI (shadcn/ui)
│   ├── lib/               # Utilitários e helpers
│   │   ├── api.ts         # Cliente API
│   │   ├── requests.ts    # Requisições HTTP
│   │   ├── utils.ts       # Funções utilitárias
│   │   └── schemas/       # Schemas de validação (Zod)
│   ├── stores/            # Stores Zustand
│   │   ├── authStore.ts   # Estado de autenticação
│   │   └── chatStore.ts   # Estado do chat
│   ├── types/             # Definições de tipos TypeScript
│   │   ├── Api.ts
│   │   ├── Auth.ts
│   │   ├── Chat.ts
│   │   ├── Message.ts
│   │   ├── User.ts
│   │   └── Attachment.ts
│   └── middleware.ts      # Middleware Next.js (auth, etc.)
├── .env                   # Variáveis de ambiente
├── components.json        # Configuração shadcn/ui
├── tailwind.config.ts     # Configuração Tailwind
├── tsconfig.json          # Configuração TypeScript
├── next.config.mjs        # Configuração Next.js
└── package.json
```

## Arquitetura

### Gerenciamento de Estado

O projeto utiliza **Zustand** para gerenciamento de estado global:

- **authStore**: Gerencia autenticação, usuário logado e sessão
- **chatStore**: Gerencia conversas ativas, mensagens e estado do chat

### Comunicação com API

- **Server Actions**: Utiliza `api.ts` para requisições server-side com autenticação automática
- **Socket.IO**: Conexão WebSocket para mensagens em tempo real
- **Axios**: Cliente HTTP para requisições REST

### Validação

Todos os formulários utilizam **React Hook Form** + **Zod** para validação:
- `authSchema.ts`: Validação de login/registro
- `userSchema.ts`: Validação de dados do usuário
- `chatSchema.ts`: Validação de mensagens e chats

## Desenvolvimento

### Rodando em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Integração com Backend

Este frontend se comunica com uma API Django REST Framework. Certifique-se de que o backend está rodando antes de iniciar o frontend.

**Endpoints principais:**
- `POST /api/v1/auth/signin` - Login
- `POST /api/v1/auth/signup` - Registro
- `GET /api/v1/chats` - Lista de conversas
- `POST /api/v1/chats` - Criar conversa
- `GET /api/v1/messages` - Mensagens de uma conversa
- `POST /api/v1/messages` - Enviar mensagem
- Socket.IO em `/socket.io/` - Comunicação em tempo real

## Recursos de UI

### Componentes shadcn/ui

O projeto utiliza componentes do [shadcn/ui](https://ui.shadcn.com/):
- Avatar
- Button
- Card
- Badge
- Dialog
- Drawer
- Dropdown Menu
- Form
- Input
- Label
- Sheet
- Skeleton
- Sonner (Toast)

### Temas

Suporte completo a modo claro e escuro usando `next-themes`.

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto é privado e de uso interno.

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório.
