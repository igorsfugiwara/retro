# Ferramenta de Retrospectiva Interativa


Este projeto é uma aplicação web interativa desenvolvida com React, que permite a realização de retrospectivas ágeis em equipes. Os usuários podem criar, visualizar e interagir com cartões organizados em colunas. A aplicação suporta autenticação de equipe, mascaramento de conteúdo, funcionalidades de likes/dislikes, e muito mais.

A ferramenta de retrospectiva para equipes permite a criação de um quadro colaborativo com cartões em três categorias: "Começar a Fazer", "Parar de Fazer" e "Continuar Fazendo". Esta aplicação React é integrada ao Firebase para gerenciar os dados de forma dinâmica e colaborativa, permitindo que múltiplos usuários adicionem, revelem, excluam e interajam com cartões durante a retrospectiva.

Para começar a explorar as funcionalidades da ferramenta, você pode acessar a sala "teste". Basta inserir "teste" no campo de seleção de equipe durante o login. Convide um colega para se conectar à mesma sala e experimentar juntos as interações, como criar, revelar e interagir com cartões em tempo real. Essa é uma excelente forma de entender como a ferramenta funciona de maneira colaborativa!

https://retro-igor-lorem-ipsum.netlify.app/


## Funcionalidades

- **Autenticação por equipe**: Acesso restrito com seleção de nome e equipe.
- **Colunas interativas**:
  - **Começar a Fazer**
  - **Parar de Fazer**
  - **Continuar Fazendo**
- **Gestão de cartões**:
  - Adicionar cartões.
  - Revelar conteúdo dos cartões.
  - Apagar cartões individuais ou todos de uma coluna.
- **Interações nos cartões**:
  - Dar likes ou dislikes, limitados por usuário.
  - Exibir autor do cartão.
- **Persistência em tempo real**: Integração com Firebase Firestore para sincronização de dados.
- **Design responsivo e intuitivo**.

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - CSS
- **Backend**:
  - Firebase Firestore
- **Outras Bibliotecas**:
  - Firebase SDK

## Pré-requisitos

- Node.js >= 16
- Conta no Firebase configurada para Firestore

## Como Executar

1. Clone este repositório:
    ```bash
    git clone https://github.com/igorsfugiwara/retro.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd retro
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure o Firebase com suas credenciais e edite a configuração no arquivo firebaseConfig.js.

5. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
6. Acesse a aplicação no seu navegador em http://localhost:3000.

## Componentes
### App.js
O componente principal que gerencia a seleção do quadro e o estado das colunas e cartões.

- **Funções principais**:
    - Seleção do quadro (login com nome do time e usuário)
    - Exibição e interação com as colunas de retrospectiva
    - Adição, revelação e exclusão de cartões
    - Likes e dislikes nos cartões

### BoardSelection.js
Tela de login onde os usuários inserem o nome da equipe e seu nome pessoal para acessar o quadro.

- **Validação**:
    - Verificação do nome do usuário (mínimo de 2 caracteres alfabéticos)
    - Verificação do nome da equipe (dentre uma lista de equipes predefinidas)

### Column.js
Componente que exibe uma coluna de retrospectiva com os cartões. Permite a interação com os cartões, como adicionar, revelar, excluir e curtir/descurtir.

## Como Contribuir
1. Faça um fork deste repositório.
2. Crie uma nova branch para a sua feature ou correção (git checkout -b feature/nova-feature).
3. Faça as alterações necessárias.
4. Comite suas alterações (git commit -am 'Adiciona nova feature').
5. Envie para o seu repositório (git push origin feature/nova-feature).
6. Abra um Pull Request.


#### Desenvolvido por Igor Simões Fugiwara
