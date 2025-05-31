/**
 * Funcionalidade do Modal de Doação
 * Controla a abertura, preenchimento e validação do formulário de doação
 */

document.addEventListener('DOMContentLoaded', function() {
    const donationModal = document.getElementById('donationModal');
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.donation-amount');
    const customAmountInput = document.getElementById('customAmount');
    
    // Campos do formulário
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvvInput = document.getElementById('cardCvv');
    const donorCpfInput = document.getElementById('donorCpf');
    const donorPhoneInput = document.getElementById('donorPhone');
    
    // Elementos de resumo
    const totalAmountElement = document.querySelector('.total-amount');
    const finalAmountElement = document.querySelector('.final-amount');
    
    // Variável para armazenar o valor selecionado
    let selectedAmount = 0;
    
    /**
     * Configura o modal quando é aberto
     */
    if (donationModal) {
        donationModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            
            // Extrai informações do botão que abriu o modal
            const campaignName = button.getAttribute('data-campaign-name');
            const campaignGoal = button.getAttribute('data-campaign-goal');
            const campaignRaised = button.getAttribute('data-campaign-raised');
            
            // Atualiza informações da campanha no modal
            document.querySelector('.campaign-name').textContent = campaignName;
            document.querySelector('.campaign-goal').textContent = formatCurrency(parseInt(campaignGoal));
            document.querySelector('.campaign-raised').textContent = formatCurrency(parseInt(campaignRaised));
            
            // Reset do formulário
            resetForm();
        });
    }
    
    /**
     * Gerencia seleção de valores predefinidos
     */
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove seleção anterior
            amountButtons.forEach(btn => btn.classList.remove('btn-primary'));
            amountButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            
            // Adiciona seleção atual
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
            
            // Define valor
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            customAmountInput.value = '';
            
            // Atualiza resumo
            updateSummary();
        });
    });
    
    /**
     * Gerencia valor personalizado
     */
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove seleção dos botões predefinidos
            amountButtons.forEach(btn => btn.classList.remove('btn-primary'));
            amountButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            
            // Define valor personalizado
            selectedAmount = parseFloat(this.value) || 0;
            
            // Atualiza resumo
            updateSummary();
        });
    }
    
    /**
     * Formatação do número do cartão
     */
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.value = value;
        });
    }
    
    /**
     * Formatação da data de validade
     */
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    /**
     * Formatação do CVV
     */
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    /**
     * Formatação do CPF
     */
    if (donorCpfInput) {
        donorCpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            this.value = value;
        });
    }
    
    /**
     * Formatação do telefone
     */
    if (donorPhoneInput) {
        donorPhoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            this.value = value;
        });
    }
    
    /**
     * Atualiza resumo da doação
     */
    function updateSummary() {
        const amount = selectedAmount;
        const platformFee = 0; // Sem taxa por enquanto
        const total = amount + platformFee;
        
        if (totalAmountElement) {
            totalAmountElement.textContent = formatCurrency(amount);
        }
        if (finalAmountElement) {
            finalAmountElement.textContent = formatCurrency(total);
        }
    }
    
    /**
     * Formata valor para moeda brasileira
     */
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    /**
     * Reset do formulário
     */
    function resetForm() {
        if (donationForm) {
            donationForm.reset();
        }
        
        // Remove seleção dos botões
        amountButtons.forEach(btn => btn.classList.remove('btn-primary'));
        amountButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
        
        selectedAmount = 0;
        updateSummary();
    }
    
    /**
     * Validação e envio do formulário
     */
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validações básicas
            if (selectedAmount < 5) {
                showAlert('Por favor, selecione um valor mínimo de R$ 5,00 para doação.', 'warning');
                return;
            }
            
            if (!validateForm()) {
                showAlert('Por favor, preencha todos os campos obrigatórios corretamente.', 'warning');
                return;
            }
            
            // Simula processamento da doação
            processDonation();
        });
    }
    
    /**
     * Validação do formulário
     */
    function validateForm() {
        const requiredFields = [
            'donorName', 'donorEmail', 'cardNumber', 
            'cardName', 'cardExpiry', 'cardCvv'
        ];
        
        for (let fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                field?.focus();
                return false;
            }
        }
        
        // Validações específicas
        const email = document.getElementById('donorEmail').value;
        if (!isValidEmail(email)) {
            document.getElementById('donorEmail').focus();
            return false;
        }
        
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (cardNumber.length < 13) {
            document.getElementById('cardNumber').focus();
            return false;
        }
        
        return true;
    }
    
    /**
     * Valida email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Simula processamento da doação
     */
    function processDonation() {
        const submitButton = document.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Mostra loading
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processando...';
        submitButton.disabled = true;
        
        // Simula delay de processamento
        setTimeout(() => {
            // Reset do botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Fecha modal
            const modal = bootstrap.Modal.getInstance(donationModal);
            modal.hide();
            
            // Mostra mensagem de sucesso
            showSuccessMessage();
            
        }, 3000);
    }
    
    /**
     * Mostra mensagem de sucesso
     */
    function showSuccessMessage() {
        const campaignName = document.querySelector('.campaign-name').textContent;
        const amount = formatCurrency(selectedAmount);
        
        showAlert(
            `🎉 Parabéns! Sua doação de ${amount} para "${campaignName}" foi processada com sucesso! Você receberá um email de confirmação em breve.`,
            'success',
            8000
        );
    }
    
    /**
     * Mostra alertas na tela
     */
    function showAlert(message, type = 'info', duration = 5000) {
        // Remove alertas anteriores
        const existingAlerts = document.querySelectorAll('.donation-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Cria novo alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show donation-alert position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Remove automaticamente após duração especificada
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, duration);
    }
    
    // Adiciona validação em tempo real para campos
    document.addEventListener('input', function(e) {
        const field = e.target;
        
        // Remove classe de erro se campo estiver válido
        if (field.value.trim() !== '') {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
}); 