import { useCallback, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

export interface AutocompleteProps {
    values: string[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
}

export const Autocomplete = ({
    values,
    value,
    onChange,
    label,
}: AutocompleteProps) => {
    const [query, setQuery] = useState(value ?? '')
    const [matches, setMatches] = useState<string[]>([])
    const [activeIdx, setActiveIdx] = useState(-1)
    const [open, setOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const getMatches = useCallback((q: string) => {
        return q
            ? values
                .filter(v =>
                    v.toLowerCase().startsWith(q.toLowerCase()))
                .sort()
            : []
    }, [values])

    const ghostSuffix = matches.length > 0 && activeIdx < 0
        ? matches[0].slice(query.length)
        : '';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value
        setQuery(q)
        onChange?.(q)

        const m = getMatches(q)
        setMatches(m)
        setActiveIdx(-1)
        setOpen(m.length > 0)
    }

    const accept = (val: string) => {
        setQuery(val)
        onChange?.(val)
        setMatches([])
        setActiveIdx(-1)
        setOpen(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!open && e.key === 'Escape') return

        if (e.key === 'Tab' || e.key === 'ArrowRight') {
            if (matches.length) {
                e.preventDefault()
                accept(activeIdx >= 0 ? matches[activeIdx] : matches[0])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIdx(i => Math.min(i + 1, matches.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIdx(i => Math.max(i - 1, -1))
        } else if (e.key === 'Enter') {
            if (matches.length) {
                e.preventDefault()
                accept(activeIdx >= 0 ? matches[activeIdx] : matches[0])
            }
        } else if (e.key === 'Escape') {
            setOpen(false)
            setActiveIdx(-1)
        }
    }

    useEffect(() => {
        if (activeIdx >= 0 && listRef.current) {
            listRef.current.children[activeIdx]?.scrollIntoView({ block: 'nearest' })
        }
    }, [activeIdx])

    return (
        <div className="relative">
            <div aria-hidden className="absolute inset-0 flex items-center px-3 pointer-events-none font-mono text-sm">
                <span className="text-transparent">{query}</span>
                <span className="text-gray-400">{ghostSuffix}</span>
            </div>

            <div className="w-full">
                <input
                    ref={inputRef}
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setOpen(false)}
                    placeholder={label}
                    autoComplete="off"
                    spellCheck={false}
                    role="combobox"
                    aria-expanded={open}
                    aria-autocomplete="list"
                    className="relative z-10 outline-none w-full bg-transparent font-mono text-sm"
                />
                <svg viewBox="0 0 100 1" className="w-full h-1">
                    <line
                        className="transition-all"
                        stroke="#000"
                        x1="0"
                        x2="100"
                        strokeDasharray={values.includes(query) ? "0" : "1 1"}
                    />
                </svg>
            </div>

            {open && (
                <ul
                    ref={listRef}
                    role="listbox"
                    className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-sm overflow-auto max-h-60"
                >
                    {matches.map((m, i) => (
                        <li
                            key={m}
                            role="option"
                            aria-selected={i === activeIdx}
                            onMouseDown={(e: React.MouseEvent) => { e.preventDefault(); accept(m); }}
                            className={`px-3 py-2 text-sm font-mono cursor-pointer ${i === activeIdx ? "bg-gray-100" : "hover:bg-gray-50"
                                }`}
                        >
                            <strong className="font-medium">{m.slice(0, query.length)}</strong>
                            <span className="text-gray-400">{m.slice(query.length)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
