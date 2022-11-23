import { useLocalStorage } from './useLocalStorage';

export function getFontSize() {
  const [font, setFont] = useLocalStorage('font', 20);

  const setFontSize = (val) => {
    setFont(val);
  };

  return [font, setFontSize];
}
