import React, { useMemo, useState } from 'react';
import { Search, Star, MapPin, Phone, Clock, ShieldCheck, ShoppingBag, PawPrint, Plus, ExternalLink, RefreshCw, SlidersHorizontal, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimalListing, ServiceListing } from '../types';
import { INITIAL_ANIMAL_LISTINGS } from '../data/mockData';

interface MarketplaceTabProps { services: ServiceListing[]; }
type MarketMode = 'animals' | 'services' | 'mine';

export const MarketplaceTab: React.FC<MarketplaceTabProps> = ({ services }) => {
  const [mode, setMode] = useState<MarketMode>('animals');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<'all' | AnimalListing['source']>('all');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | AnimalListing['species']>('all');
  const [showPublish, setShowPublish] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [published, setPublished] = useState<AnimalListing[]>([]);

  const listings = useMemo(() => [...published, ...INITIAL_ANIMAL_LISTINGS].filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [item.title, item.breed, item.city, item.description].some(v => v.toLowerCase().includes(q));
    const matchesSource = source === 'all' || item.source === source;
    const matchesSpecies = speciesFilter === 'all' || item.species === speciesFilter;
    return matchesQuery && matchesSource && matchesSpecies;
  }), [query, source, speciesFilter, published]);

  const syncSources = () => {
    setSyncing(true);
    window.setTimeout(() => setSyncing(false), 1100);
  };

  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const species = String(data.get('species')) as AnimalListing['species'];
    const photoBySpecies: Record<AnimalListing['species'], string> = {
      dog: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80',
      cat: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
      bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80',
      rodent: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=80',
      reptile: 'https://images.unsplash.com/photo-1526161280731-2a0e3c2a6b1f?auto=format&fit=crop&w=900&q=80',
      other: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80',
    };
    const item: AnimalListing = {
      id: `mine-${Date.now()}`, title: String(data.get('title') || 'Новое объявление'), species,
      breed: String(data.get('breed') || 'Порода не указана'), age: String(data.get('age') || 'Возраст не указан'), sex: String(data.get('sex')) as AnimalListing['sex'],
      price: Number(data.get('price') || 0), city: String(data.get('city') || 'Ярославль'), source: 'ЗооМаяк', sourceUrl: '#',
      imageUrl: photoBySpecies[species], description: String(data.get('description') || ''), publishedAt: 'Только что', verified: true,
    };
    setPublished(prev => [item, ...prev]);
    setShowPublish(false);
    setMode('mine');
    confetti({ particleCount: 35 });
  };

  return <div className="market-shell">
    <div className="market-hero">
      <div><span className="eyebrow"><ShoppingBag className="w-4 h-4" /> МАРКЕТПЛЕЙС ЗООМАЯКА</span><h1>Объявления для питомцев</h1><p>Продажа животных, товары и услуги в одной ленте. Внешние источники собираются в единый каталог, а объявления ЗооМаяка публикуются отдельно.</p></div>
      <button onClick={() => setShowPublish(true)} className="primary-cta"><Plus className="w-4 h-4" /> Разместить объявление</button>
    </div>

    <div className="market-tabs">
      <button className={mode === 'animals' ? 'is-active' : ''} onClick={() => setMode('animals')}><PawPrint /> Продажа животных <span>{INITIAL_ANIMAL_LISTINGS.length}</span></button>
      <button className={mode === 'services' ? 'is-active' : ''} onClick={() => setMode('services')}><ShoppingBag /> Услуги <span>{services.length}</span></button>
      <button className={mode === 'mine' ? 'is-active' : ''} onClick={() => setMode('mine')}><ShieldCheck /> Мои объявления <span>{published.length}</span></button>
    </div>

    {mode === 'animals' || mode === 'mine' ? <>
      <div className="market-toolbar">
        <div className="market-search"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Порода, город или ключевое слово" /></div>
        <label className="market-filter"><PawPrint /><select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value as typeof speciesFilter)}><option value="all">Все животные</option><option value="dog">🐶 Собаки</option><option value="cat">🐱 Кошки</option><option value="bird">🦜 Птицы</option><option value="rodent">🐹 Грызуны</option><option value="reptile">🦎 Рептилии</option><option value="other">🐾 Другое</option></select></label>
        <div className="market-sources"><button className={source === 'all' ? 'is-active' : ''} onClick={() => setSource('all')}>Все источники</button>{(['Avito','VK','Telegram','ЗооМаяк'] as const).map(s => <button key={s} className={source === s ? 'is-active' : ''} onClick={() => setSource(s)}>{s}</button>)}</div>
        <button className="market-sync" onClick={syncSources}><RefreshCw className={syncing ? 'spin' : ''} /> {syncing ? 'Обновляем…' : 'Обновить ленту'}</button>
      </div>

      <div className="market-source-note"><ShieldCheck /><span><strong>Единый каталог:</strong> карточки помечены источником. В продакшене парсер подключается к серверным адаптерам Avito / VK / Telegram, а здесь используется демонстрационная лента без обхода ограничений площадок.</span></div>

      {mode === 'mine' && published.length === 0 ? <div className="market-empty"><PawPrint /><h3>У вас пока нет объявлений</h3><p>Разместите первое объявление — оно появится в разделе «Мои объявления» и в общей ленте ЗооМаяка.</p><button onClick={() => setShowPublish(true)} className="primary-cta"><Plus /> Разместить объявление</button></div> :
      <div className="animal-listing-grid">{listings.map(item => <AnimalCard key={item.id} item={item} />)}</div>}
    </> : <ServicesGrid services={services} />}

    {showPublish && <PublishModal onClose={() => setShowPublish(false)} onSubmit={publish} />}
  </div>;
};

