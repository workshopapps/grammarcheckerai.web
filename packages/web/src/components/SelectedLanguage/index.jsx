import * as React from 'react';
import useTheme from '../../hooks/useTheme';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SeletedLanguage() {
  const [language, setLanguage] = React.useState('English');
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
            color: context.theme === 'dark' && 'white',
            border: context.theme === 'light' ? 'inherit' : '1px solid white',
            background: context.theme === 'dark' && 'black' 
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
        </Select>
      </FormControl>
    </div>
  );
}
