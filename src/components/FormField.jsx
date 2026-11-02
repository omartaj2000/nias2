"use client";

const CATEGORIES = [
  "Fundraiser","Personal","Nonprofit","Medical","Crisis Relief",
  "Education","Emergency","Sports","Environment","Family",
  "Competition","Memorial","Research",
];

const FormField = ({ labelName, placeholder, isTextArea, isCategory, inputType, value, multiple, min, handleChange }) => (
  <label className="flex-1 w-full flex flex-col">
    {labelName && (
      <span className="font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
    )}
    {isTextArea ? (
      <textarea
        required value={value} onChange={handleChange} rows={10} placeholder={placeholder}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-[#3a3a43] bg-transparent text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
      />
    ) : isCategory ? (
      <select
        required value={value} onChange={handleChange}
        className="py-[20px] sm:px-[25px] px-[20px] outline-none border border-[#3a3a43] bg-transparent text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
      >
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    ) : (
      <input
        required value={value} onChange={handleChange} type={inputType} multiple={multiple}
        step="0.01" placeholder={placeholder} min={min}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-[#3a3a43] bg-transparent text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
      />
    )}
  </label>
);

export default FormField;
