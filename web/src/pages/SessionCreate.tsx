import { useState } from "react"
import { Autocomplete } from "../components/Autocomplete";
import { MultiComboInput } from "../components/MultiComboInput";

export const SessionCreate = () => {
    const arts = [
        'Muay Thai',
        'BJJ',
        'Capoeira'
    ]
    // TODO: save form to db
    const [art, setArt] = useState('');
    const [tech, setTech] = useState<string[]>([]);
    const [injured, setInjured] = useState<boolean | null>(null);
    const [injExplain, setInjExplain] = useState('');
    const [notes, setNotes] = useState('');
    return (
        <main className="mx-2 pt-2">
            <div className="py-4">
                <Autocomplete values={arts} value={art} onChange={setArt} label="Art" />
            </div>
            {art && (
                <MultiComboInput label="Tech" state={[tech, setTech]} />
            )}
            {tech.length > 0 && (
                <div className="mb-2">
                    <p className="">Injured?</p>
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <input type="radio" id='yes' checked={injured === true} onClick={() => setInjured(true)} />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" id='no' checked={injured === false} onClick={() => setInjured(false)} />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                    {injured && (
                        <TextBlock
                            value={injExplain}
                            onChange={setInjExplain}
                            placeholder="Explain"
                        />
                    )}
                </div>
            )}
            {injured !== null && (
                <TextBlock
                    value={notes}
                    onChange={setNotes}
                    placeholder="Notes"
                />
            )}
        </main>
    )
}

export interface TextBlockProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const TextBlock = ({ value, onChange, placeholder }: TextBlockProps) => {
    return (
        <div className="relative w-full ">
            <textarea
                className="field-sizing-content outline-none w-full resize-none bg-transparent font-mono text-sm p-2"
                placeholder={placeholder}
                spellCheck={false}
                value={value}
                onChange={e => onChange(e.target.value)}
                id="notes"
            />
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
            >
                <rect
                    x="0.5" y="0.5" width="99" height="99"
                    fill="none"
                    stroke="#000"
                    strokeDasharray={"3 3"}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    )
}
