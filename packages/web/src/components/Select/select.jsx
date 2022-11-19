/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Select from 'react-select';

const SelectDropdown = ({ options, handleChange, value }) => {
  const customStyles = {
    option: (provided, { isSelected }) => {
      return {
        ...provided,
        backgroundColor: isSelected ? '#7352f0' : undefined,
        borderBottom: 'none',
        textTransform: 'capitalize',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#e2dbfb',
          color: '#7352f0',
        },
      };
    },
    control: () => ({
      width: 'full',
      display: 'flex',
      padding: '6px',
      border: '1px solid #393939',
      borderRadius: '5px',
    }),
  };

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
        styles={customStyles}
        className="basic-single"
        classNamePrefix="select"
        isSearchable={isSearchable}
        name="color"
        options={modifiedOptions}
        onChange={onChange}
        value={value}
        defaultValue={modifiedOptions[0]}
      />
    </div>
  );
};

export default SelectDropdown;
