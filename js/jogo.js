// =========================================================
// 1. ESTADO DO JOGO EM UM OBJETO
// Guardar tudo em um objeto facilita controlar a partida e
// zerar tudo de uma vez quando o jogador clicar em Reiniciar.
// =========================================================
const META_VITORIA = 10000;

const estadoJogo = {
    jogoAtivo: false,
    patinhas: 0,
    totalCliques: 0,

    // Andar 1: Sanji
    forcaClique: 1,
    multClique: 1,
    qtdFacas: 0,
    custoFaca: 15,
    diableComprado: false,
    custoDiable: 50,

    // Andar 2: Chopper
    qtdChopper: 0,
    custoChopper: 10,
    ganhoChopper: 1,
    multChopper: 1,
    rumbleComprado: false,
    custoRumble: 60,

    // Andar 3: Franky
    qtdFranky: 0,
    custoFranky: 50,
    ganhoFranky: 5,
    multFranky: 1,
    colaComprada: false,
    custoCola: 150,

    // Andar 4: Nami
    qtdNami: 0,
    custoNami: 200,
    ganhoNami: 15,
    multNami: 1,
    cofreComprado: false,
    custoCofre: 500,

    // Andar 5: Robin
    qtdRobin: 0,
    custoRobin: 800,
    ganhoRobin: 40,
    multRobin: 1,
    poneglyphComprado: false,
    custoPoneglyph: 2000
};

// Array de cores usadas nas partículas de comida que voam da frigideira
const coresComida = ['#e67e22', '#2ecc71', '#d35400', '#f1c40f', '#ffffff'];

// =========================================================
// 2. CONTROLE DE TELAS: INÍCIO, VITÓRIA E REINÍCIO SEM F5
// =========================================================
function iniciarJogo() {
    estadoJogo.jogoAtivo = true;
    document.getElementById('tela-inicio').classList.add('hidden');
    atualizarTela();
}

function finalizarJogo() {
    if (estadoJogo.patinhas >= META_VITORIA) {
        estadoJogo.jogoAtivo = false;

        // Preenche as estatísticas na janela de vitória
        const totalTripulacao = estadoJogo.qtdChopper + estadoJogo.qtdFranky + estadoJogo.qtdNami + estadoJogo.qtdRobin;
        document.getElementById('resumo-patinhas').textContent = Math.floor(estadoJogo.patinhas);
        document.getElementById('resumo-cliques').textContent = estadoJogo.totalCliques;
        document.getElementById('resumo-tripulacao').textContent = totalTripulacao;

        document.getElementById('tela-vitoria').classList.remove('hidden');
    }
}

function reiniciarJogo() {
    // 1. Zera todos os números do objeto estadoJogo por código (sem recarregar a página)
    estadoJogo.jogoAtivo = true;
    estadoJogo.patinhas = 0;
    estadoJogo.totalCliques = 0;

    estadoJogo.forcaClique = 1;
    estadoJogo.multClique = 1;
    estadoJogo.qtdFacas = 0;
    estadoJogo.custoFaca = 15;
    estadoJogo.diableComprado = false;

    estadoJogo.qtdChopper = 0;
    estadoJogo.custoChopper = 10;
    estadoJogo.multChopper = 1;
    estadoJogo.rumbleComprado = false;

    estadoJogo.qtdFranky = 0;
    estadoJogo.custoFranky = 50;
    estadoJogo.multFranky = 1;
    estadoJogo.colaComprada = false;

    estadoJogo.qtdNami = 0;
    estadoJogo.custoNami = 200;
    estadoJogo.multNami = 1;
    estadoJogo.cofreComprado = false;

    estadoJogo.qtdRobin = 0;
    estadoJogo.custoRobin = 800;
    estadoJogo.multRobin = 1;
    estadoJogo.poneglyphComprado = false;

    // 2. Limpa os itens desenhados dinamicamente nas estantes/chão dos andares
    const listasDinamicas = [
        'knife-rack',
        'clinic-pets-list',
        'workshop-houses-list',
        'treasury-chests-list',
        'robin-books-list'
    ];
    listasDinamicas.forEach((idLista) => {
        document.getElementById(idLista).innerHTML = '';
    });

    // 3. Esconde novamente os personagens e melhorias desbloqueadas
    const elementosParaEsconder = [
        'chopper-area', 'clinic-staff', 'cat-pet', 'rumble-shelf',
        'franky-area', 'workshop-staff', 'shelter-tier2', 'cola-crate',
        'nami-area', 'treasury-staff', 'deck-chest', 'golden-safe',
        'robin-area', 'library-staff', 'deck-poneglyph', 'desk-poneglyph',
        'tela-vitoria'
    ];
    elementosParaEsconder.forEach((idElemento) => {
        document.getElementById(idElemento).classList.add('hidden');
    });

    // 4. Restaura visual e textos originais dos botões de aprimoramento
    document.getElementById('sanji-kick-leg').classList.remove('diable-fire');
    document.getElementById('stove-flame').classList.remove('super-flame');

    document.getElementById('diable-status').textContent = 'Custo: 50';
    document.getElementById('rumble-status').textContent = 'Custo: 60';
    document.getElementById('cola-status').textContent = 'Custo: 150';
    document.getElementById('vault-status').textContent = 'Custo: 500';
    document.getElementById('poneglyph-status').textContent = 'Custo: 2000';

    document.getElementById('top-stage').scrollIntoView({ behavior: 'smooth' });
    atualizarTela();
}

