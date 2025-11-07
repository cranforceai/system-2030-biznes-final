SYSTEM 2030 BIZNES – FINAL

1. Lokalnie
---------------------------------
npm install
npm run dev

Aplikacja uruchomi się na http://localhost:5173

2. Zmienne środowiskowe
---------------------------------
W pliku .env.local (lokalnie) lub w Vercel → Settings → Environment Variables ustaw:
VITE_SUPABASE_URL=https://rekviiiaffovlzaltnkg.supabase.co
VITE_SUPABASE_ANON_KEY=TWÓJ_KLUCZ_ANON

3. Deploy na Vercel
---------------------------------
- Zaloguj się na vercel.com
- New Project → Add New… → Upload
- Wskaż folder "System-2030-Biznes-vFinal"
- Vercel sam wykryje Vite
- Deploy

4. Logowanie
---------------------------------
Logowanie działa przez Supabase (email + hasło).
Użytkowników dodajesz w Supabase → Authentication → Users.