<?php
global $action;
global $model;
global $IC;
global $itemtype;

// get enabled items count (just to be able to show number in backend)
$enabled_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1));
$all_items = $IC->getItems(array("itemtype" => $itemtype));

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "limit" => 1000, "extend" => true));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Tweets (Showing Last 1000)</h1>

	<ul class="actions">
		<?= $HTML->link("Fetch latest", "/janitor/".$itemtype."/fetch", array("class" => "button primary", "wrapper" => "li.fetch")) ?>
	</ul>

	<div class="stats">
		<p><?= pluralize(count($enabled_items), "tweet", "tweets")?> enabled. (<?= pluralize(count($all_items), "tweet", "tweets")?> in total)</p>
	</div>

	<div class="all_items i:defaultList filters"<?= $JML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= $item["text"] ?></h3>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No tweets.</p>
<?		endif; ?>
	</div>

</div>
