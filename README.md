# Jera Movies 🍿

![Cover](https://github.com/josee-fernandes/jera-movies/assets/51970876/44e2d1cb-509c-4f55-9bb6-672ca062bc69)

Application for a code challenge from [Jera](https://jera.com.br).

## Instructions

Run development server:

`$ pnpm run dev`

It will run by default on [http://localhost:3000](http://localhost:3000)

To run the database (postgresql):

`$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

With docker running:

`$ pnpm dlx prisma migrate dev`

Don't forget to fill the environment variables:

DATABASE_URL=
DATABASE_DIRECT_URL=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=

THEMOVIEDB_API_KEY=
THEMOVIEDB_ACCESS_TOKEN=
NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN=

JWT_SECRET=

## Live preview 🟢

https://jeramovies.vercel.app/

## Requirements checklist

### Database 🪪

- [x] Modeling
- [ ] Programming

### Backend ⚙️

- [x] Sign Up
- [x] Sign In
- [x] Social Sign In (Facebook)
- [x] Create profile
- [x] Update profile (name)
- [x] List profiles
- [x] Movie suggestion list
- [x] Search movie by query
- [x] Toggle between watched or to watch
- [x] Filtered list by watched or to watch
- [ ] Share watched movie on Facebook
- [ ] Notify to watch

### Design 🎨

- [x] Logo
- [x] Style Guide (colors, fonts)
- [ ] Assets (movie posters)
- [x] Landing Page
- [x] Sign Up
- [x] Sign In
- [x] Create profile
- [x] Choose profile
- [x] Home
  - [x] Movie suggestion
  - [x] To watch movies
  - [x] Watched movies

### Frontend 💻

- [x] Initial setup
- [ ] Landing Page
  - [ ] Layout
- [x] Sign Up
  - [x] Layout
  - [x] API Integration
- [x] Sign In
  - [x] Layout
  - [x] API Integration
- [x] Choose profile
  - [x] Layout
  - [x] API Integration
- [x] Home
  - [x] Movie suggestion
    - [x] Layout
    - [x] API Integration
  - [x] To watch movies
    - [x] Layout
    - [x] API Integration
  - [x] Watched movies
    - [x] Layout
    - [x] API Integration

### License

Not added yet.
