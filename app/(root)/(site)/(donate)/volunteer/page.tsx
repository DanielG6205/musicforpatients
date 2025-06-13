'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Volunteer() {
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const calendar = document.querySelector('.bugle-calendar');
      if (calendar && calendar.children.length > 0) {
        setCalendarLoaded(true);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center
                 min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]"
    >
      <h1 className="text-4xl font-bold mb-4">Volunteer</h1>

      <div className="w-full relative" style={{ minHeight: 300 }}>
        {!calendarLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center z-0 pointer-events-none select-none">
            Calendar not showing? Please refresh the page.
          </div>
        )}
        <div
          className="bugle-calendar mini-calendar-list relative z-10"
          data-id="365ead09-9d93-4f4a-af1a-c1a940c01eba"
          style={{ width: '100%', maxWidth: '100%', margin: '0 auto', minHeight: 300 }}
        ></div>
      </div>

      <Script
        id="bugle-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, o, f, js, fjs) {
            w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments); };
            js = d.createElement(s);
            fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
          })(window, document, "script", "_bugle", "https://widgets.buglevolunteers.com/calendar.js");
          _bugle("init");`,
        }}
      />
    </div>
  );
}
