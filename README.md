
SZEGEDI TUDOMÁNYEGYETEM
Természettudományi és Informatikai Kar















SZAKDOLGOZAT













Kardos Bálint

2023




SZEGEDI TUDOMÁNYEGYETEM
Természettudományi és Informatikai Kar
Számítógépes Algoritmusok és Mesterséges Intelligencia Tanszék







String matching algoritmusok







Szakdolgozat










Készítette:


Témavezető:




Kardos Bálint


Csirik János




programtervező informatikus 


egyetemi docens








Szeged
2023









Feladatkiírás

A témavezető által megfogalmazott feladatkiírás. Önálló oldalon szerepel. 



Tartalmi összefoglaló

A téma megnevezése:
String matching algoritmusok.

A megadott feladat megfogalmazása:
A szakdolgozat központi célja a String matching algoritmusok bemutatása és megértése. A dolgozatban azokat a fontosabb és nevesebb algoritmusokat járjuk körül amelyek segítségével szövegben lehet mintázatokat keresni és azonosítani. Ezek algoritmusok működésének részletes körüljárása és  alkalmazási területen mint például szövegben vagy bioinformatikában való kiemelkedő fontossága.

A megoldási mód:
Bemutatom a String Matching algoritmusokat egy weboldalon. Ahol kiválaszthatja az adott szöveghez a leggyorsabb és leghatékonyabb algoritmust minta illesztéshez. Ami mutatja melyik algoritmus milyen gyorsan találta meg az adott mintát.

Alkalmazott eszközök, módszerek:




Elért eredmények:




Kulcsszavak:
Naiv algoritmus, Boyer.Moore algoritmus, Knuth-Morris-Pratt algoritmus, Shift-or algoritmus, suffix fa 





Tartalomjegyzék
Feladatkiírás	2
Tartalmi összefoglaló	3
Tartalomjegyzék	4
1. BEVEZETÉS	5
1.1 Pontos illesztés: mi is a probléma?	5
1.2 Fontossága a pontos illesztésnek	6
1.3 Naiv algoritmus	6
1.4 Naiv algoritmus felgyorsítása 	6
1.5 Előfeldolgozási megközelítés	7
1.6 Not So Naive algoritmus	7
2. KLASSZIKUS ÖSSZEHASONLÍTÁSON ALAPULÓ MÓDSZEREK
2.1 Bevezető
2.2 Boyer-Moore algoritmus 
2.3 Quick Search
2.4 Knuth-Morris-Pratt algoritmus
2.5 Apostolico-Giancarlo algoritmus
2.5 Apostolico-Giancarlo algoritmus
2. 6 Aho-Corasick algoritmus
3. SEMINUMERICAL STRING MATCHING
3.1 Bevezető
3.2 Shift-or method
3.3 Karp and Rabin
4.  SUFFIX FA ÉS HASZNÁLATA
4.1 Bevezető
4.2 Suffix fa
5.ALGORITMUSOK DNS SZEKVENÁLÁSHOZ
5.1 Bevezető
5.2 DNS
5.3 Kihívások DNA String Matching során 
5.4 String manipulálása
Nyilatkozat	8
Köszönetnyilvánítás	9









