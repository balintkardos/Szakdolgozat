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
A megnevezés



A megadott feladat megfogalmazása:
A szakdolgozat központi célja a String matching algoritmusok bemutatása és megértése. A dolgozatban azokat az algoritmusokat járjuk körül amelyek segítségével szövegben lehet mintázatokat keresni és azonosítani. Ezek algoritmusok működésének részletes körüljárása és  alkalmazási területen mint például szövegben vagy bioinformatikában való kiemelkedő fontossága.

A megoldási mód:




Alkalmazott eszközök, módszerek:




Elért eredmények:




Kulcsszavak:






Tartalomjegyzék
Feladatkiírás	2
Tartalmi összefoglaló	3
Tartalomjegyzék	4
BEVEZETÉS	5

Nyilatkozat	8
Köszönetnyilvánítás	9



cím sorok

















































1. BEVEZETÉS
A stringek az információ tárolásának és feldolgozásának egyik legegyszerűbb, és az egyik legolcsóbb módja, ezért a mai napig nagyon elterjed tárolási módszer. A string egy karakter sorozat lánc. A string algoritmusok pedig olyan algoritmusok, amik stringek kezelésére terveztek.
A string algoritmusok a mai napig fontos szerepet játszanak a mindennapi életbe pont azért mert hatékonyak és gyorsak. Webes keresés esetén,  gépi tanulás során, szöveg feldolgozása közbe, antivirusoknál vagy éppen DNS-szekvenálás, és még sok más helyen találkozhatunk string algoritmusokkal.
A szakdolgozat célja, hogy bemutassa a string algoritmusokon belül a dolgozat legnagyobb hangsúlyt a string illesztő eljárásokra fektet hangsúlyt. Ezeket foglalja össze és mutatja be.
Pontos illesztés: mi is a probléma?
Adott egy P string amit mintának (pattern) hívnak és egy hosszabb string T szöveg (text), a pontos illesztés problémája megtalálni a P minta összes előfordulását ha van ilyen a T szövegbe.
Például: ha P=aba és T = bbabaxababay akor P megtalálható a T-ben a 3.,7. és 9. poziciókba. P két előfordulása átfedésbe egymást, mint itt a 7 és 9 helyen. 
Fontossága a pontos illesztésnek
A pontos illesztés problémája mindenkinek alapvetőnek kéne lennie aki használt valaha számítógépet. A probléma nagyon változatos alkalmazásokban merül fel, amelyek túl sokak ahhoz, hogy teljesen felsoroljuk. Néhány gyakori felhasználása a szövegfeldolgozás, könyvtárak kereső programjai, internetes keresőprogramok, egy szimpla oldalon való keresés ctrl+F. A molekuláris biológiában több száz speciális adatbázis található nyers DNS, RNS és aminosav karakterláncok, vagy a nyers karakterláncból származó feldolgozott minták. Bár a tipikus szöveg feldolgozásba mára feltehetően elég kevés probléma maradt. A exact matching meg van oldva  ezek részére. De a történet változik más felhasználásnál. Az algoritmusok működésének megértése kulcs ahhoz, hogy a feladatot hatékonyan oldjuk meg.
Naiv algoritmus
Általában az exact matching problémát a naiv metódussal szoktuk kezdeni ezért én is így teszek. Mivel egy nagyon szimpla és buta algoritmusról van szó, ezért egyszerű-mintaillesztés vagy brute force-nak is szokták hívni. A algoritmus a szöveg 0 és n-m közötti minden pontján ellenőrzi, hogy a minta előfordulása ott kezdődik-e. Ha nem akkor egyetet lép előre a szövegbe és újra próbálkozik. Ha igen akkor a szöveg következő elemét a minta következő elemével hasonlítja össze, amíg igaz. Ha megtalálja a mintát kiírja, ha nem akkor a szövegbe megint egyet lép. Mire végéig nem ér a szövegnek. Ez egy hosszú folyamat O(n-m+1) a futási ideje, ahol n a szöveg mérete és m a minta mérete. Tárhely igénye O(1).
ábra Naiv algoritmus
Naiv algoritmus felgyorsítása 
Naiv algoritmus egy  egyszerű és idő igényes algoritmus, ezért fel lehet gyorsítani úgy, hogy minél kevesebb lépésből jussunk el a végeredményhez. Azt szeretnénk elérni, hogy minél nagyobb részeket tudjunk átugrani a szövegbe úgy, hogy közbe véletlenül se ugorjunk át illeszkedést. Ha többet lépünk előre mint egy pozíció az gyorsítja az összehasonlítást mivel gyorsabban halad P T-ben. Némelyik algoritmus úgy próbál elérni nagy ugrásokat, hogy a mintában próbál meg ugrani minden összehasonlítás után. Ezeket fogom a következőkbe bővebben is kifejteni.
Előfeldolgozási megközelítés 
Az egyik lehetséges módszer a folyamat felgyorsítására az ha 2 részre osztjuk a problémát. Először egy viszonylag kevés időt töltve feldolgozzuk a mintát vagy a szöveget. A folyamat során az algoritmusnak nem is kell tudnia a másik stringről. Ezt a részét nevezzük elő feldolgozási szakasznak. Ezt követően keresési szakasz lép az algoritmus. Az ilyen előfeldolgozás hasznos lehet azért is mert ha egy mintát vagy egy szöveget többször akarunk felhasználni akkor az előfeldolgozási szakaszt az első után meg tudjuk spórolni ezzel is gyorsítva a keresést.  
2. KLASSZIKUS ÖSSZEHASONLÍTÁSON ALAPULÓ MÓDSZEREK
Bevezető
Ez a fejezet bemutat több klasszikus összehasonlításon alapuló módszert a pontos illesztés problémára. Megfelelő kiterjesztésével ezek az algoritmusok megvalósíthatóak legrosszab esetbe is lineáris idő alatt, és mindegyik P minta elő feldolgozásával éri el ezt. A T szöveg elő feldolgozás módszerével szellemileg azonos, de fogalmi nehézségeiben meglehetősen eltérőek. Néhány klasszikus módszer elég bonyolult ezért ezekkel ebbe a fejezetbe nem foglalkozunk. Itt az előző fejezetbe tárgyalt előfeldolgozási módszerekre alapuló pontos illesztést tárgyalja, mint a Boyer-Moore algoritmus vagy a Knuth-Morris-Patt.
Boyer-Moore algoritmus 
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
Knuth-Morris-Pratt algoritmus
A legjobban ismert lineáris idejű algoritmus exact matching problémára az Knuth, Morris, és Patt miatt van.  Habár ez a megoldás ritkán a választás, alsóbbrendű mint a Boyer-Moore vagy másik metódusok. Egyszerűen magyarázható és lineáris időkorlátja könnyen igazolható. Az algoritmus a jól ismert Aho-Corasick algoritmus alapját is képezi, amely hatékonyan megtalálja a szövegben előforduló bármely részkifejezést egy mintakészletből.
Egy adott P minta igazítása T szöveghez, naiv algoritmus összehasonlít i számú karaktert a P-ben a T-hez igazítva, és eltér a következő hasonlításkor. A naiv algoritmus a P eltolja eggyel és balról kezdi az összehasonlítást újból. De egy nagyobb eltolás is lehetséges lehet. Vegyük például P=abcxabcde és az eltérés a 8. pozícióban van P-ben. Nagyon egyszerűen lehet levezetni, hogy P-t el lehet tolni 4 pozícióval anélkül, hogy átugornánk egyetlen P illeszkedést is T-ben. Észrevehető, hogy a levezetéshez nem kell tudnunk T szöveget vagy, hogy a P pontosan hogy illeszkedik T-re. Csak azt tudjuk P milyen pozícióba tért el. Erre épül a Knuth-Morris-Pratt algoritmus. 
Szóval a KMP algoritmus az előfeldolgozás során, egy úgynevezett prefix függvény számol ki, amelyel azt mondja meg, hogy a minta mely részei egyeznek meg önmagukkal. Az így létrehozott tömböt szokták jump table-nek vagy next table-nek nevezni. Ez a tömb azt tárolja, hogy a részsztringhez milyen hosszú a leghosszabb valódi prefix, ami egyezik a sztring azonos hosszú szuffixével. Amikor karakternél eltérést észlelünk, a mintát jobbra toljuk a táblázat segítségével, és így tudhatjuk, hogy a már megvizsgált karakter egyezni fog a mintával.
3.ábra Knuth-Morris-Pratt algoritmus

