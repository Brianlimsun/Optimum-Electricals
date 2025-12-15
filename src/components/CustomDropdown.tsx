import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  color?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    // Always open dropdown when user starts typing
    if (!isOpen) {
      setIsOpen(true);
    }

    // Filter options with the new search term
    const currentFilteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    // If user is typing and there's an exact match, auto-select it
    if (inputValue && currentFilteredOptions.length > 0) {
      const exactMatch = currentFilteredOptions.find(option =>
        option.label.toLowerCase() === inputValue.toLowerCase()
      );
      if (exactMatch) {
        onChange(exactMatch.value);
      }
    }
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    // Don't clear search term when clicking, allow user to continue typing
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionClick(filteredOptions[0].value);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Keep search term for better UX - user can continue typing
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Force scrollbar to always be visible and handle scroll events
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const menu = dropdownRef.current.querySelector('.dropdown-menu') as HTMLElement;
      if (menu) {
        // Force scrollbar to always be visible
        menu.style.overflowY = 'scroll';
        menu.style.scrollbarWidth = 'thin';
        menu.style.scrollbarColor = '#8a8a8a #3a3a3a';
        // Ensure content is always scrollable
        menu.style.minHeight = '201px';
        // Force webkit scrollbar
        menu.style.setProperty('--webkit-scrollbar-width', '8px');
        menu.style.setProperty('--webkit-scrollbar-track-color', '#3a3a3a');
        menu.style.setProperty('--webkit-scrollbar-thumb-color', '#8a8a8a');

        // Add scroll event listener to hide fake scrollbar when scrolling
        const handleScroll = () => {
          menu.classList.add('scrolling');
          // Remove scrolling class after scroll ends
          clearTimeout((menu as any).scrollTimeout);
          (menu as any).scrollTimeout = setTimeout(() => {
            menu.classList.remove('scrolling');
          }, 150);
        };

        // Add touch event listener for mobile devices
        const handleTouchStart = () => {
          menu.classList.add('scrolling');
        };

        const handleTouchEnd = () => {
          clearTimeout((menu as any).scrollTimeout);
          (menu as any).scrollTimeout = setTimeout(() => {
            menu.classList.remove('scrolling');
          }, 150);
        };

        menu.addEventListener('scroll', handleScroll);
        menu.addEventListener('touchstart', handleTouchStart);
        menu.addEventListener('touchend', handleTouchEnd);

        // Cleanup
        return () => {
          menu.removeEventListener('scroll', handleScroll);
          menu.removeEventListener('touchstart', handleTouchStart);
          menu.removeEventListener('touchend', handleTouchEnd);
          if ((menu as any).scrollTimeout) {
            clearTimeout((menu as any).scrollTimeout);
          }
        };
      }
    }
  }, [isOpen]);

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div className="dropdown-input" onClick={handleInputClick}>
        <input
          type="text"
          value={isOpen ? searchTerm : (selectedOption ? selectedOption.label : '')}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="dropdown-input-field"
          readOnly={false}
        />
        <div className="dropdown-arrow">
          <ChevronUp size={16} />
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {filteredOptions.length > 0 ? (
            <>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${value === option.value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  style={{ color: option.color }}
                >
                  <span className="option-label">{option.label}</span>
                  {value === option.value && (
                    <Check size={16} className="option-check" />
                  )}
                </div>
              ))}
              {/* Hidden elements to force scrollbar to always be visible and indicate more content */}
              <div style={{ height: '20px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '20px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '20px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '20px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '20px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
              <div style={{ height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
            </>
          ) : (
            <div className="dropdown-no-results">
              <div className="no-results-icon">🔍</div>
              <div className="no-results-title">No locality found</div>
              <div className="no-results-suggestion">Please select "Other" from the list below</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
