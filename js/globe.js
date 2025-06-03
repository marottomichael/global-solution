// Configuração inicial do Cesium
let viewer;
let markers = [];
let userMarker = null;
let isAnimating = false;

// Função para gerar ONGs simuladas
function generateSimulatedONGs() {
    const ongs = [];
    const nomes = [
        "Instituto Ambiental", "Fundação Verde", "Projeto Natureza", "EcoVida", "Amigos da Terra",
        "SOS Meio Ambiente", "Instituto Verde", "Projeto Sustentável", "EcoBrasil", "Natureza Viva",
        "Instituto Ecológico", "Fundação Ambiental", "Projeto Verde", "EcoAção", "Amigos do Planeta",
        "SOS Natureza", "Instituto Sustentável", "Projeto Eco", "EcoFuturo", "Vida Verde"
    ];
    
    const descricoes = [
        "Dedicada à preservação ambiental",
        "Trabalhando por um futuro sustentável",
        "Protegendo a biodiversidade",
        "Promovendo a consciência ecológica",
        "Desenvolvendo projetos ambientais",
        "Conservando recursos naturais",
        "Educando para a sustentabilidade",
        "Recuperando áreas degradadas",
        "Preservando espécies ameaçadas",
        "Promovendo práticas sustentáveis"
    ];

    const areasAtuacao = [
        "Preservação de florestas",
        "Educação ambiental",
        "Recuperação de áreas degradadas",
        "Proteção de espécies ameaçadas",
        "Sustentabilidade urbana",
        "Agricultura sustentável",
        "Conservação marinha",
        "Energias renováveis",
        "Gestão de resíduos",
        "Biodiversidade"
    ];

    const projetos = [
        "Programa de reflorestamento",
        "Campanha de conscientização",
        "Projeto de recuperação de nascentes",
        "Iniciativa de proteção animal",
        "Programa de educação ambiental",
        "Projeto de agricultura sustentável",
        "Campanha de reciclagem",
        "Iniciativa de energia solar",
        "Programa de conservação marinha",
        "Projeto de gestão de resíduos"
    ];

    // Coordenadas ajustadas para garantir que fiquem em terra firme
    const cidades = [
        { 
            nome: "São Paulo", 
            lat: -23.5505, 
            lng: -46.6333,
            variacao: 0.3 // Variação menor para SP
        },
        { 
            nome: "Rio de Janeiro", 
            lat: -22.9068, 
            lng: -43.1729,
            variacao: 0.2 // Variação menor para RJ
        },
        { 
            nome: "Brasília", 
            lat: -15.7801, 
            lng: -47.9292,
            variacao: 0.4 // Variação maior para Brasília
        },
        { 
            nome: "Salvador", 
            lat: -12.9714, 
            lng: -38.5014,
            variacao: 0.2 // Variação menor para Salvador
        },
        { 
            nome: "Fortaleza", 
            lat: -3.7319, 
            lng: -38.5267,
            variacao: 0.2 // Variação menor para Fortaleza
        },
        { 
            nome: "Belo Horizonte", 
            lat: -19.9167, 
            lng: -43.9345,
            variacao: 0.3 // Variação média para BH
        },
        { 
            nome: "Manaus", 
            lat: -3.1190, 
            lng: -60.0217,
            variacao: 0.3 // Variação média para Manaus
        },
        { 
            nome: "Curitiba", 
            lat: -25.4284, 
            lng: -49.2733,
            variacao: 0.3 // Variação média para Curitiba
        },
        { 
            nome: "Recife", 
            lat: -8.0476, 
            lng: -34.8770,
            variacao: 0.2 // Variação menor para Recife
        },
        { 
            nome: "Porto Alegre", 
            lat: -30.0346, 
            lng: -51.2177,
            variacao: 0.3 // Variação média para POA
        }
    ];

    // Adiciona mais cidades no interior para distribuir melhor as ONGs
    const cidadesInterior = [
        { nome: "Campinas", lat: -22.9071, lng: -47.0632, variacao: 0.3 },
        { nome: "Goiânia", lat: -16.6869, lng: -49.2648, variacao: 0.4 },
        { nome: "Campo Grande", lat: -20.4435, lng: -54.6478, variacao: 0.4 },
        { nome: "Vitória", lat: -20.2976, lng: -40.2958, variacao: 0.2 },
        { nome: "Florianópolis", lat: -27.5969, lng: -48.5495, variacao: 0.2 }
    ];

    // Combina as cidades
    const todasCidades = [...cidades, ...cidadesInterior];

    for (let i = 0; i < 50; i++) {
        const cidade = todasCidades[Math.floor(Math.random() * todasCidades.length)];
        const lat = cidade.lat + (Math.random() - 0.5) * cidade.variacao;
        const lng = cidade.lng + (Math.random() - 0.5) * cidade.variacao;
        
        // Gera informações de contato
        const ddd = Math.floor(Math.random() * 90) + 11;
        const telefone = Math.floor(Math.random() * 90000000) + 10000000;
        const email = `contato@${nomes[Math.floor(Math.random() * nomes.length)].toLowerCase().replace(/\s+/g, '')}.org.br`;
        const website = `www.${nomes[Math.floor(Math.random() * nomes.length)].toLowerCase().replace(/\s+/g, '')}.org.br`;
        
        // Seleciona uma imagem aleatória
        const imageNumber = Math.floor(Math.random() * 15) + 1;
        const imagePath = `../assets/images/ongs/ongs-map/Post retrato instagram salvar postagem minimalista preto e roxo ${imageNumber === 1 ? '' : `(${imageNumber})`}.png`;
        
        ongs.push({
            name: `${nomes[Math.floor(Math.random() * nomes.length)]} ${i + 1}`,
            description: descricoes[Math.floor(Math.random() * descricoes.length)],
            lat: lat,
            lng: lng,
            address: `${cidade.nome}, ${['SP', 'RJ', 'DF', 'BA', 'CE', 'MG', 'AM', 'PR', 'PE', 'RS', 'SP', 'GO', 'MS', 'ES', 'SC'][todasCidades.indexOf(cidade)]}`,
            areas: areasAtuacao[Math.floor(Math.random() * areasAtuacao.length)],
            projects: projetos[Math.floor(Math.random() * projetos.length)],
            phone: `(${ddd}) ${telefone}`,
            email: email,
            website: website,
            image: imagePath
        });
    }

    return ongs;
}