const AnimalCard: React.FC<{ item: AnimalListing }> = ({ item }) => <article className="animal-card">
  <div className="animal-card-image"><img src={item.imageUrl} alt={item.title} /><span className="source-badge">{item.source}</span>{item.verified && <span className="verified-badge"><ShieldCheck /> Проверено</span>}</div>
  <div className="animal-card-body"><div className="animal-card-title"><h3>{item.title}</h3><strong>{item.price.toLocaleString('ru-RU')} ₽</strong></div><p className="animal-breed">{item.breed} · {item.age} · {item.sex === 'female' ? 'девочка' : 'мальчик'}</p><p className="animal-description">{item.description}</p><div className="animal-meta"><span><MapPin /> {item.city}</span><span>{item.publishedAt}</span></div><div className="animal-card-foot"><span>Источник: <b>{item.source}</b></span><a href={item.sourceUrl} onClick={e => e.preventDefault()}>Открыть <ExternalLink /></a></div></div>
</article>;

const ServicesGrid: React.FC<{ services: ServiceListing[] }> = ({ services }) => <div className="services-grid">{services.map(service => <article key={service.id} className="service-card">
  <img src={service.imageUrl} alt={service.title} /><div className="service-card-body"><div className="service-rating"><Star /> {service.rating} <span>({service.reviewsCount})</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-line"><MapPin /> {service.address} · {service.district}</div><div className="service-line"><Clock /> {service.openHours}</div><div className="service-card-foot"><strong>от {service.priceFrom.toLocaleString('ru-RU')} ₽</strong><a href={`tel:${service.phone}`}><Phone /> Позвонить</a></div></div>
</article>)}</div>;

const PublishModal: React.FC<{ onClose: () => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ onClose, onSubmit }) => <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl" onMouseDown={onClose}>
  <form className="publish-modal" onSubmit={onSubmit} onMouseDown={e => e.stopPropagation()}>
    <div className="publish-head"><div><span className="eyebrow compact">НОВОЕ ОБЪЯВЛЕНИЕ</span><h2>Продажа животного</h2></div><button type="button" className="icon-action" onClick={onClose}><X /></button></div>
    <div className="publish-grid"><label>Заголовок<input name="title" required placeholder="Например, щенки корги" /></label><label>Вид<select name="species"><option value="dog">🐶 Собака</option><option value="cat">🐱 Кошка</option><option value="bird">🦜 Птица</option><option value="rodent">🐹 Грызун</option><option value="reptile">🦎 Рептилия</option><option value="other">🐾 Другое</option></select></label><label>Порода<input name="breed" placeholder="Порода" /></label><label>Возраст<input name="age" placeholder="3 месяца" /></label><label>Пол<select name="sex"><option value="female">Девочка</option><option value="male">Мальчик</option></select></label><label>Цена, ₽<input name="price" type="number" min="0" placeholder="30000" /></label><label>Город<input name="city" defaultValue="Ярославль" /></label><label className="publish-wide">Описание<textarea name="description" rows={4} placeholder="Расскажите о животном, документах и состоянии" /></label></div>
    <div className="publish-foot"><span>После публикации источник будет отмечен как «ЗооМаяк».</span><button className="primary-cta" type="submit"><Plus /> Опубликовать</button></div>
  </form>
</div>;
