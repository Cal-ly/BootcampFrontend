## **Forskellen mellem `script.js` og `alt_script.js`**
`script.js` er det script, som koden bruger nu og anvender `async/await`. Det andet script `alt_script.js` bruges ikke men viser implementationen med `.then/.catch`

### **Kort fortalt**:
- Til moderne, komplekse workflows, hvor læsbarhed er vigtig, er **`async/await`** generelt at foretrække.
- Til simple API-kald eller når du skal vedligeholde eksisterende kode, der bruger mange promises, er **`.then/.catch`** et fremragende valg.

---

### **`async/await` med try-catch**
#### **Fordele**:
1. **Læsbarhed**:
   - Koden ligner synkron kode, hvilket gør den nemmere at læse og fejlfinde.
   - Særligt nyttigt, når der er mange asynkrone operationer i rækkefølge.

2. **Centraliseret fejlhåndtering**:
   - Fejl kan håndteres i én `try-catch` blok, hvilket reducerer redundans.

3. **Reduceret nesting**:
   - Undgår "callback hell" eller overdreven indlejring, der kan gøre koden rodet.

4. **Naturligt til moderne JavaScript**:
   - Understøttet nativt i ES2017+ uden behov for ekstra biblioteker.

#### **Ulemper**:
1. **Omstændelighed**:
   - Kræver, at al asynkron kode er pakket ind i `try-catch` blokke.
   - Lidt mere verbose for simple operationer.

2. **Parallelle operationer**:
   - Sværere at håndtere parallelle asynkrone opgaver sammenlignet med `.then/.catch` og `Promise.all`.

---

### **`.then/.catch` Promise Chaining**
#### **Fordele**:
1. **Klar adskillelse af succes og fejl**:
   - Succes (`.then`) og fejl (`.catch`) er tydeligt defineret og adskilt.

2. **Simpel til simple operationer**:
   - Mindre boilerplate til simple succes-/fejlhåndteringer, især for enkelte API-kald.

3. **Indbygget `finally` support**:
   - `.finally` sikrer, at oprydningslogik altid eksekveres, uanset succes eller fejl.

4. **Parallelisme**:
   - Fungerer problemfrit med promise-baserede værktøjer som `Promise.all` til samtidige operationer.

#### **Ulemper**:
1. **Problemer med læsbarhed**:
   - For komplekse workflows med mange chained `.then` kan det blive svært at følge.
   - Indlejring kan føre til "promise hell."

2. **Redundant fejlhåndtering**:
   - Hvis flere `.then` er chained, skal fejl propageres og fanges senere, hvilket kan kræve flere `.catch`.

3. **Mindre intuitiv syntaks**:
   - Chaining-syntaksen kan føles mindre naturlig sammenlignet med den synkronlignende `async/await`.


### **Hvornår skal man bruge hvilken tilgang**

| **Scenario**                         | **Anbefalet tilgang**          | **Hvorfor?**                                                             |
|--------------------------------------|--------------------------------|---------------------------------------------------------------------------|
| Simple API-kald                      | `.then/.catch`                 | Mindre boilerplate; klar adskillelse af succes og fejl.                   |
| Komplekse workflows med mange steps  | `async/await`                  | Nemmere at læse og debugge.                                              |
| Håndtering af flere promises parallelt | `.then/.catch` med `Promise.all` | Renere parallel håndtering sammenlignet med `await` loops.              |
| Klart og vedligeholdbart kode         | `async/await`                  | Nemmere for teams at læse og forstå.                                     |
| Eksisterende kodebase med promises    | `.then/.catch`                 | Opretholder konsistens med eksisterende stil.                            |