// =========================================================
// 3. MECÂNICA DE CLIQUE NO SANJI E PARTÍCULAS
// =========================================================
function clicarSanji(evento) {
    if (!estadoJogo.jogoAtivo) return;

    // Animação da frigideira
    const armPan = document.querySelector('.arm-pan');
    armPan.classList.remove('pan-active');
    void armPan.offsetWidth;
    armPan.classList.add('pan-active');
    setTimeout(() => armPan.classList.remove('pan-active'), 150);

    // Soma pontos e registra o clique
    estadoJogo.patinhas += estadoJogo.forcaClique * estadoJogo.multClique;
    estadoJogo.totalCliques += 1;
    atualizarTela();

    // Laço de repetição (for) para criar de 2 a 4 partículas de comida voando
    const quantidadeComida = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < quantidadeComida; i++) {
        const comida = document.createElement('div');
        comida.classList.add('food-pixel');
        comida.style.backgroundColor = coresComida[Math.floor(Math.random() * coresComida.length)];
        comida.style.left = evento.pageX + 'px';
        comida.style.top = evento.pageY + 'px';
        comida.style.setProperty('--x', (Math.random() * 60 - 30) + 'px');
        document.body.appendChild(comida);

        setTimeout(() => comida.remove(), 500);
    }
}

// =========================================================
// 4. FUNÇÕES DE COMPRA DOS 5 ANDARES
// =========================================================
function comprarFaca() {
    if (estadoJogo.patinhas >= estadoJogo.custoFaca) {
        estadoJogo.patinhas -= estadoJogo.custoFaca;
        estadoJogo.qtdFacas += 1;
        estadoJogo.forcaClique += 1;
        estadoJogo.custoFaca = Math.floor(estadoJogo.custoFaca * 1.6);

        if (estadoJogo.qtdFacas <= 10) {
            const faca = document.createElement('div');
            faca.classList.add('pixel-knife');
            document.getElementById('knife-rack').appendChild(faca);
        }
        atualizarTela();
    }
}

function comprarDiableJambe() {
    if (estadoJogo.patinhas >= estadoJogo.custoDiable && !estadoJogo.diableComprado) {
        estadoJogo.patinhas -= estadoJogo.custoDiable;
        estadoJogo.diableComprado = true;
        estadoJogo.multClique = 2;

        document.getElementById('sanji-kick-leg').classList.add('diable-fire');
        document.getElementById('stove-flame').classList.add('super-flame');
        document.getElementById('diable-status').textContent = 'ATIVADO!';
        atualizarTela();
    }
}

function comprarChopper() {
    if (estadoJogo.patinhas >= estadoJogo.custoChopper) {
        estadoJogo.patinhas -= estadoJogo.custoChopper;
        estadoJogo.qtdChopper += 1;
        estadoJogo.custoChopper = Math.floor(estadoJogo.custoChopper * 1.5);

        document.getElementById('chopper-area').classList.remove('hidden');
        document.getElementById('clinic-staff').classList.remove('hidden');

        if (estadoJogo.qtdChopper <= 8) {
            const caminha = document.createElement('div');
            caminha.classList.add('pet-bed');
            const pet = document.createElement('div');

            if (estadoJogo.qtdChopper % 2 === 1) {
                pet.classList.add('pixel-dog');
                pet.innerHTML = '<div class="dog-ear"></div>';
            } else {
                pet.classList.add('pixel-cat');
                pet.innerHTML = '<div class="cat-ears"></div>';
            }
            caminha.appendChild(pet);
            document.getElementById('clinic-pets-list').appendChild(caminha);
        }
        atualizarTela();
    }
}

function comprarRumbleBall() {
    if (estadoJogo.patinhas >= estadoJogo.custoRumble && !estadoJogo.rumbleComprado) {
        estadoJogo.patinhas -= estadoJogo.custoRumble;
        estadoJogo.rumbleComprado = true;
        estadoJogo.multChopper = 2;

        document.getElementById('cat-pet').classList.remove('hidden');
        document.getElementById('rumble-shelf').classList.remove('hidden');
        document.getElementById('rumble-status').textContent = 'ATIVADO!';
        atualizarTela();
    }
}

