// --- Types
type CustomRadioProps = React.ComponentPropsWithoutRef<"input"> & {
  text: string;
  radioName: string;
  radioId: string;
  radioValue: string;
  radioChecked: string;
};

// --- CustomRadio (Main Component)
const CustomRadio = ({
  text,
  radioName,
  radioId,
  radioValue,
  radioChecked,
  ...props
}: CustomRadioProps) => {
  return (
    <label
      htmlFor={radioId}
      className="text-primary/85 text-[15px] flex items-center gap-1 py-0.5 pl-1.5 rounded-sm cursor-pointer hover:bg-primary/35 hover:text-white has-checked:bg-primary/25 has-checked:font-medium has-checked:text-primary"
    >
      <input
        type="radio"
        name={radioName}
        id={radioId}
        className="select-none"
        checked={radioChecked === radioValue}
        value={radioValue}
        {...props}
      />
      {text}
    </label>
  );
};
export default CustomRadio;
