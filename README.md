
# Aplicativo de Mercado Cordova

Este é um aplicativo móvel de mercado desenvolvido usando Apache Cordova para a plataforma Android. O aplicativo permite que os usuários visualizem produtos, adicionem itens ao carrinho e gerenciem suas compras de forma simples e intuitiva.

## Índice

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Plugins Cordova Utilizados](#plugins-cordova-utilizados)
- [Personalização](#personalização)
- [Considerações](#considerações)
- [Licença](#licença)

## Funcionalidades

- **Tela de Login**: O usuário fornece um nome de usuário para acessar o aplicativo. O login é persistido, não sendo necessário realizar login novamente ao reabrir o aplicativo.
- **Tela Principal (Lista de Produtos)**: Exibe uma lista de produtos disponíveis, permitindo que o usuário visualize detalhes de cada produto.
- **Tela de Detalhes do Produto**: Apresenta informações detalhadas sobre o produto, incluindo a possibilidade de selecionar a quantidade desejada antes de adicionar ao carrinho.
- **Tela do Carrinho**: O usuário pode visualizar os itens adicionados ao carrinho, ajustar quantidades ou remover itens.
- **Persistência de Dados**: Dados do carrinho e informações do usuário são armazenados usando IndexedDB, garantindo que cada usuário tenha seu próprio carrinho.
- **Navegação Intuitiva**: Botões de retorno que levam o usuário de volta à tela apropriada (tela principal ou carrinho).
- **Feedback ao Usuário**:
  - **Vibração Suave**: O dispositivo vibra suavemente após um login bem-sucedido.
  - **Notificações Locais**: Notificações são enviadas quando um item é adicionado ao carrinho.
- **Detecção de Conectividade**: O aplicativo informa ao usuário quando está offline, utilizando o plugin de informação de rede.

## Pré-requisitos

- **Node.js** (versão 10 ou superior)
- **Apache Cordova** instalado globalmente:
  ```bash
  npm install -g cordova
  ```
- **SDK do Android**: Para compilar e testar o aplicativo no Android.
- **Java Development Kit (JDK)**: Necessário para o Android SDK.
- **Dispositivo Android** ou emulador para testes.
- **Conexão com a internet**: Para baixar dependências e plugins.

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar Dependências do Cordova

Adicionar a plataforma Android e instalar os plugins necessários.

```bash
cordova platform add android
```

### 3. Instalar os Plugins Cordova

```bash
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-local-notification
cordova plugin add cordova-plugin-vibration
```

### 4. Colocar os Arquivos do Projeto

Certifique-se de que a estrutura de diretórios esteja conforme especificado, com todos os arquivos nos lugares corretos.

### 5. Adicionar Imagens dos Produtos

Coloque as imagens correspondentes dos produtos na pasta `www/img/` com os nomes especificados no código (`maca.jpg`, `pao_integral.jpg`, etc.).

### 6. Compilar o Aplicativo

```bash
cordova build android
```

### 7. Executar o Aplicativo

Para executar no dispositivo conectado via USB:

```bash
cordova run android
```

Para executar em um emulador:

```bash
cordova emulate android
```

## Estrutura do Projeto

```
my-market-app/
├── www/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── router.js
│   │   ├── login.js
│   │   ├── main.js
│   │   ├── cart.js
│   │   ├── product.js
│   │   ├── network.js
│   │   └── notifications.js
│   ├── templates/
│   │   ├── login.html
│   │   ├── main.html
│   │   ├── cart.html
│   │   └── product.html
│   └── img/
│       ├── maca.jpg
│       ├── pao_integral.jpg
│       ├── leite.jpg
│       ├── ...
├── config.xml
└── Outros arquivos de configuração do Cordova
```

## Uso

- **Primeiro Acesso**: Ao abrir o aplicativo pela primeira vez, o usuário é direcionado para a tela de login, onde deve inserir um nome de usuário.
- **Tela Principal**: Após o login, o usuário é direcionado para a tela principal, onde pode navegar pelos produtos.
- **Detalhes do Produto**: Ao selecionar um produto, o usuário pode ver detalhes, ajustar a quantidade e adicionar ao carrinho.
- **Carrinho**: O usuário pode acessar o carrinho a qualquer momento para gerenciar os itens adicionados.
- **Logout**: Na tela principal, o usuário tem a opção de fazer logout, retornando à tela de login.

## Plugins Cordova Utilizados

- **cordova-plugin-network-information**: Detecta mudanças no estado da rede e informa ao usuário quando está offline.
- **cordova-plugin-local-notification**: Envia notificações locais, como quando um item é adicionado ao carrinho.
- **cordova-plugin-vibration**: Fornece feedback tátil ao usuário, como uma vibração suave após o login.

## Personalização

- **Adicionar/Remover Produtos**: Edite o arquivo `js/app.js`, na seção que adiciona os produtos iniciais, para incluir ou remover produtos.
- **Imagens**: Substitua ou adicione imagens na pasta `www/img/` para corresponder aos produtos desejados.
- **Estilos**: Personalize o arquivo `css/styles.css` para alterar o tema e o design do aplicativo.
- **Componentes OnsenUI**: Explore a documentação do OnsenUI para adicionar novos componentes ou modificar os existentes.

## Considerações

- **Persistência de Dados**: Os dados são armazenados localmente usando IndexedDB. Se o aplicativo for reinstalado ou os dados do aplicativo forem limpos, as informações serão perdidas.
- **Compatibilidade**: O aplicativo foi testado no Android. Para suporte em iOS, pode ser necessário ajustes adicionais.
- **Permissões**: Certifique-se de conceder as permissões necessárias no dispositivo para que os plugins funcionem corretamente (notificações, vibração, acesso à rede).

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.
