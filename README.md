# Interpreter Logomocji w JS

Mały projekt zrobiony z nudów

### Zawartość

Plik `logo.js` zawiera klasę w kontruktorze przyjmującą obiekt HTML-DOM Canvasu i tworzącą instancję dotyczącą tego canvasu.
Plik `page.html` jest przykładową stroną z zaimplementowaną podstawową funkcjonalnością, utworzoną do testowania projektu. Strona jest nieresponsywna, skrypty i style są napisane wewnątrz (sic!) oraz wykorzystuje technologie niewspierane jeszcze przez część przeglądarek, nie traktować poważnie.

### Instalacja

Pobierz lub skolonuj, otwórz `page.html` w przegladarce.

### Użycie

Interpreter rozpoznaje jak na razie siedem komend: 
```
fd (val) - ruch do przodu o val pikseli
bk (val) - ruch do tyłu o val pikseli
rt (val) - skręcenie w prawo o val stopni
lt (val) - skręcenie w lewo o val stopni
up - podniesienie pióra
down - opuszczenie pióra
repeat (val) [ (cmd...) ] - powtórzenie val razy listy komend w cmd
```
Przykład
```
repeat 12 [ fd 50 repeat 3 [ fd 10 rt 120 ] rt 30 repeat 3 [ bk 10 lt 120 ] ]
```
powinien wyprodukować dwunastościan foremny z kokardkami na każdym rogu.