1. BEVEZETÉS
A stringek az információ tárolásának és feldolgozásának egyik legegyszerűbb, és az egyik legolcsóbb módja, ezért a mai napig nagyon elterjed tárolási módszer. A string egy karakter sorozat lánc. A string algoritmusok pedig olyan algoritmusok, amik stringek kezelésére terveztek.
A string algoritmusok a mai napig fontos szerepet játszanak a mindennapi életbe pont azért mert hatékonyak és gyorsak. Webes keresés esetén,  gépi tanulás során, szöveg feldolgozása közbe, antivirusoknál vagy éppen DNS-szekvenálás, és még sok más helyen találkozhatunk string algoritmusokkal.
A szakdolgozat célja, hogy bemutassa a string algoritmusokon belül a dolgozat legnagyobb hangsúlyt a string illesztő eljárásokra fektet hangsúlyt. Ezeket foglalja össze és mutatja be.
1.1 Pontos illesztés: mi is a probléma?
A mintaillesztés lényege az, hogy egy adott szövegben vagy sorozatban megkeressük egy másik, általában rövidebb szövegminta előfordulásait. Ezt a folyamatot gyakran stringkeresésnek is nevezik. Az ilyen típusú keresést általában arra használjuk, hogy megtaláljuk egy adott minta pontos helyét vagy az összes előfordulását egy hosszabb szövegben vagy sorozatban. 
Fontos bevezetni alapfogalmakat. A dolgozatba a keresetet mintára P-vel, a szövegre amiben keresünk meg T-vel fogok hivatkozni. P hosszára n-el, és T hosszára pedig m-el.
A minta előfordulásának fogalma, több szóhasználatott is megemlítve. Ha k egy szám 0 és n-m közötti. Akkor azt mondjuk, hogy P minta illeszkedik a k+1-dik pozíción illeszkedik a T szövegre, vagy a P minta k eltolással illeszkedik T-re, illetve k érvényes eltolás, ha T[k+1…k+m]=M[1…m].
Legyen például a P=aba és T=bbabaxababay akor P megtalálható a T-ben a 3.,7. és 9. poziciókba. P két előfordulása átfedésbe egymást, mint itt a 7 és 9 helyen, itt k= 6 és 8 Itt m=3 és n=12.
1.2 Fontossága a pontos illesztésnek
A pontos illesztés problémája mindenkinek alapvetőnek kéne lennie aki használt valaha számítógépet. A probléma nagyon változatos alkalmazásokban merül fel, amelyek túl sokak ahhoz, hogy teljesen felsoroljuk. Néhány gyakori felhasználása a szövegfeldolgozás, könyvtárak kereső programjai, internetes keresőprogramok, egy szimpla oldalon való keresés ctrl+F. A molekuláris biológiában több száz speciális adatbázis található nyers DNS, RNS és aminosav karakterláncok, vagy a nyers karakterláncból származó feldolgozott minták. Bár a tipikus szöveg feldolgozásba mára feltehetően elég kevés probléma maradt. A exact matching meg van oldva  ezek részére. De a történet változik más felhasználásnál. Az algoritmusok működésének megértése kulcs ahhoz, hogy a feladatot hatékonyan oldjuk meg.
1.3 Naiv algoritmus
Általában az exact matching problémát a naiv metódussal szoktuk kezdeni ezért én is így teszek. Mivel egy nagyon szimpla és buta algoritmusról van szó, ezért egyszerű-mintaillesztés vagy brute force-nak is szokták hívni. A algoritmus a szöveg 0 és n-m közötti minden pontján ellenőrzi, hogy a minta előfordulása ott kezdődik-e. Ha nem akkor egyetet lép előre a szövegbe és újra próbálkozik. Ha igen akkor a szöveg következő elemét a minta következő elemével hasonlítja össze, amíg igaz. Ha megtalálja a mintát kiírja, ha nem akkor a szövegbe megint egyet lép. Mire végéig nem ér a szövegnek. Ez egy hosszú folyamat O(n-m+1) a futási ideje, ahol n a szöveg mérete és m a minta mérete. Tárhely igénye O(1).
ábra Naiv algoritmus
1.4 Naiv algoritmus felgyorsítása 
Naiv algoritmus egy  egyszerű de időigényes algoritmus, ezért fel lehet gyorsítani úgy, hogy minél kevesebb lépésből jussunk el a végeredményhez. Azt szeretnénk elérni, hogy minél nagyobb részeket tudjunk átugrani a szövegbe úgy, hogy közbe véletlenül se ugorjunk át illeszkedést. Ha többet lépünk előre mint egy pozíció az gyorsítja az összehasonlítást mivel gyorsabban halad P T-ben. Némelyik algoritmus úgy próbál elérni nagy ugrásokat, hogy a mintában próbál meg ugrani minden összehasonlítás után. Ezeket fogom a következőkbe bővebben is kifejteni.
1.5 Előfeldolgozási megközelítés 
Az egyik lehetséges módszer a folyamat felgyorsítására az ha 2 részre osztjuk a problémát. Először egy viszonylag kevés időt töltve feldolgozzuk a mintát vagy a szöveget. A folyamat során az algoritmusnak nem is kell tudnia a másik stringről. Ezt a részét nevezzük elő feldolgozási szakasznak. Ezt követően keresési szakasz lép az algoritmus. Az ilyen előfeldolgozás hasznos lehet azért is mert ha egy mintát vagy egy szöveget többször akarunk felhasználni akkor az előfeldolgozási szakaszt az első után meg tudjuk spórolni ezzel is gyorsítva a keresést.  
1.6 Not So Naive algoritmus
A naiv algoritmust fel lehet gyorsítani egy minimális minta előfeldolgozással. A Not So Naive algoritmus ezt úgy éri el, hogy a keresési fázisba P minta pozícióit a következő sorrendben vizsgálja: 1,2,3…,m-2,m-1,0. 
Összehasonlítása a mintapozíciókkal a következő sorrendben történik: T[j .. j+m-1]: ha P[0]=P[1] és P[1] != T[j+1], ha P[0] != P[1] és P[1]=T[j+1] a minta 2 pozícióval eltolódik a kísérlet végén, egyébként 1-gyel. 
Így az előfeldolgozási fázis állandó időben és térben végezhető el. A Not So Naive algoritmus keresési fázisa négyzetes legrosszabb esettel rendelkezik O(nm), de átlagos esetben kissé szublineáris. 
2. KLASSZIKUS ÖSSZEHASONLÍTÁSON ALAPULÓ MÓDSZEREK
2.1 Bevezető
Ez a fejezet bemutat több klasszikus összehasonlításon alapuló módszert a pontos illesztés problémára. Megfelelő kiterjesztésével ezek az algoritmusok megvalósíthatóak legrosszab esetbe is lineáris idő alatt, és mindegyik P minta elő feldolgozásával éri el ezt. A T szöveg elő feldolgozás módszerével szellemileg azonos, de fogalmi nehézségeiben meglehetősen eltérőek. Néhány klasszikus módszer elég bonyolult ezért ezekkel ebbe a fejezetbe nem foglalkozunk. Itt az előző fejezetbe tárgyalt előfeldolgozási módszerekre alapuló pontos illesztést tárgyalja, mint a Boyer-Moore algoritmus vagy a Knuth-Morris-Patt.
2.2 Boyer-Moore algoritmus 
Hasonlóképpen mint naiv algoritmus a Boyer-Moore algoritmus is a balról jobbra halad végig a T szövegen, és mikor nem egyezik akkor jobbra csúsztatja a P mintát. Viszont három okos megoldást alkalmaz amit a naiv nem alkalmazott: jobbról balra való vizsgálat, rossz karakter szabály, és a jó utótag eltolási szabály. Ezeket együtt alkalmazva általában kevesebb mint m+12 összehasonlítást végez, és legrosszabb esetbe is lineáris időben lefut. Az algoritmust a leghatékonyabb  karakterlánc-illesztés algoritmusnak tekintik. Ennek egyszerűsített változatát vagy a teljes algoritmus gyakran implementálják alkalmazásokban.
Minden P T-vel való összehasonlítást az algoritmus jobbról balra végzi el ellentétesen mint a naiv algoritmus, és mikor nem talál egyezést eggyel jobbra tolja relatív a T-hez képest. Ez magába véve nem jelenet semmiféle gyorsulást mer így ugyanúgy O(mn) idő alatt fut le az algoritmus ezért kell mellé a két okos eltolási szabály. 
A rossz karakter szabály (bad character rule) egy olyan heurisztika amely jelentősen segítheti az algoritmus gyors lefolyását. A heurisztika megértéséhez tegyük fel, hogy az utolsó karakter amit P-ben vizsgáltunk y és T-ben egy x karakterrel áll együtt (x != y). Amikor ez az eltérés előfordul mi tudjuk a leg jobb oldalon lévő előfordulását az x karakternek a P-ben, ezért a mintát biztonságosan eltolhatjuk annyival hogy ez megegyezzen. Minden kisebb eltolás rögtön egy eltérésbe fulladna, ezért a hosszabb eltolás helyes és nem ugrunk át semmilyen egyezést. Ha az x teljesen nem található meg a P-ben akkor az egész mintát eltolhatjuk hogy teljesen átmenjen a eltérés pontján. Ebben az esetben sok karakter egyáltalán nem is lesz vizsgálva a T-ben így sub linear időbe lefut a programunk.
Definíció: Az abc minden x karakteréhez legyen R(x) az x karakter jobb szélső előfordulási helye aP-ben. R(x) értéke nulla, ha x nem fordul elő P-ben.
Eza előfeldolgozás nem igényel nagy erőfeszítést O(n) idő alatt létre lehet hozni az R(x)-et.
Az előfeldolgozási szakaszba a érdemes egy rossz karakter táblázatot létrehozni és ebbe tárolni az eredményét. A eltérésnél így a tábla vizsgálata legrosszabb esetbe is n-1, ami nagyábból anyi mint amennyi karakter egyezett. Szóval a legrosszabb esetben is, maximum duplázza a Boyer-Moore algoritmus futási idejét. A legtöbb probléma esetén azonban a hozzáadott ídő jóval kevesebb lesz mint a duplája. A heurisztika jól működik a legtöbb esetben főleg angol abc-vel, nem olyan hatékony rövid a minta, vagy ha a szöveg sok olyan karaktert tartalmaz mint a minta.
A jó suffix szabály (Good Suffix rule) bevezetésével ezt javítjuk. A klasszikus előfeldolgozási metód a good suffix rule-ra nehéznek tekinthető. A heurisztika úgy működik, létrehozzunk egy táblázatot, amely minden minta-utótaghoz megadja annak leghosszabb megfelelő utótagjának hosszát. A megfelelő utótag egy olyan utótag, amely a minta végén kezdődik, és a minta többi részét is tartalmazza. Ha a szövegben egy minta-utótagot találunk, akkor a táblázatban megnézzük annak leghosszabb megfelelő utótagjának hosszát. A szöveget a megfelelő utótag hosszával előreléptetjük.
A két táblázat segítségével sok karakter vizsgálatot át tudunk lépni. Mivel fentiek szerint egyik se fog potenciális egyezést átugrani ezért minden eltérés esetén azt a lépést alkalmazuk ami nagyobbat lép előre. Ezért most prezentálni lehet a teljes algoritmust.
A Boyer-Moore algoritmus: Elő feldolgozási fázis: A minta minden pozíciójához kiszámítjuk, hogy az adott karakter utolsó előfordulása hol van a mintában. Kiszámítjuk, hogy minden karakter milyen távolságra van a mintától a szövegben. Keresési fázis: A szövegbe balról jobbra haladva, a mintán jobbról balra haladva, minden egyes pozícióban megvizsgáljuk, hogy a minta aktuális karaktere megegyezik-e a szöveg aktuális karakterével. Ha igen, akkor a következő karaktereket is megnézzük. Ha nem, akkor a következő pozícióba toljuk a mintát, attól függően melyik szabály alapján lépünk nagyobbat.

