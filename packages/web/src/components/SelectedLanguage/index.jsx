import * as React from 'react';
import useTheme from '../../hooks/useTheme';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function SeletedLanguage({ setLanguage, language }) {
  const context = useTheme();

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          height: '50px',
          fontSize: '14px',
        }}
        size="small"
      >
        <Select
          value={language}
          sx={{
            fontSize: '14px',
            color: context.theme === 'light' ? 'black' : 'white',
            border: context.theme === 'light' ? 'inherit' : '1px solid white',
          }}
          onChange={handleChange}
          displayEmpty
          disableUnderline={true}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem sx={{ fontSize: '14px' }} value={'English'}>
            English
          </MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} value={'French'}>
            French
          </MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} value={'Dutch'}>
            Dutch
          </MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} value={'German'}>
            German
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

SeletedLanguage.propTypes = {
  setLanguage: PropTypes.func,
  language: PropTypes.string,
};
