# ЗооМаяк v7.1

## ВАЖНО: загрузка в GitHub
Содержимое этого архива — **корень Vite-проекта**. Загружать нужно сами файлы `package.json`, `index.html`, `src/`, `public/` и т.д. в корень репозитория.

**НЕ создавай папку `v6` или `v7` внутри репозитория.**

Vercel должен видеть в корне:

```text
package.json
index.html
src/
public/
vite.config.ts
vercel.json
```

## Что в v7.1
- Утверждённый логотип ЗооМаяка из master-файла пользователя: маяк + собака + кошка + сердце + надпись «ЗооМаяк».
- Один master-логотип используется в шапке и QR-адреснике.
- На главной нет отдельного блока «Выберите питомца» и повторного блока «Данные питомца»: выбранный питомец показывается один раз в Hero.
- «Мои питомцы» остаётся отдельным полноценным разделом.
- «Личный кабинет» доступен из шапки и содержит профиль владельца.
- «Объявления» содержит продажу животных, услуги и «Мои объявления».
- Лента объявлений подготовлена под единый каталог Avito / VK / Telegram / ЗооМаяк; внешние источники в MVP представлены демонстрационными данными.
- QR-код настоящий и ведёт на `/qr/<ZM-ID>`; в QR встроен знак ЗооМаяка.
- Сканер использует камеру через `@zxing/browser`.

## Vercel
Build command: `npm run build`
Output directory: `dist`
Install command: `npm install`


## v8 — homepage refresh
- Approved ЗооМаяк logo is used as the master visual; the dark theme uses a transparent-background derivative without changing the artwork.
- The top navigation keeps Главная, Объявления and Потеряшка SOS; Мои питомцы, Напоминания and Здоровье are moved into the working Личный кабинет menu.
- Homepage no longer repeats pet cards or the nearest-events panel; it adds popular animal listings, feature shortcuts, SOS promo and newsletter.
- Animal listings have a species dropdown filter; pet creation uses the same species dropdown.


## v8.1.0 — clean homepage & owner cabinet

- Утверждённый логотип ЗооМаяка подключён как master-asset и читается на тёмном фоне через аккуратную светлую подложку.
- Верхняя навигация очищена: питомцы, напоминания и здоровье перенесены в Личный кабинет.
- Главная очищена от дублирующих блоков питомцев, ближайших событий и повторной карточки данных.
- На главной добавлена витрина из 5 объявлений о животных.
- Возвращён каталог объявлений с источниками Avito / VK / Telegram / ЗооМаяк.
- В создании питомца и публикации объявления добавлен единый список видов животных.
- Добавлен полноценный рабочий раздел «Личный кабинет» с профилем, питомцами, напоминаниями и здоровьем.
- Светлая тема сохранена в бело-зелёной палитре.


### v8.2.0 — cabinet & logo polish
- Master logo on dark theme uses transparent presentation with a subtle teal/blue glow instead of a white rectangle.
- Removed the visible frame from the personal-cabinet header control.
- Account sub-tabs stay inside the Personal Cabinet and provide a clear return-to-cabinet action.


## v8.3.0 — marketplace & pet news
- Главная: 5 популярных объявлений о животных.
- Каталог объявлений: фильтр по виду животного.
- Создание объявления: единый список видов животных.
- Создание питомца: единый список видов животных.
- Главная: новости о домашних питомцах с фотографиями.


## v8.4 — витрина и новости
- Главная: объявления переведены в горизонтальную карусель с кнопками навигации.
- Главная: новости о питомцах переведены в горизонтальную карусель с фотографиями.
- На мобильных карточки листаются свайпом; на ПК доступны стрелки.
- Сохранены фильтры видов животных и публикация объявлений из предыдущего релиза.


## v8.4.1 — адаптивный логотип
- На тёмной теме логотип показывается без белой плашки.
- Используется прозрачная контрастная презентационная версия того же утверждённого master-логотипа: композиция и геометрия не изменены.
- На светлой теме остаётся исходный утверждённый файл.


## v8.4.2 — homepage cleanup

- Убран дублирующий блок объявлений из `HeroSection`.
- На главной оставлена одна основная витрина объявлений — `HomeMarketplacePreview` с каруселью.
- Карусель объявлений, новости и остальные блоки главной сохранены.
- Архив релиза содержит только актуальный корень проекта, без вложенных старых копий.

## v8.4.3 — dark logo

- На тёмном фоне выбран вариант «Неоновый контур» из предоставленных вариантов.
- Белая плашка и прямоугольная рамка вокруг логотипа не используются.
- Вариант сделан прозрачным для бесшовного размещения на тёмном фоне.
- Светлая тема продолжает использовать утверждённый master-логотип без изменений.

## v8.5.0 — учётная запись

- На главной для гостя отображается «Войти / Регистрация».
- Регистрация и вход открываются в аккуратном модальном окне.
- После входа кнопка превращается в профиль владельца; из меню доступны «Открыть ЛК» и «Выйти».
- После выхода пользователь возвращается на главную.
- Состояние MVP-аккаунта хранится локально в браузере. Это UI/UX-слой; серверную авторизацию можно подключить отдельным backend-этапом.

## v8.5.1
- Исправлен чёрный экран при открытии регистрации: добавлены недостающие иконки авторизации и рабочая локальная проверка учётной записи.
- Тёмная тема получила полноценный lockup логотипа: неоновый контур + точное название «ЗооМаяк» + слоган «Ваш ориентир в мире питомцев», без белой плашки.
- Светлая тема сохраняет утверждённый master-логотип.
- Регистрация и вход сохраняются локально в браузере в рамках MVP; выход очищает активную сессию.


### v8.5.2 — logo dark theme
- Светлая тема: утверждённый master-логотип без изменений.
- Тёмная тема: отдельный прозрачный neon-lockup на основе того же master-логотипа, без белой плашки.
- Сохраняются название «ЗооМаяк» и слоган «Ваш ориентир в мире питомцев».


### v8.5.2 — logo fix
- Dark theme uses a transparent contrast version of the approved master logo with the same composition, wordmark and slogan.
- Removed all CSS brightness/invert/filter effects from brand artwork.


## v8.6.0 — header fixes
- Dark-theme logo uses a normalized transparent lockup so the approved logo keeps the same visual size as the light theme and remains readable.
- Account dropdown is closed by default, opens only on click, closes on outside click, navigation, and logout.
## v8.8.1 — logo animals correction

- Replaced the theme-dependent raster logo component with a single vector lockup.
- Corrected the cat outline: no protruding stroke/“stick” at the back of the head/neck.
- Kept the same logo geometry, title and slogan in light and dark themes; only colors adapt to the theme.



### v8.9.0 — approved logo master
Header now uses the approved 242×86 light/dark lockup assets directly. No SVG redraw, no separate wordmark, and identical display geometry in both themes.


## v8.9.4 audit
- Dark logo uses approved light master artwork with restrained contour glow.
- Light theme overrides hard-coded dark utility backgrounds, including footer and modal surfaces.
