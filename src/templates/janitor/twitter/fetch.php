<?php

error_reporting(E_ALL);
set_time_limit(0);

global $action;
global $model;
//global $IC;
global $itemtype;


global $twitter_name;
global $t_token_url;
global $t_oauth_consumer_key;
global $t_oauth_consumer_secret;

$twitter_name = "kaesteltest";
$t_token_url = "https://api.twitter.com/oauth2/token";
$t_oauth_consumer_key = "Hf0BSUTMsw0o0XvTcvMT38Y9A";
$t_oauth_consumer_secret = "0GwR11zPYbDQ49r13s90mWd8w0D7tErERjhkVPrRz50I0v600o";

global $create_results;
$create_results = false;

	
// post values back to janitor, to create new instagram items
function postBackToJanitor($values) {

//	print "postBackToJanitor<br>";

//	global $IC;
	global $model;
	global $perf;

	// create post values
	unset($_POST);
	$_POST = $values;
	$_POST["status"] = 1;
	$model->getPostedEntities();
	$result = $model->save(array("save", "twitter"));

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




// make twitter token request - creates a bearer token for queries
function requestToken() {

	global $t_token_url;
	global $t_oauth_consumer_key;
	global $t_oauth_consumer_secret;
	$t_bearer_token = base64_encode(urlencode($t_oauth_consumer_key).":".urlencode($t_oauth_consumer_secret));
//	print $t_bearer_token;


	$ch = curl_init();
	curl_setopt_array($ch, array(
		CURLOPT_URL => $t_token_url,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => 2,
		CURLOPT_ENCODING => 'gzip',
		CURLOPT_POSTFIELDS => "grant_type=client_credentials",
		CURLOPT_HTTPHEADER => array('Authorization: Basic '.$t_bearer_token.'Content-Type: application/x-www-form-urlencoded;charset=UTF-8')
	));

	$result = curl_exec($ch);
	curl_close($ch);

	$json = json_decode($result);
	if(isset($json->token_type) && isset($json->access_token) && $json->token_type == "bearer") {
		return $json->access_token;
	}

	return false;
}

// make a request to the Twitter API
function twitterRequest($url, $data) {

	// get bearer token first
	$token = requestToken();
	if($token) {
	
		$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => $url."?".$data,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_SSL_VERIFYHOST => 2,
			CURLOPT_ENCODING => 'gzip',
			CURLOPT_HTTPHEADER => array('Authorization: Bearer '.$token)
		));

		$result = curl_exec($ch);
		curl_close($ch);

//		print $result;
		$json = json_decode($result, true);
		return $json;
	}
	return false;
}



// get twitter timeline
function getTimeline($max_id = false) {

//	print "getTimeline:".$max_id."<br>\n";

//	global $IC;
	global $model;
	global $twitter_name;
	global $create_results;

	$extend_timeline = true;
	$last_tweet_id = false;

	$timeline = twitterRequest("https://api.twitter.com/1.1/statuses/user_timeline.json", "screen_name=".$twitter_name."&include_rts=false&contributor_details=false&trim_user=true&exclude_replies=true&count=200".($max_id ? "&max_id=".$max_id : ""));
//	print_r($timeline);

	if($timeline && !isset($timeline["errors"])) {

		// loop through results
		foreach($timeline as $tweet) {
//			print_r($tweet);

			$values = array();

			if(!$model->exists($tweet["id"])) {

				$create_results = true;
				$last_tweet_id = $tweet["id"];


				$values["published_at"] = date("Y-m-d H-i-s", strtotime($tweet["created_at"]));
				$values["status"] = 1;

				$values["name"] = $tweet["id"];
				$values["text"] = decodeEmoji(preg_replace("/\@/", "&commat;", $tweet["text"]), "SB");
				$values["username"] = "@".$twitter_name;
				$values["user_id"] = $tweet["user"]["id"];
//				print_r($values);

				// create new tweet in Janitor
				$cms_response = postBackToJanitor($values);
//				print "cms_response:" . $cms_response . "<br>\n";


				// error
				if(!$cms_response || $cms_response["cms_status"] != "success") {

					print '<li class="item error"><h3>ERROR!!! For some reason this post could not be added?? ('.$tweet["id"].') '.print_r($cms_response) .'</h3></li>'."\n";

				}
				// success
				else {

					if($cms_response["cms_status"] == "success" && !isset($cms_response["cms_message"]["error"])):
						print '<li class="item"><h3>New tweet added: '.$cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["message"]) .')</h3></li>'."\n";

					// fallback for broken images - stored and disabled
					else:
						print '<li class="item error"><h3>New tweet added and disabled: '. $cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["error"]) .')</h3></li>'."\n";
					endif;

				}

			}
			// tweet exists
			else {
				
				// last tweet already exists - no need to go further back
				$extend_timeline = false;
				
			}

		}

	}

	// no timeline received
	else if(isset($timeline["errors"])) {
		print '<li class="item error"><h3>'.$timeline["errors"][0]["message"].'</h3></li>'."\n";
	}

