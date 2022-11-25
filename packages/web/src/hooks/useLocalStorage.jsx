import { useState, useEffect } from 'react';

export function getStorageData(keyName, defaultValue) {
  const savedItem = localStorage.getItem(keyName);
  const parsedItem = JSON.parse(savedItem);
  return parsedItem || defaultValue;
}

export function useLocalStorage(keyName, initialValue) {
  const [value, setValue] = useState(() => {
    return getStorageData(keyName, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [keyName, value]);

  return [value, setValue];
}

