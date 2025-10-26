// --- "Banco de Dados" dos Pontos Turísticos ---
// Isso é um Array (uma lista) de Objetos (JSON).
// Cada objeto {} é um ponto turístico com suas propriedades.
const attractions = [
  {
    title: 'Parque Zoológico "Quinzinho de Barros"',
    description: "Considerado o símbolo da cidade, é uma referência na América Latina em lazer, pesquisa e conservação. Famoso por abrigar uma vasta coleção da fauna brasileira, com foco em espécies ameaçadas de extinção, e por sediar o Museu Histórico Sorocabano em um casarão colonial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Main_entrance_to_the_Zoo_Quinzinho_de_Barros_at_Sorocaba_-_SP_-_Brazil.jpg",
    imagePosition: "left" // Usado para alternar a posição da imagem (esquerda/direita)
  },
  {
    title: 'Jardim Botânico "Irmãos Villas-Bôas"',
    description: "Um dos principais cartões-postais da cidade, destaca-se pelo seu Palacete de Cristal, uma imponente estrutura de vidro e aço para exposições. O parque está localizado em uma área de transição entre os biomas do Cerrado e da Mata Atlântica, sendo um importante centro de conservação.",
    image: "https://agendasorocaba.com.br/wp-content/uploads/2025/04/Copia-de-SITE-Capa-de-evento-materia-ou-local-864-x-486-pixels.jpg",
    imagePosition: "right"
  },
  {
    title: "Mosteiro de São Bento",
    description: 'Conhecido como o "Berço de Sorocaba", é o marco zero da cidade, fundado em 1660. A cidade se desenvolveu ao redor do mosteiro, que preserva grande parte de sua arquitetura original e um altar-mor do século XVIII trazido de Portugal.',
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/6N45R5R4XZJAZI2YSQHTVQXKFI.jpg",
    imagePosition: "left"
  },
  {
    title: "Catedral Metropolitana",
    description: "Um marco histórico e religioso com mais de 200 anos. Sua principal relíquia é a imagem de Nossa Senhora da Ponte, uma invocação de Maria que é única no Brasil, vinda de Portugal em 1771.",
    image: "https://www.jornalcruzeiro.com.br/_midias/jpg/2025/04/08/6d-1473160.jpg",
    imagePosition: "right"
  },
  {
    title: "Estação Ferroviária e MACS",
    description: "A histórica estação, inaugurada em 1875, foi fundamental para o desenvolvimento industrial de Sorocaba. Seus armazéns anexos foram revitalizados e hoje abrigam o Museu de Arte Contemporânea de Sorocaba (MACS), criando um polo cultural que une o passado ferroviário à arte moderna.",
    image: "https://visite.sorocaba.sp.gov.br/wp-content/uploads/2015/12/estacaoooooo.jpg",
    imagePosition: "left"
  },
  {
    title: "Parque das Águas",
    description: "Um dos maiores e mais populares parques da cidade, é o principal palco para grandes eventos, shows e atividades esportivas. Oferece uma infraestrutura completa com lagos, ciclovia, pistas de caminhada e quadras.",
    image: "https://img.freepik.com/fotos-premium/vista-aerea-do-parque-das-aguas-em-sorocaba-brasil_361869-1352.jpg",
    imagePosition: "right"
  },
  {
    title: "Parque do Paço Municipal",
    description: "É o centro cívico de Sorocaba, onde se localizam a Prefeitura, o Teatro Municipal e a Biblioteca Municipal. O espaço funciona como uma grande área de lazer para a população, com lago, pista de caminhada e jardins.",
    image: "https://sorocabacomercio.com.br/uploads/images/202504/image_870x_67f05406ee0d3.jpg",
    imagePosition: "left"
  },
  {
    title: "Mercado Municipal",
    description: "Inaugurado em 1938, este edifício em estilo Art Déco é um patrimônio histórico e o coração comercial popular da cidade. É um local vibrante para encontrar produtos frescos, temperos, artesanato e itens regionais.",
    image: "https://midias.jornalcruzeiro.com.br/wp-content/uploads/2020/09/mercado.jpg",
    imagePosition: "right"
  }
];

