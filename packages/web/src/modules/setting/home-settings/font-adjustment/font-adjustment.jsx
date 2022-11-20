function FontAdjustment() {
  return (
    <div className="bg-gray-100 p-3 rounded-md">
      <h2 className="md:border-b md:pb-3 md:mb-3 border-gray-300">Font size (px)</h2>
      <div className="flex justify-between items-end gap-3 md:w-1/2">
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-end -translate-y-4 m-0 md:-translate-y-0">
            <p className="text-xs">A</p>
            <p className="text-5xl">A</p>
          </div>
          <input className="-translate-y-4 cursor-pointer md:-translate-y-0" type="range" />
        </div>
        <p className="-translate-y-4 md:-translate-y-0">94</p>
      </div>
    </div>
  );
}

export default FontAdjustment;
