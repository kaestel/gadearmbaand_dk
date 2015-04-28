<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeMedia extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_media";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Media name",
			"required" => true,
			"hint_message" => "Media name is required", 
			"error_message" => "Media name is required"
		));

		$this->addToModel("image", array(
			"type" => "files",
			"label" => "Add cover image here",
			"allowed_formats" => "png,jpg",
			"allowed_sizes" => "720x480",
			"hint_message" => "Add image here. Use png or jpg in 720x480.",
			"error_message" => "Media does not fit requirements."
		));

		$this->addToModel("video", array(
			"type" => "files",
			"label" => "Add media here",
			"allowed_formats" => "mp4",
			"allowed_sizes" => "720x480",
			"hint_message" => "Add video here. Use mp4 in 720x480.",
			"error_message" => "Media does not fit requirements."
		));

	}

}

?>