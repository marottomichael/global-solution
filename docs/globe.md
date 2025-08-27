# Globo (Localizador de ONGs)

Exibe um globo 3D (Cesium) com ONGs simuladas, localização do usuário e informações contextuais.

## Arquivo
- `js/globe.js`

## Dependências
- Cesium JS: incluir `<script src="https://cdn.jsdelivr.net/npm/cesium@1.111.0/Build/Cesium/Cesium.js"></script>`
- Bootstrap 5 (opcional) para modal de detalhes.

## Elementos esperados no DOM
- Contêiner do globo: `#globe-container`
- Loading: `.loading`
- Botões de ação: `#locate-me`, `#reset-view`
- Card flutuante de info: `.ong-info` com filhos:
  - `.ong-name`, `.ong-description`, `.ong-address`, `.ong-distance`
- Modal de detalhes: `#ongModal` com conteúdo:
  - `.modal-description`, `.modal-address`, `.modal-areas`, `.modal-projects`, `.modal-phone`, `.modal-email`, `.modal-website`, `.modal-distance`
  - Imagem `.ong-image`
  - Botão na footer `.btn-primary` (abre site)

## Funções principais
- `init()` inicializa o Cesium, adiciona marcadores, registra eventos e tenta localizar o usuário.
- `addONGMarkers()` cria entidades no globo para cada ONG.
- `locateUser()` usa Geolocation API, adiciona marcador do usuário e faz flyTo.
- `findNearbyONGs(lat, lng)` calcula distâncias (Haversine) e destaca a ONG mais próxima.
- `resetView()` reseta câmera e card de info.
- `calculateDistance(a, b, c, d)` retorna distância em km entre dois pontos.
- `showONGInfo(ong)` posiciona e mostra `.ong-info` sincronizado com o marcador.
- `showONGModal(ong)` preenche e exibe modal com detalhes; botão "Visitar Site" abre `https://{website}`.
- `generateSimulatedONGs()` cria dados fictícios (substituir por API real em produção).

## Exemplo de uso (estrutura mínima)
```html
<link href="https://cdn.jsdelivr.net/npm/cesium@1.111.0/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
<div class="loading">Carregando globo...</div>
<div id="globe-container" style="width:100%;height:500px;"></div>
<div class="controls">
  <button id="locate-me">Minha localização</button>
  <button id="reset-view">Resetar visão</button>
</div>
<div class="ong-info" style="position:absolute;display:none;">
  <h3 class="ong-name"></h3>
  <p class="ong-description"></p>
  <p class="ong-address"></p>
  <p class="ong-distance"></p>
  <button class="btn-sobre btn-saber-mais">Saber mais</button>
</div>

<!-- Modal simplificado -->
<div class="modal fade" id="ongModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"><h5 id="ongModalLabel"></h5></div>
      <div class="modal-body">
        <img class="ong-image" alt="" />
        <p class="modal-description"></p>
        <p class="modal-address"></p>
        <p class="modal-areas"></p>
        <p class="modal-projects"></p>
        <p class="modal-phone"></p>
        <p class="modal-email"></p>
        <p class="modal-website"></p>
        <p class="modal-distance"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Visitar Site</button>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/cesium@1.111.0/Build/Cesium/Cesium.js"></script>
<script src="js/globe.js"></script>
```

## Dicas
- Use CSS para posicionar `.ong-info` acima do canvas (usa `postRender` para acompanhar o marcador).
- Certifique-se de permitir geolocalização no navegador para `locateUser()`.
- Substitua `generateSimulatedONGs()` por chamada de API real quando disponível.
