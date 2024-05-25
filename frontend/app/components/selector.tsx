import Select, { MultiValue, ActionMeta } from 'react-select';

export type Props = {
  onChange: (
    options: MultiValue<{ value: string; label: string; }>, 
    actionMeta?: ActionMeta<{ value: string; label: string; }>
  ) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
}

export function Selector({ onChange, options, placeholder = 'Select themes regarding the lyrics...' }: Props) {
  return (
    <div className="flex-1">
      <Select
        isMulti
        name="colors"
        options={options}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
      />
    </div>
  )
}

