import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Loader2 } from 'lucide-react';

export default function WeatherDashboardEmbed() {
  const [query, setQuery] = useState('San Salvador');
  const [status, setStatus] = useState('idle'); // idle | loading | error | ready
  const [place, setPlace] = useState(null);
  const [trend, setTrend] = useState([]);

  async function search(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus('loading');

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=es`
      );
      const geoData = await geoRes.json();
      const match = geoData.results?.[0];

      if (!match) {
        setStatus('error');
        return;
      }

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${match.latitude}&longitude=${match.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
      );
      const weatherData = await weatherRes.json();

      const days = weatherData.daily.time.map((date, i) => ({
        day: new Date(date).toLocaleDateString('es', { weekday: 'short' }),
        max: weatherData.daily.temperature_2m_max[i],
        min: weatherData.daily.temperature_2m_min[i],
      }));

      setPlace({ name: match.name, country: match.country });
      setTrend(days);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-2xl border border-line-light bg-paper-soft p-5 dark:border-line-dark dark:bg-ink-soft">
      <form onSubmit={search} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ciudad…"
          aria-label="Buscar ciudad"
          className="flex-1 rounded-full border border-line-light bg-paper px-4 py-2 text-sm text-ink outline-none focus-visible:border-accent dark:border-line-dark dark:bg-ink dark:text-paper"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-accent hover:text-ink dark:bg-accent dark:text-ink"
        >
          {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-4 text-sm text-steel">No encontré esa ciudad. Probá con otro nombre.</p>
      )}

      {status === 'idle' && (
        <p className="mt-4 text-sm text-steel dark:text-line-light">
          Buscá una ciudad para ver la tendencia de temperatura de los próximos 7 días.
        </p>
      )}

      {status === 'ready' && place && (
        <div className="mt-5">
          <p className="text-sm text-steel dark:text-line-light">
            {place.name}, {place.country} · tendencia 7 días
          </p>
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(value) => [`${value}°`, '']} />
                <Line type="monotone" dataKey="max" stroke="#E7A93F" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="min" stroke="#6B7280" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}