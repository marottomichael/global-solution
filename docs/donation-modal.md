# Modal de Doação

Controla abertura, preenchimento, validação e feedback do fluxo de doação.

## Arquivo
- `js/donation-modal.js`

## Dependências
- Bootstrap 5 (bundle) para modal: `bootstrap.bundle.min.js`

## Elementos esperados no DOM
- Modal: `#donationModal`
- Formulário: `#donationForm`
- Botões de valor: `.donation-amount[data-amount]`
- Valor personalizado: `#customAmount`
- Resumo: `.total-amount`, `.final-amount`
- Campos de pagamento e doador:
  - `#cardNumber`, `#cardExpiry`, `#cardCvv`
  - `#donorCpf`, `#donorPhone`
  - `#donorName`, `#donorEmail`, `#cardName`
- Informações da campanha dentro do modal: `.campaign-name`, `.campaign-goal`, `.campaign-raised`

## Como abrir o modal a partir de um card
- Botão no card deve conter atributos:
  - `data-bs-toggle="modal"`
  - `data-bs-target="#donationModal"`
  - `data-campaign-name`, `data-campaign-goal`, `data-campaign-raised`

## Fluxo de uso
1. Ao abrir, o modal lê atributos do botão e preenche dados da campanha.
2. Usuário seleciona um valor (`.donation-amount`) ou digita `#customAmount`.
3. Resumo é atualizado dinamicamente (`.total-amount` e `.final-amount`).
4. Formatações de entrada: número do cartão, validade, CVV, CPF e telefone.
5. Validação mínima: valor ≥ R$ 5,00 e campos obrigatórios preenchidos e válidos.
6. No envio, simula processamento, fecha modal e mostra alerta de sucesso.

## API pública (contratos de DOM/eventos)
- Abertura do modal: evento `show.bs.modal` em `#donationModal`.
- Botões `.donation-amount[data-amount]` definem `selectedAmount`.
- Input `#customAmount` limpa seleção e define valor manual.
- `showAlert(message, type, duration)` cria alertas temporários.

## Exemplo de uso (cards + modal)
```html
<!-- Botão do card -->
<button class="btn btn-secondary-custom"
  data-bs-toggle="modal"
  data-bs-target="#donationModal"
  data-campaign-name="Água Limpa para Todos"
  data-campaign-goal="20000"
  data-campaign-raised="10000">Doar</button>

<!-- Modal (estrutura simplificada) -->
<div class="modal fade" id="donationModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Doar para <span class="campaign-name"></span></h5>
      </div>
      <div class="modal-body">
        <p>Meta: <span class="campaign-goal"></span></p>
        <p>Arrecadado: <span class="campaign-raised"></span></p>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-primary donation-amount" data-amount="25">R$ 25</button>
          <button type="button" class="btn btn-outline-primary donation-amount" data-amount="50">R$ 50</button>
          <button type="button" class="btn btn-outline-primary donation-amount" data-amount="100">R$ 100</button>
        </div>
        <input id="customAmount" class="form-control mt-2" placeholder="Outro valor" />
        <form id="donationForm" class="mt-3">
          <input id="donorName" class="form-control" placeholder="Nome" required />
          <input id="donorEmail" class="form-control mt-2" placeholder="Email" required />
          <input id="cardName" class="form-control mt-2" placeholder="Nome no Cartão" required />
          <input id="cardNumber" class="form-control mt-2" placeholder="Número do Cartão" required />
          <div class="row g-2 mt-2">
            <div class="col"><input id="cardExpiry" class="form-control" placeholder="MM/AA" required /></div>
            <div class="col"><input id="cardCvv" class="form-control" placeholder="CVV" required /></div>
          </div>
          <input id="donorCpf" class="form-control mt-2" placeholder="CPF" />
          <input id="donorPhone" class="form-control mt-2" placeholder="Telefone" />
          <div class="mt-3">Total: <strong class="total-amount">R$ 0,00</strong></div>
          <div>Valor final: <strong class="final-amount">R$ 0,00</strong></div>
          <button type="submit" class="btn btn-primary mt-3">Doar</button>
        </form>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/donation-modal.js"></script>
```

## Dicas
- Garanta que os IDs e classes acima existam no HTML.
- Use `type="email"` em `#donorEmail` se desejar validação nativa do navegador.
- Ajuste taxas/plataforma no cálculo, se necessário (hoje `platformFee = 0`).
