/**
 * Funcionalidade de Busca e Filtro para Campanhas
 * Filtra campanhas por nome e descrição em tempo real
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona a barra de pesquisa
    const searchBar = document.querySelector('.search-bar');
    
    // Seleciona todos os cards de campanhas
    const campaignCards = document.querySelectorAll('.campaign-card');
    
    // Seleciona o container dos cards
    const cardsContainer = document.querySelector('.row.gy-4');
    
    // Adiciona evento de input na barra de pesquisa apenas se estivermos na página de campanhas
    if (searchBar && campaignCards.length > 0) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterCampaigns(searchTerm);
        });
        
        // Atualiza placeholder para campanhas
        searchBar.placeholder = 'Pesquisar campanhas...';
    }
    
    /**
     * Filtra os cards de campanhas baseado no termo de busca
     * @param {string} searchTerm - Termo de busca
     */
    function filterCampaigns(searchTerm) {
        let visibleCount = 0;
        
        campaignCards.forEach(function(card) {
            const cardCol = card.closest('.col-12'); // Seleciona o container do card
            
            if (shouldShowCard(card, searchTerm)) {
                cardCol.style.display = 'block';
                visibleCount++;
            } else {
                cardCol.style.display = 'none';
            }
        });
        
        // Mostra/oculta mensagem quando não há resultados
        showNoResultsMessage(visibleCount === 0 && searchTerm.length > 0);
    }
    
    /**
     * Verifica se um card deve ser mostrado baseado no termo de busca
     * @param {Element} card - Card da campanha
     * @param {string} searchTerm - Termo de busca
     * @returns {boolean} - Se o card deve ser mostrado
     */
    function shouldShowCard(card, searchTerm) {
        if (searchTerm === '') return true;
        
        // Extrai informações do card
        const campaignName = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        
        // Verifica se o termo de busca está presente em qualquer campo
        return campaignName.includes(searchTerm) || description.includes(searchTerm);
    }
    
    /**
     * Mostra ou oculta mensagem de "nenhum resultado encontrado"
     * @param {boolean} show - Se deve mostrar a mensagem
     */
    function showNoResultsMessage(show) {
        let noResultsMessage = document.getElementById('no-results-message-campaigns');
        
        if (show && !noResultsMessage) {
            // Cria a mensagem se ela não existir
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message-campaigns';
            noResultsMessage.className = 'col-12 text-center py-5';
            noResultsMessage.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">🔍 Nenhuma campanha encontrada</h4>
                    <p class="mb-0">Não encontramos campanhas que correspondam à sua busca. Tente palavras-chave diferentes como "água", "reflorestamento", "animais" ou outros termos relacionados às causas.</p>
                </div>
            `;
            cardsContainer.appendChild(noResultsMessage);
        } else if (!show && noResultsMessage) {
            // Remove a mensagem se não deve ser mostrada
            noResultsMessage.remove();
        }
    }
    
    // Placeholder dinâmico para campanhas
    if (searchBar && campaignCards.length > 0) {
        const placeholders = [
            'Pesquisar campanhas...',
            'Ex: água limpa, reflorestamento...',
            'Ex: animais, meio ambiente...',
            'Ex: urgente, doação...'
        ];
        
        let currentPlaceholder = 0;
        
        // Alterna placeholder a cada 4 segundos quando não há foco
        setInterval(function() {
            if (document.activeElement !== searchBar) {
                searchBar.placeholder = placeholders[currentPlaceholder];
                currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
            }
        }, 4000);
    }
}); 