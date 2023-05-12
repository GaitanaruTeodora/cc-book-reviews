This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Aplicatie software pentru recenzii de carti din literatura clasică

Găitănaru Teodora, grupa 1120 </br>
https://github.com/GaitanaruTeodora/cc-project </br>
https://cc-project-lilac.vercel.app/ </br>
https://www.youtube.com/watch?v=FmwBwRGNSQc </br>

### 1.	Introducere </br>
Aplicația software pentru recenzii de cărți clasice este destinată atât pasionaților de literatură clasică cât și celor care doresc să exploreze această categorie de cărți. Prin intermediul aplicației, utilizatorii au posibilitatea de a afla informații, de a vizualiza și de a adăuga recenzii pentru cărțile lor preferate. Recenziile și rating-urile sunt utile deoarece ajută utilizatori să își formeze o părere despre cartea pe care doresc să o citească. După adăugarea fiecărui review nou, rating-ul final al cărții se actualizează, permițând utilizatorilor să vadă care sunt cele mai apreciate cărți și să ia decizii informate în privința acestora.

### 2.	Descriere problema </br>
Mulți oameni își doresc să citească recenzii ale cărților înainte de a le achiziționa sau de a le citi. Cu toate că există o mulțime de site-uri și aplicații care permit utilizatorilor să publice recenzii despre diferite cărți, majoritatea sunt destinate tuturor tipurilor de cărți și nu oferă o experiență de utilizare specializată pentru literatura clasică. 
Prin urmare, aplicația software pentru recenzii de cărți pe care am creat-o urmărește să ofere o soluție la această problem prin oferirea unei platforme specializate pentru această categorie de cărți. </br>
Am creat această aplicație folosind framework-ul Next.js, împreună cu un back-end de Node.js și o bază de date în cloud, Mongo DB, care a fost folosită pentru stocarea isbn-ului,  titlului, autorului și vectorul de recenzii despre fiecare carte.</br>
Pentru furnizarea informațiilor necesare despre cărți, am folosit Google Books API și am extras detalii precum coperta cărții, descrierea, categoria, editura, data publicării, numărul de pagini și un link de vizualizare al cărții în Google Books. </br>
Pentru a publica aplicația web, am folosit platforma de hosting Vercel.</br>

### 3.	Descriere API </br>
Google Books API este un serviciu web creat de Google pentru a oferi acces la datele bibliotecii lor de cărți. Acest API permite dezvoltatorilor să caute, să citească și să descopere informații despre o carte, cum ar fi titlul, autorul, imaginea copertei, descrierea, editura, data publicării, numărul de pagini, recenzii și multe altele. </br>
Pentru a utiliza Google Books API, am creat un proiect în cardul Google Cloud Platform Console, în care am generat o cheie API și am folosit-o pentru a accesa serviciul în mod securizat. Am extras informațiile specificate anterior pentru cele 9 cărți pe care le aveam în baza de date.</br>

### 4.	Flux de date </br>

**Exemple de request / response** </br>

*	Cererea GET către endpoint-ul: /api/records pentru a obtine toate cărțile pe pagina principală. Răspunsul de la server este un JSON care contine inregistrari cu informațiile din baza de date precum și cele preluate cu ajutorul Google Books API. </br>
*	Cererea GET către endpoint-ul: /api/reviews/${bookData._id} pentru a afișa în pagina cărții toate review-urile asociate acesteia. Răspunsul de la server este un JSON, care conține proprietatea "data" cu informațiile despre recenziile asociate cărții respective.</br>
*	Cererea POST către endpoint-ul /api/reviews/${book._id} pentru a adăuga un review la o anumintă carte. În corpul cererii, se trimite un obiect JSON cu numele, textul și ratingul review-ului adăugat. Răspunsul așteptat este un obiect JSON cu o proprietate success și o valoare true care indică faptul că review-ul a fost adăugat cu succes în baza de date</br>

**Metode HTTP** </br>
Metodele HTTP folosite în aplicație sunt GET, POST și DELETE. </br>
*	Metoda getReviews afiseză toate review-urile asociate cu un anumit id de carte.</br>

![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/0cd124fc-914c-43b5-a994-c08a2f37cf1e) </br>

* Metoda getRecords afisează toate cărțile și informațiile desprea acestea. </br>
* Metoda postReviewToBook adaugă un review nou la o carte cu un id specificat.</br>
* Metoda deleteReview sterge un review pentru o anumită carte.</br>

**Accesare servicii utilizate**</br>
Google Books API oferă două modalități de a accesa conținutul API-ului, folosind un token OAuth 2.0 sau folosind cheia API a aplicației.
 Având în baza mea de date ISNB-ul, un sistem internațional de numărare unic pentru cărți, am ales să utilizez cheia pentru a solicita date publice despre acele cărți. Serviciul oferă o metodă de căutare a informațiilor despre o carte utilizând codul ISBN. Astfel, am făcut o solicitare HTTP carte API-ul Google Books, iar URL-ul cererii conține:</br>
•	Parametrul de interogare "q" (query) - am folosit valoarea "isbn:${isbn}" pentru a cauta informații doar despre un anumit isbn.</br>
•	Cheia de acces "key" – am folosit cheia generată pentru a accesa API-ul Google Books. Pentru securitate, am stocat valoarea cheii intr-o variabila de mediu "process.env.GOOGLE_BOOKS_API_KEY”.</br>
![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/5fddd424-b7f4-4517-a9ad-824a378655b6)</br>

### 5.	Capturi ecran aplicație</br>

![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/b045243f-83f5-408e-b52b-fbb93e955685) </br>
_Figura 1. Main Page_
![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/0a290bde-6654-418c-8b76-1aa9d2a4ecd8)</br>
_Figura 2. Book Page_
![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/81c0d1da-96b5-41b0-8acc-64ddb15b1b2e)</br>
_Figura 3. Redirecționare către Google Books_
![image](https://github.com/GaitanaruTeodora/cc-project/assets/74835274/64cbd090-c555-4df9-b1d1-126756337ff6)</br>
_Figura 4. Adăugare review + lista review-uri_

### 6.	Referințe
•	https://developers.google.com/books

