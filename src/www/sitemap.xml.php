<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");
$IC = new Items();

print '<?xml version="1.0" encoding="UTF-8"?>';
?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?	$items = $IC->getItems(array("itemtype" => "twitter", "status" => 1, "limit" => 1)); ?>
	<url>
		<loc>http://gadearmbaand.dk/</loc>
		<lastmod><?= date("Y-m-d", strtotime($items[0]["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<?	$items = $IC->getItems(array("itemtype" => "event", "status" => 1, "limit" => 1)); ?>
	<url>
		<loc>http://gadearmbaand.dk/program</loc>
		<lastmod><?= date("Y-m-d", strtotime($items[0]["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
	<url>
		<loc>http://gadearmbaand.dk/manifest</loc>
		<lastmod><?= date("Y-m-d", filemtime(LOCAL_PATH."/templates/pages/manifest.php")) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.5</priority>
	</url>
</urlset>