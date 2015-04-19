<?php
$access_item["/"] = true;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "instagram";
$model = $IC->typeObject($itemtype);


$page->bodyClass("instagram");
$page->pageTitle("Instagrams");


if(is_array($action) && count($action)) {

	// LIST/EDIT ITEM
	if(preg_match("/^(list|edit)$/", $action[0])) {

		$page->page(array(
			"type" => "janitor",
			"templates" => "janitor/".$itemtype."/".$action[0].".php"
		));
		exit();
	}
	// // LIST ITEM
	// if(count($action) == 1 && $action[0] == "list") {
	//
	// 	$page->page(array(
	// 		"type" => "janitor",
	// 		"templates" => "janitor/".$itemtype."/list.php"
	// 		)
	// 	);
	// 	exit();
	//
	// }

	// FETCH ITEM (TOO HEAVY FOR BUFFERING)
	else if(count($action) == 1 && $action[0] == "fetch") {

		$page->header(array("type" => "janitor"));
		$page->template("janitor/".$itemtype."/fetch.php");
		$page->footer(array("type" => "janitor"));
		exit();

	}
	// // EDIT ITEM
	// else if(count($action) == 2 && $action[0] == "edit") {
	//
	// 	$page->page(array(
	// 		"type" => "janitor",
	// 		"templates" => "janitor/".$itemtype."/edit.php"
	// 		)
	// 	);
	// 	exit();
	//
	// }

	// Class interface
	else if($page->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

		// check if custom function exists on User class
		if($model && method_exists($model, $action[0])) {

			$output = new Output();
			$output->screen($model->$action[0]($action));
			exit();
		}
	}

}

$page->page(array(
	"templates" => "pages/404.php"
));


?>