// Dados de exemplo de ONGs (em produção, isso viria de uma API)
const ongs = generateSimulatedONGs();

// Inicialização
async function init() {
    // Aguarda o Cesium estar disponível
    if (typeof Cesium === 'undefined') {
        console.error('Cesium não está disponível. Aguardando carregamento...');
        await new Promise(resolve => {
            const checkCesium = setInterval(() => {
                if (typeof Cesium !== 'undefined') {
                    clearInterval(checkCesium);
                    resolve();
                }
            }, 100);
        });
    }

    try {
        // Configuração do Cesium
        viewer = new Cesium.Viewer('globe-container', {
            terrainProvider: await Cesium.createWorldTerrainAsync({
                requestWaterMask: true,
                requestVertexNormals: true
            }),
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            infoBox: false,
            selectionIndicator: false,
            skyBox: false,
            skyAtmosphere: false,
            requestRenderMode: true,
            maximumRenderTimeChange: Infinity,
            contextOptions: {
                webgl: {
                    alpha: true
                }
            }
        });

        // Configuração da cena
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.showGroundAtmosphere = false;
        viewer.scene.globe.showSkirts = true;
        viewer.scene.globe.showWaterEffect = true;

        // Configuração do fundo
        viewer.scene.backgroundColor = Cesium.Color.BLACK;

        // Adiciona marcadores das ONGs
        addONGMarkers();

        // Adiciona eventos
        document.getElementById('locate-me').addEventListener('click', locateUser);
        document.getElementById('reset-view').addEventListener('click', resetView);

        // Adiciona evento de clique nos marcadores
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
            const pickedObject = viewer.scene.pick(movement.position);
            if (Cesium.defined(pickedObject) && pickedObject.id) {
                const ong = ongs.find(o => o.name === pickedObject.id.name);
                if (ong) {
                    showONGInfo(ong);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // Esconde o loading
        document.querySelector('.loading').style.display = 'none';

        // Localiza o usuário automaticamente após 3 segundos
        setTimeout(locateUser, 3000);
    } catch (error) {
        console.error('Erro ao inicializar o Cesium:', error);
        document.querySelector('.loading').innerHTML = 'Erro ao carregar o globo. Por favor, recarregue a página.';
    }
}

// Adiciona marcadores das ONGs
function addONGMarkers() {
    ongs.forEach(ong => {
        const position = Cesium.Cartesian3.fromDegrees(ong.lng, ong.lat);
        const marker = viewer.entities.add({
            position: position,
            point: {
                pixelSize: 10,
                color: Cesium.Color.YELLOW,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            name: ong.name,
            description: ong.description
        });
        markers.push(marker);
    });
}

// Localiza o usuário
function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            
            // Remove marcador anterior do usuário
            if (userMarker) {
                viewer.entities.remove(userMarker);
            }

            // Adiciona novo marcador do usuário
            const userPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude);
            userMarker = viewer.entities.add({
                position: userPosition,
                point: {
                    pixelSize: 15,
                    color: Cesium.Color.GREEN,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });

            // Anima a câmera até a posição do usuário
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 100000),
                duration: 4,
                complete: function() {
                    // Encontra ONGs próximas
                    findNearbyONGs(latitude, longitude);
                }
            });
        }, error => {
            console.error('Erro ao obter localização:', error);
            // Se houver erro na localização, mostra uma mensagem amigável
            const loadingDiv = document.querySelector('.loading');
            loadingDiv.innerHTML = 'Não foi possível obter sua localização. Por favor, verifique se você permitiu o acesso à localização no seu navegador.';
            loadingDiv.style.display = 'block';
        });
    } else {
        console.error('Geolocalização não suportada');
        const loadingDiv = document.querySelector('.loading');
        loadingDiv.innerHTML = 'Seu navegador não suporta geolocalização.';
        loadingDiv.style.display = 'block';
    }
}

