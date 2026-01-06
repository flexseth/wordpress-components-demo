/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress components for building the UI.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { PanelBody, TextControl, Notice, RangeControl } from '@wordpress/components';

/**
 * WordPress element (React) hooks.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Custom hook for debouncing values.
 */
import useDebounce from './hooks/useDebounce';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { searchTerm, delay } = attributes;
	const [ inputValue, setInputValue ] = useState( searchTerm );
	const [ isTyping, setIsTyping ] = useState( false );
	const debouncedValue = useDebounce( inputValue, delay );

	// Update the block attribute when the debounced value changes.
	useEffect( () => {
		if ( debouncedValue !== searchTerm ) {
			setAttributes( { searchTerm: debouncedValue } );
			setIsTyping( false );
		}
	}, [ debouncedValue, searchTerm, setAttributes ] );

	// Handle input changes.
	const handleInputChange = ( value ) => {
		setInputValue( value );
		setIsTyping( true );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Debounce Settings', 'debounce-demo' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Debounce Delay (milliseconds)', 'debounce-demo' ) }
						value={ delay }
						onChange={ ( value ) => setAttributes( { delay: value } ) }
						min={ 0 }
						max={ 5000 }
						step={ 50 }
						help={ __(
							'Set how long to wait after typing stops before saving the value.',
							'debounce-demo'
						) }
					/>
					{ delay > 2000 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								`Warning: A delay of ${ delay }ms is quite long and may impact user experience. Consider using a shorter delay for better interactivity.`,
								'debounce-demo'
							) }
						</Notice>
					) }
					<Notice status="info" isDismissible={ false }>
						{ __(
							`Current delay: ${ delay }ms. Type in the input below and watch the saved value update only after you stop typing.`,
							'debounce-demo'
						) }
					</Notice>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<div className="debounce-demo-container">
					<h3>{ __( 'Debounce Demo', 'debounce-demo' ) }</h3>

					<TextControl
						label={ __( 'Type something...', 'debounce-demo' ) }
						value={ inputValue }
						onChange={ handleInputChange }
						help={ __(
							`The value will be saved ${ delay }ms after you stop typing.`,
							'debounce-demo'
						) }
					/>

					<div className="debounce-demo-status">
						{ isTyping && (
							<Notice status="warning" isDismissible={ false }>
								{ __( 'Typing... (not saved yet)', 'debounce-demo' ) }
							</Notice>
						) }

						{ ! isTyping && inputValue && (
							<Notice status="success" isDismissible={ false }>
								{ __(
									`Saved value: "${ debouncedValue }"`,
									'debounce-demo'
								) }
							</Notice>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