ábra Booyer-Moore algoritmus
Legyen a szöveg hossza n, a keresett sztring hossza m. Ekkor a Boyer-Moore algoritmus legrosszabb esetben O(mn), ha a minta megtalálható a szövegben és O(m+n) ha a nem jelenik meg a szövegbe.
2.3 Quick Search 
Az egyik talán legelterjedtebb használata a Boyer.Moore algoritmusnak az a változat ahol csak a bad character szabály táblázat van használva, ezt szoktuk Quick Search algoritmusnak nevezni. Az így létrehozott előfeldolgozás O(m+szigma) idejű és O(szigma) hely bonyolultságú. A keresési fázisban a minta és a szöveg karakterek összehasonlítása minden kísérlet során tetszőleges sorrendben elvégezhető. A keresési fázis négyzetes legrosszabb idejű, de praktikus a gyakorlatban.
2.4 Knuth-Morris-Pratt algoritmus
A legjobban ismert lineáris idejű algoritmus exact matching problémára az Knuth, Morris, és Patt miatt van.  Habár ez a megoldás ritkán a választás, alsóbbrendű mint a Boyer-Moore vagy másik metódusok. Egyszerűen magyarázható és lineáris időkorlátja könnyen igazolható. Az algoritmus a jól ismert Aho-Corasick algoritmus alapját is képezi, amely hatékonyan megtalálja a szövegben előforduló bármely részkifejezést egy mintakészletből.
Egy adott P minta igazítása T szöveghez, naiv algoritmus összehasonlít i számú karaktert a P-ben a T-hez igazítva, és eltér a következő hasonlításkor. A naiv algoritmus a P eltolja eggyel és balról kezdi az összehasonlítást újból. De egy nagyobb eltolás is lehetséges lehet. Vegyük például P=abcxabcde és az eltérés a 8. pozícióban van P-ben. Nagyon egyszerűen lehet levezetni, hogy P-t el lehet tolni 4 pozícióval anélkül, hogy átugornánk egyetlen P illeszkedést is T-ben. Észrevehető, hogy a levezetéshez nem kell tudnunk T szöveget vagy, hogy a P pontosan hogy illeszkedik T-re. Csak azt tudjuk P milyen pozícióba tért el. Erre épül a Knuth-Morris-Pratt algoritmus. 
Szóval a KMP algoritmus az előfeldolgozás során, egy úgynevezett prefix függvény számol ki, amelyel azt mondja meg, hogy a minta mely részei egyeznek meg önmagukkal. Az így létrehozott tömböt szokták jump table-nek vagy next table-nek nevezni. Ez a tömb azt tárolja, hogy a részsztringhez milyen hosszú a leghosszabb valódi prefix, ami egyezik a sztring azonos hosszú szuffixével. Amikor karakternél eltérést észlelünk, a mintát jobbra toljuk a táblázat segítségével, és így tudhatjuk, hogy a már megvizsgált karakter egyezni fog a mintával.
3.ábra Knuth-Morris-Pratt algoritmus

Legyen a szöveg hossza n, a keresett sztring hossza m. Ekkor a Knuth-Morris-Pratt algoritmus előfeldolgozás eljárás lépésszáma O(m). Tegyük fel, hogy m<<n, ekkor a keresés műveletigénye legrosszabb és legjobb esetben is egyaránt O(n). Ezért a KMP algoritmust stabil eljárásnak mondjuk.
Az eltolásnál viszont az algoritmus egy T-ben lévő karaktert többször is vizsgálhat ezért az eljárás nem valós idejű algoritmus. Hogy valami valós idejű legyen, ahhoz konstans mennyiségű munka kell az első vizsgálat és akármelyik utolsó vizsgálat között eltelt időben. A Knuth-Morris-Pratt metódusban, ha a pozíció a T-ben egy egyezésbe, akkor az többé nem lesz újra vizsgálva. Viszont ha a pozíció egy eltérésben szerepelt akkor ez már nem igaz. Meg kell jegyezni, hogy a valós idejű probléma csak a keresési fázisba izgat minket. A elő feldolgozás lehet nem valós idejű. Ha az algoritmus valós idejű akkor bizonyosan lineáris idejű is. El kell ismerni viszont, hogy a valós idejű algoritmusok melletti érvek a lineáris idejű módszerekkel szemben némileg kevesek. A valós idejű algoritmus inkább elméleti, mint gyakorlati.
2.5 Apostolico-Giancarlo algoritmus
A Boyer-Moore algoritmust nehéz elemezni, mert minden próbálkozás után elfelejti az összes karaktert, amelyhez már illesztett. A mindkét metódus ugyanazokat az eltéréseket találja meg és ugyanazokat az eltolásokat végezné el, viszont az algoritmus kerüli az explicit egyezéseket. Két módosítással éri el ezt.
Először az Apostolico és Giancarlo egy olyan algoritmust alkotott meg, amely a keresési fázisban minden kísérlet végén megjegyzi a leghosszabb suffix hosszát. Ezeket az információkat egy Skip táblázatba tárolja. Gondoljunk egy fázisra ahol a jobb végén a P-nek egy j pozícióhoz van igazítva T-ben, és tegyük fel P és T megegyeznek 1 helyen de nem hosszabban. Ilyenkor legyen M(j) értéke k <= l. M(j) rögzíti, hogy egy k hosszúságú P suffix fordul elő T-ben, és pontosan a j pozícióban végződik. Ahogy az algoritmus halad előre, egy M(j) értéket beállít egy j pozícióra T-ben, amely P jobb végéhez igazodik. M(j) definiálatlan az összes többi pozícióra.
A második módosítás az N és M vektorokat kihasználva felgyorsítja a Boyer-Moore algoritmust, bizonyos egyezésekre és eltérésekre következtetve. Az ötlet megértéséhez tegyük fel, hogy a Boyer-Moore algoritmus P(i) és T(h) karaktereket készül összehasonlítani, és tegyük fel, hogy tudja, hogy M(h) > Ni. Ez azt jelenti, hogy a P egy Ni hosszúságú subring az i pozícióban végződik, és illeszkedik a P suffix-éhez, míg egy T hosszúságú M(h) substring a h pozícióba ér, és megegyezik a P utótagjával. Tehát az N, hosszúságú utótagjai ennek a két részstringnek meg kell egyeznie, és arra a következtetésre juthatunk, hogy a következő Ni-összehasonlítások a Boyer-Moore algoritmusban egyezések lennének. Továbbá, ha Ni = i, akkor P előfordulását találtuk T-ben, és ha Ni< i, akkor biztosak lehetünk benne, hogy a következő összehasonlítás hibás lesz. Ennélfogva Boyer-Moore szimulálásakor, ha M(h) > Ni elkerülhettünk legalább Ni explicit összehasonlítást.. Természetesen azt
M(h)>Ni nem igaz az összes eset.
Az Apostolico-Giancarlo algoritmus előfeldolgozási fázisának térben és időben történő bonyolultsága megegyezik a Boyer-Moore algoritmuséval. A keresési fázisban minden próbálkozásnál csak az utolsó m információra van szükség a skip táblához, így a tábla kihagyás mérete O(m)-re csökkenthető. Az Apostolico-Giancarlo algoritmus a legrosszabb esetben legfeljebb 3/2n karakter-összehasonlítást hajt végre. 
4.ábra Apostolico-Giancarlo algoritmus
A j pozícióra tett kísérlet során, ha az algoritmus sikeresen összehasonlítja az y[i j 1 .. j m-1] szöveg faktorát, akkor négy eset adódik.
Ilyen esetek:
Eset 1: k > suff[i] és suff[i]=i+1. Ez azt jelenti, hogy x előfordulása a j és pozícióban található és skip[j+m-1] m lesz (lásd 6.ábra). per(x) hosszúságú eltolás jön létre.
6.ábra 
Eset 2: k > suff[i] and suff[i] <= i. Ez azt jelenti, hogy az eltérés x[i-suff[i]] és y[i+j-suff[i]] között van, és skip[j+m-1] értéke m-1-i+suff[i] (lásd 7.ábra). Az eltolás  bmBc[y[i+j-suff[i]]] és bmGs[i-suff[i]+1] alapján megy végbe.
7.ábra
Eset 3: k < suff[i]. Ez azt jelenti, hogy az eltérés x[i-k] és y[i+j-k] között van, és skip[j+m-1] értéke m-1-i+k (lásd 8.ábra). Az eltolás bmBc[y[i+j-k]] és bmGs[i-k+1] alapján megy végbe.
8.ábra

