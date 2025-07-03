/* -------------------------------------------------
   Calendar.tsx
   ------------------------------------------------- */
import React, { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';

/* ---------- Types & Props ---------- */
export type CalendarEvent = {
  id: string;
  title: string;
  date: string;          // ISO-8601, e.g. "2025-06-12"
};

type Props = {
  title?: string;
  events: CalendarEvent[];
  initialMonth?: Date;
};

/* ---------- Component ---------- */
const Calendar: React.FC<Props> = ({
  title = 'Music for Patients',
  events,
  initialMonth = new Date(),
}) => {
  /* ----- state ----- */
  const [month, setMonth] = useState<Date>(startOfMonth(initialMonth));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [query, setQuery] = useState('');

  /* ----- helpers ----- */
  const daysThisMonth = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }),
    [month]
  );

  // Events bucketed by their date (yyyy-MM-dd → CalendarEvent[])
  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
      acc[ev.date] = acc[ev.date] ? [...acc[ev.date], ev] : [ev];
      return acc;
    }, {});
  }, [events]);

  // Optional text search
  const filteredEvents = useMemo(() => {
    if (!query.trim()) return events;
    const q = query.toLowerCase();
    return events.filter(ev => ev.title.toLowerCase().includes(q));
  }, [events, query]);

  /* ---------- render ---------- */
  return (
    <div className="w-full bg-white rounded-md shadow-md overflow-hidden flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Events"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="flex flex-grow">
        {/* --------------------------  Calendar grid  -------------------------- */}
        <div className="flex-1 p-6">
          {/* month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMonth(subMonths(month, 1))} className="p-2 rounded-md hover:bg-gray-100">
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-medium text-lg">{format(month, 'MMMM yyyy')}</h3>
            <button onClick={() => setMonth(addMonths(month, 1))} className="p-2 rounded-md hover:bg-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* actual days */}
          <div className="grid grid-cols-7 gap-1 text-sm">
            {/* leading blanks so 1st lands on correct weekday */}
            {Array(daysThisMonth[0].getDay())
              .fill(null)
              .map((_, i) => (
                <div key={`pad-${i}`} className="h-14" />
              ))}

            {daysThisMonth.map(day => {
              const key = format(day, 'yyyy-MM-dd');
              const dayEvents = eventsByDate[key] ?? [];
              const isSel = selectedDate && isSameDay(day, selectedDate);

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(day)}
                  className={`relative h-14 w-full rounded-md border
                    ${isSel ? 'border-sky-500 ring-2 ring-sky-400' : 'border-gray-200'}
                    ${isSameMonth(day, month) ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                  `}
                >
                  <span className="absolute top-1 left-1">{day.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* --------------------------  Event list  -------------------------- */}
        <aside className="w-80 border-l p-6 overflow-y-auto">
          <h4 className="font-medium mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'All Events'}
          </h4>

          {(selectedDate
            ? filteredEvents.filter(ev => isSameDay(parseISO(ev.date), selectedDate))
            : filteredEvents
          ).map(ev => (
            <div
              key={ev.id}
              className="border rounded-md p-4 mb-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sky-600 text-sm mb-1">
                <CalendarIcon size={14} />
                {format(parseISO(ev.date), 'MMMM d, yyyy')}
              </div>
              <p className="font-semibold">{ev.title}</p>
            </div>
          ))}

          {selectedDate &&
            filteredEvents.filter(ev => isSameDay(parseISO(ev.date), selectedDate)).length === 0 && (
              <p className="text-sm text-gray-500">No events.</p>
            )}
        </aside>
      </div>
    </div>
  );
};

export default Calendar;
