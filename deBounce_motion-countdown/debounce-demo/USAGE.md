# Debounce Demo - Usage Guide

This guide provides detailed instructions on how to use the Debounce Demo block and how to implement debounce in your own WordPress projects.

## What is Debounce?

Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, making them more performant. In essence, it limits the rate at which a function gets called.

### Common Use Cases

- **Search inputs**: Wait for user to stop typing before making API calls
- **Resize events**: Limit calculations during window resizing
- **Scroll events**: Reduce the number of scroll event handlers fired
- **Form validation**: Delay validation until user pauses typing
- **Auto-save**: Save content only after user stops editing

## Using the Block

### Installation Steps

1. **Upload the Plugin**
   - Navigate to WordPress Admin → Plugins → Add New
   - Click "Upload Plugin"
   - Choose the `debounce-demo.zip` file
   - Click "Install Now"
   - Activate the plugin

2. **Add to a Post or Page**
   - Create or edit a post/page
   - Click the "+" button to add a block
   - Search for "Debounce Demo"
   - Click to insert the block

3. **Configure (Optional)**
   - The block works out of the box with a 500ms delay
   - Check the block settings in the sidebar for more information

### Testing the Demo

1. **In the Editor**:
   - Type something in the input field
   - Notice the yellow "Typing... (not saved yet)" message
   - Stop typing
   - After 500ms, see the green "Saved value" message

2. **On the Frontend**:
   - Publish or preview your post/page
   - Type in the input field
   - Watch the status change color and text:
     - Yellow "Typing..." while you type
     - Green "Saved!" after you stop

## Implementing Debounce in Your Own Projects

### React/WordPress Editor

The custom `useDebounce` hook can be reused in any WordPress block or React component:

```javascript
import { useState, useEffect } from '@wordpress/element';

function useDebounce( value, delay ) {
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

#### Example: Search Component

```javascript
import { useState, useEffect } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import useDebounce from './hooks/useDebounce';

function SearchComponent() {
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const debouncedSearchTerm = useDebounce( searchTerm, 500 );
	const [ results, setResults ] = useState( [] );

	useEffect( () => {
		if ( debouncedSearchTerm ) {
			// Make API call only after user stops typing
			fetchSearchResults( debouncedSearchTerm ).then( setResults );
		}
	}, [ debouncedSearchTerm ] );

	return (
		<TextControl
			value={ searchTerm }
			onChange={ setSearchTerm }
			placeholder="Search..."
		/>
	);
}
```

### Vanilla JavaScript (Frontend)

For frontend implementations without React:

```javascript
function debounce( func, delay ) {
	let timeoutId;
	return function ( ...args ) {
		clearTimeout( timeoutId );
		timeoutId = setTimeout( () => {
			func.apply( this, args );
		}, delay );
	};
}

// Usage example
const input = document.querySelector( '#search-input' );
const searchHandler = debounce( ( event ) => {
	console.log( 'Searching for:', event.target.value );
	// Make API call here
}, 500 );

input.addEventListener( 'input', searchHandler );
```

## Advanced Customization

### Changing the Delay Time

**In the Editor (edit.js)**:
```javascript
// Change the delay from 500ms to 1000ms (1 second)
const debouncedValue = useDebounce( inputValue, 1000 );
```

**On the Frontend (view.js)**:
```javascript
// Change the delay from 500ms to 1000ms
const debouncedUpdate = debounce( updateDebouncedValue, 1000 );
```

### Adding Custom Attributes

Edit `block.json` to add more attributes:

```json
{
	"attributes": {
		"searchTerm": {
			"type": "string",
			"default": ""
		},
		"debounceDelay": {
			"type": "number",
			"default": 500
		}
	}
}
```

Then use the attribute in your component:

```javascript
export default function Edit( { attributes, setAttributes } ) {
	const { searchTerm, debounceDelay } = attributes;
	const debouncedValue = useDebounce( inputValue, debounceDelay );
	// ...
}
```

### Styling Customization

**Editor Styles** (`editor.scss`):
```scss
.wp-block-create-block-debounce-demo {
	border: 2px solid #your-color;
	background-color: #your-bg-color;
	// Add your custom styles
}
```

**Frontend Styles** (`style.scss`):
```scss
.debounce-demo-frontend {
	// Customize the frontend appearance
	.debounce-demo-input {
		border-color: #your-color;
		// Add your custom styles
	}
}
```

## Performance Considerations

### When to Use Debounce

✅ **Good use cases**:
- User input that triggers expensive operations (API calls, calculations)
- High-frequency events (scroll, resize, mousemove)
- Auto-save functionality
- Live search suggestions

❌ **Not recommended for**:
- Critical user interactions (button clicks)
- Form submissions
- Actions that need immediate feedback
- Time-sensitive operations

### Choosing the Right Delay

- **100-200ms**: Fast response, minimal perceived delay
- **300-500ms**: Good balance for most use cases (recommended)
- **500-1000ms**: Slower typing users, complex operations
- **1000ms+**: Auto-save, non-critical updates

## Troubleshooting

### Block Doesn't Appear in Editor

1. Ensure the plugin is activated
2. Clear browser cache
3. Try rebuilding: `npm run build`
4. Check browser console for errors

### Debounce Not Working

1. Check the console for JavaScript errors
2. Verify the delay value is a number
3. Ensure event listeners are properly attached
4. Check that the function is being called

### Styling Issues

1. Clear WordPress cache
2. Rebuild the block: `npm run build`
3. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
4. Check for CSS conflicts with your theme

## Best Practices

1. **Choose appropriate delay times**: Balance between user experience and performance
2. **Provide visual feedback**: Show users when their input is being processed
3. **Clean up properly**: Always clear timeouts to prevent memory leaks
4. **Test thoroughly**: Test with different typing speeds and scenarios
5. **Document your code**: Make it clear what's being debounced and why

## Real-World Examples

### Example 1: Post Title Auto-Save

```javascript
const [ title, setTitle ] = useState( '' );
const debouncedTitle = useDebounce( title, 1000 );

useEffect( () => {
	if ( debouncedTitle ) {
		savePost( { title: debouncedTitle } );
	}
}, [ debouncedTitle ] );
```

### Example 2: Live Search with Loading State

```javascript
const [ query, setQuery ] = useState( '' );
const [ isSearching, setIsSearching ] = useState( false );
const debouncedQuery = useDebounce( query, 300 );

useEffect( () => {
	if ( debouncedQuery ) {
		setIsSearching( true );
		searchAPI( debouncedQuery )
			.then( setResults )
			.finally( () => setIsSearching( false ) );
	}
}, [ debouncedQuery ] );
```

### Example 3: Window Resize Handler

```javascript
const handleResize = debounce( () => {
	// Expensive calculation or layout update
	recalculateLayout();
}, 250 );

window.addEventListener( 'resize', handleResize );
```

## Additional Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [useHooks.com - useDebounce](https://usehooks.com/usedebounce)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

## Support

For issues, questions, or contributions, please refer to the project repository or WordPress support forums.
