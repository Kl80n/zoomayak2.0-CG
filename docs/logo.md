# Логотип ЗооМаяка

## Что используется в приложении

Пути к фирменной графике объявлены в одном месте — `src/brand.ts`:

| Константа | Файл | Где применяется |
| --- | --- | --- |
| `LOGO_FULL` | `public/logo.svg` | полный lockup в шапке и футере |
| `LOGO_MARK` | `public/emblem.svg` | компактный знак (`<ZoomayakLogo compact />`) |
| `QR_MARK` | `public/zoomayak-qr-mark.svg` | знак в центре генерируемых QR-кодов и на макетах адресников |

Векторные файлы одинаково работают в светлой и тёмной темах: под тему
подстраиваются только цвета, геометрия логотипа не меняется. К фирменной графике
не применяются CSS-фильтры (`brightness`, `invert`, `filter`) и не добавляется
белая плашка или рамка.

## Растровые мастер-файлы

Растры остаются в репозитории как исходники для печати, превью и внешних
материалов. Приложение их напрямую не подключает.

| Файл | Размер | Назначение |
| --- | --- | --- |
| `public/logo/zoomayak-master.png` | 1202 × 467 | утверждённый мастер-логотип |
| `public/logo/zoomayak-qr-mark.png` | 540 × 467 | знак для QR |
| `public/zoomayak-master-original.png` | 1251 × 496 | исходный файл от заказчика |
| `public/zoomayak-master.png` | 1251 × 496 | обработанный мастер |
| `public/zoomayak-master-icon.png` | 512 × 512 | квадратная иконка |
| `public/zoomayak-logo-approved.png` | 242 × 86 | утверждённый lockup, светлая тема |
| `public/zoomayak-logo-approved-icon.png` | 256 × 256 | утверждённая иконка |
| `public/zoomayak-logo-dark-lockup.png` | 1251 × 496 | lockup для тёмной темы |
| `public/zoomayak-logo-dark-lockup-correct.png` | 242 × 86 | исправленный тёмный lockup |
| `public/zoomayak-logo-dark-lockup-normalized.png` | 242 × 86 | тёмный lockup, приведённый к геометрии светлого |
| `public/zoomayak-logo-dark-neon-approved.png` | 242 × 86 | вариант «неоновый контур» |
| `public/zoomayak-logo-dark-outline-only.png` | 242 × 86 | только контур |
| `public/zoomayak-logo-dark.png` | 266 × 296 | тёмный знак |
| `public/zoomayak-logo-dark-icon.png` | 425 × 425 | тёмная иконка |

Растры хранятся как бинарные файлы. Их нельзя прогонять через текстовые
инструменты и утилиты, перекодирующие содержимое в UTF-8: в версии 8.10.0
пришлось восстанавливать 11 из этих файлов, потому что каждый не-ASCII байт в них
был заменён на U+FFFD и изображения перестали открываться.

## История решений

**Интеграция мастер-логотипа.** Утверждённый мастер-логотип ЗооМаяка заведён в
проект: `public/logo/zoomayak-master.png` — полный логотип,
`public/logo/zoomayak-qr-mark.png` — знак для QR. Заменены только найденные
ссылки на старые и временные `logo.svg`, `emblem.svg` и
`zoomayak-logo-approved-icon.png`.

**Увеличение и снятие подложки.** Мастер-логотип на странице увеличен, знак для
QR увеличен, из логотипного компонента убрана белая подложка.

**Чистка вариантов.** Старые варианты логотипа удалены из логики компонентов
`ZoomayakLogo` и `ZoomayakQR`; в интерфейсе остаётся один мастер-логотип, в QR —
один знак.

**Логотип в модальных окнах.** Логотип увеличен и белая круглая подложка убрана
в `SalesContractModal`, `AccountTab`, `PetPassportModal`, `SOSAlertModal`,
`ListingDetailModal`, `PetNews`, `AddPetModal`, `PricingTariffsModal`,
`CollarTagStudioModal` и `LostPetSOSTab`.

Ранние поисковые концепты логотипа (компоненты `LogoShowcaseModal` и
`LogoShowcaseSection` из снапшотов `gradient-ui-enhancer`) в проект не
возвращались: они относятся к этапу выбора логотипа, который закрыт утверждённым
мастер-файлом. Их код остаётся в истории git.
