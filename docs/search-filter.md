# Filtro de ONGs

Filtra cards de ONGs por nome, categoria e descrição, com realce de termos e contador de resultados.

## Arquivo
- `js/search-filter.js`

## Elementos esperados no DOM
- Barra de pesquisa: `.search-bar`
- Cards: `.ong-card` (com `.ong-title`, `.category-badge` e opcional `.card-text`)
- Container das colunas: `.row.gy-4`
- Mensagens auxiliares criadas dinamicamente:
  - `#no-results-message` (alerta de nenhum resultado)
  - `#results-counter` (contador de resultados)

## Comportamento
- Divide o termo de busca em palavras e exige que todas estejam no conteúdo pesquisável do card.
- Realça termos encontrados usando `<mark class="search-highlight">`.
- Permite limpar a busca com tecla ESC.

## API pública (contratos de DOM/eventos)
- Evento `input` na `.search-bar` ativa filtragem e realce.
- Estilo inline para `.search-highlight` é injetado se não existir.

## Exemplo de uso
```html
<input class="form-control search-bar" placeholder="Busque ONGs" />
<div class="row gy-4">
  <div class="col-12 col-md-6 col-lg-3">
    <div class="card ong-card">
      <div class="card-body text-center">
        <h3 class="h5 ong-title">WWF-Brasil</h3>
        <span class="badge category-badge">Conservação</span>
        <p class="card-text">Atua em conservação da natureza no Brasil.</p>
      </div>
    </div>
  </div>
  <!-- ... outros cards ... -->
</div>
<script src="js/search-filter.js"></script>
```

## Dicas
- Garanta que `.ong-title` e `.category-badge` existam para melhor relevância.
- O seletor de coluna do script suporta classes responsivas comuns (`.col-12`, `.col-md-6`, `.col-lg-3`).
