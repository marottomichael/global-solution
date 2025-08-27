# Carrossel (Home)

Controla a troca de imagens do herói na Home por meio de barras clicáveis.

## Arquivo
- `js/carrossel.js`

## Elementos esperados no DOM
- Imagem principal: `#heroImage`
- Barras de navegação: `.bar[data-index]` (índices: 0, 1, 2)

## Comportamento
- Marca a barra de índice 2 como ativa por padrão (imagem `agua.jpg`).
- Ao clicar em uma barra:
  - Adiciona animação de saída na imagem (`.animate`).
  - Troca `src` de `#heroImage` para a imagem correspondente.
  - Atualiza o estado visual das barras (`.active`).

## API pública (contratos de DOM/eventos)
- Clique em `.bar` (usar `data-index`).
- Classe `.active` indica a barra selecionada.
- Classe `.animate` dispara transição curta.

## Exemplo de uso
```html
<img id="heroImage" src="assets/images/Carrossel/agua.jpg" alt=""> 
<div class="bars-container">
  <div class="bar" data-index="0"></div>
  <div class="bar" data-index="1"></div>
  <div class="bar" data-index="2"></div>
</div>
<script src="js/carrossel.js"></script>
```

## Dicas
- Para autoplay, descomente o `setInterval` no final do arquivo.
- Garanta que o número de barras corresponde ao array `images`.
