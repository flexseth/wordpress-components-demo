/**
 * Frontend JavaScript for the Debounce Demo block.
 *
 * Demonstrates how to implement debounce functionality in vanilla JavaScript
 * to wait for user input to stop before executing an action.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Debounce function implementation.
 *
 * Creates a debounced version of a function that delays invoking the function
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @param {Function} func  The function to debounce.
 * @param {number}   delay The delay in milliseconds.
 * @return {Function} The debounced function.
 */
function debounce( func, delay ) {
	let timeoutId;
	return function ( ...args ) {
		clearTimeout( timeoutId );
		timeoutId = setTimeout( () => {
			func.apply( this, args );
		}, delay );
	};
}

/**
 * Initialize the debounce demo on each block instance.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll( '.debounce-demo-frontend' );

	blocks.forEach( ( block ) => {
		const input = block.querySelector( '.debounce-demo-input' );
		const statusText = block.querySelector( '.status-text' );
		const valueText = block.querySelector( '.value-text' );

		if ( ! input || ! statusText || ! valueText ) {
			return;
		}

		/**
		 * Update the debounced value display.
		 *
		 * @param {string} value The value to display.
		 */
		const updateDebouncedValue = ( value ) => {
			valueText.textContent = value || '(empty)';
			statusText.textContent = 'Saved!';
			statusText.style.color = '#46b450';
		};

		// Create a debounced version of the update function with 500ms delay.
		const debouncedUpdate = debounce( updateDebouncedValue, 500 );

		// Listen for input events.
		input.addEventListener( 'input', ( e ) => {
			statusText.textContent = 'Typing...';
			statusText.style.color = '#f0b849';
			debouncedUpdate( e.target.value );
		} );
	} );
} );
