'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useId, useState } from 'react';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const uniqueId = useId();

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
      if (stored === 'dark' || stored === 'light') {
        setIsDark(stored === 'dark');
        setTheme(stored);
      } else if (resolvedTheme) {
        setIsDark(resolvedTheme === 'dark');
      }
    } catch {}
  }, [setTheme, resolvedTheme]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark, isMounted]);

  const handleToggle = () => {
    const next = !isDark;
    setIsDark(next);
    setTheme(next ? 'dark' : 'light');
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Sun Icon */}
      <div className="w-5 h-5 flex items-center justify-center">
        <svg width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width={19} height={19} fill={`url(#pattern0_17_45_${uniqueId})`} />
          <defs>
            <pattern id={`pattern0_17_45_${uniqueId}`} patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref={`#image0_17_45_${uniqueId}`} transform="scale(0.0526316)" />
            </pattern>
            <image id={`image0_17_45_${uniqueId}`} width={19} height={19} preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAAXNSR0IB2cksfwAAAMlQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4EFx1gAAAEN0Uk5TAIQF/wMUZWIRIPZTBgJP8B6hNG/J3TObDkEH/fw/DJmXRPHvRaf796YkZvJnJqijEBoBfyGP64spE4APgxINYGMXnglqreUAAADZSURBVHicfZDLC0FhEMXneEWRbh6xEAkl0pUiCyl/OBIpIhKx8MyCBQkLr9t1v3sbysJsvvP9ZuacGhAX1I9iYQJeX2Z9CmFTLHfx2m+COYC7NuK8ErkAnPRd6ew+egBVPfgP3r3hF9C6O7EXPEnYcIaZk5RPbnjLLLTSmcu7jK6ZReax/QXxBSmJObPYzExxUBKT1JRZeJHGSPfLjJmlh/QnV549DJQh9A2WG2QHWfRymnFX7ums2CmgZczJzna+LVgJDe1bbpbqgkq17/2KHd/u96ZUqbJ6A5i4OzxbCIQCAAAAAElFTkSuQmCC" />
          </defs>
        </svg>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={handleToggle}
        className="relative inline-flex h-5 w-8 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-200 focus:outline-none"
        role="switch"
        aria-checked={isDark}
      >
        <span
          className={`inline-block size-3 transform rounded-full bg-orange-500 transition-transform duration-200 ${
            isDark ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>

      {/* Moon Icon */}
      <div className="w-5 h-5 flex items-center justify-center">
        <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width={16} height={17} fill={`url(#pattern0_17_46_${uniqueId})`} />
          <defs>
            <pattern id={`pattern0_17_46_${uniqueId}`} patternContentUnits="objectBoundingBox" width={1} height={1}>
              <use xlinkHref={`#image0_17_46_${uniqueId}`} transform="scale(0.0625 0.0588235)" />
            </pattern>
            <image id={`image0_17_46_${uniqueId}`} width={16} height={17} preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAMAAADjcdz2AAAAAXNSR0IB2cksfwAAAIFQTFRFWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzWWJzjWN1OwAAACt0Uk5TAKp6Vf9jdlA9dPmwSfetKNzC8E/YQ6SIGTqveGZ35ikcWD859OwrVMn2QpaCxNEAAACTSURBVHicTY/ZCsJQDEQzFJe6W6VQkGrxwf//GR8UiiCKUOq+K2LufgfCZE4gMCAh4Eda4AlA+Higytfg5UD9y1Z5ONB4s9VuFrSewsKLBZ279ObJgN5VevtgQHRWS7fUYHjUp36hQLw37wbYCZAUZBWDRemWfIHGGz+PuEu2djnNRdspVipmWMj6RDNgOSmTOa9/ib8eU1P/U/UAAAAASUVORK5CYII=" />
          </defs>
        </svg>
      </div>
    </div>
  );
}
