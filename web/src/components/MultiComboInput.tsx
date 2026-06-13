import { useState, type Dispatch, type SetStateAction } from 'react'
import { StyledInput } from "../components/StyledInput"

export interface MultiComboInputProps {
    state: [string[], Dispatch<SetStateAction<string[]>>];
    label: string;
}

export const MultiComboInput = ({ state, label }: MultiComboInputProps) => {
    const [techniques, setTechniques] = state;
    const [input, setInput] = useState('');

    return (
        <div className="">
            <div className="mb-4">
                <StyledInput label={label} state={[input, setInput]} onEnter={() => {
                    if (input.trim()) {

                        setTechniques((techs) => Array.from(new Set([...techs, input.trim()])))
                        setInput('')
                    }
                }} />
            </div>
            {techniques.length > 0 && (
                <div className="border rounded p-4 flex flex-wrap gap-2">
                    {techniques.map((tech, i) => (
                        <div
                            key={i}
                            className="border py-1 px-4 rounded-full"
                            onClick={() => setTechniques(techniques.filter(t => t !== tech))}
                        >
                            {tech}
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

