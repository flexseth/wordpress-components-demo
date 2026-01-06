/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const { searchTerm, delay } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div className="debounce-demo-frontend" data-delay={ delay }>
				<h3>Debounce Demo (Frontend)</h3>
				<div className="debounce-demo-input-wrapper">
					<label htmlFor="debounce-input">
						Type something to see debounce in action:
					</label>
					<input
						type="text"
						id="debounce-input"
						className="debounce-demo-input"
						placeholder="Start typing..."
						defaultValue={ searchTerm }
					/>
				</div>
				<div className="debounce-demo-output">
					<p className="debounce-demo-status">
						<strong>Status:</strong> <span className="status-text">Ready</span>
					</p>
					<p className="debounce-demo-value">
						<strong>Debounced Value:</strong> <span className="value-text">{ searchTerm || '(empty)' }</span>
					</p>
				</div>
			</div>
		</div>
	);
}