Eset 4: k=suff[i]. Ez az egyetlen eset, amikor "ugrást" kell végrehajtani az y[i+j-k+1 .. i+j] szöveg tényezőn az y[i+j-k] és x[i-k] karakterek összehasonlításának folytatásához (lásd 9.ábra).
9.ábra
2. 6 Aho-Corasick algoritmus
Az eddig tárgyalt algoritmusok mind-mind egyetlen mintát próbáltak illeszteni a szövegre. Felmerülhet olyan eset sok esetbe, hogy nem egy mintát keresünk, hanem több mintát egyszerre. Ilyen lehet például ha táblázatunk káromkodásokból és ezeket mind ki szeretnénk szűrni, vagy DNS szekvenciákat szeretnénk keresni egy genomon, vagy vannak előre beállított címkék és azok alapján szeretnénk keresni. Ezekbe az esetben az előző algoritmusoknak minden egyes esetbe ahány külömböző dolgot szeretnénk keresni annyiszor újra és újra le kell futnia a kereséseknek. Aho-Corasick erre a problémára kínál egyfajta megoldást.
Ez az algoritmus is az előfeldolgozási fázisban a mintát dolgozza fel, csak itt egyszerre többet. A mintákból felépít egy véges állapotú automatát, ez automata segítségével meg a szövegen egyszer végigmenve megtaláljuk az összes előfordulást. Az algoritmus úgy is felfogható mint a Knuth-Morris-Pratt algoritmus általánosítása a fákon.
A véges állapotú automata a számítás matematikai modellje. Egy absztrakt gép, amely egy adott időpontban véges számú állapotból pontosan egyben lehet. Definíciója: Az A=<A,X,Y,δ,a0,μ> hatost megjelölt állapotú véges, determinisztikus automatának nevezzük, ahol A: véges halmaz, az automata állapotainak halmaza, X: ábécé, az automata bemenő jeleinek halmaza, Y: ábécé, az automata kimenő jeleinek halmaza, δ:A×X → A alakú, mindenütt értelmezett leképezés, az állapot-átmeneti függvény, a0:a0∈A, az automata kezdő állapota, μ: A→ Y alakú, mindenütt értelmezett leképezés, a jelölő függvény.
Prefixfákba struktúrába tárolja a mintát, ahol minden út végpont egy hozzá tartozó minta. Ehhez a fához Failure Linkeket, vagyis hiba láncokat rendel minden csomópontba. A hibaláncok segítik az algoritmust az átfedések kezelésében és a hatékony visszalépésben, amikor egy karakter nem felel meg a jelenlegi minta következő karakterének.
Van olyan eset amikor az egyik minta teljes átfedése másik mintának ilyenkor a fába nem a levélbe lesz találat hanem egy csomópontban. Ez felvet olyan problémákat, hogy bizonyos esetekbe a hiba láncok nem elegek a megtaláláshoz. Ezért be kell vezetni dictionary linkeket is minden egyes csomóponthoz.
Egy ilyen automata reprezentációja található a képen (10.ábra). A minták halmaza: “a,ag,c,caa,gag,gc,gca”. Fa csomópontjai pirosak mikor az automata abba az állapotban talál egyezést és fekete ha épp keresési állapotában van. A narancssárga szaggatott nyilak reprezentálják a dictionary linkeket és a lila szaggatott pedig a failure linkeket. 

