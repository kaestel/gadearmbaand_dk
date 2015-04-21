<?php

error_reporting(E_ALL);
set_time_limit(0);

global $action;
global $model;
global $IC;
global $itemtype;



// post values back to janitor, to create new instagram items
function postBackToJanitor($values) {

//	print "postBackToJanitor<br>";

	global $IC;
	global $model;
	global $perf;

	// create post values
	unset($_POST);
	$_POST = $values;
	$_POST["status"] = 1;
	$model->getPostedEntities();
	$result = $model->save(array("save", "instagram"));

	// create return object
	$output["cms_object"] = $result;

	if(!$result) {
		$output["cms_status"] = "error";
		$output["cms_message"] = message()->getMessages(array("type"=>"error"));
		message()->resetMessages();
	}
	else {
		$output["cms_status"] = "success";
		$output["cms_message"] = message()->getMessages();
		message()->resetMessages();
	}

	return $output;
}


// make instagram request
function instagramRequest($url) {

//	print "instagram request:" . $url . "<br>\n";

	$ch = curl_init();
	curl_setopt_array($ch, array(
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => 2,
		CURLOPT_ENCODING => 'gzip'
	));

	$result = curl_exec($ch);
	curl_close($ch);

	return $result;
}


//global $create_results;
$create_results = false;



// get set from instagram and recurse as long as more pages exist
function getSet($max_id = false) {

//	print "getSet:".$max_id."<br>";

	global $IC;
	global $model;


	// tag to get instagrams for
	$tag = 'kaesteltest';
	//$tag = 'sing2ride';
	$client_id = "1a5eeb9643a44fd9b5fe828068bba595";
	$insta_url = "https://api.instagram.com/v1/tags/".$tag."/media/recent?client_id=".$client_id;
	
	// internal results array
	$create_results = false;

	// full request url
	$request_url = $max_id ? ($insta_url."&max_tag_id=".$max_id) : $insta_url;
//	print $request_url.";<br>\n";

	// send request to instagram
	$instagram_response = instagramRequest($request_url);
//	print $instagram_response;

	// convert instagram response
	$results = json_decode($instagram_response, true);

	if(isset($results["data"])) {

		// loop through results
		foreach($results["data"] as $media) {
	//		print_r($media);

			$values = array();

			if(!$model->exists($media["id"])) {

				$create_results = true;


				$values["published_at"] = date("Y-m-d H-i-s", $media["created_time"]);
				$values["status"] = 1;

				$values["name"] = $media["id"];

				$values["link"] = $media["link"];
				$values["caption"] = decodeEmoji(preg_replace("/\@/", "&commat;", $media["caption"]["text"]), "SB");
				$values["hashtags"] = implode(",", $media["tags"]);
				$values["location"] = decodeEmoji(preg_replace("/\@/", "&commat;", isset($media["location"]) && isset($media["location"]["name"]) ? $media["location"]["name"] : ""), "SB");
				$values["fullname"] = decodeEmoji(preg_replace("/\@/", "&commat;", $media["caption"]["from"]["full_name"]), "SB");
				$values["username"] = decodeEmoji($media["caption"]["from"]["username"], "SB");

				$values["user_id"] = $media["caption"]["from"]["id"];
				$values["likes"] = $media["likes"]["count"];

				$values["image"] = $media["images"]["standard_resolution"]["url"];
				$values["profile_image"] = $media["caption"]["from"]["profile_picture"];

				$values["video"] = isset($media["videos"]) ? $media["videos"]["standard_resolution"]["url"] : false;

//				print_r($values);

				// create new instagram in Janitor
				$cms_response = postBackToJanitor($values);
//				print "cms_response:" . $cms_response . "<br>\n";


				// error
				if(!$cms_response || $cms_response["cms_status"] != "success") {

					print '<li class="item error"><h3>ERROR!!! For some reason this post could not be added?? ('.$media["id"].') '.print_r($cms_response) .'</h3></li>';

				}
				// success
				else {

					if($cms_response["cms_status"] == "success" && !isset($cms_response["cms_message"]["error"])):
						print '<li class="item"><h3>New instagram added: '.$cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["message"]) .')</h3></li>';

					// fallback for broken images - stored and disabled
					else:
						print '<li class="item error"><h3>New instagram added and disabled: '. $cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["error"]) .')</h3></li>';
					endif;

				}
			}

			// instagram already exists
			// update likes count
			else {


//				return;


//				print "updated likes:".$media["id"]."<br>\n";

				$likes = $media["likes"]["count"];

				$query = new Query();
				$query->sql("UPDATE ".SITE_DB.".item_instagram SET likes = ".$likes." WHERE name = '".$media["id"]."'");

			}

		}

	}
	else if(isset($results["error_message"])) {
		print '<li class="item error"><h3>'.$results["error_message"].'</h3></li>';
	}

	// check for next page
	if(isset($results["pagination"]) && isset($results["pagination"]["next_max_id"]) && !$model->nextIdExists($results["pagination"]["next_max_id"]))  {

//		print "go next\n";

		$next_id = $results["pagination"]["next_max_id"];

		// free some memory
		$results = null;
		$instagram_response = null;
		$cms_response = null;

		// get next set
		$new_results = getSet($next_id);
		$create_results = $create_results ? $create_results : $new_results;
	}


	return $create_results;
}

?>
<div class="scene defaultList fetchInstagrams">
	<h1>Fetching instagrams</h1>

	<ul class="actions">
		<?= $HTML->link("Back", "/janitor/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<ul class="items">
		<? $create_results = getSet(); ?>
	</ul>

<?	if(!$create_results): ?>
	<p>No new Instagrams</p>
<?	endif; ?>

</div>
