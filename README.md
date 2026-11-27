🐾 Bando de Patinhas

[![Jogar Agora](https://img.shields.io/badge/▶_JOGAR_AGORA-2ecc71?style=for-the-badge&logo=githubpages&logoColor=white)](https://davzhin.github.io/Bando-de-patinhas/)

*(Se o botão acima não abrir direto, acesse: https://davzhin.github.io/Bando-de-patinhas/)*

Jogo incremental (*clicker/idle*) desenvolvido em **JavaScript puro, HTML5 e CSS3** para a Avaliação C3 da disciplina de Desenvolvimento Web. Inspirado no universo de *One Piece*, o objetivo é ajudar o cozinheiro Sanji e sua tripulação a preparar refeições, construir abrigos e arrecadar recursos para resgatar animais de rua.
---

## 🎮 Como Jogar e Regras

1. **Cozinhe no Convés:** Clique no **Sanji** para virar a frigideira e gerar **Patinhas** (pontuação principal do jogo).
2. **Desça para os Andares:** Clique na seta **Andares & Oficinas** para acessar os 5 andares do navio e contratar ajudantes:
   - **Andar 1 (Cozinha do Sanji):** Aumenta o ganho por clique (*Afiar Facas* e *Diable Jambe*).
   - **Andar 2 (Consultório do Chopper):** Gera Patinhas automaticamente por segundo e cuida dos animais resgatados.
   - **Andar 3 (Marcenaria do Franky):** Constrói abrigos com bônus de *Super Cola*.
   - **Andar 4 (Tesouraria da Nami):** Arrecada Berries para financiar os resgates.
   - **Andar 5 (Biblioteca da Robin):** Organiza campanhas de adoção com apoio dos *Poneglyphs*.
3. **Condição de Vitória:** Acumule **10.000 Patinhas** para habilitar o botão **🏆 Inaugurar Santuário** no topo da tela e concluir a partida com o resumo de estatísticas.
4. **Reinício sem Recarregar:** Utilize o botão **🔄 Reiniciar** (na barra superior ou na tela de vitória) para zerar o progresso e recomeçar a partida sem precisar recarregar a página.

---

## 📁 Estrutura do Projeto

```text
├── index.html        # Estrutura principal, telas modais e cenários
├── css/
│   └── estilo.css    # Estilização, animações e sprites em pixel art puro
├── js/
│   └── jogo.js       # Estado do jogo, eventos (addEventListener) e loop idle
└── README.md         # Documentação do projeto
```
## 🤖 Uso de Inteligência Artificial
   - Para desenvolver este projeto, utilizei um assistente de IA (Gemini) como apoio contínuo em boa parte da construção do código, funcionando praticamente como um tutor enquanto eu montava e entendia cada etapa do jogo na prática:

   - Visual e Pixel Art no CSS: Como desenhar personagens e cenários inteiros só com CSS dá bastante trabalho, pedi ajuda para estruturar os blocos dos tripulantes e fui aprendendo na prática como funcionam propriedades como position: relative/absolute, camadas com z-index, gradientes de fundo e até truques com box-shadow para duplicar detalhes (como os olhos da Nami e da Robin).

   - Lógica em JavaScript e Regras da C3: Usei a IA para me guiar na organização da lógica do jogo, entendendo como agrupar todas as variáveis dentro de um único objeto (estadoJogo), como trocar os onclick antigos por addEventListener e como montar a função de reiniciar a partida zerando tudo por código sem precisar dar F5.

   - Testes e Correções: Sempre que algo travava ou ficava desalinhado (como elementos do cenário bloqueando o clique no Sanji), usei o chat para debugar o motivo do erro e ajustar o código.

Todo o fluxo do jogo, escolha de tema, balanceamento dos custos, testes no navegador e organização final do repositório foram acompanhados, testados e compreendidos por mim ao longo do desenvolvimento.