10.ábra Aho-Corasick algoritmus automatája
Az autómatát felépítve kész a előfeldolgozási szakasz. Jól látni, hogy keresési fázisban az lesz a dolgunk, hogy lépésről lépésre végig lépkedjünk az automatán, és az automata bemente pedig T szöveg lesz. Ez az eszköz segítségével a műveleti lépéseket rögtön is csökkentettük szöveg hosszára vagyis O(n)-re. Egyetlen egyszer kell végig mennünk T szövegen és megtaláljuk az összes kereset mintát, jelentősen csökkentve az algoritmus futási idejét.
11.ábra Aho-Corasick algoritmus
3.	SEMINUMERICAL STRING MATCHING
3.1 Bevezető
Az eddig tárgyalt exact matching problémák mind összehasonlításon alapuló metódusok. A fő primitív operandus az összes algoritmusba két karakter összehasonlítása volt. Viszont vannak olyan string matching algoritmusok amik bit operandusokon alapszanak. Ezek teljesen más megközelítést képviselnek mint a karakter összehasonlítók. Ebbe a fejezetbe két ilyen módszert fogok ismertetni: a shift-and metódust, és a random fingerprint metódusát Karpnak és Rabinnek.
3.2 Shift-or method
R. Baeza-Yates és G.Gonnet kitalált egy egyszerű, bitorientált metódust, ami megoldja a exact matching problémát. Nagyon effektíven és relatíve kicsi mintára (egy átlagos angol szó hossza). Ezt a metódust Shift-Or metódusnak nevezték el, de van aki shift-and metódusnak hívja.
A metódus egy véges állapotú nemdeterminisztikus automatát használ. Ha mint P hossza n, és a szöveg T hossza m, akkor a definíciója: Legyen M egy n m+1-el bináris értékű tömb, amibe index i 1-től n-ig fut, és j index 1 től m-ig. A belépés M(i,j) akkor és csak akkor 1, ha P első i karaktere pontosan megegyezik T j karakterre végződő i karaktereivel. Más esetben a belépés nulla.
12.ábra Shift-or algorithm
A mask tábla készítése egy for ciklus (lásd 12.ábra) ami végigmegy a minta elemein i indexel. Mask[pattern[i]] elemét egy bit művelettel az i-edik bitet eltolja balra, a többi nulla.
A keresés végig megy a szövegen. A state változót egy balra shifteléssel frissítjük, majd hozzáadunk egyet, ezzel szimulálva a minta további karakterekkel való összehasonlítását. A frissített state értéket egy bitenkénti & művelettel kombináljuk a mask tömbben tárolt értékkel, így alkalmazva a mintázatot a szövegre. Ellenőrizzük, hogy az állapot m-edik bitje beállt-e. Ha igen, akkor találtunk egy mintát a szövegben, és az aktuális pozíciót hozzáadjuk a matches tömbhöz. Ha nem akkor folytatjuk a for ciklust. 
Ez alapján látni, hogy hasonló módon mint a naiv algoritmus volt ez is egyesével végigmegy a szöveg elemén, és van olyan karakter amin még többször is. Viszont mivel a bitműveletek használ így ez szignifikánsan gyorsabb mint egy karakter összehasonlító algoritmus. Hiába hogy legrosszabb esetben O(mn) db bit műveletet kell végrehajtani, nagyon effektív ha n kisebb mint egy egyszerű számítógépes szó. Ebbe az esetbe a művelethez elég egy egyszavas művelet.  Még akkor is ha a minta nagysága többszöröse is a egyszerű szó, néhány müvelet kell csak. Egyszavas esetén nagyon efektív mind időbe és tárigénybe. Teoretikus szempontból nézve egy nem egy egyenes vonalú metódus, de egy praktikus és sok esetbe használható algoritmus.
3.3 Karp and Rabin
A Shift-or algoritmus feltételezte, hogy hatékonyan tudunk shiftelni bitek vektorát, és azt is, hogy tudjuk eggyel növelni. A Rabin-Karp eljárás a mintát, valamint a szöveg ugyanolyan hosszúságú szakaszait nagy egész számokkal kódolja, így az illeszkedés vizsgálat két szám egyenlőségének ellenőrzése.
Az algoritmus emiatt elveszíti a közvetlen kapcsolatát a szöveg egyes karaktereivel, így nem lesz képes nagy lépésekbe abba, hanem mindig csak egy pozíción csúsztatja jobbra a mintát a szövegben, ahol minden helyzet egy új egész számot határoz meg, mint a lefedett karakterek kódját. Tekinthetjük úgy az eljárást, hogy egy egész számokból álló sorozaton lineáris kereséssel keressünk egy szám első előfordulását, ahol ez a keresett szám a mintának a kódolásából származik.
Ettől a módszer hatékony lesz, mivel az egész számokkal való műveletek gyorsan végrehajthatóak. Mivel azonban igen nagy számokról lehet szó, az egyelőségük fogalma és ellenőrzése összetettebb, mint a megszokott nagyságrendekben, így a hatékonyság nem magától értetődik.
13.ábra
Működése során, hogy bitekké alakítsuk a P minát és T szöveget hash funkciót kell alkalmazni (lásd 13.ábra). Akkor találtuk meg a P minta kezdő pozícióját, akkor és csak akkor ha H(P)=H(Tr). A helyett hogy nagy számokkal dolgoznánk H(P)-nél és H(Tr)-nél, egy relatíve kisebb számmal fogunk dolgozni, mert redukáljuk modulo p-vel. Ez az aritmetika nem vesz igénybe nagy számolást, szóval hatékony lesz. Az így létrejött számot hívjuk ujjlenyomatnak. 
A Karp-Rabin fingerprint algoritmus legrosszabb esetben lineáris idejű, de nem nulla eséllyel (de extrémen kicsi) lesz hibás. Látunk más alternatívákat amik nem hibáznak és ugyanilyen gyorsan tudnak működni, így jogosan merül fel a kérdés mi értelme van ennek?
3 válasz van erre a kérdésre. Először is, gyakorlati szempontból a módszer egyszerű, és más problémákra is kiterjeszthető, mint például a two dimensional part time matching with odd pattern shapes. Másodszor, a módszert konkrét bizonyítékok kísérik, amelyek a módszer teljesítményének jelentős tulajdonságait állapítják meg. Az ujjlenyomatokhoz hasonló módszerek a Karp-Rabin módszert megelőzően léteznek, de a Karp-Rabin módszerrel ellentétben általában hiányzik belőlük az elméleti elemzés. A teljesítményükről keveset bizonyítottak. De a fő vonzereje az, hogy a módszer egészen más elképzeléseken alapul, mint a hiba mentességet garantáló lineáris idejű módszerek. A módszer tehát azért került bele, mert ennek a dolgozatnak a központi célja, hogy bemutassa a különféle technikákban, algoritmusokban és bizonyításokban használt ötletek sokféle gyűjteményét.
4.  SUFFIX FA ÉS HASZNÁLATA
4.1 Bevezető
A suffix tree egy adat struktúra ami feltárja a string belső szerkezetét. A suffix fák használhatóak exact matching probléma megoldására lineáris időbe, de az igazi erénye, hogy használható komplexebb problémákra is szintén lineáris időben végrehajtva. Ráadásul ezek a fák egy hidat képeznek a exact matching és az inexact matching között amire a dolgozatba kevésbé fókuszálunk. 
14.ábra Suffix fa “xabxa$” stringnek
A klasszikus felhasználása a suffix fáknak a substring probléma. Adott egy szöveg T, ami m hosszúságú. Ezután O(m), vagy lineáris előfeldolgozási idővel fel kell készíteni arra, hogy akármilyen nem ismert P string-et, aminek a hossza n, O(n) idő alatt találjuk meg P-t T-ben vagy mondjuk meg hogy nincs benne. Az előfeldolgozási szakasz ideje megengedett hogy arányos legyen a T szöveg hosszával,de ez után, viszont a P keresése már P hosszával kell hogy arányos legyen. Ezeket a határokat a suffix fa segítségével tudjuk elérni. A suffix fa O(m) idő alatt építhető fel az előfeldolgozási szakaszban, ezután bármikor egy n hosszúságú bemenetel az algoritmus O(n) idő alatt végzi el a keresést a fán. 
Az eddigi problémák mind arra épültek, hogy a P mintát dolgozták fel előre és így gyorsították a keresést. Viszont az adatunk óriási és fix, mint például The Human Genome Project által létrehozott emberei DNS, akkor ebbe való keresés gyorsíthatjuk ha szöveget dolgozzuk fel először. Az előző illesztési problémáknak az volt a problémája hogy úgy növekedett a keresés ideje ahogy a szöveg növekedett. Ezt pedig egy Suffix fa képes megoldani. 
4.2 Suffix fa
A fát több fajta módon is fel lehet építeni. Ha naivan állunk hozzá és először egy suffix trie-t csinálunk ezt redukáljuk le tree-re akkor elveszik az egész lényege miért választottuk ezt a módszert. 
Ezt a problémát a finn Esko Ukkonen 1995 ben megoldotta. Az algoritmus azon az elgondoláson alapul, hogy az suffix fát fokozatosan bővítjük, miközben a bemeneti stringet egy karakterenként dolgozzuk fel. Ukkonen kulcsfontosságú meglátása az, hogy az „implicit reprezentációnak” nevezett technikát használja, hogy elkerülje az összes utótag explicit reprezentációját a fában. Ehelyett az algoritmus menet közben építi fel a fát, miközben feldolgozza a bemeneti karakterlánc minden karakterét. Használata széles körben elterjed. O(n) időbe képes felépíteni a teljes fát.
15.ábra Ukkonen algoritmus
Ukkonen fajta algoritmus a leg elterjeteb megoldás, viszont  más féle képpen is meg lehet oldani. Weinernek és McCreigthnak is van suffix fa algoritmusa. 
Mint a bevezetőbe is említettem a suffix fa használható másra is mint matching probléma. Mivel a dolgozatnak nem célja ezek bemutatása, csak a teljesség igénye nélkül megemlítek pár tovább problémát. Substring ellenőrzésre alkalmas. Meg lehet rajta nézni mi a leghosszabb ismételt substring. Szuffix tömb építésre is alkalmas. Ha két stringből építjük fel a fát alkalmas megmondani a leghosszabb közös substring-et vagy pedig a leghosszabb palindrom substring-et. 
5.	ALGORITMUSOK DNS SZEKVENÁLÁSHOZ
5.1 Bevezető
A bioinformatikába a kezdetektől kezdve nagy jelentősége algoritmusok használatára. Például a De Novo assembly of whole-genome shotgun probléma, ahol volt egy csoport aki úgy tartotta, hogy ez túl nehéz feladat megoldani, és volt egy másik oldal akik szerint csak egy elég erős gép kell, hogy megoldjuk. Az utóbbinak lett végül nekik lett igazuk. Sikerült a rövid DNS-szekvenciákból felépíteni az egész DNS-t. Ami tényleg egy nehéz folyamat, mert detektálni kell a fragmentációk átfedését, ismétlődő elemeket és kiszűrni az esetleges hibákat.
5.2 DNS
Hogy megértsük miért hasznosak a dolgozatba lévő algoritmusok mikor DNS-el vagy RNS-el foglalkozunk, érdemes tudni mis is az. A dezoxiribonukleinsav a nukleinsavak csoportjába tartozó összetett molekula, amely a genetikai információt tárolja magában, ez az örökítőanyag. A DNS esetében a nukleotidok három következő komponensből épülnek fel: heterociklusos bázisok (adenin - A, guanin - G, citozin - C, timin - T), pentóz és végül a harmadik alkotóelem a foszforsav. Ezek szerkezete egy kettős hélixet formál. 
Ezt a hélixet fel lehet bontani és a heterociklusos bázisok egymás után kapcsolódását fel lehet jegyezni. Ezt a listát egyszerűen el lehet egy stringbe tárolni, oly módon, hogy egy nagyon hosszú A, G, C és T karakterekből karakterláncot hozunk létre. Az így létrehozott string-en már tudjuk alkalmazni az algoritmusokat, ha valamit keresni vagy hasonlítani akarunk rajta.
A DNS szekvenálás pontos leírása nem cél. Viszont, hogy meg lehessen érteni egy biológusnak vagy bio-informatikusnak mi értelme van ezek algoritmusok használatának, és milyen problémákba ütközik egy pár szót érdemes ejteni róla. Az évek alatt sokat fejlődött. Először volt a első generáció az úgynevezett shotgun sequencing, majd 2004 és 10 között a második generációs a massively parallel sequencing, és a legújabb harmadik generációs a single-molecule sequencing. A második módszer a DNS szakaszokra bontáson alapszik, mivel az egészet nem tudja beolvasni, de szakaszokat nagyon jól olvass és abból nagyon sokat. Az ilyen szakaszokat read-eknek hívják, ezek nagyon rövidek az input DNS-hez képes. Egy emberi kromoszóma körülbelül 100 millió bázis hosszú, viszont egy második generációs szekventáló 150 vagy pár száz bázis körüli szakaszokat ad meg. Ebből viszont nagyon sokat, ezért egy-egy bázis redundásan szerepel. A probléma ezek összekapcsolása a teljes DNS-sé.
5.3 Kihívások DNA String Matching során 
Genomi átrendeződések, például beillesztések, törlések, inverziók és transzlokációk következhetnek az evolúció során vagy betegségek következtében. Az karakterlánc illesztő algoritmusoknak figyelembe kell venniük ezeket a szerkezeti változásokat a DNS-ben. Például a Human Genom Project által létrehozott humán genom nagyjából 3 milliárd DNS bázisból áll. Ilyen nagy számoknál már látható miért érdemes foglalkozni hatékony algoritmusokkal és nem naivan állni hozzá. 
Sok redundáns szakasz is növelik a DNS- hosszát. Ezek az ismétlések megnehezítethetik a karakterlánc illesztő algoritmusokat. 
A szekvenálási technológiák nem tökéletesek, és hibák előfordulhatnak a szekvenálási folyamat során. A karakterlánc illesztő algoritmusoknak ellenállóknak kell lenniük a hibák tekintetében annak érdekében, hogy pontos eredményeket nyújtsanak.
A nagy teljesítményű szekvenálási technológiák megjelenésével exponenciálisan megnőtt a genomikus adatok mennyisége. 
5.4 String manipulálása
Érdemes megemlíteni hasznos string manipulálására alkalmas módszereket. Mert ezek segíthet pár problémánál.
Leghosszabb közös prefix amely mint neve is elárulja a leghosszabb közös előtagot adja meg. Ezt a függvény úgy kapjuk, hogy végigmegyünk a két stringen addig amíg azok megegyeznek, eltároljuk milyen hosszú volt ez, majd visszatérünk egy slice függvény segítségével ezen a helyen elvágva a karakterláncot.
DNS vizsgálata során érdemes tudni egy adott DNS kód megfordított komplementerét. Mivel a DNS kettős hélix felépítése miatt amit keresünk lehet a hélix másik oldalán van a másik oldal a komplementer fordított sorrendben. Komplementerek: A:T, G:C.















