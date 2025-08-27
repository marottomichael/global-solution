# Busca de Campanhas

Filtra cards de campanhas por nome/descrição em tempo real.

## Arquivo
- `js/campaign-search.js`

## Elementos esperados no DOM
- Barra de pesquisa: `.search-bar`
- Cards: `.campaign-card` (cada card dentro de uma coluna `.col-12`)
- Container das colunas: `.row.gy-4`
- Mensagem de vazio (criada dinamicamente): `#no-results-message-campaigns`

## Comportamento
- Ao digitar na `.search-bar`, filtra cards que contenham o termo no título (`.card-title`) ou na descrição (`.card-text`).
- Exibe/oculta mensagem de "Nenhuma campanha encontrada" conforme o resultado.

## API pública (contratos de DOM/eventos)
- Evento `input` na `.search-bar` ativa filtragem.
- Estrutura do card deve incluir `.card-title` e opcional `.card-text`.

## Exemplo de uso
```html
<input class="form-control search-bar" placeholder="Pesquisar..." />
<div class="row gy-4">
  <div class="col-12">
    <div class="card campaign-card">
      <div class="card-body">
        <h3 class="card-title">Água Limpa para Todos</h3>
        <p class="card-text">Meta: R$ 20.000</p>
      </div>
    </div>
  </div>
  <!-- ... outros cards ... -->
</div>
<script src="js/campaign-search.js"></script>
```

## Dicas
- Mantenha o placeholder coerente (o script define "Pesquisar...").
- O script só atua quando há `.campaign-card` na página.
