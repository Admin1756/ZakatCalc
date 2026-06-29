import * as Icons from 'lucide-react';
import { CATEGORIES } from '../mock/mockData';

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Step 1</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-emerald-950">Select Your Category</h2>
          <p className="text-sm text-emerald-900/70 mt-1.5">Pick the one closest to your situation — we&apos;ll tailor the questions.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((c) => {
          const Icon = Icons[c.icon] || Icons.Circle;
          const isActive = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`group text-left rounded-xl border p-4 transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-900 border-emerald-900 shadow-lg shadow-emerald-900/20 -translate-y-0.5'
                  : 'bg-white border-emerald-900/10 hover:border-emerald-900/30 hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                isActive ? 'bg-amber-300/20' : 'bg-emerald-50 group-hover:bg-emerald-100'
              }`}>
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-amber-300' : 'text-emerald-800'}`} />
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${isActive ? 'text-amber-300/90' : 'text-amber-700'}`}>
                {c.tag}
              </div>
              <div className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-emerald-950'}`}>
                {c.title}
              </div>
              <div className={`text-xs mt-1 leading-snug ${isActive ? 'text-amber-100/80' : 'text-emerald-900/60'}`}>
                {c.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
