# 🏇 At Yarışı Oyunu

Bu proje, Vue.js kullanılarak geliştirilmiş interaktif bir at yarışı oyunudur. Proje, yarışların oluşturulduğu, koşulduğu ve sonuçların dinamik olarak görüntülendiği bir yapıya sahiptir.

## 🛠️ Kullanılan Teknolojiler

- **Framework**: [Vue 3](https://v3.vuejs.org/) (Composition API)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Stil**: [Tailwind CSS](https://tailwindcss.com/)
- **Test**: [Vitest](https://vitest.dev/) (Birim) + [Cypress](https://www.cypress.io/) (E2E)
- **Icon Kütüphanesi**: [Lucide Vue Next](https://lucide.dev/)
- **Linting & Formatting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## 🚀 Proje Kurulumu

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**

    ```sh
    git clone <repository-url>
    cd insider-horse-racing-case

    ```

2.  **Bağımlılıkları yükleyin:**

    ```sh
    yarn install
    ```

## 📜 Mevcut Komutlar

Proje içerisinde aşağıdaki `yarn` komutlarını kullanabilirsiniz:

- `yarn dev`: Projeyi geliştirme modunda çalıştırır.
- `yarn build`: Projeyi production için derler.
- `yarn preview`: Production build'in önizlemesini sunar.
- `yarn test:unit`: Vitest ile birim testlerini çalıştırır.
- `yarn test:e2e`: Cypress ile E2E testlerini headless modda çalıştırır.
- `yarn test:e2e:dev`: Cypress arayüzünü açarak E2E testlerini interaktif modda çalıştırır.
- `yarn lint`: ESLint ile kod stilini kontrol eder ve düzeltir.
- `yarn format`: Prettier ile proje dosyalarını formatlar.

## 📁 Dizin Yapısı

Proje, modüler ve ölçeklenebilir bir yapıya sahip olacak şekilde aşağıdaki gibi organize edilmiştir:

```
src/
├── assets/       # Stil dosyaları, resimler ve fontlar
├── components/   # Tekrar kullanılabilir Vue bileşenleri
├── composables/  # Vue Composition API hook'ları
├── constants/    # Sabit değerler ve veriler
├── locales/      # i18n çeviri dosyaları
├── plugins/      # Vue plugin'leri
├── router/       # Vue Router konfigürasyonu
├── stores/       # Pinia state management modülleri
├── types/        # TypeScript tip tanımları
├── utils/        # Yardımcı fonksiyonlar
├── views/        # Sayfa bileşenleri
├── App.vue       # Ana Vue bileşeni
└── main.ts       # Uygulama giriş noktası
```
