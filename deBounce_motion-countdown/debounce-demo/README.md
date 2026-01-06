# Debounce Demo - WordPress Block

A WordPress block that demonstrates how to use debounce to wait for user input to stop before executing an action.

## Description

This block provides both an editor interface and frontend demonstration of debounce functionality. It shows how debouncing can improve performance by delaying function execution until after a specified period has elapsed since the last time it was invoked.

## Features

- **Custom useDebounce Hook**: A reusable React hook that implements debounce functionality
- **Interactive Editor Interface**: Uses WordPress components (TextControl, Notice) to demonstrate debounce in the block editor
- **Frontend Demonstration**: Vanilla JavaScript implementation showing debounce in action on the frontend
- **Visual Feedback**: Real-time status updates showing when typing vs when the value is saved
- **WordPress Standards**: Follows WordPress Coding Standards and uses WordPress components throughout

## Installation

1. Copy the `debounce-demo` directory to your WordPress plugins directory (`wp-content/plugins/`)
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The "Debounce Demo" block will be available in the block editor under the Widgets category

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WordPress installation (for testing)

### Setup

```bash
# Navigate to the plugin directory
cd debounce-demo

# Install dependencies
npm install

# Start development build (watches for changes)
npm start

# Build for production
npm run build
```

### Available Scripts

- `npm start` - Starts the build for development (watches for file changes)
- `npm run build` - Builds the code for production
- `npm run format` - Formats JavaScript files
- `npm run lint:css` - Lints CSS files
- `npm run lint:js` - Lints JavaScript files
- `npm run plugin-zip` - Creates a zip file for WordPress plugin distribution
- `npm run packages-update` - Updates WordPress packages to the latest version

## How It Works

### The useDebounce Hook

The custom hook (`src/debounce-demo/hooks/useDebounce.js`) implements debounce functionality:

```javascript
import { useState, useEffect } from '@wordpress/element';

export default function useDebounce( value, delay ) {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		return () => {
			clearTimeout( handler );
		};
	}, [ value, delay ] );

	return debouncedValue;
}
```

### Editor Implementation

The block editor interface (`edit.js`) demonstrates:
- Managing local input state
- Using the useDebounce hook to delay updates
- Providing visual feedback during typing
- Updating block attributes only after the debounce delay

### Frontend Implementation

The frontend JavaScript (`view.js`) shows:
- Pure JavaScript debounce function implementation
- Event listener setup
- DOM manipulation for visual feedback

## Usage

### In the Block Editor

1. Add the "Debounce Demo" block to your post or page
2. Type in the input field
3. Notice the "Typing..." status appears immediately
4. Stop typing for 500ms
5. The "Saved!" status appears with the debounced value

### On the Frontend

1. Publish or preview a post/page containing the block
2. Type in the input field
3. Watch the status change from "Typing..." to "Saved!" after you stop typing

## File Structure

```
debounce-demo/
├── build/                      # Compiled assets (generated)
├── src/
│   └── debounce-demo/
│       ├── block.json          # Block configuration
│       ├── edit.js             # Editor interface
│       ├── editor.scss         # Editor-specific styles
│       ├── index.js            # Block registration
│       ├── save.js             # Saved content markup
│       ├── style.scss          # Frontend & editor styles
│       ├── view.js             # Frontend JavaScript
│       └── hooks/
│           └── useDebounce.js  # Custom debounce hook
├── debounce-demo.php           # Main plugin file
├── package.json                # Node dependencies
└── README.md                   # This file
```

## Technical Details

### Debounce Delay

- **Editor**: 500ms delay
- **Frontend**: 500ms delay

These values can be adjusted in the respective files:
- Editor: `edit.js` (line 58)
- Frontend: `view.js` (line 57)

### WordPress Components Used

- `TextControl` - Input field
- `Notice` - Status messages
- `PanelBody` - Settings panel
- `InspectorControls` - Block sidebar
- `useBlockProps` - Block wrapper

### Browser Compatibility

The frontend JavaScript uses modern features:
- Arrow functions
- Template literals
- `const`/`let`
- DOM querySelector methods
- addEventListener

Supports all modern browsers (Chrome, Firefox, Safari, Edge).

## WordPress Compatibility

- **Requires at least**: WordPress 6.0
- **Tested up to**: WordPress 6.7
- **Requires PHP**: 7.4 or higher
- **License**: GPL-2.0-or-later

## Credits

Debounce pattern reference: [useHooks.com](https://usehooks.com/usedebounce)

## License

This project is licensed under the GPL-2.0-or-later license.

## Author

Built with WordPress Create Block tool.
