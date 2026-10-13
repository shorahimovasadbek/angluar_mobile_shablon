# template_angular_mobile

Angular 22 + Ionic 9 + Capacitor 8 mobil ilova shabloni. `litez_express_mobile` strukturasiga asoslangan.

## Ishga tushirish

```bash
npm install
npm start                 # brauzerda (ng serve)
npx cap add android       # bir marta: native loyiha yaratish
npx cap add ios
npm run android           # build + sync + Android Studio
npm run ios               # build + sync + Xcode
```

Yangi loyiha boshlaganda o'zgartiring: `package.json → name`, `capacitor.config.ts → appId/appName`,
`src/environments/*.ts → apiUrl`, `src/tailwind.css → ranglar`, `src/index.html → title`.

## Struktura

```
src/
├── main.ts                 # provider'lar + app initializer (auth/til tiklash, splash)
├── tailwind.css            # dizayn tokenlari — rang/radius/shrift uchun yagona manba
├── global.scss             # Ionic CSS
├── theme/                  # Ionic o'zgaruvchilari tokenlarga bog'langan
├── environments/           # apiUrl (dev / prod)
├── assets/i18n/            # ru.json, uz.json
└── app/
    ├── app.routes.ts       # yuqori darajadagi marshrutlar + guard'lar
    ├── tabs/               # pastki tab bar va uning marshrutlari
    ├── core/               # ilova bo'ylab yagona (singleton) infratuzilma
    │   ├── api/            # ApiError, server xatosini formaga bog'lash
    │   ├── auth/           # Auth servis (signal holat) + modellar
    │   ├── guards/         # authGuard, guestGuard
    │   ├── i18n/           # Lang servis (til tanlash/saqlash)
    │   ├── interceptors/   # token/til header'lari, xato + 401 refresh
    │   ├── native/         # Capacitor wrapper'lari (AppStorage)
    │   └── ui/             # Toastr
    ├── shared/             # biznes-logikasiz qayta ishlatiladigan narsalar
    │   ├── ui/             # ui-button, ui-input, ui-page
    │   └── utils/          # sof funksiyalar (format)
    └── features/           # sahifalar — har biri o'z papkasida
        ├── auth/
        ├── home/
        └── profile/
```

## Qoidalar

- **Qatlamlar:** `features → shared, core`; `shared → core` (faqat kerak bo'lsa); `core` hech qachon `features` ni import qilmaydi. Feature boshqa feature'ni import qilmaydi — umumiy narsa `shared/` ga chiqariladi.
- **Alias'lar:** `@core/*`, `@shared/*`, `@features/*`, `@env/*` — `../../..` yo'q.
- **Holat:** signal'lar. Servisda `private _x = signal()` + `readonly x = this._x.asReadonly()` — tashqaridan faqat o'qiladi.
- **Komponentlar:** standalone, `input()` / `output()` / `model()`, `inject()`, yangi control flow (`@if`, `@for`).
- **Formalar:** `@angular/forms/signals` (`form`, `[formField]`, `submission.action`); server xatosi `toFieldError()` bilan maydonga bog'lanadi.
- **HTTP:** komponentda `HttpClient` ishlatilmaydi — servis orqali. Endpoint'lar servis boshida `const API = {...}` da.
- **Matn:** hech qanday hardcode matn yo'q — hammasi `assets/i18n/*.json` da, `translate` pipe orqali.
- **Stil:** rang/o'lcham faqat token orqali (`var(--color-brand)` yoki `bg-brand`), hex kod komponentda yozilmaydi.
- **Nomlash:** fayllar `kebab-case`, sahifa `xxx-page.ts` → `XxxPage`, umumiy UI `ui-xxx` selector → `UiXxx`.

## Yangi sahifa qo'shish

1. `src/app/features/orders/orders-page.{ts,html,scss}` yarating (`selector: 'app-orders-page'`, `<ui-page>` ichida).
2. Marshrutni `tabs/tabs.routes.ts` (yoki `app.routes.ts`) ga `loadComponent` bilan qo'shing.
3. API kerak bo'lsa — `features/orders/orders.service.ts` (feature'ga xos) yoki `core/` (umumiy).
4. Tarjimalarni `ru.json` va `uz.json` ga qo'shing.
