<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/


/**
* TypeNews
*/
class TypeTwitter extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_twitter";


		$this->addToModel("name", array(
			"type" => "string",
			"error_message" => "Name error"
		));
		$this->addToModel("user_id", array(
			"type" => "string",
			"error_message" => "User_id error"
		));
		$this->addToModel("username", array(
			"type" => "string",
			"error_message" => "Username error"
		));
		$this->addToModel("text", array(
			"type" => "text",
			"error_message" => "Text error"
		));

	}



	// Manual get to convert emojis back to unicode
	function get($item_id) {
		$query = new Query();
		$sql = "SELECT * FROM ".$this->db." WHERE item_id = $item_id LIMIT 1";
//		print $sql."<br>";
		if($query->sql($sql)) {
			$results = $query->results();
			if($results) {
				// remove type id from index
				unset($results[0]["id"]);

				$results[0]["text"] = encodeEmoji($results[0]["text"], "SB");
				$results[0]["username"] = encodeEmoji($results[0]["username"], "SB");

				return $results[0];
			}
		}
		return false;
	}


	// save item type - based on posted values
	function save($action) {

		// Get posted values to make them available for models
		$this->getPostedEntities();

		// does values validate
		if($this->validateAll()) {
	
			$query = new Query();
			$fs = new FileSystem();

			// make sure type tables exist
			$query->checkDbExistance($this->db);
	
			// create root item
			$item_id = $this->saveItem();
			if($item_id) {

				$name = $this->getProperty("name", "value");
				$text = $this->getProperty("text", "value");
				$username = $this->getProperty("username", "value");
				$user_id = $this->getProperty("user_id", "value");


				$sql = "INSERT INTO ".$this->db." VALUES(DEFAULT, $item_id, '$name', '$text', '$username', '$user_id')";
//				print $sql."<br>";
				if($query->sql($sql)) {

					$post_id = $query->lastInsertId();

					$this->sindex($this->getProperty("name", "value"), $item_id);
					$this->status(array("status", $item_id, 1));

					message()->addMessage("Tweet added");
					return true;

				}
			}

			// something went wrong - delete item
			if($item_id) {
				$query->sql("DELETE FROM ".UT_ITEMS." WHERE id = $item_id");
			}
			message()->addMessage("Item could not be saved", array("type" => "error"));

		}

		global $page;
		$page->mail(array("subject" => "Twitter fetch failed: ".SITE_URL, "message" => "Check admin at: ".SITE_URL."/janitor"));
		return false;
	}


	function exists($twitter_id) {

		$query = new Query();
		return $query->sql("SELECT * FROM ".$this->db." WHERE name = '$twitter_id'");
	}

}

?>