/**
 * Funcionalidade de Busca e Filtro para ONGs
 * Filtra ONGs por nome e categoria em tempo real
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona a barra de pesquisa
    const searchBar = document.querySelector('.search-bar');
    
    // Seleciona todos os cards de ONGs
    const ongCards = document.querySelectorAll('.ong-card');
    
    // Seleciona o container dos cards
    const cardsContainer = document.querySelector('.row.gy-4');
    
    // Verifica se estamos na página que tem ONGs
    if (!ongCards.length) return;
    
    // Adiciona evento de input na barra de pesquisa
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterONGs(searchTerm);
        });
    }
    
    /**
     * Filtra os cards de ONGs baseado no termo de busca
     * @param {string} searchTerm - Termo de busca
     */
    function filterONGs(searchTerm) {
        let visibleCount = 0;
        
        ongCards.forEach(function(card) {
            const cardCol = card.closest('.col-12, .col-md-6, .col-lg-4, .col-lg-3'); // Seleciona o container do card
            
            if (shouldShowCard(card, searchTerm)) {
                cardCol.style.display = 'block';
                visibleCount++;
                // Remove qualquer destaque anterior
                removeHighlights(card);
                // Adiciona destaque se há termo de busca
                if (searchTerm) {
                    highlightMatches(card, searchTerm);
                }
            } else {
                cardCol.style.display = 'none';
            }
        });
        
        // Mostra/oculta mensagem quando não há resultados
        showNoResultsMessage(visibleCount === 0 && searchTerm.length > 0);
        
        // Atualiza contador de resultados
        updateResultsCounter(visibleCount, searchTerm);
    }
    
    /**
     * Verifica se um card deve ser mostrado baseado no termo de busca
     * @param {Element} card - Card da ONG
     * @param {string} searchTerm - Termo de busca
     * @returns {boolean} - Se o card deve ser mostrado
     */
    function shouldShowCard(card, searchTerm) {
        if (searchTerm === '') return true;
        
        // Divide o termo de busca em palavras para busca mais inteligente
        const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
        
        // Extrai informações do card
        const ongName = card.querySelector('.ong-title')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.category-badge')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        const altText = card.querySelector('img')?.alt?.toLowerCase() || '';
        
        // Combina todo o conteúdo searchável
        const searchableContent = `${ongName} ${category} ${description} ${altText}`;
        
        // Verifica se todas as palavras da busca estão presentes
        return searchWords.every(word => searchableContent.includes(word));
    }
    
    /**
     * Destaca os termos encontrados no card
     * @param {Element} card - Card da ONG
     * @param {string} searchTerm - Termo de busca
     */
    function highlightMatches(card, searchTerm) {
        const searchWords = searchTerm.split(' ').filter(word => word.length > 1);
        
        // Elementos para destacar
        const titleElement = card.querySelector('.ong-title');
        const categoryElement = card.querySelector('.category-badge');
        const descriptionElement = card.querySelector('.card-text');
        
        [titleElement, categoryElement, descriptionElement].forEach(element => {
            if (element && !element.querySelector('mark')) {
                let text = element.textContent;
                let highlightedText = text;
                
                searchWords.forEach(word => {
                    const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
                    highlightedText = highlightedText.replace(regex, '<mark class="search-highlight">$1</mark>');
                });
                
                if (highlightedText !== text) {
                    element.innerHTML = highlightedText;
                }
            }
        });
    }
    
    /**
     * Remove destaques anteriores
     * @param {Element} card - Card da ONG
     */
    function removeHighlights(card) {
        const highlights = card.querySelectorAll('mark.search-highlight');
        highlights.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    /**
     * Escapa caracteres especiais para regex
     * @param {string} string - String para escapar
     * @returns {string} - String escapada
     */
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    /**
     * Mostra ou oculta mensagem de "nenhum resultado encontrado"
     * @param {boolean} show - Se deve mostrar a mensagem
     */
    function showNoResultsMessage(show) {
        let noResultsMessage = document.getElementById('no-results-message');
        
        if (show && !noResultsMessage) {
            // Cria a mensagem se ela não existir
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.className = 'col-12 text-center py-5';
            noResultsMessage.innerHTML = `
                <div class="alert alert-info border-0 shadow-sm" role="alert" style="background: linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%);">
                    <h4 class="alert-heading mb-3">🔍 Nenhum resultado encontrado</h4>
                    <p class="mb-3">Não encontramos ONGs que correspondam à sua busca.</p>
                    <hr>
                    <p class="mb-0 small"><strong>Dicas:</strong> Tente palavras-chave como "ambiental", "conservação", "pesquisa", ou nomes específicos como "WWF", "Greenpeace", "SOS".</p>
                </div>
            `;
            cardsContainer.appendChild(noResultsMessage);
        } else if (!show && noResultsMessage) {
            // Remove a mensagem se não deve ser mostrada
            noResultsMessage.remove();
        }
    }
    
    /**
     * Atualiza contador de resultados
     * @param {number} count - Número de resultados
     * @param {string} searchTerm - Termo de busca
     */
    function updateResultsCounter(count, searchTerm) {
        let counter = document.getElementById('results-counter');
        
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'results-counter';
            counter.className = 'text-center mb-4';
            
            const mainElement = document.querySelector('main.container, main');
            const subtitle = mainElement.querySelector('p.lead');
            if (subtitle) {
                subtitle.parentNode.insertBefore(counter, subtitle.nextSibling);
            }
        }
        
        if (searchTerm) {
            counter.innerHTML = `
                <div class="badge bg-primary-custom fs-6 px-3 py-2">
                    ${count} ONG${count !== 1 ? 's' : ''} encontrada${count !== 1 ? 's' : ''} para "${searchTerm}"
                </div>
            `;
            counter.style.display = 'block';
        } else {
            counter.style.display = 'none';
        }
    }
    
    // Limpa busca quando ESC é pressionado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchBar) {
            searchBar.value = '';
            filterONGs('');
            searchBar.blur();
        }
    });
    
    // Adiciona estilo para destaques
    if (!document.getElementById('search-highlight-style')) {
        const style = document.createElement('style');
        style.id = 'search-highlight-style';
        style.textContent = `
            .search-highlight {
                background: linear-gradient(135deg, #FFE45E 0%, #FFA000 100%);
                color: #1B5E20;
                padding: 0.1em 0.2em;
                border-radius: 0.2em;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
}); 