Legyen a szöveg hossza n, a keresett sztring hossza m. Ekkor a Knuth-Morris-Pratt algoritmus előfeldolgozás eljárás lépésszáma O(m). Tegyük fel, hogy m<<n, ekkor a keresés műveletigénye legrosszabb és legjobb esetben is egyaránt O(n). Ezért a KMP algoritmust stabil eljárásnak mondjuk.
Az eltolásnál viszont az algoritmus egy T-ben lévő karaktert többször is vizsgálhat ezért az eljárás nem valós idejű algoritmus. Hogy valami valós idejű legyen, ahhoz konstans mennyiségű munka kell az első vizsgálat és akármelyik utolsó vizsgálat között eltelt időben. A Knuth-Morris-Pratt metódusban, ha a pozíció a T-ben egy egyezésbe, akkor az többé nem lesz újra vizsgálva. Viszont ha a pozíció egy eltérésben szerepelt akkor ez már nem igaz. Meg kell jegyezni, hogy a valós idejű probléma csak a keresési fázisba izgat minket. A elő feldolgozás lehet nem valós idejű. Ha az algoritmus valós idejű akkor bizonyosan lineáris idejű is. El kell ismerni viszont, hogy a valós idejű algoritmusok melletti érvek a lineáris idejű módszerekkel szemben némileg kevesek. A valós idejű algoritmus inkább elméleti, mint gyakorlati.
Aho-Corasick algoritmus
Az eddig tárgyalt algoritmusok mind-mind egyetlen mintát próbáltak illeszteni a szövegre. Felmerülhet olyan eset sok esetbe, hogy nem egy mintát keresünk, hanem több mintát egyszerre. Ilyen lehet például ha táblázatunk káromkodásokból és ezeket mind ki szeretnénk szűrni, vagy DNS szekvenciákat szeretnénk keresni egy genomon, vagy vannak előre beállított címkék és azok alapján szeretnénk keresni. Ezekbe az esetben az előző algoritmusoknak minden egyes esetbe ahány külömböző dolgot szeretnénk keresni annyiszor újra és újra le kell futnia a kereséseknek. Aho-Corasick erre a problémára kínál egyfajta megoldást.
Ez az algoritmus is az előfeldolgozási fázisban a mintát dolgozza fel, csak itt egyszerre többet. A mintákból felépít egy véges állapotú automatát, ez automata segítségével meg a szövegen egyszer végigmenve megtaláljuk az összes előfordulást. Az algoritmus úgy is felfogható mint a Knuth-Morris-Pratt algoritmus általánosítása a fákon.
A véges állapotú automata a számítás matematikai modellje. Egy absztrakt gép, amely egy adott időpontban véges számú állapotból pontosan egyben lehet.
Prefixfákba struktúrába tárolja a mintát, ahol minden út végpont egy tartozó minta. Ehhez a fához Failure Linkeket, vagyis hiba láncokat rendel minden csomópontba. A hiba láncok arra szolgálnak hogy a leghosszabb substring-et találjuk meg az adot állapotnak, így a fába felfelé is tudunk haladni.
Van olyan eset amikor az egyik minta substring-je a másik mintának ilyenkor a fába nem a levélbe lesz találat hanem egy csomópontban. Ez felvet olyan problémákat, hogy bizonyos esetekbe a hiba láncok nem elegek a megtaláláshoz. Ezért be kell vezetni dictionary linkeket is minden egyes csomóponthoz.
Egy ilyen automata reprezentációja található a képen (4.ábra) . A minták halmaza: “a,ag,c,caa,gag,gc,gca”. Fa csomópontjai pirosak mikor az automata abba az állapotban talál egyezést és fekete ha épp keresési állapotában van. A narancssárga szaggatott nyilak reprezentálják a dictionary linkeket és a lila szaggatott pedig a failure linkeket. 

4.ábra Aho-Corasick algoritmus automatája


















Irodalomjegyzék














































Köszönetnyilvánítás






























