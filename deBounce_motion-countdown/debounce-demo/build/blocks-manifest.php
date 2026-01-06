<?php
// This file is generated. Do not modify it manually.
return array(
	'debounce-demo' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/debounce-demo',
		'version' => '0.1.0',
		'title' => 'Debounce Demo',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'searchTerm' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'debounce-demo',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
