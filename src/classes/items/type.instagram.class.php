<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/


/**
* TypeNews
*/
class TypeInstagram extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_instagram";


		$this->addToModel("name", array(
			"type" => "string",
			"error_message" => "Name error"
		));
		$this->addToModel("link", array(
			"type" => "string",
			"error_message" => "Link error"
		));
		$this->addToModel("hashtags", array(
			"type" => "string",
			"error_message" => "Hashtags error"
		));
		$this->addToModel("user_id", array(
			"type" => "string",
			"error_message" => "User_id error"
		));
		$this->addToModel("username", array(
			"type" => "string",
			"error_message" => "Username error"
		));
		$this->addToModel("image", array(
			"type" => "string",
			"error_message" => "Image error"
		));
		$this->addToModel("video", array(
			"type" => "string",
			"error_message" => "Video error"
		));
		$this->addToModel("fullname", array(
			"type" => "string",
			"error_message" => "Fullname error"
		));
		$this->addToModel("likes", array(
			"type" => "number",
			"error_message" => "Likes error"
		));
		$this->addToModel("caption", array(
			"type" => "text",
			"error_message" => "Caption error"
		));


		// Location
		$this->addToModel("location", array(
			"type" => "string",
			"label" => "Location text",
			"error_message" => "Location error",
			"hint_message" => "This is the location name for the instagram photo"
		));
		// latitude
		$this->addToModel("latitude", array(
			"type" => "number",
			"label" => "Latitude"
		));
		// longitude
		$this->addToModel("longitude", array(
			"type" => "number",
			"label" => "Longitude"
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

				$results[0]["caption"] = encodeEmoji($results[0]["caption"], "SB");
				$results[0]["location"] = encodeEmoji($results[0]["location"], "SB");
				$results[0]["username"] = encodeEmoji($results[0]["username"], "SB");
				$results[0]["fullname"] = encodeEmoji($results[0]["fullname"], "SB");

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

				$caption = $this->getProperty("caption", "value");
				$hashtags = $this->getProperty("hashtags", "value");
				$location = $this->getProperty("location", "value");

				$link = $this->getProperty("link", "value");
				$fullname = $this->getProperty("fullname", "value");
				$username = $this->getProperty("username", "value");
				$user_id = $this->getProperty("user_id", "value");
				$likes = $this->getProperty("likes", "value");


				$sql = "INSERT INTO ".$this->db." VALUES(DEFAULT, $item_id, '$name', '$caption', '$hashtags', '$location', '$link', '$fullname', '$username', '$user_id', '$likes', '', '')";
//				print $sql."<br>";
				if($query->sql($sql)) {

					$post_id = $query->lastInsertId();

					$image_link = $this->getProperty("image", "value");
					if(preg_match("/.([jpgifn]{3})$/", $image_link, $ext_match)) {
						$image_ext = $ext_match[1];
					}

					$video_link = $this->getProperty("video", "value");
					if(preg_match("/.([mp4ov]{3})$/", $video_link, $ext_match)) {
						$video_ext = $ext_match[1];
					}
					else {
						$video_ext = "";
					}


					$image = @file_get_contents($image_link);

					if($video_ext) {
						$video = @file_get_contents($video_link);
						$video_path = PRIVATE_FILE_PATH."/".$item_id."/video/".$video_ext;
						$fs->makeDirRecursively(PRIVATE_FILE_PATH."/".$item_id."/video");
					}
					$image_path = PRIVATE_FILE_PATH."/".$item_id."/image/".$image_ext;

					$fs->makeDirRecursively(PRIVATE_FILE_PATH."/".$item_id."/image");

					if($image) {
						$image_written = file_put_contents($image_path, $image);
						if($video_ext) {
							$video_written = file_put_contents($video_path, $video);
						}

						if($image_written) {
							$query->sql("UPDATE ".$this->db." SET image='".$image_ext."', video='".$video_ext."' WHERE id = ".$post_id);


							$this->sindex($this->getProperty("name", "value"), $item_id);
							$this->status(array("status", $item_id, 1));

							message()->addMessage("image added");
							return true;
						}
					}

					// bad image access - is the most common reason for failure
					// set item status = 0, comment to "IMAGE ACCESS DENIED" to avoid it reoccuring on every fetch
					else {

	//					print "disable item<br>";
						// $IC = new Items();
						// $IC->status($item_id, 0);
	//					print "UPDATE ".$this->db." SET caption='IMAGE ACCESS DENIED' WHERE id = ".$post_id."<br>";
						$query->sql("UPDATE ".$this->db." SET caption='IMAGE ACCESS DENIED' WHERE id = ".$post_id);
						message()->addMessage("IMAGE ACCESS DENIED", array("type" => "error"));
						return true;
					}
				}
			}
			if($item_id) {
				$query->sql("DELETE FROM ".UT_ITEMS." WHERE id = $item_id");
			}
			message()->addMessage("Item could not be saved", array("type" => "error"));
		}
		global $page;
		$page->mail(array("subject" => "Instagram fetch failed: ".SITE_URL, "message" => "Check admin at: ".SITE_URL."/janitor"));
		return false;
	}


	function exists($instagram_id) {

		$query = new Query();
		return $query->sql("SELECT * FROM ".$this->db." WHERE name = '$instagram_id'");
	}

	function nextIdExists($next_id) {

		$query = new Query();
		$sql = "SELECT * FROM ".$this->db." WHERE name LIKE '$next_id%'";
//		print $sql."<br>\n";
		return $query->sql($sql);
	}

}

?>