Irodalomjegyzék














































Köszönetnyilvánítás
Szakdolgozat napló

1.megbeszélés
dátum: 2023.02.17 9:00

A cím: String matching algoritmusok áttekintése
Dolgozat felépítése: ~50% irodalom ~50% saját
Programozási nyelv: tetszőleges
forrás: könyv amit pdf fromába meg fogok kapni

következő megbeszélés: 2022.03.07(kedd) 8:30

Sztring algoritmusok ami előadáson elhangzott::

string algoritmusokat használ a control + f vagy a google
de a bio informatikába is használják
szerkesztési távolság
antivirusnál is hasznos lehet

leghosszabb közös részsorozat
Z sorozat közös részsorozata X és Y nak ha mindkettőnek részsorozata
nem feltétlenül folytonos
pl.: X: aBCbdA
      Y: BdCAbaa
      egy közös részsorozt: BCA 
      egy leghosszabb: BCBA
		Bemenet:
			X=x1,x2,...xm
			Y=y1,y2,....,yn
			ahol minden xi és yi egy véges halmaz elemei
		Feladat:
			Találjuk meg a leghosszabb közös részsorozatot (LKR)
			-optimalizálási feladat
			-nyers erő módszer: O(2^n)
			-részfeladatokra bontás?
		Optimális részstruktúra. Legyen X=x1,x2,....,xm és Y=y1,y2,...,yn két sorozat és Z=z1,z2,...,zk ezek egy LKR-je. Ekkor igazak a következő állítások:
Ha xm=ym, akkor zk=xm=yn és Zk-1 az Xm-1 és Yn-1 egy LKRje
Ha xm != yn, akkor zk != xm esetén Z az Xm-1 és Y egy LKRje
Ha xm != yn, akkor zk != yn esetén Z az X és Yn-1 egy LKRje  	
idő: O(mn)

				
Szerkesztési távolság:
	
	Minél kisebb annál közelebb vannak egymáshoz:


Két módszer és algoritmus két sztring hasonlóságának kiszámítására:
-leghosszabb közös részsorozat elterjedt a bioinformatikában
-szerkesztési távolság elterjedt a természetes nyelvi szövegfeldolgozásban

Mintaillesztési algoritmus:
	Bemenet: T[1…n] szöveg (text) és P[1...m] minta (pattern)
	Kimenet: P összes illeszkedési helye T-ben (érvényes eltolása), 0≤s≤n-m
illeszkedés: T[s+1…s+m]=P[1…m]
egyszerű mintaillesztés: brute force
ábra


	érdekes honlap: http://whocouldthat.be/visualizing-string-matching/






2. megbeszélés
dátum: 2023.03.07 8:30

napló vezetése
a könyvbe az algoritmus rész a lényeg azokat kell olvasn
érdemes lenne valamiféle fordítást vezetni

következő megbeszélés: 2022.03.28(kedd) 8:30
































1.1. Naive String Matching
	
Az algoritmus lépéseit az alábbiak szerint lehet összefoglalni:
Az algoritmus az első pozícióba állítja a minta és a szöveg mutatóit és balról jobbra halad mind a szövegbe mind mintában.
Az algoritmus összehasonlítja a minta első karakterét a szöveg jelenlegi pozícióján található karakterrel.
.Ha a karakterek megegyeznek, az algoritmus tovább folytatja az összehasonlítást, amíg a minta végére nem ér.
Ha a karakterek nem egyeznek meg, az algoritmus lépteti a szöveg mutatóját egy helyet, majd visszatér a 2. lépéshez.
Ha a minta végére értünk, az algoritmus jelzi, hogy megtalálta a mintát a szövegben.
Az algoritmus lépteti mindkét mutatót eggyel, és újra kezdi a folyamatot, amíg végig nem ér a szövegen.
	Egyszerű megvalósítás:

function naive(txt,pat){ //txt= a teljes szöveg, pat= a mint
    let M=pat.length;
    let N=txt.length;
    const result = [];
    let count=0
    for (let i=0; i<=(N-M);i++){ //végigmegyünk karakterenként
      let j;
      count++
      for (j=0; j <M;j++){ //minta illeszkedés
        if(txt[i+j]!=pat[j]){
          break;
        }
      }
      if(j==M){
         result.push(i);
         //i+=M-1;
      }
    }  
    return result
}
	
lefutási ideje: O(n-m+1)

1.1.1. naive felgyorsítása
	Az ötlet, hogy többet lépjünk 1-nél mikor nem egyezik az illesztés, de ne ugorjunk akkorát, hogy átugorjunk egy illeszkedést.

1.2. az előfeldolgozási megközelítés
	az egész folyamatot 2 részre osztjuk: a előfeldolgozás és a keresésre.
2. pontos egyezés: klasszikus tömörítésen alapuló módszer
	az egész a P előfeldolgozáson alapszik
2.2. A Boyer-Moore algoritmus
	hasonlóan működik mint a naiv csak olyan okos megoldásokat használ mint a jobbról balra scannelés, rossz karakter szabály, jó suffix szabály
2.2.1. Jobbról balra scannelés
	T ugyanúgy balról jobbra haladunk viszont a P nézésekor már jobbról balra. 
2.2.2. Rossz karakter szabály
	A bad character rule arra az elvre épül, hogy amikor a minta egy rossz karaktert tartalmaz, akkor az nem lehet azonos a szövegben található karakterrel, amely pozícióban a mintában található. Ezért az algoritmus elmozdítja a mintát, hogy a minta következő karaktere pontosan az előzőleg megtalált "rossz" karakterhez illeszkedjen, és ezzel minimalizálja az összehasonlítások számát.
	Extend bad character rule: A Bad Character Rule-hoz hasonlóan, az Extend Bad Character Rule is a minta karaktereit összehasonlítja a szövegben található karakterekkel, és amikor talál egy eltérést, akkor a mintát elmozdítja a legutóbbi "rossz" karakterhez tartozó pozícióra. Az Extend Bad Character Rule azonban tovább optimalizálja ezt az eljárást, hogy figyelembe vegye a minta jobb oldalán található karaktereket is. Ha az algoritmus talál egy eltérést a minta és a szöveg között, akkor figyeli, hogy a minta jobb oldalán található-e olyan karakter, amely az adott eltérő karakterrel megegyezik. Ha talál ilyen karaktert, akkor a mintát úgy mozdítja el, hogy a két megegyező karakter pontosan egymás alatt legyen a mintában. Ez a módszer tovább csökkenti az összehasonlítások számát és növeli az algoritmus hatékonyságát.
 2.2.3. The (strong) good suffix rule
