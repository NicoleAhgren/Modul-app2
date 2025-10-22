# Testrapport

Appen har testats manuellt via dess användargränssnitt i webbläsaren. Detta har testats genom att interagera med knappar, timer, frågeflöde och resultatvisning. Testerna har utförts med varierande indata för att säkerställa att quizet fungerar korrekt vid rätt svar, fel svar, timeout och omstart.

## Testfall

| Testnamn | Indata | Förväntat utfall |
|----------|--------|------------------|
| **Starta quiz** | Tryck på knappen "Start Quiz" i startrutan | Startrutan försvinner och quizrutan kommer upp med första frågan |
| **Visa frågor och svar** | Första frågan laddas | Frågetext laddas med korrekt svarsalternativ och korrekt antal |
| **Rätt svar** | Tryck på knappen med rätt svarsalternativ | Svarsknapparna blir inaktiveras, knappen med rätt svarsalternativ blir grön och det loggas som correct |
| **Fel svar** | Tryck på en av knapparna med fel svarsalternativ | Svarsknapparna inaktiveras, knappen med fel svarsalternativ blir röd och det loggas som wrong |
| **Tiden tar slut** | Vänta på att tiden för frågan går ut | Svarsknapparna inaktiveras, timern visar "Time is up!" och det loggas som timeout |
| **Visa tid kvar** | Under aktiv fråga | Timern visas på skärmen och går ner en sekund i taget och visar korrekt tid under frågor |
| **Nästa fråga** | Tryck på knappen "Next Question" längst ner i quizrutan | Nästa fråga visas och timern startas om |
| **Avsluta quiz** | Kör igenom quizet och svara på alla frågor eller låt tiden gå ut | Quizrutan försvinner och resultatrutan visas med poäng och statistik |
| **Statistik visas** | Efter quizet är avslutat och alla frågor är besvarade eller tiden gått ut | Resultatrutan visar statistik med korrekt antal rätt, fel och timeouts |
| **Starta om quiz** | Tryck på knappen "Restart" längst ner i resultatrutan | Startrutan visas och quizet återställs - nya frågor, svarsalternativen är blandade och statistiken är rensad |