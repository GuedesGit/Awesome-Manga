# 🌸 Awesome Manga

Projeto React que mostra destaques de anime, manga e cultura pop japonesa. Uma aplicação moderna e responsiva desenvolvida com React que apresenta notícias, destaques e informações sobre a cultura japonesa.

## 🚀 Demo

🔗 **Site publicado:** [https://GuedesGit.github.io/Awesome-Manga](https://GuedesGit.github.io/Awesome-Manga)

## 📋 Funcionalidades

- 📰 Lista de artigos sobre anime e manga
- ⭐ Grid de destaques em destaque
- 🔍 Barra de pesquisa interativa
- 📱 Design responsivo para todos os dispositivos
- 🎨 Interface moderna e limpa

## 🛠️ Tecnologias Utilizadas

- **React** 18.2.0
- **React DOM** 18.2.0
- **React Scripts** 5.0.1
- **CSS3** para estilização
- **GitHub Pages** para deployment

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para executar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GuedesGit/Awesome-Manga.git
   cd Awesome-Manga
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto localmente:**
   ```bash
   npm start
   ```
   O site abrirá automaticamente em `http://localhost:3000`

4. **Para fazer build de produção:**
   ```bash
   npm run build
   ```

## 🚀 Deploy no GitHub Pages

### Configuração inicial do repositório

1. **Criar o repositório no GitHub:**
   ```bash
   gh repo create GuedesGit/Awesome-Manga --public --source=. --remote=origin --push --confirm
   ```

2. **Deploy automático:**
   ```bash
   npm run deploy
   ```

### Como funciona o deploy

- O `package.json` está configurado com:
  - `homepage`: URL do GitHub Pages
  - `predeploy`: Script que faz build antes do deploy
  - `deploy`: Script que publica na branch `gh-pages`

- O deploy é feito pela biblioteca `gh-pages` que:
  1. Executa `npm run build`
  2. Cria/atualiza a branch `gh-pages`
  3. Faz push dos arquivos buildados

## 📁 Estrutura do Projeto

```
awesome-manga/
├── public/
│   └── index.html          # Template HTML principal
├── src/
│   ├── App.js             # Componente principal
│   ├── index.js           # Ponto de entrada
│   ├── index.css          # Estilos globais
│   ├── components/        # Componentes React
│   │   ├── ArticlesList.jsx
│   │   ├── FeaturedNews.jsx
│   │   ├── Header.jsx
│   │   ├── HighlightsGrid.jsx
│   │   └── SearchBar.jsx
│   └── data/
│       └── sampleHighlights.js  # Dados de exemplo
├── build/                 # Arquivos buildados (gerados)
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**João Guedes**
- GitHub: [@GuedesGit](https://github.com/GuedesGit)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
