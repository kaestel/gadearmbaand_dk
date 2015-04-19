<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeEvent extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_event";

		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Event",
			"required" => true,
			"hint_message" => "Name your Event", 
			"error_message" => "Name must be filled out."
		));

		// Host
		$this->addToModel("host", array(
			"type" => "string",
			"label" => "Host",
			"required" => true,
			"hint_message" => "Host of Event", 
			"error_message" => "Host must be filled out."
		));

		// Location
		$this->addToModel("location", array(
			"type" => "string",
			"label" => "Location",
			"required" => true,
			"hint_message" => "Location of Event", 
			"error_message" => "Location must be filled out."
		));

		// Longitude
		$this->addToModel("longitude", array(
			"type" => "number",
			"label" => "Longitude",
			"required" => true,
			"hint_message" => "Longitude of Event", 
			"error_message" => "Longitude must be filled out."
		));

		// Latitude
		$this->addToModel("latitude", array(
			"type" => "number",
			"label" => "Latitude",
			"required" => true,
			"hint_message" => "Latitude of Event", 
			"error_message" => "Latitude must be filled out."
		));

		// description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short description",
			"required" => true,
			"hint_message" => "Write a short description of the post",
			"error_message" => "A short description without any words? How weird."
		));

		// Facebook link
		$this->addToModel("facebook_link", array(
			"type" => "string",
			"label" => "Facebook link",
			"required" => true,
			"hint_message" => "Facebook link of Event", 
			"error_message" => "Facebook link must be filled out."
		));


	}

}

?>