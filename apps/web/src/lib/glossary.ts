export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Amortering", slug: "amortering", definition: "Regelbunden avbetalning av ett lån. I Sverige finns amorteringskrav som innebär att bolånetagare måste amortera minst 1-2% av lånebeloppet per år beroende på belåningsgrad och skuldkvot.", category: "Lån & Boende" },
  { term: "Avkastning", slug: "avkastning", definition: "Den vinst eller förlust som en investering genererar under en viss period, uttryckt i kronor eller procent. Totalavkastning inkluderar både kursförändring och utdelningar.", category: "Investeringar" },
  { term: "Basränta", slug: "basranta", definition: "Den ränta som Riksbanken sätter som grund för det svenska räntesystemet. Kallas även styrränta eller reporänta. Påverkar direkt bolåneräntor och sparräntor.", category: "Penningpolitik" },
  { term: "Belåningsgrad", slug: "belaningsgrad", definition: "Kvoten mellan lånebeloppet och bostadens marknadsvärde, uttryckt i procent. En bostad värd 3 miljoner med ett lån på 2,25 miljoner har en belåningsgrad på 75%.", category: "Lån & Boende" },
  { term: "BNP", slug: "bnp", definition: "Bruttonationalprodukt — det totala värdet av alla varor och tjänster som produceras i ett land under en viss period. Sveriges BNP uppgår till cirka 6 000 miljarder kronor. Används som huvudmått på ekonomisk tillväxt.", category: "Makroekonomi" },
  { term: "Börsvärde", slug: "borsvarde", definition: "Det totala marknadsvärdet av ett börsnoterat företags utestående aktier. Beräknas som aktiekurs multiplicerat med antalet aktier.", category: "Investeringar" },
  { term: "CAGR", slug: "cagr", definition: "Compound Annual Growth Rate — genomsnittlig årlig tillväxttakt. Visar den jämna årliga avkastningen som krävs för att en investering ska växa från sitt startvärde till sitt slutvärde.", category: "Investeringar" },
  { term: "Deflation", slug: "deflation", definition: "En generell och ihållande nedgång i prisnivån. Motsatsen till inflation. Kan leda till att konsumenter skjuter upp köp i väntan på lägre priser, vilket bromsar ekonomin.", category: "Makroekonomi" },
  { term: "Direktavkastning", slug: "direktavkastning", definition: "Utdelningen per aktie dividerat med aktiekursen, uttryckt i procent. En aktie som kostar 100 kr och ger 4 kr i utdelning har 4% direktavkastning.", category: "Investeringar" },
  { term: "Disponibel inkomst", slug: "disponibel-inkomst", definition: "Den inkomst som hushållet har kvar efter skatt och obligatoriska avgifter. Används för att mäta hushållens faktiska köpkraft.", category: "Makroekonomi" },
  { term: "ECB", slug: "ecb", definition: "Europeiska centralbanken — ansvarar för penningpolitiken i euroområdet. Sätter styrräntan för de 20 länder som använder euro som valuta.", category: "Penningpolitik" },
  { term: "Effektiv ränta", slug: "effektiv-ranta", definition: "Den totala kostnaden för ett lån uttryckt som en årlig ränta, inklusive nominell ränta, avgifter och uppläggningskostnader. Gör det möjligt att jämföra lån från olika banker.", category: "Lån & Boende" },
  { term: "FIRE", slug: "fire", definition: "Financial Independence, Retire Early — en rörelse som syftar till att spara och investera aggressivt för att uppnå ekonomisk frihet och kunna sluta arbeta tidigt. FIRE-talet beräknas vanligen som 25 gånger årliga utgifter.", category: "Privatekonomi" },
  { term: "Fondavgift", slug: "fondavgift", definition: "Den årliga avgift som fondbolaget tar ut för att förvalta fonden. Uttrycks som en procentsats av fondförmögenheten. Indexfonder har typiskt 0,1-0,4%, medan aktiva fonder kan ta 1-2%.", category: "Investeringar" },
  { term: "Ginikoefficient", slug: "ginikoefficient", definition: "Ett mått på inkomstfördelningens ojämnhet i ett samhälle. Värdet varierar mellan 0 (perfekt jämlikhet) och 1 (maximal ojämlikhet). Sverige har historiskt legat kring 0,28.", category: "Statistik" },
  { term: "Handelsbalans", slug: "handelsbalans", definition: "Skillnaden mellan ett lands export och import av varor och tjänster. Ett positivt värde (överskott) innebär att exporten överstiger importen.", category: "Makroekonomi" },
  { term: "Inflation", slug: "inflation", definition: "En generell och ihållande ökning av prisnivån i ekonomin. Mäts i Sverige främst genom KPI och KPIF. Riksbankens mål är 2% inflation per år.", category: "Makroekonomi" },
  { term: "ISK", slug: "isk", definition: "Investeringssparkonto — en kontoform där man betalar en schablonskatt baserad på kontots värde istället för skatt på varje enskild vinst. Skatten beräknas som (statslåneränta + 1%) × 30%.", category: "Privatekonomi" },
  { term: "Konjunktur", slug: "konjunktur", definition: "Det ekonomiska läget i ett land, ofta beskrivet som ett cykliskt mönster av uppgång (högkonjunktur) och nedgång (lågkonjunktur). Konjunkturinstitutet mäter detta med barometerindikatorn.", category: "Makroekonomi" },
  { term: "KPI", slug: "kpi", definition: "Konsumentprisindex — ett mått på den genomsnittliga prisutvecklingen för varor och tjänster som hushållen konsumerar. Beräknas månadsvis av SCB.", category: "Statistik" },
  { term: "KPIF", slug: "kpif", definition: "KPI med fast ränta — inflationsmåttet som Riksbanken främst använder för penningpolitiken. Rensar bort effekten av ändrade räntor på boendekostnader.", category: "Statistik" },
  { term: "Likviditet", slug: "likviditet", definition: "Hur enkelt en tillgång kan omvandlas till kontanter utan att förlora i värde. Aktier i stora bolag har hög likviditet, medan fastigheter har låg likviditet.", category: "Investeringar" },
  { term: "Marginalskatt", slug: "marginalskatt", definition: "Den skattesats som betalas på den sist intjänade kronan. I Sverige börjar statlig inkomstskatt (20%) vid inkomster över den övre skiktgränsen (ca 613 000 kr/år 2026).", category: "Privatekonomi" },
  { term: "OMXS30", slug: "omxs30", definition: "Stockholmsbörsens 30 mest omsatta aktier, samlade i ett index. Används som huvudmått på den svenska börsens utveckling. Inkluderar bolag som Ericsson, Volvo, H&M och Atlas Copco.", category: "Investeringar" },
  { term: "P/E-tal", slug: "pe-tal", definition: "Price/Earnings — aktiekursen dividerat med vinsten per aktie. Ett P/E på 15 innebär att man betalar 15 kronor för varje krona i vinst. Används för att bedöma om en aktie är dyr eller billig.", category: "Investeringar" },
  { term: "Ränta-på-ränta", slug: "ranta-pa-ranta", definition: "Effekten av att avkastningen återinvesteras och i sin tur genererar ytterligare avkastning. Albert Einstein ska ha kallat det 'världens åttonde underverk'. Över lång tid ger det exponentiell tillväxt.", category: "Privatekonomi" },
  { term: "Reallön", slug: "reallon", definition: "Löneökningen justerad för inflationen. Om lönerna ökar med 4% och inflationen är 4,5% faller reallönen med 0,5%, vilket innebär minskad köpkraft trots högre nominell lön.", category: "Arbetsmarknad" },
  { term: "Recession", slug: "recession", definition: "En ekonomisk nedgång definierad som minst två kvartal i rad med negativ BNP-tillväxt. Kännetecknas ofta av stigande arbetslöshet, minskad konsumtion och fallande tillgångspriser.", category: "Makroekonomi" },
  { term: "Riksbanken", slug: "riksbanken", definition: "Sveriges centralbank, grundad 1668 och världens äldsta centralbank. Ansvarar för penningpolitiken med målet att upprätthålla prisstabilitet (2% inflation) och ett säkert betalningsväsende.", category: "Penningpolitik" },
  { term: "ROI", slug: "roi", definition: "Return on Investment — avkastning på investerat kapital. Beräknas som (vinst - investering) / investering × 100%. En investering på 100 000 kr som ger 120 000 kr tillbaka har en ROI på 20%.", category: "Investeringar" },
  { term: "SCB", slug: "scb", definition: "Statistiska centralbyrån — Sveriges officiella statistikmyndighet. Producerar och publicerar statistik om bland annat befolkning, arbetsmarknad, priser, BNP och handel.", category: "Statistik" },
  { term: "Schablonsskatt", slug: "schablonsskatt", definition: "En förenklad skatteberäkning baserad på ett antaget (schablonmässigt) värde istället för faktisk vinst. Används bland annat för ISK och kapitalförsäkring.", category: "Privatekonomi" },
  { term: "Skuldkvot", slug: "skuldkvot", definition: "Hushållets totala skulder som andel av disponibel inkomst. Sveriges genomsnittliga skuldkvot ligger kring 188%, en av de högsta i Europa.", category: "Lån & Boende" },
  { term: "Sparkvot", slug: "sparkvot", definition: "Andelen av disponibel inkomst som sparas istället för att konsumeras. En sparkvot på 10% innebär att hushållet sparar 10 kronor av varje 100 kronor efter skatt.", category: "Privatekonomi" },
  { term: "Spread", slug: "spread", definition: "Skillnaden mellan köp- och säljkurs för ett värdepapper, eller skillnaden i ränta mellan två obligationer. En liten spread indikerar hög likviditet.", category: "Investeringar" },
  { term: "Stagflation", slug: "stagflation", definition: "En ovanlig ekonomisk situation med samtidigt hög inflation och låg eller negativ ekonomisk tillväxt. Svår att hantera med traditionell penningpolitik.", category: "Makroekonomi" },
  { term: "Statslåneränta", slug: "statslaneranta", definition: "Räntan på svenska statsobligationer med lång löptid. Fastställs av Riksgälden varje torsdag. Används som beräkningsgrund för bland annat ISK-skatt och förmånsvärden.", category: "Penningpolitik" },
  { term: "Styrränta", slug: "styrranta", definition: "Den ränta som Riksbanken sätter för att styra penningpolitiken. Påverkar alla andra räntor i ekonomin — bolåneräntor, sparräntor och marknadsräntor.", category: "Penningpolitik" },
  { term: "Sysselsättningsgrad", slug: "sysselsattningsgrad", definition: "Andelen av befolkningen i arbetsför ålder (15-74 år) som är sysselsatta. Inkluderar både anställda och egenföretagare. Sverige ligger kring 69%.", category: "Arbetsmarknad" },
  { term: "Totalavkastning", slug: "totalavkastning", definition: "Den sammanlagda avkastningen från en investering inklusive kursförändring, utdelningar och ränta. Ger en mer rättvisande bild än enbart kursutvecklingen.", category: "Investeringar" },
  { term: "Utdelning", slug: "utdelning", definition: "Den del av ett företags vinst som delas ut till aktieägarna, vanligen en gång per år. Beslutas på bolagsstämman. Många svenska storbolag delar ut 40-60% av vinsten.", category: "Investeringar" },
  { term: "Valutakurs", slug: "valutakurs", definition: "Priset på en valuta uttryckt i en annan valuta. EUR/SEK 11,50 innebär att 1 euro kostar 11,50 kronor. Påverkas av räntor, handelsbalans och kapitalflöden.", category: "Makroekonomi" },
  { term: "Volatilitet", slug: "volatilitet", definition: "Ett mått på hur mycket priset på ett värdepapper varierar över tid. Hög volatilitet innebär stora prissvängningar och högre risk, men också möjlighet till högre avkastning.", category: "Investeringar" },
  { term: "Yield", slug: "yield", definition: "Avkastning uttryckt i procent av investerat belopp. Används ofta för obligationer (obligationsyield) och fastigheter (driftnetto/pris). Kallas även direktavkastning för aktier.", category: "Investeringar" },
  { term: "Överkurs", slug: "overkurs", definition: "När en obligation eller fond handlas till ett pris som överstiger det nominella värdet. Motsatsen är underkurs. Förekommer när marknadsräntan är lägre än kupongräntan.", category: "Investeringar" },
];

export const glossaryCategories = [...new Set(glossaryTerms.map((t) => t.category))].sort();

export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of glossaryTerms) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }
  return grouped;
}