A szabály lényege, hogy amikor a minta és a szöveg eltérő karaktereket tartalmaz, akkor a mintát úgy mozdítja el, hogy a legutóbbi olyan suffix-jához igazítsa, amely megegyezik a szöveggel, és amely a minta jobb oldalán található a jelenlegi pozícióban. Az alapvető Good Suffix Rule a minta jobb oldalán található olyan szakaszt keresi, amely megegyezik a minta jobb oldalán található suffix-jával. Ha talál ilyen szakaszt, akkor az algoritmus azonosítja a minta pozícióját, amelyben a megegyező suffix előfordult, majd elmozdítja a mintát, hogy a megegyező suffix pontosan a megtalált pozíció alá essen a mintában. A Strong Good Suffix Rule továbbfejlesztése a Good Suffix Rule-nak, amely további optimalizációkat alkalmaz a minta szövegben való gyorsabb megtalálása érdekében. Ha a Good Suffix Rule nem talál egyezést, az algoritmus tovább keresi a minta jobb oldalán található, megegyező prefixet. Ha talál ilyen prefixet, akkor az algoritmus a prefix és a suffix közé eső részt vizsgálja, és ha talál olyan karaktert, amely megegyezik a szöveggel, akkor az algoritmus az előzőleg leírt módon igazítja a mintát a megtalált karakter alá.
2.2.4. előfeldolgozás a good suffix rule-hoz
2.2.5. gsf a keresési fázisba
2.2.6. a complet Boyer-Moore algoritmus
2.3. A Knuth-Morris-Pratt algoritmus
2.3.1. A Knuth-Morris-Pratt algoritmus eltolás ötlet 
	Az eltolás ötlete az, hogy ha egy szövegrészlet és a minta egy része nem illeszkedik egymáshoz, akkor nincs értelme az egész mintát végig vizsgálni az adott szövegrészletre vonatkozóan. Az algoritmus eltolja a mintát a legutolsó, az előzőleg sikeres egyezés után következő pozícióba, amelytől kezdve az összehasonlítást folytatja.
2.4. Valós idő string maching
Kmp nem valós idejű, igaz machnél nem vizsgáljuk újra, de mismatchnél nem igaz hogy nem nézük újra.
Valód idejű maching inkább teoretikus probléma minthogy pratikus.
3.1. Boyer-Moore "egyszerű" lineáris időbeli variáció
Ugyanazokat az eltolásokat használja csak használja az egyszerű lineáris legrosszabb eset időelemzést
3.1.1. kulcs gondolat
Az Apostolico-Giancarlo algoritmus mi verziója a Boyer-Moore algoritmust szimulálja, pontosan ugyanazokat az eltéréseket találja, amelyeket Boyer-Moore találna, és pontosan ugyanazokat az eltolásokat hajtja végre. Azonban kikövetkeztet és elkerül sok olyan explicit egyezést, amelyet Boyer-Moore talál.

































3. megbeszélés
dátum: 2023.04.04 8:45

Ha más forrást használok akkor azt is fel kell tüntetni.
Milyen program könyvtárak vannak ezzel kapcsolatban?
Milyen adatbázisokon lehetne keresni (dns/szöveg/könyv)?

következő megbeszélés: 2023.04.25(kedd) 8:45
































4. megbeszélés
dátum: 2023.04.025 8:45

Milyen adatbázisokon lehetne keresni (dns/szöveg/könyv)?

következő megbeszélés: 2023.05.16(kedd) 8:45 9:30     


































Könyv maradékából a jegyzet 

Az Algoritmusok a karakterláncokon, fákon és szekvenciákon 5. fejezete bemutatja az suffix tree fogalmát. Az suffix tree egy olyan adatstruktúra, amely egy adott karakterlánc összes utótagját tömörített formában tárolja. Ez hatékony algoritmusokat tesz lehetővé számos karakterlánc-művelethez, például a leghosszabb közös részstring megtalálásához, a minta összes előfordulásának megtalálásához és két karakterlánc közötti szerkesztési távolság kiszámításához.
A fejezet azzal kezdődik, hogy meghatározzuk, mi az suffix tree, és megvitatjuk néhány tulajdonságát. Ezután két algoritmust ír le az suffix tree felépítésére: az Ukkonen algoritmust és a McCreight algoritmust. Az Ukkonen algoritmus egy dinamikus algoritmus, amely növekményesen hoz létre egy suffix tree a string olvasása közben. A McCreight algoritmus egy rekurzív algoritmus, amely egy suffix tree t hoz létre egy lépésben a karakterláncon.
A fejezet az suffix tree néhány alkalmazásának tárgyalásával zárul. Az utótagfákat a számítástechnika számos területén használják, beleértve a bioinformatikát, az adattömörítést és a természetes nyelvi feldolgozást.

A karakterláncokra, fákra és sorozatokra vonatkozó algoritmusok 6. fejezete leírja az Ukkonen-algoritmust suffix tree lineáris időben történő létrehozására. Az Ukkonen algoritmus egy dinamikus algoritmus, amely növekményesen hoz létre egy suffix tree t a string olvasása közben.
Az algoritmus úgy működik, hogy fenntart egy állapotgépet, amely nyomon követi az suffix tree aktuális állapotát. Az állapotgépnek két fő összetevője van: egy trie, amely a string utótagjait tárolja, és egy linkelt lista, amely az suffix tree éleit tárolja.
Az algoritmus egy próba létrehozásával kezdődik, amely tartalmazza az üres karakterlánc összes utótagját. A karakterlánc olvasása közben az algoritmus minden új karaktert hozzáad a trie-hez. Ha a karakter már létezik a trie-ben, az algoritmus követi a hivatkozott lista megfelelő élét. Ha a karakter nem létezik a trie-ben, az algoritmus új csomópontot hoz létre a trie-ben, és hozzáadja a karaktert a csomóponthoz. Az algoritmus egy élt is hozzáad a csatolt listához, amely összeköti az új csomópontot az előző karaktert tartalmazó csomóponttal.
Az algoritmus addig folytatja a karakterek hozzáadását a trie-hez, amíg a teljes karakterláncot be nem olvasta. Az algoritmus végén a trie egy suffix tree t fog tartalmazni a karakterlánchoz.
Az Ukkonen-algoritmus egy egyszerű és hatékony algoritmus suffix tree lineáris időben történő létrehozására. Széles körben használják a számítástechnika számos területén, beleértve a bioinformatikát, az adattömörítést és a természetes nyelvi feldolgozást.

A karakterláncokra, fákra és sorozatokra vonatkozó algoritmusok 7. fejezete az suffix tree néhány első alkalmazását tárgyalja. 
Az suffix tree egyik leggyakoribb alkalmazása két karakterlánc leghosszabb közös részkarakterláncának megtalálása. A leghosszabb közös karakterlánc a leghosszabb részkarakterlánc, amely mindkét karakterláncban megjelenik. A leghosszabb közös karakterlánc megtalálása számos feladathoz használható, például plágiumészlelés és szövegtömörítés.
Az suffix tree másik gyakori alkalmazása a minta összes előfordulásának megtalálása egy karakterláncban. Ezt úgy teheti meg, hogy bejárja az suffix tree, és minden utótagot ellenőriz, hogy egyezik-e a mintával. Az suffix tree arra is használhatók, hogy megkeressük a minta összes előfordulását egy karakterláncban.
Az suffix tree két karakterlánc közötti szerkesztési távolság kiszámítására is használhatók. A szerkesztési távolság az egyik karakterláncon végrehajtandó módosítások minimális száma, hogy az egyenlő legyen a másik karakterlánccal. A szerkesztési távolság kiszámítása számos feladathoz használható, például helyesírás-ellenőrzéshez és gépi fordításhoz.
Ezeken a gyakori alkalmazásokon kívül az utótagfák számos más feladathoz is használhatók, például: 
A minimális szerkesztési távolság megkeresése egy karakterlánc és egy karakterlánchalmaz között
A minta összes előfordulásának megkeresése egy karakterláncban helyettesítő karakterekkel
Két DNS vagy RNS szekvencia összehangolása
Filogenetikai fa építése

A karakterláncokra, fákra és szekvenciákra vonatkozó algoritmusok 8. fejezete azt a problémát tárgyalja, hogy egy fa két csomópontjának legalacsonyabb közös őse (LCA) állandó időben megtalálható. A két csomópont LCA-ja a fa legmélyebb csomópontja, amely mindkét csomópont őse.
A fejezet egy egyszerű algoritmus bemutatásával kezdődik egy fa két csomópontjának LCA-jának megtalálásához. Az algoritmus úgy működik, hogy bejárja a fát a gyökértől, és minden csomópontot ellenőriz, hogy az mindkét csomópont őse-e. Ha egy csomópont mindkét csomópont őse, akkor az algoritmus a csomópontot adja vissza. Ha az algoritmus elér egy levél csomópontot, és a csomópontok nem találhatók, akkor az algoritmus null értéket ad vissza.
A fejezet ezután egy hatékonyabb algoritmust mutat be egy fa két csomópontjának LCA-jának megkeresésére. Az algoritmus úgy működik, hogy először egy suffix tree készít a fához. Az suffix tree egy olyan adatstruktúra, amely a fa összes utótagját tömörített formában tárolja. Az suffix tree összeállítása után az algoritmus meg tudja találni két csomópont LCA-ját állandó időben az suffix tree bejárásával.
A fejezet a fa két csomópontjának LCA-jának megtalálásához szükséges két algoritmus előnyeit és hátrányait tárgyalja. Az egyszerű algoritmus könnyen érthető és megvalósítható, de nem túl hatékony. A hatékonyabb algoritmust nehezebb megérteni és megvalósítani, de sokkal hatékonyabb.