// 	// check for next page
 	if($extend_timeline && $last_tweet_id)  {
//		print "go next\n";
		getTimeline($last_tweet_id);
 	}

}


// do search for tweets with mention of twitter_name
function getSearch($max_id = false) {

//	print "getSearch:".$max_id."<br>\n";

//	global $IC;
	global $model;
	global $twitter_name;
	global $create_results;

	$extend_search = true;
	$last_tweet_id = false;

	$search = twitterRequest("https://api.twitter.com/1.1/search/tweets.json", "q=@".$twitter_name."&result_type=recent&include_entities=false&count=100".($max_id ? "&max_id=".$max_id : ""));
//	print_r($search);

	if(isset($search["statuses"])) {

		// loop through results
		foreach($search["statuses"] as $tweet) {
//			print_r($tweet);

			$values = array();

			if(!$model->exists($tweet["id"])) {

				$create_results = true;
				$last_tweet_id = $tweet["id"];


				$values["published_at"] = date("Y-m-d H-i-s", strtotime($tweet["created_at"]));
				$values["status"] = 1;

				$values["name"] = $tweet["id"];
				$values["text"] = decodeEmoji(preg_replace("/\@/", "&commat;", $tweet["text"]), "SB");
				$values["username"] = "@".decodeEmoji($tweet["user"]["screen_name"], "SB");
				$values["user_id"] = $tweet["user"]["id"];
//				print_r($values);

				// create new tweet in Janitor
				$cms_response = postBackToJanitor($values);
//				print "cms_response:" . $cms_response . "<br>\n";


				// error
				if(!$cms_response || $cms_response["cms_status"] != "success") {

					print '<li class="item error"><h3>ERROR!!! For some reason this post could not be added?? ('.$tweet["id"].') '.print_r($cms_response) .'</h3></li>'."\n";

				}
				// success
				else {

					if($cms_response["cms_status"] == "success" && !isset($cms_response["cms_message"]["error"])):
						print '<li class="item"><h3>New tweet added: '.$cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["message"]) .')</h3></li>'."\n";

					// fallback for broken images - stored and disabled
					else:
						print '<li class="item error"><h3>New tweet added and disabled: '. $cms_response["cms_object"]["name"] .' ('. implode(", ", $cms_response["cms_message"]["error"]) .')</h3></li>'."\n";
					endif;

				}

			}
			// tweet exists
			else {
				
				// last tweet already exists - no need to go further back
				$extend_search = false;
				
			}

		}

	}

	// no timeline received
	else if(isset($timeline["errors"])) {
		print '<li class="item error"><h3>'.$timeline["errors"][0]["message"].'</h3></li>'."\n";
	}

// 	// check for next page
 	if($extend_search && $last_tweet_id)  {
//		print "go next\n";
		getSearch($last_tweet_id);
 	}

}

?>
<div class="scene defaultList fetchTweets">
	<h1>Fetching Tweets</h1>

	<ul class="actions">
		<?= $HTML->link("Back", "/janitor/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<ul class="items">
		<? getTimeline(); ?>
		<? getSearch(); ?>
	</ul>

<?	if(!$create_results): ?>
	<p>No new Tweets</p>
<?	endif; ?>

</div>
