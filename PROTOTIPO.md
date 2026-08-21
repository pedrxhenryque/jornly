# Protótipo — Projeto 2

Autor: Pedro Henrique Sousa Rodrigues

## Link do Figma

https://www.figma.com/design/Qb8UcdBjgdE1VGmPPZjP7a/JORNLY?node-id=1204-8874&t=Uka7yDpgvsjxF8rs-0

## Links do projeto

App publicado: https://jornly-1.onrender.com
API publicada: https://jornly.onrender.com
Repositório: https://github.com/pedrxhenryque/jornly

## Fluxo principal prototipado

1. Cadastro
2. Login
3. Feed / Home — feed de notícias filtrado pelas categorias de interesse do usuário, com filtro adicional por categoria clicável na sidebar
4. Detalhe da notícia
5. Perfil / Configurações — categorias de interesse, preferências e logout

## Melhorias aplicadas (do relatório heurístico do E6)

1. Usuário não sabia se o feed estava carregando, vazio ou com erro. Resolvido com os 4 estados explícitos de interface (skeleton loading, mensagem de vazio, erro com "tentar novamente", toast de sucesso), aplicando a Heurística #1 (Visibilidade do status do sistema)
2. Categorias soltas, sem indicação clara de quais estavam ativas. Resolvido com marcação visual (destaque) nas categorias selecionadas, sempre visíveis na sidebar, aplicando a Heurística #6 (Reconhecimento em vez de memorização)
3. Falta de saída rápida da tela de detalhe de volta ao feed. Resolvido com botão de voltar ao feed fixo no topo da tela de Detalhe, aplicando a Heurística #3 (Controle e liberdade do usuário)

## Estados de interface cobertos

Vazio: mensagem "Nenhuma notícia por aqui" com atalho para editar categorias.
Carregamento: skeleton screens no lugar dos cards.
Erro: mensagem de falha ao carregar com botão "Tentar novamente".
Sucesso: confirmação visual após salvar preferências.

## Feedbacks recebidos dos colegas

1. Testou e gostou, não relatou nenhum ponto de travamento ou confusão.
2. Achou a navegação clara, mas sentiu falta de uma aba dedicada só para ver as notícias das categorias escolhidas de forma mais elaborada, já que antes isso ficava misturado no feed geral. Esse feedback motivou o filtro por categoria clicável na sidebar, implementado na versão final.
3. Gostou do fluxo, mas apontou a falta de opções de segurança na conta, como confirmação de senha para ações sensíveis e uma opção de deletar conta.

## Integração e deploy

O frontend (React + Vite) consome a API própria (Node/Express) através de chamadas fetch, com tratamento de estados de carregamento e erro. A busca de notícias é feita no backend, que atua como proxy para a NewsAPI, evitando expor a chave de API no navegador e contornando a restrição da NewsAPI a ambientes de produção.

O login é persistido no localStorage do navegador, mantendo o usuário autenticado entre atualizações de página.

Backend e frontend estão publicados separadamente no Render, com variáveis de ambiente configuradas para a comunicação entre os dois serviços.
