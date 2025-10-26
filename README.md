# Projeto Nossa Sorocaba

Guia oficial e informativo sobre Sorocaba/SP, destacando sua história, lazer, e seu vibrante cenário esportivo. O objetivo principal deste projeto é fornecer aos visitantes uma visão completa e moderna da "Manchester Paulista".

## 1. Funcionalidades Principais (Key Features)

O projeto é baseado em código puro (HTML, CSS e JavaScript) e oferece os seguintes recursos de usabilidade e design:

* **Tema Responsivo:** Design adaptável para desktop e mobile.
* **Modo Claro/Escuro (Dark Mode):** Alternância de tema com persistência via `localStorage`.
* **Animações Suaves:** Uso da biblioteca ScrollReveal para transições elegantes ao rolar a página.
* **Componente Modal:** Visualização ampliada de imagens nas galerias.
* **Filtro de Conteúdo:** Busca dinâmica de itens na página de Lazer.
* **Acessibilidade:** Implementação de Foco Visível (`keyboard-focus`).

## 2. Tecnologias Utilizadas

* HTML5 (Estrutura Semântica)
* CSS3 (Variáveis CSS, Flexbox/Grid, Media Queries)
* JavaScript (ES6+)
* **Bibliotecas:** ScrollReveal.js

## 3. Estrutura de Arquivos

O projeto segue uma estrutura modular, onde os arquivos de estilo (`.css`) e scripts (`.js`) são organizados por contexto de página para facilitar a manutenção.

```tree
/projeto-sorocaba/
├── css/
│   ├── base/
│   │   └── base.css               # Estilos Globais, Variáveis CSS, Reset e Dark Mode.
│   ├── esportes/
│   │   └── esportes.css           # Estilos específicos da página Esportes.
│   ├── home/
│   │   └── home.css
│   ├── historia/
│   │   └── historia.css
│   ├── lazer/
│   │   └── lazer.css
│   └── manga/
│       └── manga.css
│
├── js/
│   ├── base/
│   │   └── base.js                # Lógica global (Dark Mode, Loading, Foco Visual, Botão Voltar ao Topo).
│   ├── esportes/
│   │   └── esportes.js            # Lógica da página Esportes (ScrollReveal, Modal).
│   ├── home/
│   │   └── home.js
│   ├── historia/
│   │   └── historia.js
│   ├── lazer/
│   │   └── lazer.js               # Lógica da Lazer (Filtro, Modal Avançado).
│   └── manga/
│       └── manga.js               # Lógica da página do Manga (Cursor Animado, Animação de Clique).
│
├── midia/
│   ├── img_home/                  # Imagens da Home.
│   ├── img_esportes/              # Imagens dos Esportes.
│   ├── img_lazer/                 # Imagens do Lazer.
│   ├── img_historia/              # Imagens do Historia.
│   └── img_manga/                 # Imagens do Manga.
│
├── home.html
├── historia.html
├── lazer.html
├── manga.html
└── esportes.html
```

## 4. Padrões de Versionamento (Git)

Utilizamos a convenção **Conventional Commits** (`feat`, `fix`, `docs`) para manter um histórico limpo e claro.

### 4.1. Nomenclatura de Branches

| Prefixo | Uso | Exemplo |
| :--- | :--- | :--- |
| `feat/` | Para o desenvolvimento de **novas funcionalidades** ou páginas. | `feat/implementacao-pagina-esportes` |
| `fix/` | Para correções de **bugs** ou problemas críticos. | `fix/modal-nao-fecha-lazer-js` |
| `docs/` | Para alterações e otimizações **não-funcionais** (documentação, SEO, limpeza de código, *refactors* simples). | `docs/otimizacao-seo-home` |

### 4.2. Formato das Mensagens de Commit

O formato é: `tipo(página_afetada): breve_descrição_do_que_foi_feito`

| Tipo | Descrição | Exemplo |
| :--- | :--- | :--- |
| `feat` | Implementação de nova funcionalidade ou recurso. | `feat(esportes): adiciona secoes Falcao e Sesc` |
| `fix` | Correção de um bug no código. | `fix(home): corrige erro de sintaxe na navbar` |
| `docs` | Melhorias de documentação, SEO, limpeza ou estruturação de arquivos. | `docs(base): remove comentarios e aplica foco-visible` |

## 5. Instalação e Execução (Setup)

O projeto é totalmente estático e não requer dependências de servidor ou Node.js.

1.  **Clonar o Repositório** (ou baixar o zip).
2.  **Abrir Localmente:** Abra o arquivo `home.html` diretamente no seu navegador de preferência.
3.  **Deploy:** Vercel a partir da branch "main".

## 6. Otimizações e Acessibilidade (SEO)

O projeto foi construído com foco em qualidade técnica:

* **SEO Técnico:** Uso de `rel="canonical"` e `meta description` otimizadas em todas as páginas.
* **Acessibilidade:** Implementação de `alt` tags descritivas em todas as mídias e Foco Visível para usuários de teclado.