// Encontra ONGs próximas
function findNearbyONGs(userLat, userLng) {
    const nearbyONGs = ongs.map(ong => {
        const distance = calculateDistance(userLat, userLng, ong.lat, ong.lng);
        return { ...ong, distance };
    }).sort((a, b) => a.distance - b.distance);

    // Mostra informações da ONG mais próxima
    if (nearbyONGs.length > 0) {
        showONGInfo(nearbyONGs[0]);
    }
}

// Reseta a visualização
function resetView() {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(0, 0, 20000000),
        duration: 2
    });

    // Reseta os marcadores
    markers.forEach(marker => {
        marker.point.pixelSize = 10;
        marker.point.color = Cesium.Color.RED;
    });

    document.querySelector('.ong-info').style.display = 'none';
}

// Calcula distância entre dois pontos usando a fórmula de Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Mostra informações da ONG
function showONGInfo(ong) {
    console.log('Mostrando informações da ONG:', ong);
    
    const infoDiv = document.querySelector('.ong-info');
    if (!infoDiv) {
        console.error('Elemento .ong-info não encontrado');
        return;
    }

    // Atualiza o conteúdo do card
    infoDiv.querySelector('.ong-name').textContent = ong.name;
    infoDiv.querySelector('.ong-description').textContent = ong.description;
    infoDiv.querySelector('.ong-address').textContent = ong.address;
    
    // Calcula a distância se houver um usuário localizado
    if (userMarker) {
        const userPosition = userMarker.position.getValue(viewer.clock.currentTime);
        const userCartographic = Cesium.Cartographic.fromCartesian(userPosition);
        const userLat = Cesium.Math.toDegrees(userCartographic.latitude);
        const userLng = Cesium.Math.toDegrees(userCartographic.longitude);
        const distance = calculateDistance(userLat, userLng, ong.lat, ong.lng);
        infoDiv.querySelector('.ong-distance').textContent = `${distance.toFixed(1)} km`;
    } else {
        infoDiv.querySelector('.ong-distance').textContent = '';
    }

    // Adiciona evento ao botão "Saber mais"
    const btnSaberMais = infoDiv.querySelector('.btn-saber-mais');
    btnSaberMais.onclick = () => showONGModal(ong);
    
    // Encontra o marcador da ONG
    const marker = markers.find(m => m.name === ong.name);
    if (!marker) {
        console.error('Marcador não encontrado para a ONG:', ong.name);
        return;
    }

    // Função para atualizar a posição do card
    const updateCardPosition = () => {
        const position = marker.position.getValue(viewer.clock.currentTime);
        if (!position) {
            console.error('Posição do marcador não disponível');
            return;
        }

        const screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
        if (screenPosition) {
            infoDiv.style.left = `${screenPosition.x}px`;
            infoDiv.style.top = `${screenPosition.y}px`;
            infoDiv.style.display = 'block';
        }
    };

    // Atualiza a posição inicial
    updateCardPosition();

    // Remove listeners anteriores para evitar duplicação
    viewer.scene.postRender.removeEventListener(updateCardPosition);
    
    // Adiciona o novo listener
    viewer.scene.postRender.addEventListener(updateCardPosition);
}

// Mostra o modal com detalhes da ONG
function showONGModal(ong) {
    const modal = new bootstrap.Modal(document.getElementById('ongModal'));
    
    // Atualiza o conteúdo do modal
    document.getElementById('ongModalLabel').textContent = ong.name;
    document.querySelector('.modal-description').textContent = ong.description;
    document.querySelector('.modal-address').textContent = ong.address;
    document.querySelector('.modal-areas').textContent = ong.areas;
    document.querySelector('.modal-projects').textContent = ong.projects;
    document.querySelector('.modal-phone').textContent = `Telefone: ${ong.phone}`;
    document.querySelector('.modal-email').textContent = `E-mail: ${ong.email}`;
    document.querySelector('.modal-website').textContent = `Website: ${ong.website}`;
    
    // Atualiza a imagem
    const imageElement = document.querySelector('.ong-image');
    imageElement.src = ong.image;
    imageElement.alt = `Imagem da ONG ${ong.name}`;
    
    // Atualiza a distância se houver um usuário localizado
    if (userMarker) {
        const userPosition = userMarker.position.getValue(viewer.clock.currentTime);
        const userCartographic = Cesium.Cartographic.fromCartesian(userPosition);
        const userLat = Cesium.Math.toDegrees(userCartographic.latitude);
        const userLng = Cesium.Math.toDegrees(userCartographic.longitude);
        const distance = calculateDistance(userLat, userLng, ong.lat, ong.lng);
        document.querySelector('.modal-distance').textContent = `Distância: ${distance.toFixed(1)} km`;
    } else {
        document.querySelector('.modal-distance').textContent = '';
    }
    
    // Adiciona evento ao botão "Visitar Site"
    const btnVisitarSite = document.querySelector('.modal-footer .btn-primary');
    btnVisitarSite.onclick = () => window.open(`https://${ong.website}`, '_blank');
    
    // Mostra o modal
    modal.show();
}

// Inicia a aplicação quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', init); 