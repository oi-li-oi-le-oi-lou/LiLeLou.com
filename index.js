const fs = require("fs");
const remark = require("remark");
const remarkHTML = require("remark-html");
const { JSDOM } = require("jsdom");
const { html } = require("@leafac/html");
const { css, extractInlineStyles } = require("@leafac/css");
const markdown = require("dedent");
const javascript = require("tagged-template-noop");

const episodes = {
  oiLiOiLeOiLou: [
    {
      id: "a-grande-idade-redonda",
      title: "A Grande Idade Redonda",
      date: "2020-12-10",
      duration: "17:26",
      size: "12786375",
      description: markdown`
        Li & Lê fizeram aniversário recentemente. Eles têm a mesma idade, e agora é uma idade de respeito. Qual será que é?
      `,
    },
    {
      id: "o-que-torna-uma-historia-interessante",
      title: "O que Torna uma História Interessante?",
      date: "2020-12-04",
      duration: "49:22",
      size: "35772475",
      description: markdown`
        Com a pandemia e o excesso de tempo passado juntos, fica difícil termos histórias interessantes um para o outro. Mas afinal, o que torna uma história interessante? Angústia existencial, reflexões sobre amamentação, e muito mais, neste episódio de **Oi Li. Oi Lê. Oi Lou.**
      `,
      notes: markdown`
        Livro e filmes dos quais falamos neste episódio:

        - **I Am Malala**, da Malala Yousafzai.
        - **Free Solo**, do Alex Honnold.
        - **Onze Homens e Um Segredo**.
      `,
    },
    {
      id: "primeiras-semanas",
      title: "Primeiras Semanas",
      date: "2020-10-24",
      duration: "36:37",
      size: "26589585",
      description: markdown`
        Agora que o parto passou, nós percebemos que há um bebê em casa! Nós falamos sobre o ciclo da vida, da amamentação às trocas de fraldas.
      `,
    },
    {
      id: "parto",
      title: "Parto",
      date: "2020-10-19",
      duration: "40:36",
      size: "29373082",
      description: markdown`
O Lou nasceu! Nós contamos como foi.
      `,
    },
  ],

  oiLiOiLe: [
    {
      id: "carreiras",
      title: "Carreiras",
      date: "2020-09-25",
      duration: "48:55",
      size: "35713499",
      description: markdown`
        O bebê ainda não nasceu, então aproveitamos para refletir sobre o que estamos fazendo com as nossas carreiras. A Li parou de trabalhar e o Lê desistiu do doutorado, mas nós rejeitamos o título de **desempregados** 🙃
      `,
    },
    {
      id: "maternidade-e-machismo",
      title: "Maternidade e Machismo",
      date: "2020-09-19",
      duration: "51:34",
      size: "37621287",
      description: markdown`
        A maternidade é uma experiência de empoderamento feminino, mas sempre há alguém pronto para encher o saco. Nós conversamos sobre o machismo que a Li teve que enfrentar até agora na gravidez e o que podemos fazer a respeito.
      `,
    },
    {
      id: "plano-de-parto",
      title: "Plano de Parto",
      date: "2020-09-01",
      duration: "50:13",
      size: "36652182",
      description: markdown`
        O parto do Lou será em breve! Nós conversamos sobre nossas expectativas.
      `,
    },
    {
      id: "morte",
      title: "Morte",
      date: "2020-08-17",
      duration: "36:28",
      size: "35514665",
      description: markdown`
        A avó do Lê morreu. Talvez de coronavírus. Nós conversamos sobre a morte.
      `,
      notes: markdown`
        - [O significado que o Lê dá para o termo **micromorte**, que a Li usou com outro significado](https://en.wikipedia.org/wiki/Micromort).
      `,
    },
    {
      id: "a-grande-mudanca--parte-2",
      title: "A Grande Mudança: Parte 2",
      date: "2020-07-30",
      duration: "37:24",
      size: "36412102",
      description: markdown`
        Nós terminamos de contar como foi nossa mudança intercontinental de Baltimore (EUA) para Matosinhos (Portugal). Depois de muitas dificuldades, um final feliz!
      `,
    },
    {
      id: "a-grande-mudanca--parte-1",
      title: "A Grande Mudança: Parte 1",
      date: "2020-07-30",
      duration: "41:47",
      size: "40616902",
      description: markdown`
        Nós começamos a contar como foi nossa mudança intercontinental de Baltimore (EUA) para Matosinhos (Portugal). Uma aventura no meio da pandemia, com dois gatos, muita bagagem, e tudo que poderia dar errado dando errado!
      `,
      notes: markdown`
        <figure>
        <img src="images/2020-07-30--a-grande-mudanca--parte-1--1.drawio.png" alt="Ligações para Delta" width="481">
        <figcaption>

        A medalha de honra do Lê: Ligações de até 8 horas com a Delta. Claro que foram necessárias muitas mais ligações para resolver todos os problemas da viagem, mas as ligações com a Delta foram as mais longas.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2020-07-30--a-grande-mudanca--parte-1--2.png" alt="Caminho ideal" width="416">
        <figcaption>

        O caminho que deveríamos ter feito entre Paris e Sarlat.

        </figcaption>

        <img src="images/2020-07-30--a-grande-mudanca--parte-1--3.png" alt="Caminho Lê" width="415">
        <figcaption>

        Mais ou menos o caminho que o Lê e o pai da Li fizeram em 7 horas.

        </figcaption>

        <img src="images/2020-07-30--a-grande-mudanca--parte-1--4.png" alt="Caminho Li" width="416">
        <figcaption>

        Mais ou menos o caminho que a Li e sua mãe fizeram em 12 horas.

        </figcaption>
        </figure>
      `,
    },
    {
      id: "coronavirus",
      title: "Coronavírus",
      date: "2020-05-03",
      duration: "52:59",
      size: "51362731",
      description: markdown`
        Mais um podcast sobre coronavírus. Era tudo de que você precisava!
      `,
      notes: markdown`
Este é o primeiro episódio editado pela Li! 🎉
      `,
    },
    {
      id: "dia-internacional-da-mulher",
      title: "Dia Internacional da Mulher",
      date: "2020-03-31",
      duration: "44:54",
      size: "43601672",
      description: markdown`
        Nós conversamos sobre as mulheres da família da Li e sobre o papel da mulher nos dias de hoje.
      `,
      notes: markdown`
        [O episódio em que falamos sobre assédio moral no trabalho](#2019-07-04--assedio-moral-no-trabalho).

        Este episódio releva o tempo que levamos entre gravação e publicação, porque falamos de coisas de outros tempos que já não se faz mais, por exemplo, andar na rua 😷
      `,
    },
    {
      id: "baltimore",
      title: "Baltimore",
      date: "2020-03-13",
      duration: "55:37",
      size: "53894005",
      description: markdown`
        Em breve nós iremos embora de Baltimore depois de termos morado aqui por seis anos. Nós relembramos os melhores lugares e damos dicas do que fazer.
      `,
      notes: markdown`
        <figure>
        <img src="images/2020-03-13--baltimore.jpg" alt="Enfeite de árvore de Natal" width="600">
        <figcaption>

        O enfeite de árvore de Natal que nós compramos no fim da feira.

        </figcaption>
        </figure>

        - A inspiração para este episódio foi o livro **111 Places in Baltimore That You Must Not Miss**, da Allison Robicelli e John Dean.
        - Desde a gravação deste episódio nós fomos conhecer o Broadway Market. Não é grande coisa…
        - O filme que conta a história do cardiologista cuja pintura está perto de onde a Li trabalha se chama **Something the Lord Made**.
      `,
    },
    {
      id: "gravidez",
      title: "Gravidez",
      date: "2020-02-11",
      duration: "54:45",
      size: "53069559",
      description: markdown`
        A Li está grávida! 👶 Nós conversamos sobre como estão sendo as primeiras 10 semanas.
      `,
      notes: markdown`
        - Nós usamos o **Fertility Awareness Method** (FAM) como método contraceptivo durante anos, e ele funcionou bem. Nós aprendemos sobre o FAM no livro **Taking Charge of Your Fertility**, da Toni Weschler.

        - Nós estamos lendo juntos o livro **Everything I Never Told You**, da Celeste Ng, em que um dos temas centrais é como balancear a profissão e a família. [Em um episódio anterior nós já falamos sobre **Little Fires Everywhere**, outro livro da mesma autora](#2019-01-20--little-fires-everywhere).

        - [Ouça também o episódio em que nós conversamos sobre a ideia de termos filhos bem antes de a Li engravidar](#2019-03-14--filhos).
      `,
    },
    {
      id: "morte-e-como-foi-dar-aulas",
      title: "Morte e Como Foi Dar Aulas",
      date: "2019-12-30",
      duration: "36:11",
      size: "35236231",
      description: markdown`
        Nós conversamos sobre a morte do gato da mãe da Li, e sobre como foi o primeiro semestre em que o Lê deu aulas.
      `,
      notes: markdown`
        Neste episódio nós falamos sobre os livros **Man’s Search for Meaning**, do Viktor Frankl, e **The Fault in Our Stars**, do John Green.
      `,
    },
    {
      id: "visita-da-mae-e-choque-cultural",
      title: "Visita da Mãe e Choque Cultural",
      date: "2019-12-04",
      duration: "45:11",
      size: "43880878",
      description: markdown`
        Nós conversamos sobre como foram as duas semanas em que a mãe da Li nos visitou, e sobre o choque cultural que uma amiga do Lê está sofrendo depois de ter se mudado do Brasil para a Europa.
      `,
      notes: markdown`
        **Atualização:** Ao que tudo indica, a amiga do Lê voltou a morar no Brasil.
      `,
    },
    {
      id: "correndo-com-estranhos",
      title: "Correndo com Estranhos",
      date: "2019-11-09",
      duration: "58:56",
      size: "57079697",
      description: markdown`
        Nós conversamos sobre corridas e sobre alguns livros que lemos, principalmente **Talking to Strangers**, do Malcolm Gladwell.
      `,
      notes: markdown`
        Também falamos sobre os livros **A Piada Infinita**, do David Foster Wallace, e **Scott Pilgrim** e **Seconds**, do Bryan Lee O’Malley.
      `,
    },
    {
      id: "ecochatos",
      title: "Ecochatos",
      date: "2019-10-13",
      duration: "44:58",
      size: "43678022",
      description: markdown`
        Nós conversamos sobre espetáculos da Broadway e sobre como tentar fazer a coisa certa nos torna chatos.
      `,
      notes: markdown`
        - O Fantasma da Ópera realmente é antigo, mas não **tanto** assim: 1986.
        - O livro do Alex Honnold que o Lê leu se chama [**Alone on the Wall**](https://www.alexhonnold.com/book).
        - O Lê gosta mais de produções independentes, tipo as da [Baltimore Rock Opera Society](https://baltimorerockopera.org), do que dos espetáculos da Broadway.
        - O lugar favorito do Lê para comida é o [Cinnaholic](https://www.cinnaholic.com). Não fomos lá no aniversário dele 😕
      `,
    },
    {
      id: "season-premiere-da-segunda-temporada",
      title: "Season Premiere da Segunda Temporada",
      date: "2019-09-29",
      duration: "47:48",
      size: "46390623",
      description: markdown`
        Nós celebramos o aniversário de um ano de **Oi Li. Oi Lê.** 🎉 Completamos a recapitulação do hiato de dois meses que começamos no episódio anterior e contamos como foi nossa viagem à Ocean City.
      `,
      notes: markdown`
        - [O episódio sobre Brown do qual o Lê falou](#2019-02-24--brown-e-providence).
        - **Notando Nossa Própria Hipocrisia:** Nossa máquina de lavar é do lado no nosso quarto. Mas acho que viveríamos igualmente bem se ela estivesse a um ou dois lances de escadas de distância.
      `,
    },
    {
      id: "teaser-da-segunda-temporada",
      title: "Teaser da Segunda Temporada",
      date: "2019-09-17",
      duration: "48:48",
      size: "47350707",
      description: markdown`
        Depois de umas férias de **Oi Li. Oi Lê.**, estamos de volta para contar sobre o que aconteceu com a Li no trabalho depois do episódio anterior, e sobre a nossa viagem a Nova Iorque em comemoração aos nossos cinco anos de casamento.
      `,
      notes: markdown`
        - Esta era a nossa situação gravando este episódio:

          <img src="images/2019-09-17--teaser-da-segunda-temporada.png" alt="Nossa situação gravando este episódio" width="600">

        - **Esclarecimento Importante:** As bodas de cinco anos são de **madeira**.
      `,
    },
    {
      id: "assedio-moral-no-trabalho",
      title: "Assédio Moral no Trabalho",
      date: "2019-07-04",
      duration: "40:31",
      size: "39906496",
      description: markdown`
        A Li sofreu assédio moral no trabalho dela. Nós conversamos sobre como foi e sobre o que fazer a respeito.
      `,
      notes: markdown`
        - [Episódio sobre a Elizabeth Holmes](#2019-03-31--empreendedorismo), uma sociopata que virou CEO.
        - [Episódio sobre a Brown](#2019-02-24--brown-e-providence), para a qual o Lê decidiu não ir e com isto provavelmente evitou assédio moral.
        - [Episódio sobre satanismo](#2019-05-31--satanismo), que nada tem a ver com **o mal**.
      `,
    },
    {
      id: "the-act",
      title: "The Act",
      date: "2019-06-16",
      duration: "45:08",
      size: "44325124",
      description: markdown`
        Nós conversamos sobre **The Act**, o seriado baseado na história real da Gypsy Rose Blanchard, que era vítima de **Síndrome de Münchhausen por procuração** por parte da mãe, a quem ela acabou por matar. **Contém spoilers e descrições de cenas perturbadores de um crime real.**
      `,
      notes: markdown`
        - [Episódio sobre a doida da Elizabeth Holmes e a Theranos](#2019-03-31--empreendedorismo)
        - O poema que o Lê mencionou é o [**This Be The Verse**](https://www.poetryfoundation.org/poems/48419/this-be-the-verse), do Philip Larkin, que ele conheceu através do [**Little Fires Everywhere**](#2019-01-20--little-fires-everywhere).
        - [O caso do desaparecimento da Madeleine McCann](https://pt.wikipedia.org/wiki/Desaparecimento_de_Madeleine_McCann), que aconteceu no Algarve, onde a Li morava.
      `,
    },
    {
      id: "satanismo",
      title: "Satanismo",
      date: "2019-05-31",
      duration: "39:07",
      size: "38556038",
      description: markdown`
        Nós conversamos sobre o documentário [**Hail Satan?**](https://www.hailsatanfilm.com), que trata do **The Satanic Temple** e das suas implicações na justiça, moral, religião, arte, e política.
      `,
      notes: markdown`
        - [Os sete mandamentos do **The Satanic Temple**](https://thesatanictemple.com/pages/tenets), que combinam com o nosso senso de moral.
        - [O episódio em que falamos sobre veganismo](#2018-12-20--um-vegano-no-churrasco-de-natal).
        - O Lê lembrou certo, a frase era do René Descartes, e aparece no **Discurso sobre o Método**: “O bom senso é a coisa do mundo mais bem distribuída: todos pensamos tê-lo em tal medida que até os mais difíceis de contentar nas outras coisas não costumam desejar mais bom senso do que aquele que têm.”
        - Nós falamos sobre **O Mundo de Sofia** ao longo de vários episódios, por exemplo, [do episódio sobre religião](#2019-02-16--religiao).

        <figure>
        <img src="images/2019-05-31--satanismo.jpg" alt="Desenho de coelho que a Li coloriu" width="600">
        <figcaption>

        Desenho de coelho que a Li coloriu. Nós não falamos sobre ele no episódio, mas fica aqui como uma continuação [dos desenhos que a Li está colorindo](#2019-03-31--empreendedorismo).

        </figcaption>
        </figure>
      `,
    },
    {
      id: "miami",
      title: "Miami",
      date: "2019-05-16",
      duration: "38:39",
      size: "38106723",
      description: markdown`
        Nós conversamos a respeito da nossa viagem à Miami: nós fomos à praia, o Lê refletiu a respeito da sua identidade nacional, e mais.
      `,
      notes: markdown`
        <figure>
        <img src="images/2019-05-16--miami--1.jpg" alt="Miami 1" width="600">
        <figcaption>

        A praia e as algas.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2019-05-16--miami--2.jpg" alt="Miami 2" width="600">
        <figcaption>

        Um item interessante do bairro artístico, Wynwood.

        </figcaption>
        </figure>

        - A música [**I’m in Miami Bitch** já tem, sim, 10 anos](https://en.wikipedia.org/wiki/I%27m_in_Miami_Bitch#Chuckie_remix).
        - [O episódio sobre nossa ida à Brown](#2019-02-24--brown-e-providence).
      `,
    },
    {
      id: "irmas",
      title: "Irmãs",
      date: "2019-04-23",
      duration: "33:50",
      size: "33483677",
      description: markdown`
O Lê tem notícias domésticas bombásticas!
      `,
      notes: markdown`
        - [Episódio sobre Eleições no Brasil](#2018-10-28--eleicoes-no-brasil), em que nós falamos sobre nossas relações com nossas famílias.
        - O **Complexo de Édipo** ao contrário, em que a filha quer ficar com o pai, tem um nome: **Complexo de Electra**.
        - A Mallu Magalhães e o Marcelo Camelo começaram a namorar em 2008, quando ela tinha algo perto de 16 anos e ele perto de 30. Em 2015 eles tiveram uma filha.
        - [Episódio sobre filhos](#2019-03-14--filhos).
      `,
    },
    {
      id: "racismo",
      title: "Racismo",
      date: "2019-04-11",
      duration: "36:46",
      size: "36292367",
      description: markdown`
        Nós conversamos sobre racismo depois de termos assistido ao filme **BlacKkKlansman**.
      `,
      notes: markdown`
        - O termo **euro-americano** [existe](https://www.merriam-webster.com/dictionary/Euro-American). As pessoas não usarem este termo é mais uma evidência de como a linguagem pode ser preconceituosa.
        - O Lê falou um pouco do livro que ele está lendo, **Educated**, da Tara Westover.
      `,
    },
    {
      id: "empreendedorismo",
      title: "Empreendedorismo",
      date: "2019-03-31",
      duration: "45:06",
      size: "55127088",
      description: markdown`
        Nós conversamos sobre as estranhezas da cultura de empreendedorismo e do Vale do Silício, e sobre a ascensão e queda da Theranos e da sua fundadora, a Elizabeth Holmes.
      `,
      notes: markdown`
        - A conversa foi inspirada por um livro que o Lê leu, **Bad Blood: Secrets and Lies in a Silicon Valley Startup**, do John Carreyrou, e por um documentário da HBO que nós assistimos juntos, **The Inventor: Out for Blood in Silicon Valley**.
        - Outro exemplo de empresa ridícula do Vale do Silício que nós mencionamos no episódio é a [Juicero](https://www.bloomberg.com/news/features/2017-04-19/silicon-valley-s-400-juicer-may-be-feeling-the-squeeze), cuja **criação produtizada** era uma suqueira de \$ 400 que podia ser substituída pelas mãos!
        - Por último, eis a versão brasileira de empreendedorismo que causa vergonha alheia: a [Zebeleo](https://www.youtube.com/watch?v=o9vMOVfdvQ8).

        <figure>
        <img src="images/2019-03-31--empreendedorismo--1.jpg" alt="Empreendedorismo 1" width="600">
        <figcaption>

        O desenho que a Li coloriu. Compare com o [desenho anterior](#2019-01-27--roommates) e veja o progresso.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2019-03-31--empreendedorismo--2.jpg" alt="Empreendedorismo 2" width="600">
        <figcaption>

        Uma das primeiras fotos que o Lê tirou com a câmera nova. Ela faz magia, nem precisa de fotógrafo!

        </figcaption>
        </figure>
      `,
    },
    {
      id: "filhos",
      title: "Filhos",
      date: "2019-03-14",
      duration: "53:47",
      size: "77764201",
      description: markdown`
        Nós conversamos sobre ter filhos: razões para ter, razões para não ter, em qual época da vida ter, nomes, e tudo o mais.
      `,
      notes: markdown`
        <figure>
        <img src="images/2019-03-14--filhos.png" alt="Filhos" width="441">
        </figure>

        - Berço é coisa do passado: os bebês **in** [dormem](https://www.npr.org/sections/health-shots/2017/03/26/521399385/states-give-new-parents-baby-boxes-to-encourge-safe-sleep-habits) [em](https://www.bbc.com/news/magazine-22751415) [caixas](https://www.finnbin.com)!
      `,
    },
    {
      id: "procrastinacao-e-idiomas",
      title: "Procrastinação e Idiomas",
      date: "2019-03-07",
      duration: "47:02",
      size: "68040457",
      description: markdown`
        O Lê teve uma semana bem pouco produtiva, em que ele passou bastante tempo vendo avaliações de câmeras que ele não vai comprar. Nós conversamos sobre procrastinação, sobre a pressão de ser cada vez mais produtivo, e sobre idiomas.
      `,
      notes: markdown`
        - A máquina de escrever digital se chama [Freewrite](https://getfreewrite.com).
        - O [Andrew Huang](https://www.youtube.com/channel/UCdcemy56JtVTrsFIOoqvV8g) é um dos YouTubers favoritos do Lê.
        - O John Green falando que criar uma comunidade positiva é a coisa mais importante que a nossa geração pode fazer no [**The Anthropocene Reviewed**](https://soundcloud.com/theanthropocenereviewed/episode-12-indianapolis-and-love-at-first-sight).
        - O **streak** do Lê no Duolingo de francês foi de só 173 dias:  
          <img src="images/2019-03-07--procrastinacao-e-idiomas.png" alt="Procrastinação e Idiomas" width="320">
      `,
    },
    {
      id: "brown-e-providence",
      title: "Brown e Providence",
      date: "2019-02-24",
      duration: "43:09",
      size: "62458170",
      description: markdown`
        Nós conversamos sobre a **teaching talk** do Lê na Brown, sobre nossa viagem à Providence, e sobre nossa visita à Harvard & MIT.
      `,
      notes: markdown`
        - Um de nossos desenhos animados favoritos, **Family Guy**, se passa em Quahog, que é um bairro fictício de Providence. Da janela do nosso hotel nós víamos o [**skyline** que aparece no desenho](https://en.wikipedia.org/wiki/Family_Guy#Development).
        - **Atualização importante:** Nós comemos mais do melhor bolo de chocolate do mundo depois da gravação deste episódio. Duas fatias. Dizer não para uma **Ivy League** foi fácil em comparação com dizer adeus para aquele bolo.
        - [O episódio sobre como nos conhecemos](#2018-12-11--como-nos-conhecemos) conta mais da história do **leap of faith** do Lê em 2014, na esperança de algo melhor aparecesse. E algo apareceu: a Li.
      `,
    },
    {
      id: "religiao",
      title: "Religião",
      date: "2019-02-16",
      duration: "48:20",
      size: "70476872",
      description: markdown`
        Nós contamos como foi o fim da história dos gatos, a Li contou como foi o **drill** da unidade de bio-contaminação, e falamos sobre filosofia e religião.
      `,
      notes: markdown`
        - O motivador da nossa conversa foi **O Mundo de Sofia**.
        - **Correção:** Os dentes-de-sabre não foram domesticados, como o Lê falou; eles foram extintos!
        - O livro sobre religião que o Lê falou é o **Deus, Um Delírio**.
        - [Não acredite em qualquer estatística que você encontra por aí](https://www.tylervigen.com/spurious-correlations).
      `,
    },
    {
      id: "pintura-machados-e-moveis",
      title: "Pintura, Machados e Móveis",
      date: "2019-02-03",
      duration: "43:29",
      size: "63500993",
      description: markdown`
        Nós falamos sobre nosso primeiro quadro em tinta a óleo sobre tela, sobre **eventozinhos corporativos**, e sobre como serão nossos móveis agora que a [roommate se mudou](#2019-01-27--roommates) e a casa ficou quase vazia.
      `,
      notes: markdown`
        <figure>
        <img src="images/2019-02-03--pintura-machados-e-moveis--1.jpg" alt="Pintura, Machados e Móveis 1" width="200">
        <figcaption>

        A versão original do quadro de lontra.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2019-02-03--pintura-machados-e-moveis--2.jpg" alt="Pintura, Machados e Móveis 2" width="600">
        <figcaption>

        As nossas versões.

        </figcaption>
        </figure>

        - O [episódio sobre Glamping](#2018-10-08--glamping), em que falamos sobre os dias que passamos na floresta, para os quais o Lê só levou um par de meias!
        - [O episódio com o **Meio Clube do Livro** anterior, sobre **Little Fires Everywhere**](#2019-01-20--little-fires-everywhere).
        - No episódio de hoje, falamos sobre **O Mundo de Sofia**, e **The Hate U Give**. E também mencionamos **The Help**, **To Kill a Mockingbird**, e **The Immortal Life of Henrietta Lacks**.
      `,
    },
    {
      id: "roommates",
      title: "Roommates",
      date: "2019-01-27",
      duration: "33:54",
      size: "49123146",
      description: markdown`
        Nossa **roommate** se mudou! Nós relembramos nossas histórias com colegas de casa. Agora somos só Li & Lê & Ca (o gato); colegas de casa nunca mais!
      `,
      notes: markdown`
        <figure>
        <img src="images/2019-01-27--roommates.png" alt="Roommates" width="600">
        <figcaption>

        A versão final do desenho que a Li coloriu. Veja a evolução desde a [versão anterior](#2019-01-03--filmes-televisao-e-livros).

        </figcaption>
        </figure>

        - [O episódio em que falamos sobre como nos conhecemos e fomos **roommates** antes de virarmos família](#2018-12-11--como-nos-conhecemos).
      `,
    },
    {
      id: "little-fires-everywhere",
      title: "Little Fires Everywhere",
      date: "2019-01-20",
      duration: "42:06",
      size: "60935356",
      description: markdown`
        Nós contamos o que aconteceu com o [**teaching statement** do Lê](#2019-01-10--educacao) e fazemos um clube do livro sobre [**Little Fires Everywhere**](https://www.celesteng.com/little-fires-everywhere/).
      `,
      notes: markdown`
        - Nós conhecemos **Little Fires Everywhere** através do John Green, quando ele estava lançando [**Turtles All the Way Down** (Tartarugas Até Lá Embaixo)](https://www.johngreenbooks.com/turtles-all-the-way-down-book/).
        - As séries de que falamos: [**You**](https://www.netflix.com/title/80211991), que poderia ser o tema de um futuro **clube do seriado**; e [Cuckoo](https://www.netflix.com/title/80091341), a comédia que a Li está assistindo.
      `,
    },
    {
      id: "educacao",
      title: "Educação",
      date: "2019-01-10",
      duration: "49:21",
      size: "71374453",
      description: markdown`
        O Lê precisa escrever um **teaching statement**. Nós refletimos juntos sobre o que faz um bom professor e qual é a melhor filosofia de ensino.
      `,
      notes: markdown`
        - [Escrever à mão melhora a compreensão](https://www.npr.org/2016/04/17/474525392/attention-students-put-your-laptops-away).
      `,
    },
    {
      id: "filmes-televisao-e-livros",
      title: "Filmes, Televisão, e Livros",
      date: "2019-01-03",
      duration: "36:05",
      size: "52260411",
      description: markdown`
        Nós conversamos sobre o nosso **réveillon**, e sobre filmes, televisão, e livros.
      `,
      notes: markdown`
        <figure>
        <img src="images/2019-01-03--filmes-televisao-e-livros.png" alt="Filmes, Televisão, e Livros" width="600">
        <figcaption>

        O desenho que a Li está colorindo. Ela melhorou bastante desde o [episódio anterior](#2018-12-26--retrospectiva-2018-e-resolucoes-de-ano-novo).

        </figcaption>
        </figure>

        - [A Lully de Verdade falando sobre **Os Clássicos Obrigatórios do Cinema**](https://www.youtube.com/watch?v=LyEmGTIUm_4). Nesta série ela fala sobre **Cidadão Kane** e sobre **O Encouraçado Potemkin**.
        - [Crash Course Philosophy](https://www.youtube.com/watch?v=1A_CAkYt3GY&index=1&list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR). Esta série de vídeos discute como nós reagimos à ficção (e sobre **vários** outros assuntos).

        Uma lista de todos os filmes, séries e livros que nós mencionamos:

        - **Cidadão Kane**
        - **Desventuras em Série**
        - **The Apartment**
        - **When Harry Met Sally…**
        - **Encontros e Desencontros**
        - **2001: Uma Odisséia no Espaço**
        - **O Encouraçado Potemkin** (não **ancoradouro**, como o Lê falou no episódio)
        - **A Lista de Schindler**
        - **O Labirinto do Fauno**
        - **O Menino do Pijama Listrado**
        - **The Zookeeper’s Wife**
        - **O Diário de Anne Frank**
        - **The Help**
        - **O Conto da Aia**
        - **Metropolis**
        - **Nosferatu**
        - **Independence Day: Resurgence**
        - **Gilmore Girls**
        - **Desperate Housewives**
        - **Eragon** (a Li está lendo (ou não) o último livro da série, **Herança**)
        - Todos os livros e filmes do **Dan Brown**
        - **Black Mirror**
        - **Laranja Mecânica**
        - **O Iluminado**
        - **De Olhos Bem Fechados**
        - **Pulp Fiction**
        - **A Maldição da Residência Hill**
        - **Um Lugar Chamado Notting Hill**
        - **Seinfeld**
        - **Dracula**
        - **Harry Potter**
        - **Looking for Alaska**
        - **O Senhor dos Anéis**
        - **Paper Towns**
        - **Pretty Little Liars**
        - **Lost**
      `,
    },
    {
      id: "retrospectiva-2018-e-resolucoes-de-ano-novo",
      title: "Retrospectiva 2018 e Resoluções de Ano Novo",
      date: "2018-12-26",
      duration: "32:10",
      size: "46640603",
      description: markdown`
        Nós relembramos 2018 e fazemos planos para 2019. Este é o nosso décimo episódio!
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-12-26--retrospectiva-2018-e-resolucoes-de-ano-novo--1.png" alt="Retrospectiva 2018 e Resoluções de Ano Novo 1" width="600">
        <figcaption>

        O cachorro (meio) pintado pela Li.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2018-12-26--retrospectiva-2018-e-resolucoes-de-ano-novo--2.png" alt="Retrospectiva 2018 e Resoluções de Ano Novo 2" width="600">
        <figcaption>

        E o pássaro pintado pelo Lê. Ainda temos muito para aprender! E aqui está [uma pessoa na internet](https://www.youtube.com/watch?v=zWXsGYP6COc) para provar que o problema não são nossos lápis de cor.

        </figcaption>
        </figure>

        - Receitas de [Roupa Velha](https://www.pingodoce.pt/receitas/roupa-velha/) e [Paella](https://simple-veganista.com/vegetable-paella/) aprovadas por nós. O Lê experimentou pela primeira vez [açafrão de verdade](https://pt.wikipedia.org/wiki/Açafrão), na paella, em vez de [açafrão-da-terra](https://pt.wikipedia.org/wiki/Açafrão-da-terra).

        - Realmente, [o faisão](https://pt.wikipedia.org/wiki/Faisão) não tem muito a ver [o pavão](https://pt.wikipedia.org/wiki/Pavão).
      `,
    },
    {
      id: "um-vegano-no-churrasco-de-natal",
      title: "Um Vegano no Churrasco de Natal",
      date: "2018-12-20",
      duration: "54:49",
      size: "79254331",
      description: markdown`
        O Lê é vegano; a Li não. Nós conversamos sobre como é ser vegano sem ser chato, principalmente nesta época de perus de Natal.
      `,
      notes: markdown`
        - O Lê lembrou certo: o marciano de [**Um Estranho Numa Terra Estranha**, de Robert A. Heinlein](https://en.wikipedia.org/wiki/Stranger_in_a_Strange_Land), promove uma forma de canibalismo conhecida como [**endocanibalismo**](https://en.wikipedia.org/wiki/Endocannibalism). Talvez até seja vegano, mas o Lê está fora. A Li também estava certa, [canibalismo pode fazer mal à saúde](https://en.wikipedia.org/wiki/Endocannibalism#Medical_implications).

        - [Os Mustards falando sobre veganismo](https://www.youtube.com/watch?v=xMqDY2sUzRA).

        - A definição de [flexitariano (ou semi-vegetariano)](https://en.wikipedia.org/wiki/Semi-vegetarianism) não diz onde omnívoro termina e flexitariano começa. Desde que o consumo de carne seja **ocasional**, está valendo. Sendo assim, a Li é flexitariana.

        - Carl Sagan disse “if you wish to make an apple pie from scratch, you must first invent the universe” no episódio 9 de **Cosmos**, [**The Lives of the Stars**](https://www.imdb.com/title/tt0760463/).

        - A [cisticercose](https://pt.wikipedia.org/wiki/Cisticercose) pode ser transmitida pelo consumo de carne de porco mal cozida, e este é um dos motivos pelos quais a carne de porco foi banida por algumas religiões, por exemplo, o judaísmo.

        - E. Coli não causa cólera, mas causa vários problemas gastro-intestinais, por exemplo, diarreia. Recentemente houve um [surto de E. Coli na alface aqui nos Estados Unidos](https://www.cdc.gov/ecoli/2018/o157h7-11-18/index.html), mas por enquanto nenhuma religião proibiu saladinha.
      `,
    },
    {
      id: "como-nos-conhecemos",
      title: "Como nos Conhecemos",
      date: "2018-12-11",
      duration: "39:07",
      size: "94383579",
      description: markdown`
        Nós nos conhecemos numa sexta-feira treze cinco anos atrás. Agora comemoramos lembrando como foi.
      `,
      notes: markdown`
        - O motivo pelo qual o [Lê gosta de cabras](https://www.youtube.com/watch?v=w0CdXaOS5_o).
        - [Couchsurfing](https://www.couchsurfing.com): O site que promoveu o encontro no qual nós nos conhecemos.
        - De acordo com o mapa, o Lê caminhou cinco horas no dia em que ele conheceu a Li.
        - A rua em que as pessoas vão fazer compras em São Paulo é a **Oscar Freire**.
      `,
    },
    {
      id: "doutorado",
      title: "Doutorado",
      date: "2018-12-04",
      duration: "55:17",
      size: "80171204",
      description: markdown`
        O Lê está perto de concluir o seu doutorado no exterior. Nós conversamos sobre como ele decidiu entrar nesta, como é o dia-a-dia de um doutorando, e como o doutorado influenciou sua família.
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-12-04--doutorado.jpg" alt="Doutorado" width="600">
        <figcaption>

        O chocolate que a Li ganhou de presente. É um esquilo pensando em chocolate — a coisa mais fofa!

        </figcaption>
        </figure>

        Os motivos para o Lê escolher linguagens de programação como assunto do seu doutorado: [Understanding Computation](https://computationbook.com) e [Y Not: Adventures in Functional Programming](https://www.youtube.com/watch?v=FITJMJjASUs).
      `,
    },
    {
      id: "amizades-e-tecnologia",
      title: "Amizades e Tecnologia",
      date: "2018-11-27",
      duration: "45:32",
      size: "66145327",
      description: markdown`
        Nós conversamos sobre os motivos que nos fazem querer acabar com uma amizade, e sobre vício em tecnologia.
      `,
      notes: markdown`
        - [Nós temos obrigação moral para com a família (e, em particular, para com os pais)?](https://www.youtube.com/watch?v=p7cOwQQDI7o) O Lê acha que não.
        - [DuckDuckGo](https://duckduckgo.com), um buscador alternativo ao Google que respeita a privacidade.
        - [Games Done Quick](https://gamesdonequick.com), a fonte dos vídeos em que o Lê é viciado. **Speedruns** são jogadores profissionais acabando os jogos o mais rápido possível.
        - [Downtime](https://www.apple.com/newsroom/2018/06/ios-12-introduces-new-features-to-reduce-interruptions-and-manage-screen-time/), um recurso dentro do Screen Time, do iOS 12, é uma resposta da Apple para o nosso vício em tecnologia.
        - [Alguns](https://www.theguardian.com/technology/2017/jun/16/internet-addiction-gaming-restart-therapy-washington) [recursos](https://www.caron.org/understanding-addiction/internet-addiction) [a respeito](https://netaddictionrecovery.com) de vício em internet.
      `,
    },
    {
      id: "obsessoes-e-viagem-com-gato",
      title: "Obsessões e Viagem com Gato",
      date: "2018-11-18",
      duration: "49:40",
      size: "72093734",
      description: markdown`
        Nós conversamos sobre nossas obsessões. O Lê dorme e acorda em horários simétricos; a Li conta como foi trazer um gato do Brasil para os Estados Unidos. Nós estamos descobrindo para onde vamos no ano que vem, e a Li compartilha o que ela aprendeu sobre validação de diploma de farmacêutica na Europa e no Canadá (em resumo, é **bem** difícil).
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-11-18--obsessoes-e-viagem-com-gato.png" alt="Obsessões e Viagem com Gato" width="600">
        <figcaption>

        A simetria no relógio. Acordar às 04:00, ter a metade do dia acordado às 12:00, ir dormir às 20:00, e ter a metade da noite de sono às 00:00.

        </figcaption>
        </figure>

        Os [livros da Basecamp](https://basecamp.com/books), que falam sobre ser bem sucedido sem ter que trabalhar horas demais.

        **Esclarecimento Importante:** Pagers podem usar a rede de telefonia celular, mas também podem usar uma rede especial para pagers. Esta rede especial usa satélites e rádios que cobrem uma área bem maior, onde a telefonia celular não chega. É por causa desta resiliência que os profissionais de saúde ainda usam pagers. A contrapartida é que esta rede especial não suporta trafegar muita informação de uma só vez, e é por isto que ela não é usada para telefonia ou internet.
      `,
    },
    {
      id: "eleicoes-no-brasil",
      title: "Eleições no Brasil",
      date: "2018-10-28",
      duration: "43:09",
      size: "62707842",
      description: markdown`
        Nós fomos para Washington para o Lê votar para presidente do Brasil no segundo turno de 2018. Logo antes da apuração dos votos, nós aproveitamos os últimos momentos de esperança.
      `,
      notes: markdown`
        - [Brasil: Ame-o **e** Deixe-o](https://www.youtube.com/watch?v=tCzmwG5ZB6g).
        - [Bumba fala sobre brasileiros e estadunidenses com raiva dos seus presidentes](https://www.youtube.com/watch?v=T1RBTzAREQE).
      `,
    },
    {
      id: "aniversarios",
      title: "Aniversários",
      date: "2018-10-20",
      duration: "45:32",
      size: "66134677",
      description: markdown`
        O Lê está fazendo **X** anos! Nós conversamos sobre aniversários e **influencers** da internet.
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-10-20--aniversarios.png" alt="Aniversários" width="600">
        <figcaption>

        Nós gravando este episódio, com um gato no colo, e um bolo. Desenhado a quatro mãos.

        </figcaption>
        </figure>

        - Ouça [Shop Vac](https://www.jonathancoulton.com/store/), do Jonathan Coulton.
        - Uma arroba (15 quilos) de alfarrobas custa a partir de R\$ 750.
        - [The Woodstock Fruit Festival](http://www.thewoodstockfruitfestival.com), que a Li tem vontade de ir por causa dos **influencers**, mas ainda não foi.
      `,
    },
    {
      id: "glamping",
      title: "Glamping",
      date: "2018-10-08",
      duration: "22:16",
      size: "32780150",
      description: markdown`
        Nós fomos **glamping** (**glamour** + **camping**). Caminhamos no meio da floresta, conhecemos gente mais ou menos, e quebramos um banco!
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-10-08--glamping--1.jpg" alt="Glamping 1" width="600">
        <figcaption>

        Nós quebramos este banco na primeira tentativa de gravar o podcast.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--2.jpg" alt="Glamping 2" width="600">
        <figcaption>

        Onde conseguimos gravar o podcast — cada um em seu banco.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--3.jpg" alt="Glamping 3" width="480">
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--4.jpg" alt="Glamping 4" width="480">
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--5.jpg" alt="Glamping 5" width="600">
        <figcaption>

        As botas da Li.

        </figcaption>
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--6.jpg" alt="Glamping 6" width="600">
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--7.jpg" alt="Glamping 7" width="480">
        </figure>

        <figure>
        <img src="images/2018-10-08--glamping--8.jpg" alt="Glamping 8" width="600">
        <figcaption>

        A Li assustou os veadinhos com o flash (sem querer) para tirar esta foto.

        </figcaption>
        </figure>

        **Correção:** De acordo com o **squirrelnutrition.com**, [esquilos **não** hibernam](http://www.squirrelnutrition.com/blog/do-squirrels-hibernate). Céus, **squirrelnutrition.com** — se alguém entende de esquilos são estes caras. **squirrelnutrition.com**, a internet nunca deixa de me surpreender. De toda forma, esquilos passam um bom tempo sem fazer quase nada. Nós nos identificamos.
      `,
    },
    {
      id: "dia-da-farmaceutica",
      title: "Dia da Farmacêutica",
      date: "2018-09-28",
      duration: "33:10",
      size: "48329003",
      description: markdown`
        No primeiro episódio de **Oi Li. Oi Lê.**, nós conversamos sobre como é ser farmacêutica e analista clínica em vários lugares do mundo.
      `,
      notes: markdown`
        <figure>
        <img src="images/2018-09-28--dia-da-farmaceutica.png" alt="Dia da Farmacêutica" width="500">
        <figcaption>

        A Li trabalha em hematologia.

        </figcaption>
        </figure>

        A Li já trabalhou no Brasil, fez um estágio na Espanha, e hoje trabalha nos Estados Unidos.
      `,
    },
  ],
};

