import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SeletedLanguage() {
  const [age, setAge] = React.useState('10');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, height: '50px', fontSize: '14px' }} size="small">
        <Select
          value={age}
          sx={{ fontSize: '14px' }}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem sx={{ fontSize: '14px' }} value={10}>
            English
          </MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} value={20}>
            French
          </MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} value={30}>
            Dutch
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
