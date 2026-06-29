const PALETTE = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
];

function colorFor(name) {
  const code = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return PALETTE[code % PALETTE.length];
}

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Avatar({ name, size = 'md' }) {
  const dimension = size === 'lg' ? 'h-14 w-14 text-lg' : size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${colorFor(name)} ${dimension}`}>
      {initialsFor(name)}
    </div>
  );
}
