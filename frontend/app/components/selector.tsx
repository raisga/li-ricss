'use client';

import Select, { MultiValue, ActionMeta } from 'react-select';

export type Props = {
  onChange: (
    options: MultiValue<{ value: string; label: string; }>, 
    actionMeta?: ActionMeta<{ value: string; label: string; }>
  ) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
  disabled?: boolean;
}

function Selector({ onChange, options, placeholder, disabled = false }: Props) {
  return (
    <div className="flex-1">
      <Select
        isMulti
        instanceId='selector'
        name="selector"
        options={options}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
        isDisabled={disabled}
      />
    </div>
  )
}

export default Selector;
