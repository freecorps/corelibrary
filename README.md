# Core Library

## Projeto Biblioteca On-line

Este projeto tem como objetivo desenvolver uma biblioteca on-line para gerenciar o empréstimo e devolução de livros, permitindo o acesso tanto por bibliotecários quanto por usuários cadastrados. O projeto utiliza o framework Next.js para o front-end e o AppWrite como backend.

### Requisitos básicos

* O sistema pode ser acessado pelo bibliotecário ou por um usuário cadastrado
* Usuário ou bibliotecário precisam fazer um cadastro no sistema indicando seu papel
* O bibliotecário cadastra ou descadastra livros do acervo
* O bibliotecário aprova ou não o cadastro de um usuário
* O bibliotecário pode suspender um usuário por um tempo indeterminado
* Um usuário ativo pode ter em seu poder no máximo 3 livros ao mesmo tempo
* O usuário que atrasar mais que 5 dias a devolução de um livro fica suspenso por um mês para novas retiradas
* Um usuário pode reservar livros pelo sistema e deve receber uma resposta indicando se o livro está disponível ou não
* O usuário que reservou um livro recebe um QR code, assim que livro se torne disponível. Esse código tem validade de 5 dias
* Para retirar o livro o usuário deve apresentar o QR code recebido
* O sistema envia mensagens de cobrança dois dias antes do prazo final de devolução

### Requisitos técnicos

* O sistema deve ser livre de plataforma

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/freecorps/corelibrary.git
```

2. Instale as dependências

```bash
cd projeto-biblioteca-online
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as informações necessárias para conexão com o AppWrite

```makefile
codeAPPWRITE_ENDPOINT=https://your-appwrite-endpoint
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key
```

4. Execute o projeto

```bash
npm run dev
```

5. Acesse o projeto no navegador através da URL `http://localhost:3000`

### Contribuição

Por favor, siga as [diretrizes de contribuição](diretrizes-de-contribuicao.md) para contribuir com este projeto.
