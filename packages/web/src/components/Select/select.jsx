/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Select from 'react-select';

const SelectDropdown = ({ options, handleChange, value }) => {
  const [isSearchable] = useState(true);

  const modifiedOptions = options?.map((option) => {
    return typeof option !== 'object' ? { value: option, label: option } : option;
  });

  const onChange = (option) => {
    const e = {
      target: { name: name, value: option.value },
      persist: () => {},
    };

    handleChange(e);
  };
  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isSearchable={isSearchable}
        name="color"
        options={modifiedOptions}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SelectDropdown;
