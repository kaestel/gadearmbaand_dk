<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "buy";

$page->bodyClass("buy");
$page->pageTitle("Køb gadearmbånd");


$page->page(array(
	"templates" => "pages/buy.php"
	)
);
exit();


?>
 