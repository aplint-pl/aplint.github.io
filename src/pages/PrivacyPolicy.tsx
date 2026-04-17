const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Polityka prywatności
        </h1>
        <div className="w-24 h-1 bg-gradient-primary mb-8" />

        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Niniejsza polityka prywatności określa zasady przetwarzania danych
          osobowych oraz wykorzystywania plików cookie, narzędzia Matomo i
          pamięci lokalnej przeglądarki w związku z korzystaniem z serwisu
          internetowego dostępnego pod adresem{" "}
          <a
            href="https://aplint.pl"
            className="text-primary hover:text-primary-glow transition-colors"
          >
            aplint.pl
          </a>{" "}
          (dalej: „Serwis”).
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Administrator danych
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Administratorem danych osobowych w rozumieniu rozporządzenia
              Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) jest:
            </p>
            <address className="not-italic text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground font-medium">
                Aplint Sp. z o.o.
              </strong>
              <br />
              ul. Marsz. Józefa Piłsudskiego 74/320, 50-020 Wrocław
              <br />
              KRS: 0000845044, NIP: 8842802170, REGON: 386247610
            </address>
            <p className="text-muted-foreground leading-relaxed">
              Kontakt w sprawach ochrony danych osobowych i prywatności:{" "}
              <a
                href="mailto:kontakt@aplint.pl"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                kontakt@aplint.pl
              </a>
              , tel.{" "}
              <a
                href="tel:+48725116342"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                +48 725 116 342
              </a>{" "}
              (oraz numery podane w zakładce Kontakt w Serwisie).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Charakter Serwisu i zakres danych
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Serwis ma charakter informacyjny i prezentacyjny: przedstawia
              ofertę, zespół i sposób działania APLiNT. Samo przeglądanie treści
              nie wymaga rejestracji ani podawania danych osobowych.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dane osobowe mogą zostać przez Ciebie przekazane dobrowolnie, w
              szczególności w treści wiadomości e-mail, podczas rozmowy
              telefonicznej lub po przejściu do zewnętrznego serwisu rezerwacji
              spotkań Calendly (Calendly LLC), który przetwarza dane na własnych
              zasadach - obowiązuje wtedy polityka prywatności tego podmiotu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Pliki cookie i analityka Matomo
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              W Serwisie stosujemy pliki cookie oraz podobne technologie, w tym
              w celu prowadzenia statystyk ruchu za pomocą{" "}
              <strong className="text-foreground font-medium">Matomo</strong> -
              narzędzia open source do analityki internetowej, obsługiwanego
              przez Administratora (żądania mogą być kierowane do domeny{" "}
              <span className="text-foreground">matomo.aplint.pl</span>). Matomo
              pozwala m.in. analizować odwiedzane podstrony, źródła ruchu, typ
              urządzenia i przeglądarki oraz przybliżoną lokalizację (np. kraj
              lub region). W konfiguracji mogą być stosowane mechanizmy
              ograniczające identyfikowalność, w tym skracanie lub anonimizacja
              adresu IP.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Listę plików cookie zapisywanych w Twojej przeglądarce oraz ich
              czas trwania możesz sprawdzić w ustawieniach przeglądarki (np.
              narzędzia deweloperskie / pamięć witryny). Możesz w każdej chwili
              usunąć pliki cookie lub zablokować ich zapis - może to jednak
              wpłynąć na działanie części funkcji Serwisu.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Podstawą prawną przetwarzania danych w zakresie analityki jest
              art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes
              Administratora: prowadzenie statystyk, poprawa działania i
              bezpieczeństwa Serwisu). Przysługuje Ci prawo wniesienia sprzeciwu w
              zakresie przetwarzania opartego na tym interesie, z uwzględnieniem
              przepisów prawa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Pamięć lokalna przeglądarki (local storage)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              W celu zapamiętania preferencji wyświetlania Serwisu (np. tryb
              jasny lub ciemny) wykorzystywana jest lokalna pamięć przeglądarki{" "}
              <strong className="text-foreground font-medium">
                (Web Storage / local storage)
              </strong>
              . Zapis odbywa się na Twoim urządzeniu i domyślnie nie jest
              automatycznie przesyłany na serwer Administratora. Usunięcie
              danych witryny w ustawieniach przeglądarki usuwa te zapisy.
              Podstawą prawną jest art. 6 ust. 1 lit. f RODO (prawnie
              uzasadniony interes: zapewnienie wygodnego korzystania z Serwisu).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Cele, podstawy i zakres przetwarzania danych osobowych
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Dane osobowe przekazane przez Ciebie w związku z kontaktem lub
              zapytniami (np. imię i nazwisko, adres e-mail, numer telefonu,
              nazwa firmy, treść wiadomości) przetwarzamy w celu:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
              <li>udzielenia odpowiedzi i prowadzenia komunikacji;</li>
              <li>
                przygotowania oferty lub nawiązania i realizacji współpracy
                (jeśli do niej dojdzie).
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Podstawą prawną jest w zależności od sytuacji art. 6 ust. 1 lit.
              f RODO (kontakt, odpowiedź na zapytanie) oraz - w przypadku
              zawarcia lub wykonania umowy - art. 6 ust. 1 lit. b RODO. Gdy
              przepisy prawa będą tego wymagały, może mieć zastosowanie art. 6
              ust. 1 lit. c RODO.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nie prowadzimy wobec Ciebie zautomatyzowanego podejmowania decyzji
              ani profilowania w rozumieniu art. 22 RODO wyłącznie na podstawie
              danych zbieranych automatycznie w Serwisie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Odbiorcy danych i przekazywanie poza EOG
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Dane mogą być powierzane podmiotom przetwarzającym je na nasze
              polecenie (np. hosting, utrzymanie infrastruktury IT, obsługa
              poczty), wyłącznie na podstawie umowy powierzenia przetwarzania
              danych i w zakresie niezbędnym do świadczenia usług. Dane z Matomo
              przetwarzane są w środowisku przez nas zarządzanym.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Korzystanie z Calendly może wiązać się z przekazaniem danych do
              państwa trzeciego (np. USA). Taki podmiot stosuje mechanizmy
              zgodności przewidziane przez RODO (np. decyzje stosowności
              Komisji Europejskiej lub standardowe klauzule umowne). Szczegóły
              znajdują się w dokumentacji Calendly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Okres przechowywania danych
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Dane z korespondencji i zapytań przechowujemy przez czas
              niezbędny do udzielenia odpowiedzi i ewentualnego prowadzenia
              dalszych rozmów, a następnie przez okres wymagany przepisami prawa
              lub - w zakresie dochodzenia lub obrony roszczeń - przez czas
              wynikający z prawnie uzasadnionego interesu Administratora,
              zwykle nie dłużej niż do upływu terminów przedawnienia roszczeń
              cywilnych, o ile dłuższy okres nie wynika z przepisów szczególnych.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dane statystyczne w Matomo są przechowywane przez okres wynikający
              z konfiguracji narzędzia. Zapisy w pamięci lokalnej przeglądarki
              pozostają do momentu ich usunięcia przez Ciebie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Prawa osób, których dane dotyczą
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Przysługuje Ci prawo do: dostępu do danych, ich sprostowania,
              usunięcia lub ograniczenia przetwarzania, wniesienia sprzeciwu wobec
              przetwarzania opartego na prawnie uzasadnionym interesie, a także
              prawo do przenoszenia danych - w zakresie przewidzianym przez
              RODO.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              W zakresie, w jakim przetwarzanie odbywa się na podstawie zgody,
              możesz ją wycofać w dowolnym momencie bez wpływu na zgodność z
              prawem przetwarzania przed jej cofnięciem.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Przysługuje Ci ponadto prawo wniesienia skargi do organu
              nadzorczego - w Polsce jest nim Prezes Urzędu Ochrony Danych
              Osobowych (
              <a
                href="https://uodo.gov.pl"
                className="text-primary hover:text-primary-glow transition-colors"
                rel="noopener noreferrer"
              >
                uodo.gov.pl
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              9. Zmiany polityki prywatności
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Administrator może aktualizować niniejszą politykę w razie zmian w
              Serwisie, wykorzystywanych technologiach lub obowiązujących
              przepisach. Aktualna treść jest zawsze dostępna pod adresem
              Serwisu wskazanym w stopce. O istotnych zmianach możemy poinformować
              dodatkowo, jeśli wymaga tego prawo.
            </p>
          </section>
        </div>

        <p className="text-xs text-muted-foreground mt-10">
          Ostatnia aktualizacja: 29 marca 2026 r.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
