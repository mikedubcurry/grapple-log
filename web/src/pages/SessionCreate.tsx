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
    return (
        <main className="mx-2 pt-2">
            <div className="py-4">
                <Autocomplete values={arts} value={art} onChange={setArt} label="Art" />
            </div>
            {art && (
                <MultiComboInput label="Tech" state={[tech, setTech]} />
            )}
            {tech.length > 0 && (
                <>
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
                    {/* TODO: add injury details */}
                </>
            )}
            {injured !== null && (
                <>
                    <p>Notes</p>
                    {/* TODO: add notes section */}
                </>

            )}
        </main>
    )
}
