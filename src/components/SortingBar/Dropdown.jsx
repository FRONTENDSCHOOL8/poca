import React, { useState } from 'react';

export default function Dropdown({
  handleLatest,
  handleHigh,
  handleLow,
  change,
}) {
  const [selectedOption, setSelectedOption] = useState('newest');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    change(selectedValue);

    switch (selectedValue) {
      case 'newest':
        handleLatest();
        break;
      case 'popular':
        handleHigh();
        break;
      case 'oldest':
        handleLow();
        break;
      default:
        console.log('No matching option found.');
    }
  };

  return (
    <select
      id="sortOptions"
      name="sortOptions"
      className="h-30px w-100px mb-3 flex items-center justify-evenly rounded border border-zinc-500 bg-white bg-opacity-40 p-1"
      value={selectedOption}
      onChange={handleChange}
    >
      <option value="newest">최신순</option>
      <option value="popular">찜 높은순</option>
      <option value="oldest">찜 낮은순</option>
    </select>
  );
}