function comprarFranky() {
    if (estadoJogo.patinhas >= estadoJogo.custoFranky) {
        estadoJogo.patinhas -= estadoJogo.custoFranky;
        estadoJogo.qtdFranky += 1;
        estadoJogo.custoFranky = Math.floor(estadoJogo.custoFranky * 1.5);

        document.getElementById('franky-area').classList.remove('hidden');
        document.getElementById('workshop-staff').classList.remove('hidden');

        if (estadoJogo.qtdFranky <= 8) {
            const casinha = document.createElement('div');
            casinha.classList.add('mini-house');
            const classeTelhado = estadoJogo.colaComprada ? 'mini-roof super-roof' : 'mini-roof';
            casinha.innerHTML = `<div class="${classeTelhado}"></div><div class="mini-wall"></div>`;
            document.getElementById('workshop-houses-list').appendChild(casinha);
        }
        atualizarTela();
    }
}

function comprarSuperCola() {
    if (estadoJogo.patinhas >= estadoJogo.custoCola && !estadoJogo.colaComprada) {
        estadoJogo.patinhas -= estadoJogo.custoCola;
        estadoJogo.colaComprada = true;
        estadoJogo.multFranky = 2;

        document.getElementById('shelter-tier2').classList.remove('hidden');
        document.getElementById('cola-crate').classList.remove('hidden');
        document.querySelectorAll('.mini-roof').forEach((telhado) => telhado.classList.add('super-roof'));
        document.getElementById('cola-status').textContent = 'ATIVADO!';
        atualizarTela();
    }
}

function comprarNami() {
    if (estadoJogo.patinhas >= estadoJogo.custoNami) {
        estadoJogo.patinhas -= estadoJogo.custoNami;
        estadoJogo.qtdNami += 1;
        estadoJogo.custoNami = Math.floor(estadoJogo.custoNami * 1.5);

        document.getElementById('nami-area').classList.remove('hidden');
        document.getElementById('treasury-staff').classList.remove('hidden');

        if (estadoJogo.qtdNami <= 8) {
            const pilha = document.createElement('div');
            pilha.classList.add('berry-pile');
            document.getElementById('treasury-chests-list').appendChild(pilha);
        }
        atualizarTela();
    }
}

function comprarCofre() {
    if (estadoJogo.patinhas >= estadoJogo.custoCofre && !estadoJogo.cofreComprado) {
        estadoJogo.patinhas -= estadoJogo.custoCofre;
        estadoJogo.cofreComprado = true;
        estadoJogo.multNami = 2;

        document.getElementById('deck-chest').classList.remove('hidden');
        document.getElementById('golden-safe').classList.remove('hidden');
        document.getElementById('vault-status').textContent = 'ATIVADO!';
        atualizarTela();
    }
}

function comprarRobin() {
    if (estadoJogo.patinhas >= estadoJogo.custoRobin) {
        estadoJogo.patinhas -= estadoJogo.custoRobin;
        estadoJogo.qtdRobin += 1;
        estadoJogo.custoRobin = Math.floor(estadoJogo.custoRobin * 1.5);

        document.getElementById('robin-area').classList.remove('hidden');
        document.getElementById('library-staff').classList.remove('hidden');

        if (estadoJogo.qtdRobin <= 8) {
            const livro = document.createElement('div');
            livro.classList.add('adoption-book');
            document.getElementById('robin-books-list').appendChild(livro);
        }
        atualizarTela();
    }
}

function comprarPoneglyph() {
    if (estadoJogo.patinhas >= estadoJogo.custoPoneglyph && !estadoJogo.poneglyphComprado) {
        estadoJogo.patinhas -= estadoJogo.custoPoneglyph;
        estadoJogo.poneglyphComprado = true;
        estadoJogo.multRobin = 2;

        document.getElementById('deck-poneglyph').classList.remove('hidden');
        document.getElementById('desk-poneglyph').classList.remove('hidden');
        document.getElementById('poneglyph-status').textContent = 'ATIVADO!';
        atualizarTela();
    }
}

// =========================================================
// 5. ATUALIZAÇÃO DA TELA (DOM) E LOOP AUTOMÁTICO POR SEGUNDO
// =========================================================
function calcularRpsTotal() {
    const rpsChopper = estadoJogo.qtdChopper * estadoJogo.ganhoChopper * estadoJogo.multChopper;
    const rpsFranky = estadoJogo.qtdFranky * estadoJogo.ganhoFranky * estadoJogo.multFranky;
    const rpsNami = estadoJogo.qtdNami * estadoJogo.ganhoNami * estadoJogo.multNami;
    const rpsRobin = estadoJogo.qtdRobin * estadoJogo.ganhoRobin * estadoJogo.multRobin;

    return {
        chopper: rpsChopper,
        franky: rpsFranky,
        nami: rpsNami,
        robin: rpsRobin,
        total: rpsChopper + rpsFranky + rpsNami + rpsRobin
    };
}

