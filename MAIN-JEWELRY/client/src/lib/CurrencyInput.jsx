import { formatBigNumber } from "./format-big-number";

export const CurrencyInput = ({ value, onChange, ...props }) => {
    return (
        <input
            {...props}
            value={formatBigNumber(value || "")}
            onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                onChange(raw);
            }}
            className="mt-1 w-full border rounded-lg p-2.5 text-sm
                            focus:ring-2 focus:ring-primary outline-none transition focus:border-none"
        />
    );
};
