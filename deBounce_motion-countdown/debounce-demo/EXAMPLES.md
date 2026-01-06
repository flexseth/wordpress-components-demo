# Debounce Code Examples

This file contains standalone code examples showing how to implement debounce in various scenarios.

## Simple React Hook Example

### useDebounce Hook

```javascript
import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {*} The debounced value
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

### Using the Hook in a Component

```javascript
import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch results when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      // Simulate API call
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setIsSearching(false);
        });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {isSearching && <p>Searching...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
```

## Vanilla JavaScript Example

### Basic Debounce Function

```javascript
/**
 * Creates a debounced function that delays invoking func until after
 * delay milliseconds have elapsed since the last time it was invoked
 *
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### Using the Debounce Function

```javascript
// Example 1: Search input
const searchInput = document.getElementById('search');

const performSearch = (query) => {
  console.log('Searching for:', query);
  // Make API call here
  fetch(`/api/search?q=${query}`)
    .then(response => response.json())
    .then(data => console.log(data));
};

const debouncedSearch = debounce(performSearch, 500);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Example 2: Window resize
const handleResize = () => {
  console.log('Window resized to:', window.innerWidth);
  // Perform expensive calculations
};

const debouncedResize = debounce(handleResize, 250);

window.addEventListener('resize', debouncedResize);

// Example 3: Scroll event
const handleScroll = () => {
  console.log('Scrolled to:', window.scrollY);
  // Update UI based on scroll position
};

const debouncedScroll = debounce(handleScroll, 100);

window.addEventListener('scroll', debouncedScroll);
```

## Complete React App Example

```javascript
import React, { useState } from 'react';
import useDebounce from './useDebounce';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Debounce the input value with 500ms delay
  const debouncedValue = useDebounce(inputValue, 500);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsTyping(true);

    // Reset typing status after the debounce delay
    setTimeout(() => setIsTyping(false), 500);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Debounce Demo</h1>

      <div>
        <label htmlFor="input">Type something:</label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Start typing..."
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        {isTyping ? (
          <p style={{ color: '#f0b849' }}>⏳ Typing... (not saved yet)</p>
        ) : inputValue ? (
          <p style={{ color: '#46b450' }}>✓ Saved value: "{debouncedValue}"</p>
        ) : null}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <h3>Current Values:</h3>
        <p><strong>Input Value:</strong> {inputValue || '(empty)'}</p>
        <p><strong>Debounced Value:</strong> {debouncedValue || '(empty)'}</p>
      </div>
    </div>
  );
}

export default App;
```

## TypeScript Example

```typescript
import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage with TypeScript
interface SearchComponentProps {
  onSearch: (query: string) => void;
  delay?: number;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  delay = 300
}) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, delay);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchComponent;
```

## Advanced Example: Debounce with Leading Edge

Sometimes you want the function to execute immediately on the first call, then debounce subsequent calls:

```javascript
function debounce(func, delay, leading = false) {
  let timeoutId;
  let lastCallTime = 0;

  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    clearTimeout(timeoutId);

    if (leading && timeSinceLastCall > delay) {
      func.apply(this, args);
      lastCallTime = now;
    } else {
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastCallTime = Date.now();
      }, delay);
    }
  };
}

// Usage
const handleClick = debounce(
  () => console.log('Button clicked'),
  500,
  true // Execute immediately on first click
);

button.addEventListener('click', handleClick);
```

## Comparison: Debounce vs Throttle

### Debounce
Delays execution until after the calls have stopped for a specified time.

```javascript
const debouncedSave = debounce(() => {
  saveData();
}, 500);

// User types: h-e-l-l-o
// saveData() is called once, 500ms after typing "o"
```

### Throttle
Ensures the function is called at most once per specified time period.

```javascript
function throttle(func, limit) {
  let inThrottle;

  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

// Function is called at most once every 100ms while scrolling
```

## Performance Tips

1. **Choose the right delay**: Balance between UX and performance
2. **Clean up on unmount**: Always clear timeouts in cleanup functions
3. **Memoize callbacks**: Use `useCallback` with debounced functions
4. **Avoid creating new functions**: Create debounced functions outside of render

```javascript
// ❌ Bad: Creates new function on every render
function BadComponent() {
  const [value, setValue] = useState('');

  return (
    <input
      onChange={(e) => {
        const debounced = debounce(() => setValue(e.target.value), 500);
        debounced();
      }}
    />
  );
}

// ✓ Good: Reuses the same debounced function
function GoodComponent() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <input
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
