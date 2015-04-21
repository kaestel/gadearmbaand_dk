<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "manifest";

$page->bodyClass("manifest");
$page->pageTitle("Manifest");


$page->page(array(
	"templates" => "pages/manifest.php"
	)
);
exit();


?>
 