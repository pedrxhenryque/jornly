# Jornly

Agregador de notícias personalizado por temas de interesse, desenvolvido para a disciplina de Desenvolvimento Web (UEPB 2026.1).

Autor: Pedro Henrique Sousa Rodrigues

## Sobre o projeto

O Jornly permite que o usuário monte um feed de notícias personalizado, escolhendo categorias de interesse como Tecnologia, Política, Economia, Esportes e Ciência. As notícias são agregadas a partir da NewsAPI e exibidas de forma filtrada, com opção de busca por palavra chave e filtro adicional por categoria clicável.

## Links

App publicado: https://jornly-1.onrender.com
API publicada: https://jornly.onrender.com
Protótipo Figma: https://www.figma.com/design/Qb8UcdBjgdE1VGmPPZjP7a/JORNLY?node-id=1204-8874&t=Uka7yDpgvsjxF8rs-0

## Funcionalidades

Cadastro e login de usuário.
Seleção de categorias de interesse no perfil.
Feed de notícias filtrado pelas categorias escolhidas.
Filtro adicional por categoria clicável na sidebar.
Busca por palavra chave dentro do feed.
Tela de detalhe da notícia com link para a matéria original.
Edição de perfil (nome e email) e exclusão de conta.
Tradução automática dos títulos das notícias para português.

## Tecnologias utilizadas

Frontend: React, Vite, React Router.
Backend: Node.js, Express, SQLite.
APIs externas: NewsAPI (busca de notícias) e MyMemory (tradução).
Deploy: Render (frontend como Static Site, backend como Web Service).

## Estrutura do repositório

```
jornly/
  frontend/    aplicação React (Vite)
  backend/     API Node/Express
```

## Como rodar localmente

### Backend

```
cd backend
npm install
node src/server.js
```

O backend precisa de uma variável de ambiente NEWS_API_KEY com uma chave válida da NewsAPI.

### Frontend

```
cd frontend
npm install
npm run dev
```

O frontend precisa de um arquivo .env com:

```
VITE_API_URL=http://localhost:3000
```

## Arquitetura

O frontend consome a API própria através de chamadas fetch, tratando estados de carregamento, erro e vazio. A busca de notícias é feita pelo backend, que atua como proxy para a NewsAPI, evitando expor a chave de API no navegador. O login do usuário é persistido no localStorage, mantendo a sessão ativa entre atualizações de página.

## Documentação adicional

Ver PROTOTIPO.md para detalhes do processo de prototipação, melhorias heurísticas aplicadas e feedbacks recebidos de colegas durante o desenvolvimento.
