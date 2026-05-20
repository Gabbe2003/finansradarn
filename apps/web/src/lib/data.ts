import { Article, Author, Category } from "./types";

export const categories: Category[] = [
  { id: "1", name: "Makroekonomi", slug: "makroekonomi", color: "#1D4ED8" },
  { id: "2", name: "Finansmarknader", slug: "finansmarknader", color: "#059669" },
  { id: "3", name: "Statistik", slug: "statistik", color: "#7C3AED" },
  { id: "4", name: "Penningpolitik", slug: "penningpolitik", color: "#DC2626" },
  { id: "5", name: "Arbetsmarknad", slug: "arbetsmarknad", color: "#D97706" },
  { id: "6", name: "Handel & Export", slug: "handel-export", color: "#0891B2" },
  { id: "7", name: "Bostadsmarknad", slug: "bostadsmarknad", color: "#DB2777" },
  { id: "8", name: "Konjunktur", slug: "konjunktur", color: "#4F46E5" },
];

export const authors: Author[] = [
  {
    id: "1",
    name: "Anna Lindqvist",
    slug: "anna-lindqvist",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Ekonomiredaktör",
    bio: "Anna leder FinansRadarns ekonomiredaktion och har över 15 års erfarenhet av att bevaka svensk makroekonomi, penningpolitik och Riksbankens beslut. Tidigare på SvD Näringsliv och Dagens Industri.",
  },
  {
    id: "2",
    name: "Erik Johansson",
    slug: "erik-johansson",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Statistikanalytiker",
    bio: "Erik gräver i SCB:s siffror och förklarar vad de betyder för din ekonomi. Civilekonom från Handelshögskolan med fokus på arbetsmarknads- och konsumentstatistik.",
  },
  {
    id: "3",
    name: "Maria Bergström",
    slug: "maria-bergstrom",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Makroekonom",
    bio: "Maria analyserar globala penningpolitiska trender och deras genomslag på den svenska ekonomin. Doktor i nationalekonomi från Stockholms universitet.",
  },
  {
    id: "4",
    name: "Karl Svensson",
    slug: "karl-svensson",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Finanskorrespondent",
    bio: "Karl bevakar Stockholmsbörsen, räntemarknaden och valutarörelser. Har tidigare jobbat som aktiestrateg på en av storbankerna.",
  },
  {
    id: "5",
    name: "Sofia Andersson",
    slug: "sofia-andersson",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Konjunkturanalytiker",
    bio: "Sofia följer konjunktursignaler, KI-barometern och företagens framtidstro. Bakgrund som ekonom på Konjunkturinstitutet.",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "riksbanken-hojer-rantan-overvantad-inflationsdata",
    title: "Riksbanken höjer räntan efter oväntad inflationsdata — KPIF når 4,1 procent",
    excerpt: "Riksbanken överraskar marknaden med en räntehöjning på 25 punkter efter att KPIF-inflationen steg till 4,1 procent i mars, långt över prognoserna.",
    content: `Riksbanken meddelade idag att styrräntan höjs med 25 baspunkter till 3,75 procent, ett beslut som kom som en överraskning för de flesta marknadsbedömare. Bakgrunden är den senaste inflationsstatistiken från SCB som visar att KPIF-inflationen steg till 4,1 procent i mars, betydligt över Riksbankens egen prognos på 3,4 procent.

"Vi ser att de underliggande inflationstrycken är mer ihållande än vi tidigare bedömt," sade riksbankschefen vid presskonferensen. "Tjänstepriserna fortsätter att stiga i en takt som inte är förenlig med vårt inflationsmål på 2 procent."

Kärninflationen, rensat för energi och livsmedel, låg på 3,8 procent — den högsta nivån sedan november 2024. Särskilt oroande är att tjänsteinflationen accelererat till 5,2 procent, drivet av stigande lönekostnader och en fortsatt stark arbetsmarknad.

Statistiken visar också att livsmedelspriserna steg med 6,3 procent på årsbasis, medan boendeposten ökade med 4,7 procent. De enda poster som bidrog negativt till inflationen var energi (-2,1 procent) och elektronik (-1,8 procent).

Kronan försvagades omedelbart efter beskedet och handlades kring 11,52 mot euron, från 11,45 innan beskedet. Riksbankens nya räntebana indikerar att ytterligare en höjning kan bli aktuell under andra halvåret om inflationen inte dämpas.

Konjunkturinstitutet reviderade under eftermiddagen sin BNP-prognos för 2026 nedåt, från 2,1 till 1,6 procent, med hänvisning till den stramare penningpolitiken och dess väntade effekter på hushållens konsumtion och bostadsmarknaden.

Handelsbanken och SEB meddelade att de höjer sina boräntor med omedelbar verkan. Den genomsnittliga tremånaders rörliga räntan beräknas nu landa på 4,95 procent, den högsta nivån sedan 2008.`,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2026-04-09T08:00:00Z",
    readTime: 6,
    featured: true,
    views: { today: 14320, twoDays: 28540, week: 52100 },
  },
  {
    id: "2",
    slug: "scb-arbetslosheten-sjunker-till-lagsta-nivan",
    title: "SCB: Arbetslösheten sjunker till 5,8 procent — lägsta nivån på tre år",
    excerpt: "Ny statistik från SCB visar att arbetslösheten fortsätter att minska. Antalet sysselsatta ökade med 67 000 personer jämfört med samma period förra året.",
    content: `Arbetslösheten i Sverige sjönk till 5,8 procent i mars 2026, enligt säsongsrensade data från Statistiska centralbyrån. Det är den lägsta nivån sedan mars 2023 och innebär en minskning med 0,4 procentenheter jämfört med föregående månad.

Antalet sysselsatta i åldern 15–74 år uppgick till 5,21 miljoner, en ökning med 67 000 personer jämfört med mars 2025. Sysselsättningsgraden steg till 69,4 procent, den högsta nivån sedan pandemin.

"Den svenska arbetsmarknaden visar en anmärkningsvärd motståndskraft trots den strama penningpolitiken," kommenterade Anna## Statistikanalytiker vid Konjunkturinstitutet. "Vi ser en bred sysselsättningsökning som spänner över flera sektorer."

Detaljerad statistik visar att de största ökningarna skedde inom:
- IT och teknisk konsultverksamhet: +18 000
- Hälso- och sjukvård: +14 000
- Bygg och anläggning: +12 000
- Utbildningssektorn: +9 000

Ungdomsarbetslösheten (15–24 år) minskade från 19,2 till 17,8 procent, den lägsta nivån på fem år. Bland utrikes födda sjönk arbetslösheten med 1,1 procentenheter till 14,3 procent.

Antalet lediga platser enligt Arbetsförmedlingen uppgick till 87 400, en ökning med 12 procent jämfört med samma period förra året. Störst efterfrågan finns inom teknik, vård och utbildning.

Riksbanken har tidigare flaggat för att en stark arbetsmarknad kan bidra till löneinflation. De senaste siffrorna från Medlingsinstitutet visar att lönerna steg med 4,2 procent i årstakt under första kvartalet, vilket överstiger det historiska genomsnittet på cirka 3 procent.`,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    category: categories[4],
    author: authors[1],
    publishedAt: "2026-04-09T06:30:00Z",
    readTime: 5,
    featured: true,
    views: { today: 8740, twoDays: 19200, week: 41300 },
  },
  {
    id: "3",
    slug: "stockholmsborsen-nar-rekordniva-techbolag-leder",
    title: "Stockholmsbörsen når rekordnivå — OMXS30 passerar 2 800 för första gången",
    excerpt: "Det breda indexet OMXS30 stängde på 2 812 efter en uppgång driven av starka kvartalsrapporter från svenska techbolag och förbättrad global riskaptit.",
    content: `Stockholmsbörsen nådde en ny all-time-high på onsdagen när OMXS30-indexet stängde på 2 812,4 punkter, en uppgång på 1,8 procent. Det breda OMXSPI steg med 1,5 procent till 987,3.

Uppgången drevs främst av starka kvartalsrapporter från flera stora svenska techbolag. Hexagon steg 7,2 procent efter att ha rapporterat en omsättningsökning på 14 procent och en rörelsemarginal som slog analytikernas förväntningar med bred marginal.

"Vi ser en tydlig omvärdering av svenska kvalitetsbolag," sade Martin Lööf, aktiestrateg på Carnegie. "Den globala rotationen tillbaka till tillväxtbolag gynnar Stockholmsbörsen som har en hög andel teknik och industri."

De mest omsatta aktierna under dagen var:
- Ericsson: +4,3% efter 5G-ordrar från Indien
- Atlas Copco: +3,1% på stark orderingång
- Evolution: +5,8% efter rekordresultat
- Volvo: +2,4% efter höjd utdelning

Utländska investerare var nettoköpare av svenska aktier för sjätte månaden i rad, med inflöden på 8,4 miljarder kronor under mars. Kronans försvagning mot dollarn har gjort svenska tillgångar relativt attraktiva för internationella placerare.

Obligationsmarknaden var mer avvaktande. Den svenska 10-åriga statsobligationsräntan steg med 4 baspunkter till 2,87 procent, medan spreadarna mot tyska bunds var i stort sett oförändrade.

Handelsvolymen på Nasdaq Stockholm uppgick till 42,3 miljarder kronor, den högsta noteringen sedan januari. Volatilitetsindexet VSTOXX föll 8 procent, vilket indikerar minskad osäkerhet bland investerare.`,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop",
    category: categories[1],
    author: authors[3],
    publishedAt: "2026-04-08T14:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 12100, twoDays: 24800, week: 67200 },
  },
  {
    id: "4",
    slug: "bnp-tillvaxten-overraskar-positivt-forsta-kvartalet",
    title: "BNP-tillväxten överraskar positivt — svensk ekonomi växte 0,8 procent under Q1",
    excerpt: "Preliminär BNP-statistik från SCB visar att den svenska ekonomin växte med 0,8 procent under första kvartalet 2026, klart över konsensus på 0,4 procent.",
    content: `Den svenska ekonomin växte med 0,8 procent under årets första kvartal jämfört med föregående kvartal, enligt preliminära beräkningar från Statistiska centralbyrån. På årsbasis motsvarar det en tillväxt på 2,3 procent, den starkaste siffran sedan tredje kvartalet 2022.

Resultatet överträffade konsensusförväntningarna på 0,4 procent och innebär att Sverige nu haft positiv BNP-tillväxt fem kvartal i rad efter recessionen under 2023.

"Det är en bred återhämtning vi ser," kommenterade Maria Bergström, chefekonom vid Nordea. "Både hushållskonsumtion och investeringar bidrar positivt, och exporten har gynnats av den svaga kronan."

De främsta bidragsgivarna till BNP-tillväxten var:
- Hushållskonsumtion: +0,4 procentenheter
- Fasta bruttoinvesteringar: +0,3 procentenheter
- Nettoexport: +0,2 procentenheter
- Lagerförändringar: -0,1 procentenheter

Tjänstesektorn visade särskild styrka med en tillväxt på 1,2 procent, medan industrisektorn ökade med 0,6 procent. Byggsektorn, som tyngde BNP under 2023 och 2024, visade för första gången positiv tillväxt med 0,3 procent.

Produktivitetstillväxten, mätt som BNP per arbetad timme, steg med 1,4 procent på årsbasis. Det är den starkaste produktivitetsutvecklingen på fyra år och kan delvis förklaras av ökade investeringar i AI och automation.

Konjunkturinstitutet uppgraderade omedelbart sin prognos för helåret från 1,8 till 2,2 procent. Riksbanken väntas ta hänsyn till den starka tillväxten i sitt penningpolitiska beslut i juni.`,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
    category: categories[0],
    author: authors[4],
    publishedAt: "2026-04-08T10:00:00Z",
    readTime: 6,
    featured: true,
    views: { today: 6200, twoDays: 15400, week: 38700 },
  },
  {
    id: "5",
    slug: "kronans-forsvagning-mot-euron-drivkrafter-analys",
    title: "Kronans försvagning: Vad driver EUR/SEK mot 11,50 och vad säger prognoserna?",
    excerpt: "Den svenska kronan har försvagats markant under våren. Vi analyserar de makroekonomiska faktorerna bakom rörelsen och samlar bankernas prognoser.",
    content: `Den svenska kronan har tappat drygt 4 procent mot euron sedan årsskiftet och handlas nu kring 11,50 — den svagaste nivån sedan oktober 2023. Utvecklingen har överraskat många analytiker som inledde året med att prognostisera en kronförstärkning.

Flera samverkande faktorer ligger bakom kronförsvagningen:

Ränteskillnaden mot ECB har minskat i takt med att Riksbanken signalerat en mer försiktig hållning till räntesänkningar. Medan ECB sänkt sin styrränta med totalt 75 baspunkter sedan december, har Riksbanken legat stilla sedan september.

"Räntedifferensen är viktig, men inte hela förklaringen," säger valutastrategen Johan Elm vid SEB. "Vi ser också strukturella kapitalflöden ut ur Sverige, dels genom svenska pensionsfonders ökade utlandsallokering, dels genom minskade portföljinflöden."

Statistik från Riksbanken visar att svenska institutionella investerare nettosålde svenska tillgångar för 23 miljarder kronor under första kvartalet, den största kapitalutflödet på två år.

Bankernas kronprognoser för årets slut varierar kraftigt:
- Nordea: EUR/SEK 11,00 (kronförstärkning)
- SEB: EUR/SEK 11,20 (måttlig förstärkning)
- Handelsbanken: EUR/SEK 11,40 (i stort sett oförändrat)
- Danske Bank: EUR/SEK 11,60 (ytterligare försvagning)

En svagare krona har dock positiva effekter för exportföretagen. SCB:s exportstatistik visar att varuexporten ökade med 8,7 procent i volym under första kvartalet, den starkaste ökningen på tre år.

Riksbankens valutareserv uppgår till 478 miljarder kronor, men centralbankens ledning har upprepade gånger sagt att man inte avser att intervenera på valutamarknaden så länge kronrörelsen är ordnad.`,
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&h=600&fit=crop",
    category: categories[3],
    author: authors[3],
    publishedAt: "2026-04-08T22:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 9850, twoDays: 21600, week: 44100 },
  },
  {
    id: "6",
    slug: "bostadspriserna-stiger-tredje-manaden-i-rad",
    title: "Bostadspriserna stiger tredje månaden i rad — Stockholm leder uppgången",
    excerpt: "HOX-indexet visar att bostadspriserna steg med 1,3 procent i mars. Stockholmsregionen sticker ut med en uppgång på 2,1 procent för bostadsrätter.",
    content: `Bostadspriserna i Sverige fortsatte att stiga under mars, enligt den senaste mätningen från Valueguard. HOX-prisindexet för bostadsrätter ökade med 1,3 procent jämfört med februari, och villapriserna steg med 0,8 procent.

Det är den tredje månaden i rad med stigande priser, och på årsbasis har bostadsrätter nu ökat med 4,7 procent medan villor är upp 3,2 procent. Priserna ligger dock fortfarande cirka 12 procent under toppen från mars 2022.

Stockholmsregionen visade starkast utveckling med en prisökning på 2,1 procent för bostadsrätter. Göteborg ökade med 1,0 procent och Malmö med 0,7 procent.

"Vi ser tydliga tecken på att bottennoteringen är passerad," säger Claudia Wörmann, bostadsekonom vid SBAB. "Hushållens köpkraft har förbättrats i takt med att reallönerna stiger, och utbudet av bostäder till salu har minskat."

Statistik från Svensk Mäklarstatistik visar att:
- Medelpriset för en bostadsrätt i Stockholm nu är 62 400 kr/kvm
- Snittetiden till försäljning minskade till 28 dagar (från 42 dagar i december)
- Andelen budgivningar ökade från 31% till 47%

SCB:s byggstatistik visar dock att bostadsbyggandet fortsätter att vara svagt. Antalet påbörjade bostäder under rullande tolvmånadersperioden uppgick till 24 800, långt under det bedömda behovet på 60 000–70 000 per år.

Riksbankens räntehöjning idag skapar dock osäkerhet kring den fortsatta prisutvecklingen. Högre bolåneräntor minskar hushållens utrymme och kan bromsa uppgången under kommande kvartal.`,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    category: categories[6],
    author: authors[0],
    publishedAt: "2026-04-07T16:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 7300, twoDays: 18900, week: 55800 },
  },
  {
    id: "7",
    slug: "handelsbalansen-forbattras-rekordexport-till-usa",
    title: "Handelsbalansen förbättras kraftigt — rekordexport till USA på 28 miljarder",
    excerpt: "Sveriges varuexport till USA nådde rekordhöga 28,3 miljarder kronor i mars, drivet av stark efterfrågan på fordon, läkemedel och industrimaskiner.",
    content: `Sveriges handelsbalans visade ett överskott på 14,2 miljarder kronor i mars 2026, enligt preliminär statistik från SCB. Det är det största månadsöverskottet på över två år och en markant förbättring från underskottet på 2,1 miljarder i mars 2025.

Den totala varuexporten uppgick till 178,4 miljarder kronor, en ökning med 11,3 procent i löpande priser jämfört med samma månad förra året. I volymtermer var ökningen 8,7 procent.

USA har seglat upp som Sveriges tredje största exportmarknad efter Norge och Tyskland. Exporten till USA nådde rekordhöga 28,3 miljarder kronor i mars, en ökning med 34 procent.

"Den svaga kronan är naturligtvis en viktig förklaring, men vi ser också genuint ökad efterfrågan på svenska varor," kommenterar handelsminister Anna Hallberg. "Särskilt inom grön teknik och avancerad industri har Sverige stärkt sin position."

De största exportvarorna var:
- Fordon och fordonsdelar: 31,2 mdr kr (+15%)
- Läkemedel: 22,7 mdr kr (+28%)
- Maskiner och apparater: 19,8 mdr kr (+9%)
- Papper och massa: 14,3 mdr kr (+6%)
- Järn och stål: 11,9 mdr kr (+12%)

Importen uppgick till 164,2 miljarder kronor, en ökning med 4,8 procent. Energiimporten minskade dock med 18 procent tack vare lägre internationella energipriser och ökad inhemsk elproduktion.

Tjänstehandeln visade ett överskott på 8,7 miljarder kronor, drivet av starka IT-konsultexporter och licensintäkter från svenska spelbolag.`,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=600&fit=crop",
    category: categories[5],
    author: authors[2],
    publishedAt: "2026-04-07T09:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 4100, twoDays: 12300, week: 31500 },
  },
  {
    id: "8",
    slug: "ki-barometern-foretagens-framtidstro-okar",
    title: "KI-barometern: Företagens framtidstro ökar kraftigt — starkaste signalen sedan 2021",
    excerpt: "Konjunkturinstitutets senaste barometerindikator steg till 108,3 i april, den högsta noteringen på fem år. Tillverkningsindustrin leder optimismen.",
    content: `Konjunkturinstitutets barometerindikator steg till 108,3 i april, upp från 103,7 i mars. Det är den högsta noteringen sedan juni 2021 och överstiger det historiska genomsnittet på 100 med god marginal.

Indikatorn, som baseras på enkätundersökningar av drygt 6 000 svenska företag och 1 500 hushåll, visar att konjunkturläget nu är starkare än normalt i samtliga huvudsektorer.

"Det är en bred och tydlig förbättring vi ser," sade KI:s prognoschef vid presentationen. "Både orderingång, produktionsplaner och anställningsplaner pekar uppåt."

Sektorernas konfidensindikatorer:
- Tillverkningsindustrin: 114,2 (mycket stark)
- Tjänstesektorn: 109,8 (stark)
- Byggsektorn: 98,4 (nära normalt)
- Detaljhandeln: 103,1 (något över normalt)
- Hushåll: 96,7 (något under normalt)

Anmärkningsvärt är att hushållens konfidensindikator fortsätter att ligga under genomsnittet, trots den starka arbetsmarknaden. Det speglar troligen oron kring höga boräntor och stigande livsmedelspriser.

Orderingången för exportindustrin visar den starkaste nettotalet sedan 2018, med 42 procent av företagen som rapporterar ökade ordrar mot 11 procent som rapporterar minskade.

Kapacitetsutnyttjandet i industrin steg till 88,4 procent, den högsta nivån sedan 2022. Andelen företag som uppger arbetskraftsbrist som det främsta hindret ökade från 24 till 29 procent.

Historiskt har barometern vid nivåer över 105 signalerat en BNP-tillväxt på 2,5–3,0 procent, vilket skulle innebära att den faktiska tillväxten kan bli ännu starkare än de senaste reviderade prognoserna.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    category: categories[7],
    author: authors[4],
    publishedAt: "2026-04-07T12:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 5600, twoDays: 14200, week: 35900 },
  },
  {
    id: "9",
    slug: "scb-inflationsrapport-detaljerad-analys-mars",
    title: "SCB:s inflationsrapport i detalj: Vilka varugrupper driver prisökningarna?",
    excerpt: "En djupdykning i SCB:s senaste KPI-statistik avslöjar att tjänstepriser och livsmedel är de främsta drivkrafterna bakom den ihållande inflationen.",
    content: `SCB:s senaste inflationsstatistik visar att KPI-inflationen uppgick till 4,8 procent i mars 2026, medan det penningpolitiska måttet KPIF (KPI med fast ränta) landade på 4,1 procent. Vi gör en detaljerad genomgång av de viktigaste prisrörelserna.

Tjänstepriserna stod för det största bidraget till KPIF-inflationen med 2,1 procentenheter av den totala ökningen på 4,1 procent. Inom tjänstesektorn var de största ökningarna:

- Restaurang och logi: +7,8% (årstakt)
- Transporttjänster: +6,2%
- Hushållstjänster: +5,9%
- Försäkringstjänster: +5,4%

Livsmedels- och dryckesgruppen bidrog med 0,9 procentenheter. Trots att takten har avtagit något sedan toppen under 2023, ligger prisökningstakten fortfarande på 6,3 procent.

Statistisk analys visar att mediankonsumenten — baserat på SCB:s hushållsbudgetundersökning — upplever en effektiv inflation som är högre än det officiella KPI-måttet. Det beror på att låg- och medelinkomsthushåll spenderar en proportionellt större andel av sin budget på livsmedel och boende.

Ginikoefficienten för inflationsupplevelsen, ett mått som vi beräknat baserat på SCB:s mikrodata, uppgår till 0,14 — vilket indikerar en betydande spridning i hur inflationen påverkar olika hushållsgrupper.

Säsongsrensade månadstal visar dock en viss avmattning i kärninflationen. Den annualiserade tremånaders KPIF-takten sjönk från 4,8 till 4,3 procent, vilket kan vara en tidig signal om att pristrycket är på väg att kulminera.

Riksbankens egen modell för underliggande inflation, TRIM85, visade 3,9 procent — det lägsta värdet sedan september 2025.`,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=600&fit=crop",
    category: categories[2],
    author: authors[1],
    publishedAt: "2026-04-06T15:00:00Z",
    readTime: 7,
    featured: false,
    views: { today: 11200, twoDays: 22100, week: 48300 },
  },
  {
    id: "10",
    slug: "svenska-hushallens-sparande-minskar-rekordlagt",
    title: "Svenska hushållens sparkvot faller till 8,2 procent — lägsta nivån sedan 2019",
    excerpt: "SCB:s finansräkenskaper visar att hushållens sparkvot sjunkit markant. Ökade räntekostnader och stigande priser äter upp utrymmet för sparande.",
    content: `Svenska hushållens sparkvot sjönk till 8,2 procent av disponibel inkomst under fjärde kvartalet 2025, enligt SCB:s senaste finansräkenskaper. Det är den lägsta nivån sedan tredje kvartalet 2019 och en betydande minskning från toppen på 19,8 procent under pandemin.

Utvecklingen speglar en situation där hushållens utgifter ökar snabbare än inkomsterna, trots stigande sysselsättning och nominella löneökningar. Framförallt är det räntekostnaderna som tynger — hushållens totala räntebetalningar uppgick till 182 miljarder kronor under 2025, mer än dubbelt så mycket som 2021.

"Vi ser en gradvis normalisering av sparkvoten efter de extremt höga pandemivåerna," säger Jens Magnusson, privatekonom vid SEB. "Men den snabba nedgången det senaste året oroar. Många hushåll har begränsat utrymme för oväntade utgifter."

Statistiken visar att:
- Genomsnittshushållets totala skuld uppgår till 2,14 miljoner kronor
- Skuldkvoten (skulder som andel av disponibel inkomst) ligger på 188%
- 23% av bolånetagarna har en belåningsgrad över 70%

Det finansiella sparandet (nettot av tillgångar och skulder) var negativt för första gången sedan 2017, med -12,4 miljarder kronor under kvartalet.

Regressionsanalys baserad på historiska data visar att varje procentenhets räntehöjning minskar sparkvoten med ungefär 0,7 procentenheter med en fördröjning på två till tre kvartal.

Riksgälden noterade samtidigt att hushållens innehav av statsobligationer har minskat med 34 procent sedan 2024, vilket tyder på att hushåll realiserar sparkapital för att finansiera löpande utgifter.`,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
    category: categories[0],
    author: authors[0],
    publishedAt: "2026-04-06T11:00:00Z",
    readTime: 6,
    featured: false,
    views: { today: 3800, twoDays: 9600, week: 29400 },
  },
  {
    id: "11",
    slug: "lonestatistik-loneokningarna-accelererar",
    title: "Medlingsinstitutets lönestatistik: Löneökningarna accelererar till 4,2 procent",
    excerpt: "De genomsnittliga löneökningarna i Sverige steg till 4,2 procent i årstakt under första kvartalet — den snabbaste takten sedan 2008.",
    content: `Medlingsinstitutets senaste lönestatistik visar att de genomsnittliga lönerna i Sverige ökade med 4,2 procent i årstakt under första kvartalet 2026. Det är den snabbaste löneökningstakten sedan finanskrisåret 2008 och överstiger det avtalade löneutrymmet med bred marginal.

Centralt avtalade löneökningar uppgick till 3,3 procent, medan löneglidningen — det vill säga löneökningar utöver de centrala avtalen — bidrog med ytterligare 0,9 procentenheter.

De sektorer som uppvisade starkast löneutveckling var:
- IT och telekommunikation: +5,8%
- Finans och försäkring: +5,1%
- Hälso- och sjukvård: +4,6%
- Tillverkningsindustri: +4,0%
- Handel: +3,4%
- Hotell och restaurang: +3,1%

"Löneökningstakten är oförenlig med Riksbankens inflationsmål på sikt," varnar Erik Johansson, arbetsmarknadsekonom vid Svenskt Näringsliv. "Med en produktivitetstillväxt på runt 1,5 procent borde löneökningarna ligga kring 3,5 procent för att vara förenliga med 2-procentsmålet."

Reallöneökningen — löneökningar justerat för inflation — var dock negativ för fjärde kvartalet i rad, med -0,6 procent. Det innebär att köpkraften fortsätter att urholkas trots de nominellt höga löneökningarna.

Statistisk analys av lönefördelningen visar att medianlönen ökade med 3,8 procent, medan den övre kvartilen ökade med 5,4 procent. Lönespridningen, mätt med P90/P10-kvoten, ökade marginellt från 2,31 till 2,34.

Arbetsgivarorganisationerna har flaggat för att de höga löneökningarna kan leda till minskad sysselsättning i utsatta branscher, särskilt inom hotell, restaurang och detaljhandel.`,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop",
    category: categories[4],
    author: authors[1],
    publishedAt: "2026-04-06T08:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 5200, twoDays: 13700, week: 36800 },
  },
  {
    id: "12",
    slug: "detaljhandeln-okar-konsumtionsmonster-forandras",
    title: "Detaljhandeln ökar 3,4 procent — men konsumtionsmönstren förändras dramatiskt",
    excerpt: "HUI:s senaste handelsstatistik visar tillväxt i detaljhandeln, men med stora strukturella förskjutningar mot e-handel och lågprissegmentet.",
    content: `Detaljhandelns försäljning ökade med 3,4 procent i mars 2026 jämfört med samma månad förra året, enligt statistik från Handeln (HUI Research). I fasta priser (volym) var ökningen dock mer blygsam, 1,2 procent.

Den mest slående trenden är den fortsatta strukturomvandlingen i konsumtionsmönstren. E-handeln växte med 14 procent och står nu för 18,3 procent av den totala detaljhandelsförsäljningen, jämfört med 15,7 procent för ett år sedan.

"Vi ser en tydlig polarisering i konsumtionen," säger Jonas Arnberg, vd för HUI Research. "Lågprissegmentet och premiumsegmentet växer, medan mellansegmentet pressas."

Branschvis utveckling:
- Dagligvaror: +4,8% (varav volym +0,3%)
- Sällanköpsvaror: +2,1% (varav volym +1,8%)
- E-handel totalt: +14,2%
- Fysisk handel: +0,8%

Statistiken avslöjar också intressanta regionala skillnader. Storstadsregionerna visar starkare tillväxt (+4,1%) jämfört med övriga kommuner (+2,3%), en trend som kan kopplas till den starkare arbetsmarknaden och demografiska förändringar.

Konsumentförtroendet, mätt genom KI:s hushållsindikator, visar att 43 procent av hushållen planerar att minska sina utgifter de kommande 12 månaderna, medan 18 procent planerar att öka dem. Nettotalet på -25 är det svagaste sedan maj 2025.

Korrelationsanalys visar ett starkt samband (r = 0,82) mellan detaljhandelns tillväxt och reallöneutvecklingen med en fördröjning på ett kvartal, vilket antyder att den svaga reallöneutvecklingen kan komma att dämpa handelstillväxten under sommaren.`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    category: categories[7],
    author: authors[0],
    publishedAt: "2026-04-05T14:00:00Z",
    readTime: 5,
    featured: false,
    views: { today: 2900, twoDays: 8400, week: 22600 },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return articles.filter((a) => a.author.id === authorId);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.name.toLowerCase().includes(q)
  );
}

export type TimePeriod = "today" | "twoDays" | "week";

export function getPopularArticles(period: TimePeriod, limit = 10): Article[] {
  return [...articles]
    .sort((a, b) => b.views[period] - a.views[period])
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`;
  return String(n);
}
