# 3szakdolgozat
Szegedi Tudományegyetem
Informatikai Intézet















SZAKDOLGOZAT













Kardos Bálint

2023




Szegedi Tudományegyetem
Informatikai Intézet







String matching algoritmusok







Szakdolgozat










Készítette:


Témavezető:




Kardos Bálint


Csirik János




informatika szakos hallgató


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
Például: ha P=aba és T = bbabaxababay koor P megtalálható a T-ben a 3.,7. és 9. poziciókba. P két előfordulása átfedésbe egymást, mint itt a 7 és 9 helyen. 
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
A jó suffix szabály (Good Suffix rule) bevezetésével ezt javítjuk. A klasszikus előfeldolgozási metód a good suffix rule-ra nehéznek tekinthető. A heurisztika úgy müködik, hogy létrehozunk egy táblázatot, amely minde 
