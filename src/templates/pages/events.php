<?php
global $IC;
global $action;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => array("tags" => true, "mediae" => true)));
$tags = $IC->getTags(array("context" => $itemtype)); 
$days = $IC->getTags(array("context" => "day")); 


?>

<div class="scene event i:events">

	<h1>Events</h1>

	<ul class="days">
<?		if($days): ?>
<?			foreach($days as $day): ?>
				<li><?= $day["value"] ?></li>
<?			endforeach; ?>
<?		endif; ?>
	</ul>

	<h2>Advanced search</h2>
	<div class="filter">

		<h3>Filter by tags</h3>
		<ul class="tag_list">
		<?		if($tags): ?>
		<?			foreach($tags as $tag): ?>
					<li><?= $tag["value"] ?></li>
		<?			endforeach; ?>
		<?		endif; ?>
		</ul>
		
		<form class="search">
			<h3>Search</h3>
			<fieldset>
				<div class="field string">
					<input type="text" />
				</div>
			</fieldset>
		</form>
	</div>

	<ul class="legend">
		<li>Host</li>
		<li>Event</li>
		<li>Location</li>
		<li>Tags</li>
	</ul>


<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): 
		$media = $IC->sliceMedia($item);
?>

		<li class="item person id:<?= $item["item_id"] ?> <?= arrayKeyValue($item["tags"], "context", "day") !== false ? strtolower($item["tags"][arrayKeyValue($item["tags"], "context", "day")]["value"]) : "" ?> day:<?= arrayKeyValue($item["tags"], "context", "day") !== false ? $item["tags"][arrayKeyValue($item["tags"], "context", "day")]["value"] : "" ?> i:article">

			<h3 class="host"><?= $item["host"] ?></h3>
			<h2 class="name"><?= $item["name"] ?></h2>
			<p class="location"><?= $item["location"] ?></p>

<?			if($item["tags"]): ?>
				<ul class="tags">
<?					foreach($item["tags"] as $item_tag): ?>
<?						if($item_tag["context"] == $itemtype): ?>
							<li><?= $item_tag["value"] ?></li>
<?						endif; ?>
<?					endforeach; ?>
				</ul>
<?			endif; ?>

			<div class="description">
				<div class="media">
					<img src="/images/6/single_media/x390.png">
				</div>
				
				<div class="text">
					<p><?= $item["description"] ?></p>
				
					<ul class="action">
						<li>
							<a href="<?= $item["facebook_link"] ?>">Facebook event</a>
						</li>
					</ul>
				</div>

			</div>

		</li>

<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>
