This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Dokumentasjon

### Planlegging
Jeg fikk i oppgave å lage en treningsnettside med database som skulle inneholde bruker, treningsøkter og grupper. Jeg startet med å planlegge hvordan nettsiden skulle se ut og hva jeg skulle bruke for å lage nettsiden og databasen. Jeg landet til slutt på å bruke railway for å hoste en postgres databasen og bruke prisma og nextjs for å koble til denne databasen fra frontend.
### Databasemodell
Som sagt så brukte jeg **prisma** og **railway** for å lage databasen gjennom et nextJS prosjekt. Jeg endte opp med noen få forskjellige tabeller som: User, Workout,Group,Session. Her er et eksempel på strukturen av en bruker:
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  workouts  Workout[]
  groups    UserGroup[]
} 
```
Jeg brukte lang tid på å lære meg hvordan jeg skulle sette disse opp til å fungere sammen med frontend rammeverket jeg jobber med som er som sagt nextJS. Jeg fikk det endelig til og har et resultat jeg er veldig fornøyd med på denne delen av oppgaven. Jeg har lært masse om hvordan man setter opp en database.
### Hente og vise data
For å hente ut dataen og vise brukte jeg typescript. Jeg brukte diverse route filer for å hente(GET) og lage/poste(POST). Jeg kan da hente ut dataen fra routene og bruke en UI-component for å vise til brukeren. Dette fungerte veldig bra og var ikke klyngete spaghetti kode som var veldig nice på øynene mens jeg jobba. Jeg hadde satt opp et grid som viser all informasjonen om brukere workouts og gruppene. Jeg lærte masse om hvordan jeg skal vise data fra en database i frontend.  
### Versjonskontroll
For versjonskontroll brukte jeg github og git commandoer. Jeg brukte dette siden det er en enkel og god måte å passe på at du ikke mister prosjekter og en lett måte å jobbe på andre platformer. Så hvis jeg vil jobbe hjemme kan jeg det uten å måtte manuellt flytte filene over.
