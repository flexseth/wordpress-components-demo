/**
 * Custom hook for debouncing values.
 *
 * @see https://usehooks.com/usedebounce
 *
 * @param {*}      value The value to debounce.
 * @param {number} delay The delay in milliseconds.
 * @return {*} The debounced value.
 */
import { useState, useEffect } from '@wordpress/element';

export default function useDebounce( value, delay ) {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		// Set up a timer to update the debounced value after the delay.
		const handler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		// Clean up the timer if value changes before delay completes.
		return () => {
			clearTimeout( handler );
		};
	}, [ value, delay ] );

	return debouncedValue;
}
