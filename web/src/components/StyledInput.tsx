export const StyledInput = ({
    type = 'text',
    state,
    label,
    validator,
    onEnter,
}: {
    type?: 'text' | 'password';
    state: [string, React.Dispatch<React.SetStateAction<string>>];
    label?: string;
    validator?: (input: string) => boolean;
    onEnter?: () => void
}) => {
    const [value, setValue] = state
    return (
        <div className="w-full">
            <input
                className="outline-none"
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={label}
                onKeyDown={e => e.key === 'Enter' && onEnter?.()}
            />
            <svg viewBox="0 0 100 1" className="w-full h-1">
                <line
                    className="transition-all"
                    stroke='#000'
                    x1="0"
                    x2="100"
                    strokeDasharray={validator?.(value) ? "0" : "1 1"}
                />
            </svg>
        </div>
    )
}
