/*
import React, { useState } from 'react';

function Dropdown({ title, items }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={toggleDropdown}>
        {title}
        <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="dropdown-list-item"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && <div className="selected-item">Selected: {selectedItem}</div>}
    </div>
  );
}

export default Dropdown;
*/
import React, { useState } from 'react';

function Dropdown({ title, items, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(false);
    onSelect(item);  // 调用传入的 onSelect 回调函数
  };

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={toggleDropdown}>
        {title}
        <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="dropdown-list-item"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && <div className="selected-item">Selected: {selectedItem}</div>}
    </div>
  );
}

export default Dropdown;