// --- Renderizar (Desenhar) os Cards na Tela ---

// 1. Pega a <div> do HTML que tem o ID "attractionsGrid"
const attractionsGrid = document.getElementById('attractionsGrid');

// 2. Verifica se essa <div> realmente existe (para não dar erro)
if (attractionsGrid) { 
  
  // 3. Usa um loop (forEach) para passar por CADA item do array 'attractions'
  // 'attraction' é o objeto atual (Ex: Quinzinho)
  // 'index' é a posição dele no array (0, 1, 2...)
  attractions.forEach((attraction, index) => {
    
    // 4. Cria um elemento <div> novo (vazio) na memória do navegador
    const card = document.createElement('div');
    
    // 5. Adiciona a classe 'attraction-card' (do CSS) nesse novo <div>
    card.className = 'attraction-card';
    card.setAttribute('data-index', index); // Guarda o índice (0, 1, etc.) no card
    
    // 6. Verifica se a posição da imagem é 'right'
    const isRight = attraction.imagePosition === 'right';
    
    // 7. Monta o HTML interno do card usando os dados do objeto 'attraction'
    // ("Template Literal", permite colocar JS dentro do texto)
    card.innerHTML = `
      <div class="attraction-content" style="${isRight ? 'grid-auto-flow: dense;' : ''}">
        
        <div class="attraction-image-wrapper ${isRight ? 'fade-in-right' : 'fade-in-left'}" style="${isRight ? 'grid-column: 2;' : ''}">
          <img src="${attraction.image}" alt="${attraction.title}" class="attraction-image" loading="lazy">
        </div>
        
        <div class="attraction-text ${isRight ? 'fade-in-left' : 'fade-in-right'}">
          <div class="attraction-number">
            <span>${index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
          </div>
          <h3 class="attraction-title">${attraction.title}</h3>
          <p class="attraction-description">${attraction.description}</p>
        </div>

      </div>
    `;
    
    // 8. "Anexa" (coloca) o card pronto (que estava na memória) dentro da 'attractionsGrid' (que está no HTML)
    attractionsGrid.appendChild(card);
  });
}

// --- Animação de Scroll (Fazer cards aparecerem) ---
// Basicamente, ele "observa" os cards e avisa quando eles entram na tela.

const observerOptions = {
  threshold: 0.1, // Dispara a animação quando 10% do card estiver visível
  rootMargin: '0px 0px -100px 0px' // "Diminui" a área de visão em 100px (para animar um pouco depois)
};

// Cria o "observador"
const observer = new IntersectionObserver((entries) => {
  // Para cada item (entry) que ele está observando...
  entries.forEach(entry => {
    // ...se o item "cruzou" (entrou) na tela...
    if (entry.isIntersecting) { 
      entry.target.classList.add('visible'); // ...adiciona a classe '.visible' (que faz a animação do CSS)
    }
  });
}, observerOptions);

// Pede ao "observador" para vigiar TODOS os elementos que têm a classe '.attraction-card'
document.querySelectorAll('.attraction-card').forEach(card => {
  observer.observe(card);
});

// --- Botão de "Voltar ao Topo" ---

// 1. Pega o botão do HTML pelo ID
const scrollTopBtn = document.getElementById('scrollTop');

// 2. Verifica se o botão existe
if (scrollTopBtn) { 
  
  // 3. Adiciona um "ouvidor" de clique. Quando clicar, executa a função.
  scrollTopBtn.addEventListener('click', () => {
    // Rola a página de volta para o topo (y=0) com animação suave
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  });

  // 4. Adiciona um "ouvidor" de scroll (rolagem da página)
  window.addEventListener('scroll', () => {
    // Se a posição Y do scroll for maior que 300 pixels...
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block'; // Mostra o botão
    } else {
      scrollTopBtn.style.display = 'none'; // Esconde o botão
    }
  });

  // 5. Estado inicial (começa escondido)
  scrollTopBtn.style.display = 'none';
}