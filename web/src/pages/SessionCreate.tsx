import { useState } from "react"
import { StyledInput } from "../components/StyledInput"
import { Autocomplete } from "../components/Autocomplete";

export const SessionCreate = () => {
    const arts = [
        'Muay Thai',
        'BJJ',
        'Capoeira'
    ]
    const [art, setArt] = useState('');
    const [tech, setTech] = useState('');
    return (
        <main className="mx-2 pt-2">
            <div className="py-4">
                <Autocomplete values={arts} value={art} onChange={setArt} label="Art" />
            </div>
            {art && (
                <StyledInput label="Tech" state={[tech, setTech]} />
            )}
        </main>
    )
}

