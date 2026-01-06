# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-05

### Added
- **Configurable Debounce Delay**: Added a settings panel in the block sidebar that allows users to adjust the debounce delay in milliseconds
  - New `delay` attribute in block configuration (default: 500ms)
  - RangeControl slider in InspectorControls for easy adjustment (0-2000ms range, 50ms steps)
  - Dynamic help text that displays the current delay value in both the settings panel and input field
  - Frontend implementation now respects the configured delay value via data attributes

### Changed
- Updated editor interface to use dynamic delay value from block attributes instead of hardcoded 500ms
- Updated frontend JavaScript to read delay from `data-delay` attribute on the block wrapper
- Enhanced InspectorControls panel with more detailed information about the current delay setting

### Technical Details
- Modified `block.json` to include `delay` attribute (type: number, default: 500)
- Updated `edit.js` to add RangeControl component and use dynamic delay in useDebounce hook
- Updated `save.js` to output delay value as `data-delay` attribute on the frontend wrapper
- Updated `view.js` to parse and use the `data-delay` attribute for debounce timing

## [0.1.0] - 2026-01-05

### Added
- Initial release of Debounce Demo WordPress block
- Custom `useDebounce` React hook for editor implementation
- Interactive editor interface with real-time feedback
- Frontend demonstration with vanilla JavaScript debounce implementation
- Visual status indicators showing typing vs saved states
- WordPress component-based UI (TextControl, Notice, PanelBody, InspectorControls)
- Comprehensive documentation (README.md, USAGE.md, EXAMPLES.md)
- SCSS styling for both editor and frontend
- Block registration and configuration via block.json
- `searchTerm` attribute to store the debounced input value

### Technical Details
- Built with `@wordpress/create-block` scaffolding tool
- Uses WordPress Coding Standards
- ES6+ JavaScript with functional React components
- WordPress hooks (useState, useEffect from @wordpress/element)
- Supports WordPress 6.0+
- Requires PHP 7.4+
- GPL-2.0-or-later license

---

## Release Types

- **Major version (x.0.0)**: Breaking changes that require user action
- **Minor version (0.x.0)**: New features, backwards compatible
- **Patch version (0.0.x)**: Bug fixes, backwards compatible
