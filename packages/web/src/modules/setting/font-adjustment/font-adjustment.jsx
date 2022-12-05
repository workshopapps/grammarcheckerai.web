import { useEffect, useRef } from 'react';
import { getFontSize } from '../../../hooks/useCustomFont';
import styles from './font-adjustment.module.css';

function FontAdjustment() {
  const [fontSize, setFontSize] = getFontSize();
  let target = useRef();

  const changeFont = (e) => {
    if (e.target.type === 'range') {
      target = e.target;
    }
    const val = target.value;
    setFontSize(val);
  };

  useEffect(() => {
    const min = target.current.min;
    const max = target.current.max;

    target.current.style.backgroundSize = ((fontSize - min) * 100) / (max - min) + '% 100%';
  }, [fontSize]);

  return (
    <div className="bg-dark-100 p-3 rounded-md">
      <h2 className="md:border-b md:pb-3 md:mb-3 border-gray-300">Font size (px)</h2>
      <div className="flex justify-between items-end gap-3 md:w-1/2">
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-end -translate-y-4 m-0 md:-translate-y-0">
            <p className="text-xs">A</p>
            <p className="text-xl hidden lg:block">A</p>
            <p className="text-5xl">A</p>
          </div>
          <input
            className={`${styles._font} -translate-y-4 cursor-pointer md:-translate-y-0`}
            ref={target}
            min={16}
            value={fontSize}
            onInput={(e) => changeFont(e)}
            max={60}
            type="range"
          />
        </div>
        <output className="-translate-y-4 md:-translate-y-0" id="rangevalue">
          {fontSize}
        </output>
      </div>
    </div>
  );
}

export default FontAdjustment;