A karakterláncokra, fákra és szekvenciákra vonatkozó algoritmusok 9. fejezete az suffix tree néhány fejlettebb alkalmazását tárgyalja.
Az suffix tree egyik leggyakoribb alkalmazása két karakterlánc leghosszabb közös részkarakterláncának megtalálása. A leghosszabb közös karakterlánc a leghosszabb részkarakterlánc, amely mindkét karakterláncban megjelenik. A leghosszabb közös karakterlánc megtalálása számos feladathoz használható, például plágiumészlelés és szövegtömörítés.
Az suffix tree másik gyakori alkalmazása a minta összes előfordulásának megtalálása egy karakterláncban. Ezt úgy teheti meg, hogy bejárja az suffix tree, és minden utótagot ellenőriz, hogy egyezik-e a mintával. 
Az utótagfák két karakterlánc közötti szerkesztési távolság kiszámítására is használhatók. A szerkesztési távolság az egyik karakterláncon végrehajtandó módosítások minimális száma, hogy az egyenlő legyen a másik karakterlánccal. 
Az Algorithms on Strings, Trees és Sequences 10. fejezete a szekvencia-összehasonlítás fontosságát tárgyalja a molekuláris biológiában. A szekvencia-összehasonlítás két vagy több DNS-, RNS- vagy fehérjeszekvencia összehasonlításának folyamata a köztük lévő hasonlóságok és különbségek azonosítása érdekében.
A szekvencia-összehasonlítás egy hatékony eszköz, amely a molekuláris biológia kérdéseinek széles körének megválaszolására használható, mint például:
Összefügg két sorozat?
Mennyire kapcsolódik egymáshoz két sorozat?
Mi egy adott sorozat evolúciós története?
Mi a funkciója egy adott sorozatnak?

Az Algoritmusok karakterláncokon, fákon és szekvenciákon 11. fejezete a fő karakterlánc-szerkesztéseket, igazításokat és dinamikus programozást tárgyalja. Bemutatja a szerkesztési távolság, a globális igazítás, a lokális igazítás és a dinamikus programozás fogalmát. Ezen fogalmak bioinformatikai alkalmazását is tárgyalja.
A fejezet a szerkesztési távolság meghatározásával kezdődik. A szerkesztési távolság két karakterlánc hasonlóságának mértéke. Ez a szerkesztési műveletek (beszúrások, törlések vagy helyettesítések) minimális száma, amelyet az egyik karakterláncon el kell végezni, hogy az egyenlő legyen a másik karakterlánccal.
A fejezet ezután a globális igazodást tárgyalja. A globális igazítás egy olyan módszer, amellyel két karakterláncot igazíthatunk úgy, hogy megtaláljuk az optimális igazítást, amely mindkét karakterlánc elején kezdődik és mindkét karakterlánc végén végződik. Az optimális igazítás az, amely minimálisra csökkenti a két karakterlánc közötti szerkesztési távolságot.
A fejezet ezután a helyi igazodást tárgyalja. A helyi igazítás két karakterlánc igazításának módszere az optimális igazítás megtalálásával, amely bármelyik karakterlánc tetszőleges pozíciójában kezdődik, és a másik karakterlánc tetszőleges pozíciójában ér véget. Az optimális igazítás az, amely minimálisra csökkenti a két karakterlánc közötti szerkesztési távolságot, azzal a megkötéssel, hogy az igazításnak minden karakterláncban egy adott helyen kell kezdődnie és végződnie.
A fejezet a dinamikus programozás tárgyalásával zárul. A dinamikus programozás egy algoritmikus technika a problémák megoldására úgy, hogy azokat kisebb részproblémákra bontja, és a részproblémák megoldásait használja az eredeti probléma megoldására. A dinamikus programozás egy hatékony technika, amely számos karakterlánc-probléma megoldására használható, beleértve a távolság szerkesztését, a globális igazítást és a helyi igazítást.

Az Algoritmusok a karakterláncokon, fákon és szekvenciákon 12. fejezete az alapvető karakterlánc-szerkesztések és -igazítások finomítását tárgyalja. Bemutatja az affin rés büntetés, a félglobális igazítás és a progresszív többszörös igazítás fogalmát. Ezen fogalmak bioinformatikai alkalmazását is tárgyalja.
A fejezet az affin rés büntetés meghatározásával kezdődik. Az affin rés büntetés kifinomultabb módja az igazítási hézagok szankcionálásának, mint az egyszerű rés büntetés, amelyet a 11. fejezetben tárgyaltunk. Az affin rés büntetés figyelembe veszi a rés hosszát, valamint a rés helyzetét az igazításban.
A fejezet ezután a félglobális igazodást tárgyalja. A félglobális igazítás egy olyan módszer, amellyel két karakterláncot igazítanak úgy, hogy megtalálják az optimális igazítást, amely az egyik karakterlánc elején kezdődik, és a másik karakterlánc végén végződik, de nem kell mindkét karakterláncban ugyanabban a helyzetben kezdődnie és végződnie. Az optimális igazítás az, amely minimálisra csökkenti a két karakterlánc közötti szerkesztési távolságot, azzal a megkötéssel, hogy az igazításnak az egyik karakterlánc elején kell kezdődnie, és a másik karakterlánc végén kell véget érnie.
A fejezet ezután a progresszív többszörös igazítást tárgyalja. A progresszív többszörös igazítás több karakterlánc igazításának módszere karakterláncpárok iteratív igazításával. Az első lépés az egyes karakterláncok egyenkénti igazítása. A következő lépés a legmagasabb hasonlósági pontszámmal rendelkező két sztringpár összehangolása. Ezt a folyamatot addig ismételjük, amíg az összes karakterláncot be nem igazítjuk.
A fejezet e fogalmak bioinformatikai alkalmazásának tárgyalásával zárul. Az affin résbüntetés, a félglobális igazítás és a progresszív többszörös igazítás olyan hatékony technikák, amelyek segítségével javítható a karakterlánc-igazítás pontossága és hatékonysága. Széles körben használják a bioinformatikában olyan feladatokra, mint:
Homológ gének azonosítása
A fehérje szerkezetének elemzése
A fehérje működésének előrejelzése
5.megbeszélés
dátum: 2023.05.16 9:30

Át kell formálni szakdolgozat formára
kell keresni tényleges adatbázist

következő megbeszélés: következő félévben szep.14 délelőtt




Olyan lista ahol lehet találni szabadon felhasználható adatbázisokat:

	https://data.nasa.gov/ 
	https://github.com/search?q=dataset+text+data&type=repositories
	https://data.gov/
	https://datasetsearch.research.google.com/ 

ahol lehet találni szabadon felhasználható a genetikai kódot:
	
	GenBank: https://www.ncbi.nlm.nih.gov/genbank/
RefSeq: https://www.ncbi.nlm.nih.gov/refseq/
UniProt: https://www.uniprot.org/ 


6.megbeszélés
dátum: 2023.09.14 9:00

programozni
fehérjékbe mit kell keresni

következő megbeszélés: 2023.10.05 9:00
7.megbeszélés
dátum: 2023.10.05 9:15

Haladni tovább és össze kéne állnia következő megbeszélésre hogy a szakdolgozat nagy részének

következő megbeszélés: 2023.10.26 9:00
8.megbeszélés
dátum: 2023.10.26 9:00

írni a jegyzetet

következő megbeszélés: 2023.11.02 9:15


9.megbeszélés
dátum: 2023.11.02 9:15

10x ennyit kell

következő megbeszélés: 2023.11.09 9:15
10.megbeszélés
dátum: 2023.11.09 9:15

10x ennyit kell és 2 hét múlva már nagyon kész állapotba kell lennie, kell egy összefoglalás az elejére 

következő megbeszélés: 2023.11.23 9:15




