fs.writeFileSync(
  "index.html",
  extractInlineStyles(html`
    <!DOCTYPE html>
    <html lang="pt">
      <head>
        <meta charset="UTF-8" />

        <title>Oi Li. Oi Lê. Oi Lou.</title>
        <meta name="author" content="Li & Lê & Lou" />
        <meta
          name="description"
          content="A Li é a mãe, o Lê é o pai, e o filho é o Lou. Nós falamos sobre coisas de bebê e outras coisas que não são de bebê."
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          href="/vendor/node_modules/@ibm/plex/css/ibm-plex.min.css"
        />
        <link
          rel="stylesheet"
          href="vendor/node_modules/@fortawesome/fontawesome-free/css/all.min.css"
        />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />

        <script src="/vendor/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
        <script src="/vendor/node_modules/tippy.js/dist/tippy-bundle.umd.js"></script>
        <script>
          tippy.setDefaultProps({
            arrow: tippy.roundArrow,
            duration: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? 1
              : 150,
          });
        </script>
        <link
          rel="stylesheet"
          href="/vendor/node_modules/tippy.js/dist/svg-arrow.css"
        />

        <script>
          window.addEventListener("DOMContentLoaded", () => {
            for (const element of document.querySelectorAll(
              "[data-ondomcontentloaded]"
            ))
              new Function(element.dataset.ondomcontentloaded).call(element);
          });
        </script>
      </head>

      <body
        style="${css`
          font-family: "IBM Plex Sans", var(--font-family--sans-serif);
          font-size: var(--font-size--sm);
          line-height: var(--line-height--sm);
          color: var(--color--amber--700);
          background-color: var(--color--amber--50);
          @media (prefers-color-scheme: dark) {
            color: var(--color--amber--200);
            background-color: var(--color--amber--900);
          }
          display: flex;
          justify-content: center;

          @at-root {
            button,
            a {
              transition-property: var(--transition-property--colors);
              transition-duration: var(--transition-duration--150);
              transition-timing-function: var(
                --transition-timing-function--in-out
              );
              cursor: pointer;
            }

            details {
              summary {
                font-size: var(--font-size--2xs);
                line-height: var(--line-height--2xs);
                font-weight: var(--font-weight--semibold);
                text-transform: uppercase;
                letter-spacing: var(--letter-spacing--widest);
                color: var(--color--amber--900);
                &:hover,
                &:focus-within {
                  color: var(--color--amber--700);
                }
                &:active {
                  color: var(--color--amber--600);
                }
                @media (prefers-color-scheme: dark) {
                  color: var(--color--amber--50);
                  &:hover,
                  &:focus-within {
                    color: var(--color--amber--200);
                  }
                  &:active {
                    color: var(--color--amber--300);
                  }
                }
                transition-property: var(--transition-property--colors);
                transition-duration: var(--transition-duration--150);
                transition-timing-function: var(
                  --transition-timing-function--in-out
                );
                cursor: pointer;
                &::before {
                  content: "\\f249";
                  font-family: "Font Awesome 5 Free";
                  font-weight: 400;
                  margin-right: var(--space--2);
                }
              }
              &[open] > summary {
                margin-bottom: var(--space--2);
                &::before {
                  font-weight: 900;
                }
              }
            }

            .tippy-box {
              color: var(--color--amber--200);
              background-color: var(--color--amber--900);
              .tippy-svg-arrow {
                fill: var(--color--amber--900);
              }
              @media (prefers-color-scheme: dark) {
                color: var(--color--amber--700);
                background-color: var(--color--amber--50);
                .tippy-svg-arrow {
                  fill: var(--color--amber--50);
                }
              }
              border-radius: var(--border-radius--md);
              .tippy-content {
                padding: var(--space--1) var(--space--2);
              }
            }
          }
        `}"
      >
        <div
          style="${css`
            flex: 1;
            min-width: var(--space--0);
            max-width: var(--width--prose);
            margin: var(--space--4);
            display: flex;
            flex-direction: column;
            gap: var(--space--8);
          `}"
        >
          <header
            style="${css`
              display: flex;
              flex-direction: column;
              gap: var(--space--4);
            `}"
          >
            <a href="/">
              <svg
                style="${css`
                  width: var(--width--prose);
                  height: var(--width--prose);
                  background-color: blue;
                `}"
              ></svg>
            </a>

            <nav
              style="${css`
                display: flex;
                gap: var(--space--2);
                justify-content: center;
                a {
                  font-size: var(--font-size--xl);
                  line-height: var(--line-height--xl);
                  color: var(--color--amber--900);
                  background-color: var(--color--amber--100);
                  &:hover,
                  &:focus-within {
                    color: var(--color--amber--700);
                  }
                  &:active {
                    background-color: var(--color--amber--200);
                  }
                  @media (prefers-color-scheme: dark) {
                    color: var(--color--amber--100);
                    background-color: var(--color--amber--800);
                    &:hover,
                    &:focus-within {
                      color: var(--color--amber--300);
                    }
                    &:active {
                      background-color: var(--color--amber--700);
                    }
                  }
                  width: var(--space--10);
                  height: var(--space--10);
                  border-radius: var(--border-radius--circle);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              `}"
            >
              <a
                href="https://podcasts.apple.com/podcast/id1440395880"
                data-ondomcontentloaded="${javascript`
                  tippy(this, {
                    content: "Apple Podcasts",
                    touch: false,
                  });
                `}"
              >
                <i class="fab fa-apple"></i>
              </a>
              <a
                href="https://podcasts.google.com/feed/aHR0cHM6Ly9vaS1saS1vaS1sZS5jb20vZmVlZC54bWw"
                data-ondomcontentloaded="${javascript`
                  tippy(this, {
                    content: "Google Podcasts",
                    touch: false,
                  });
                `}"
              >
                <i class="fab fa-google-play"></i>
              </a>
              <a
                href="https://open.spotify.com/show/0nf8jhqq6nbAu77vZVSGTh"
                data-ondomcontentloaded="${javascript`
                  tippy(this, {
                    content: "Spotify",
                    touch: false,
                  });
                `}"
              >
                <i class="fab fa-spotify"></i>
              </a>
              <a
                href="feed.xml"
                data-ondomcontentloaded="${javascript`
                  tippy(this, {
                    content: "RSS Feed",
                    touch: false,
                  });
                `}"
              >
                <i class="fas fa-rss"></i>
              </a>
              <a
                href="mailto:LiLeLou@LiLeLou.com"
                data-ondomcontentloaded="${javascript`
                  tippy(this, {
                    content: "Email",
                    touch: false,
                  });
                `}"
              >
                <i class="fas fa-envelope"></i>
              </a>
            </nav>

            <p
              style="${css`
                font-weight: var(--font-weight--semibold);
                color: var(--color--amber--900);
                @media (prefers-color-scheme: dark) {
                  color: var(--color--amber--50);
                }
                text-align: center;
              `}"
            >
              A Li é a mãe, o Lê é o pai, e o filho é o Lou.<br />
              Nós falamos sobre coisas de bebê e outras coisas que não são de
              bebê.
            </p>
          </header>

          <main
            style="${css`
              display: flex;
              flex-direction: column;
              gap: var(--space--8);
            `}"
          >
            $${(() => {
              const episodePartial = (episode) => {
                const id = `${episode.date}--${episode.id}`;
                const uri =
                  episode.oiLiOiLe === undefined ? "LiLeLou" : "oi-li-oi-le";
                const audio = `https://archive.org/download/${uri}/${uri}--${id}.mp3`;
                return html`
                  <section
                    style="${css`
                      display: flex;
                      flex-direction: column;
                      gap: var(--space--2);
                    `}"
                  >
                    <div>
                      <h2
                        style="${css`
                          font-size: var(--font-size--base);
                          line-height: var(--line-height--base);
                          font-weight: var(--font-weight--semibold);
                          color: var(--color--amber--900);
                          @media (prefers-color-scheme: dark) {
                            color: var(--color--amber--50);
                          }
                        `}"
                      >
                        <a
                          id="${id}"
                          href="#${id}"
                          style="${css`
                            &:hover,
                            &:focus-within {
                              color: var(--color--amber--700);
                            }
                            &:active {
                              color: var(--color--amber--600);
                            }
                            @media (prefers-color-scheme: dark) {
                              &:hover,
                              &:focus-within {
                                color: var(--color--amber--200);
                              }
                              &:active {
                                color: var(--color--amber--300);
                              }
                            }
                          `}"
                          >${episode.title}</a
                        >
                      </h2>
                      <p
                        style="${css`
                          font-size: var(--font-size--xs);
                          line-height: var(--line-height--xs);
                          color: var(--color--amber--600);
                          @media (prefers-color-scheme: dark) {
                            color: var(--color--amber--300);
                          }
                        `}"
                      >
                        ${episode.date}
                      </p>
                    </div>
                    <div
                      style="${css`
                        display: flex;
                        gap: var(--space--2);
                        button,
                        a {
                          color: var(--color--amber--900);
                          background-color: var(--color--amber--100);
                          &:hover,
                          &:focus-within {
                            color: var(--color--amber--700);
                          }
                          &:active {
                            background-color: var(--color--amber--200);
                          }
                          @media (prefers-color-scheme: dark) {
                            color: var(--color--amber--100);
                            background-color: var(--color--amber--800);
                            &:hover,
                            &:focus-within {
                              color: var(--color--amber--300);
                            }
                            &:active {
                              background-color: var(--color--amber--700);
                            }
                          }
                          width: var(--space--6);
                          height: var(--space--6);
                          border-radius: var(--border-radius--circle);
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        }
                      `}"
                    >
                      <button
                        data-ondomcontentloaded="${javascript`
                          tippy(this, {
                            content: "Play",
                            touch: false,
                          });
                        `}"
                        onclick="${javascript`
                          const audio = this.closest("section").querySelector("audio");
                          if (audio.hidden) {
                            audio.hidden = false;
                            audio.play();
                          }
                          else {
                            audio.hidden = true;
                            audio.pause();
                          }
                        `}"
                      >
                        <i class="far fa-play-circle"></i>
                      </button>
                      <a
                        href="${audio}"
                        data-ondomcontentloaded="${javascript`
                          tippy(this, {
                            content: "Download",
                            touch: false,
                          });
                        `}"
                      >
                        <i class="fas fa-download"></i>
                      </a>
                    </div>
                    <audio
                      src="${audio}"
                      controls
                      preload="none"
                      hidden
                      style="${css`
                        width: 100%;
                        height: var(--space--10);
                        border-radius: var(--border-radius--lg);
                      `}"
                    ></audio>
                    <div>$${renderMarkdown(episode.description)}</div>
                    $${episode.notes === undefined
                      ? html``
                      : html`
                          <details>
                            <summary>Anotações do Episódio</summary>

                            $${renderMarkdown(episode.notes)}
                          </details>
                        `}
                  </section>
                `;
              };

              return html`
                $${episodes.oiLiOiLeOiLou.map((episode) =>
                  episodePartial(episode)
                )}
                <p
                  style="${css`
                    font-weight: var(--font-weight--semibold);
                    color: var(--color--amber--900);
                    @media (prefers-color-scheme: dark) {
                      color: var(--color--amber--50);
                    }
                    padding-top: var(--space--2);
                    border-top: var(--border-width--1) solid
                      var(--color--amber--200);
                    @media (prefers-color-scheme: dark) {
                      border-color: var(--color--amber--700);
                    }
                  `}"
                >
                  Episódios da época em que ainda éramos só Li & Lê!
                </p>
                $${episodes.oiLiOiLe.map((episode) =>
                  episodePartial({ ...episode, oiLiOiLe: true })
                )}
              `;
            })()}
          </main>
        </div>
      </body>
    </html>
  `)
);

function renderMarkdown(input) {
  return remark().use(remarkHTML).processSync(input).contents;
}