function atualizarTela() {
    const rps = calcularRpsTotal();

    // Atualiza placares do topo
    document.getElementById('score').textContent = Math.floor(estadoJogo.patinhas);
    document.getElementById('rps').textContent = rps.total;

    // Habilita o botão de vitória quando alcançar 10.000 Patinhas
    document.getElementById('btn-vitoria').disabled = estadoJogo.patinhas < META_VITORIA;

    // Atualiza textos e custos dos 5 andares
    document.getElementById('click-power').textContent = estadoJogo.forcaClique * estadoJogo.multClique;
    document.getElementById('knife-cost').textContent = estadoJogo.custoFaca;

    document.getElementById('chopper-count').textContent = estadoJogo.qtdChopper;
    document.getElementById('chopper-rps').textContent = rps.chopper;
    document.getElementById('chopper-cost').textContent = estadoJogo.custoChopper;

    document.getElementById('franky-count').textContent = estadoJogo.qtdFranky;
    document.getElementById('franky-rps').textContent = rps.franky;
    document.getElementById('franky-cost').textContent = estadoJogo.custoFranky;

    document.getElementById('nami-count').textContent = estadoJogo.qtdNami;
    document.getElementById('nami-rps').textContent = rps.nami;
    document.getElementById('nami-cost').textContent = estadoJogo.custoNami;

    document.getElementById('robin-count').textContent = estadoJogo.qtdRobin;
    document.getElementById('robin-rps').textContent = rps.robin;
    document.getElementById('robin-cost').textContent = estadoJogo.custoRobin;

    // Ativa ou desativa botões conforme o saldo atual
    document.getElementById('btn-knife').disabled = estadoJogo.patinhas < estadoJogo.custoFaca;
    document.getElementById('btn-diable').disabled = estadoJogo.patinhas < estadoJogo.custoDiable || estadoJogo.diableComprado;

    document.getElementById('btn-chopper').disabled = estadoJogo.patinhas < estadoJogo.custoChopper;
    document.getElementById('btn-rumble').disabled = estadoJogo.patinhas < estadoJogo.custoRumble || estadoJogo.rumbleComprado;

    document.getElementById('btn-franky').disabled = estadoJogo.patinhas < estadoJogo.custoFranky;
    document.getElementById('btn-cola').disabled = estadoJogo.patinhas < estadoJogo.custoCola || estadoJogo.colaComprada;

    document.getElementById('btn-nami').disabled = estadoJogo.patinhas < estadoJogo.custoNami;
    document.getElementById('btn-vault').disabled = estadoJogo.patinhas < estadoJogo.custoCofre || estadoJogo.cofreComprado;

    document.getElementById('btn-robin').disabled = estadoJogo.patinhas < estadoJogo.custoRobin;
    document.getElementById('btn-poneglyph').disabled = estadoJogo.patinhas < estadoJogo.custoPoneglyph || estadoJogo.poneglyphComprado;
}

// Timer que roda a cada 1 segundo (1000 ms) somando os pontos da tripulação
setInterval(() => {
    if (!estadoJogo.jogoAtivo) return;

    const rps = calcularRpsTotal();
    if (rps.total > 0) {
        estadoJogo.patinhas += rps.total;
    }
    atualizarTela();
}, 1000);
document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);
document.getElementById('btn-vitoria').addEventListener('click', finalizarJogo);
document.getElementById('btn-jogar-novamente').addEventListener('click', reiniciarJogo);
document.getElementById('btn-reiniciar-hud').addEventListener('click', reiniciarJogo);

document.getElementById('sanji').addEventListener('click', clicarSanji);

document.getElementById('btn-descer').addEventListener('click', () => {
    document.getElementById('floors').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('btn-subir').addEventListener('click', () => {
    document.getElementById('top-stage').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn-knife').addEventListener('click', comprarFaca);
document.getElementById('btn-diable').addEventListener('click', comprarDiableJambe);

document.getElementById('btn-chopper').addEventListener('click', comprarChopper);
document.getElementById('btn-rumble').addEventListener('click', comprarRumbleBall);

document.getElementById('btn-franky').addEventListener('click', comprarFranky);
document.getElementById('btn-cola').addEventListener('click', comprarSuperCola);

document.getElementById('btn-nami').addEventListener('click', comprarNami);
document.getElementById('btn-vault').addEventListener('click', comprarCofre);

document.getElementById('btn-robin').addEventListener('click', comprarRobin);
document.getElementById('btn-poneglyph').addEventListener('click', comprarPoneglyph);

// Inicializa os textos na tela ao carregar
atualizarTela();
