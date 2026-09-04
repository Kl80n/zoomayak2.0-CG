import React, { useMemo, useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ShoppingBag, 
  PawPrint, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  X, 
  Heart,
  Sparkles,
  Trash2,
  CheckCircle2,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimalListing, ServiceListing } from '../types';
import { INITIAL_ANIMAL_LISTINGS } from '../data/mockData';
import { ListingDetailModal } from './ListingDetailModal';
import { SourceBadge } from './SourceBadge';
import { getAutoParsedAvitoListings, syncAvitoFeedInBackground } from '../services/avitoParser';

interface MarketplaceTabProps { services: ServiceListing[]; }
type MarketMode = 'animals' | 'services' | 'favorites' | 'mine';

const FAVORITES_STORAGE_KEY = 'zoomayak_market_favorites_v1';

export const MarketplaceTab: React.FC<MarketplaceTabProps> = ({ services }) => {
  const [mode, setMode] = useState<MarketMode>('animals');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<'all' | AnimalListing['source']>('all');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | AnimalListing['species']>('all');
  const [showPublish, setShowPublish] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [published, setPublished] = useState<AnimalListing[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalListing | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);

  // Automatically ingested Avito listings
  const [autoAvitoListings, setAutoAvitoListings] = useState<AnimalListing[]>(() => {
    return getAutoParsedAvitoListings();
  });

  // Silent background sync on mount to ensure freshness
  useEffect(() => {
    let isMounted = true;
    syncAvitoFeedInBackground().then(res => {
      if (isMounted && res.listings.length > 0) {
        setAutoAvitoListings(res.listings);
      }
    }).catch(() => {
      // silent
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Favorites state persistent in localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default favorites for rich initial UX: golden retriever + meynkun
    return ['animal-1', 'animal-5'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (!exists) {
        confetti({ particleCount: 22, spread: 45 });
      }
      return next;
    });
  };

  const allAnimals = useMemo(() => [
    ...published, 
    ...autoAvitoListings, 
    ...INITIAL_ANIMAL_LISTINGS
  ], [published, autoAvitoListings]);

  const listings = useMemo(() => allAnimals.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [item.title, item.breed, item.city, item.description].some(v => v.toLowerCase().includes(q));
    const matchesSource = source === 'all' || item.source === source;
    const matchesSpecies = speciesFilter === 'all' || item.species === speciesFilter;
    return matchesQuery && matchesSource && matchesSpecies;
  }), [query, source, speciesFilter, allAnimals]);

  const favoriteAnimals = useMemo(() => 
    allAnimals.filter(item => favoriteIds.includes(item.id)),
    [allAnimals, favoriteIds]
  );

  const favoriteServices = useMemo(() => 
    services.filter(item => favoriteIds.includes(item.id)),
    [services, favoriteIds]
  );

  const totalFavoritesCount = favoriteAnimals.length + favoriteServices.length;

  const syncSources = async () => {
    setSyncing(true);
    try {
      const result = await syncAvitoFeedInBackground();
      setAutoAvitoListings(result.listings);
      setSyncNotice('Лента объявлений успешно обновлена');
      setTimeout(() => setSyncNotice(null), 3000);
    } catch {
      // ignore
    } finally {
      setSyncing(false);
    }
  };

  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const species = String(data.get('species')) as AnimalListing['species'];
    const photoBySpecies: Record<AnimalListing['species'], string> = {
      dog: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80',
      cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
      bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80',
      rodent: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=80',
      reptile: 'https://images.unsplash.com/photo-1526161280731-2a0e3c2a6b1f?auto=format&fit=crop&w=900&q=80',
      other: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80',
    };
    const item: AnimalListing = {
      id: `mine-${Date.now()}`, 
      title: String(data.get('title') || 'Новое объявление'), 
      species,
      breed: String(data.get('breed') || 'Порода не указана'), 
      age: String(data.get('age') || 'Возраст не указан'), 
      sex: String(data.get('sex')) as AnimalListing['sex'],
      price: Number(data.get('price') || 0), 
      city: String(data.get('city') || 'Ярославль'), 
      source: 'ЗооМаяк', 
      sourceUrl: '#', 
      imageUrl: photoBySpecies[species], 
      description: String(data.get('description') || ''), 
      publishedAt: 'Только что', 
      verified: true,
    };
    setPublished(prev => [item, ...prev]);
    setShowPublish(false);
    setMode('mine');
    confetti({ particleCount: 35 });
  };

  return (
    <div className="market-shell">
      <div className="market-hero">
        <div>
          <span className="eyebrow"><ShoppingBag className="w-4 h-4" /> МАРКЕТПЛЕЙС ЗООМАЯКА</span>
          <h1>Объявления для питомцев</h1>
          <p>Продажа породистых животных, проверенные питомники и услуги в единой витрине. Автоматическая синхронизация объявлений с площадок (Avito, VK, ЗооМаяк), проверка ветпаспортов и сохранение в избранное.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setShowPublish(true)} className="primary-cta">
            <Plus className="w-4 h-4" /> Разместить объявление
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="mb-4 p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
            <span>{syncNotice}</span>
          </div>
          <button 
            onClick={() => setSyncNotice(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="market-tabs">
        <button 
          className={mode === 'animals' ? 'is-active' : ''} 
          onClick={() => setMode('animals')}
        >
          <PawPrint /> Продажа животных <span>{allAnimals.length}</span>
        </button>
        <button 
          className={mode === 'services' ? 'is-active' : ''} 
          onClick={() => setMode('services')}
        >
          <ShoppingBag /> Услуги <span>{services.length}</span>
        </button>
        <button 
          className={`${mode === 'favorites' ? 'is-active' : ''} ${totalFavoritesCount > 0 ? 'text-rose-500 font-black' : ''}`} 
          onClick={() => setMode('favorites')}
        >
          <Heart className={`w-4 h-4 ${totalFavoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} /> Избранное 
          <span className={totalFavoritesCount > 0 ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 font-extrabold' : ''}>
            {totalFavoritesCount}
          </span>
        </button>
        <button 
          className={mode === 'mine' ? 'is-active' : ''} 
          onClick={() => setMode('mine')}
        >
          <ShieldCheck /> Мои объявления <span>{published.length}</span>
        </button>
      </div>

      {mode === 'favorites' ? (
        <div className="space-y-6">
          {totalFavoritesCount === 0 ? (
            <div className="market-empty py-16 text-center">
              <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-2">В избранном пока пусто</h3>
              <p className="max-w-md mx-auto text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Нажимайте на сердечко <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-current" /> в карточках объявлений или услуг, чтобы сохранить их в этот список для быстрого доступа.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setMode('animals')} className="primary-cta text-xs">
                  <PawPrint className="w-4 h-4" /> Смотреть животных
                </button>
                <button onClick={() => setMode('services')} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <ShoppingBag className="w-4 h-4 inline mr-1.5" /> Смотреть услуги
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Сохраненные карточки: {totalFavoritesCount}</span>
                </div>
                <button 
                  onClick={() => setFavoriteIds([])}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-500 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Очистить избранное
                </button>
              </div>

              {favoriteAnimals.length > 0 && (
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                    <PawPrint className="w-4 h-4 text-teal-500" /> Животные ({favoriteAnimals.length})
                  </h3>
                  <div className="animal-listing-grid">
                    {favoriteAnimals.map(item => (
                      <AnimalCard 
                        key={item.id} 
                        item={item} 
                        isFavorite={true}
                        onToggleFavorite={(e) => toggleFavorite(item.id, e)}
                        onOpen={() => setSelectedAnimal(item)} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {favoriteServices.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-teal-500" /> Услуги и клиники ({favoriteServices.length})
                  </h3>
                  <div className="services-grid">
                    {favoriteServices.map(service => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isFavorite={true}
                        onToggleFavorite={(e) => toggleFavorite(service.id, e)}
                        onOpen={() => setSelectedService(service)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : mode === 'animals' || mode === 'mine' ? (
        <>
          <div className="market-toolbar">
            <div className="market-search">
              <Search />
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="Порода, город или ключевое слово" 
              />
            </div>
            <label className="market-filter">
              <PawPrint />
              <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value as typeof speciesFilter)}>
                <option value="all">Все животные</option>
                <option value="dog">🐶 Собаки</option>
                <option value="cat">🐱 Кошки</option>
                <option value="bird">🦜 Птицы</option>
                <option value="rodent">🐹 Грызуны</option>
                <option value="reptile">🦎 Рептилии</option>
                <option value="other">🐾 Другое</option>
              </select>
            </label>
            <div className="market-sources">
              <button className={source === 'all' ? 'is-active' : ''} onClick={() => setSource('all')}>
                Все источники
              </button>
              {(['Avito','VK','Telegram','ЗооМаяк'] as const).map(s => (
                <button key={s} className={source === s ? 'is-active' : ''} onClick={() => setSource(s)}>
                  {s}
                </button>
              ))}
            </div>
            <button className="market-sync cursor-pointer" onClick={syncSources}>
              <RefreshCw className={syncing ? 'spin' : ''} /> {syncing ? 'Обновляем…' : 'Обновить ленту'}
            </button>
          </div>

          <div className="market-source-note">
            <ShieldCheck />
            <span>
              <strong>Единый каталог:</strong> Все объявления автоматически агрегируются и синхронизируются с популярных площадок (Avito, VK, ЗооМаяк) с обязательной проверкой ветеринарных документов.
            </span>
          </div>

          {mode === 'mine' && published.length === 0 ? (
            <div className="market-empty">
              <PawPrint />
              <h3>У вас пока нет объявлений</h3>
              <p>Разместите первое объявление — оно появится в разделе «Мои объявления» и в общей ленте ЗооМаяка.</p>
              <button onClick={() => setShowPublish(true)} className="primary-cta">
                <Plus /> Разместить объявление
              </button>
            </div>
          ) : (
            <div className="animal-listing-grid">
              {listings.map(item => (
                <AnimalCard 
                  key={item.id} 
                  item={item} 
                  isFavorite={favoriteIds.includes(item.id)}
                  onToggleFavorite={(e) => toggleFavorite(item.id, e)}
                  onOpen={() => setSelectedAnimal(item)} 
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <ServicesGrid 
          services={services} 
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpen={(s) => setSelectedService(s)} 
        />
      )}

      {showPublish && (
        <PublishModal onClose={() => setShowPublish(false)} onSubmit={publish} />
      )}

      {selectedAnimal && (
        <ListingDetailModal 
          isOpen={Boolean(selectedAnimal)} 
          onClose={() => setSelectedAnimal(null)} 
          listing={selectedAnimal} 
          isFavorite={favoriteIds.includes(selectedAnimal.id)}
          onToggleFavorite={(id) => toggleFavorite(id)}
        />
      )}

      {selectedService && (
        <ListingDetailModal 
          isOpen={Boolean(selectedService)} 
          onClose={() => setSelectedService(null)} 
          service={selectedService} 
          isFavorite={favoriteIds.includes(selectedService.id)}
          onToggleFavorite={(id) => toggleFavorite(id)}
        />
      )}
    </div>
  );
};

const AnimalCard: React.FC<{
  item: AnimalListing;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onOpen: () => void;
}> = ({ item, isFavorite, onToggleFavorite, onOpen }) => (
  <article 
    className="animal-card group cursor-pointer hover:shadow-lg transition-all duration-200" 
    onClick={onOpen}
  >
    <div className="animal-card-image relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        loading="lazy" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80';
        }}
      />
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
        <SourceBadge source={item.source} size="sm" />
      </div>
      
      {/* Favorite Button */}
      <button
        type="button"
        onClick={onToggleFavorite}
        className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
          isFavorite 
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105' 
            : 'bg-black/40 hover:bg-black/60 text-white/90 hover:text-white'
        }`}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
    <div className="animal-card-body">
      <div className="animal-card-title">
        <h3>{item.title}</h3>
        <strong>{item.price ? `${item.price.toLocaleString('ru-RU')} ₽` : 'Договорная'}</strong>
      </div>
      <p className="animal-breed">{item.breed} · {item.age}</p>
      <p className="animal-description">{item.description}</p>
      <div className="animal-meta">
        <span><MapPin /> {item.city}</span>
        {item.verified && <span><ShieldCheck /> Проверено</span>}
      </div>
      <div className="animal-card-foot">
        <span>Источник: <b>{item.source}</b></span>
        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="text-teal-600 dark:text-teal-400 font-extrabold flex items-center gap-1 hover:underline text-xs bg-transparent border-0 p-0 cursor-pointer"
        >
          Карточка <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  </article>
);

const ServicesGrid: React.FC<{
  services: ServiceListing[];
  favoriteIds: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onOpen: (s: ServiceListing) => void;
}> = ({ services, favoriteIds, onToggleFavorite, onOpen }) => (
  <div className="services-grid">
    {services.map(service => (
      <ServiceCard
        key={service.id}
        service={service}
        isFavorite={favoriteIds.includes(service.id)}
        onToggleFavorite={(e) => onToggleFavorite(service.id, e)}
        onOpen={() => onOpen(service)}
      />
    ))}
  </div>
);

const ServiceCard: React.FC<{
  service: ServiceListing;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onOpen: () => void;
}> = ({ service, isFavorite, onToggleFavorite, onOpen }) => (
  <article 
    className="service-card group cursor-pointer hover:shadow-lg transition-all duration-200" 
    onClick={onOpen}
  >
    <div className="service-card-image relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      <img 
        src={service.imageUrl} 
        alt={service.title} 
        loading="lazy" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80';
        }}
      />
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[10px] font-black tracking-wide shadow-md backdrop-blur-md">
          {service.category === 'vet' ? 'Клиника' : service.category === 'grooming' ? 'Груминг' : service.category === 'hotel' ? 'Отель' : 'Дрессировка'}
        </span>
      </div>

      {/* Favorite Button */}
      <button
        type="button"
        onClick={onToggleFavorite}
        className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
          isFavorite 
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105' 
            : 'bg-black/40 hover:bg-black/60 text-white/90 hover:text-white'
        }`}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
    <div className="service-card-body">
      <div className="service-card-head">
        <h3>{service.title}</h3>
        <div className="service-card-rating">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{service.rating}</span>
          <small>({service.reviewsCount})</small>
        </div>
      </div>
      <p className="service-card-address"><MapPin className="w-3.5 h-3.5 text-teal-500" /> {service.address} ({service.district})</p>
      <div className="service-badges">
        {service.badges.map(b => <span key={b}>{b}</span>)}
      </div>
      <div className="service-card-foot">
        <div>
          <small>Стоимость от</small>
          <strong>{service.priceFrom.toLocaleString('ru-RU')} {service.priceUnit}</strong>
        </div>
        <button 
          type="button" 
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="service-call-btn"
        >
          <Phone className="w-3.5 h-3.5" /> Контакты
        </button>
      </div>
    </div>
  </article>
);

const PublishModal: React.FC<{ onClose: () => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ onClose, onSubmit }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-card" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <div>
          <h3>Разместить объявление о питомце</h3>
          <p>Объявление будет мгновенно опубликовано в единой ленте ЗооМаяка</p>
        </div>
        <button onClick={onClose}><X /></button>
      </div>
      <form onSubmit={onSubmit} className="modal-form">
        <label>
          <span>Заголовок объявления</span>
          <input name="title" required placeholder="Например: Щенки лабрадора, 2 месяца" />
        </label>
        <div className="form-grid">
          <label>
            <span>Вид питомца</span>
            <select name="species" defaultValue="dog">
              <option value="dog">Собака</option>
              <option value="cat">Кошка</option>
              <option value="bird">Птица</option>
              <option value="rodent">Грызун</option>
              <option value="reptile">Рептилия</option>
              <option value="other">Другое</option>
            </select>
          </label>
          <label>
            <span>Порода</span>
            <input name="breed" required placeholder="Золотистый ретривер" />
          </label>
        </div>
        <div className="form-grid">
          <label>
            <span>Возраст</span>
            <input name="age" required placeholder="2.5 месяца" />
          </label>
          <label>
            <span>Пол</span>
            <select name="sex" defaultValue="male">
              <option value="male">Мальчик ♂</option>
              <option value="female">Девочка ♀</option>
            </select>
          </label>
        </div>
        <div className="form-grid">
          <label>
            <span>Цена (₽)</span>
            <input type="number" name="price" required placeholder="35000" />
          </label>
          <label>
            <span>Город</span>
            <input name="city" required defaultValue="Ярославль" />
          </label>
        </div>
        <label>
          <span>Описание и особенности</span>
          <textarea name="description" rows={3} placeholder="Расскажите о характере, здоровье, наличии прививок и документов..." />
        </label>
        <div className="modal-actions">
          <button type="button" onClick={onClose} className="secondary-btn">Отмена</button>
          <button type="submit" className="primary-cta">Опубликовать в ЗооМаяк</button>
        </div>
      </form>
    </div>
  </div>
);
