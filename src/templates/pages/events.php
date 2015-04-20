<?php
global $IC;
global $action;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => array("tags" => true)));
$tags = $IC->getTags(array("context" => $itemtype)); 
$days = $IC->getTags(array("context" => "day")); 


?>

<div class="scene event i:events">
	
	<ul class="days">
<?		if($days): ?>
<?			foreach($days as $day): ?>
				<li><?= $day["value"] ?></li>
<?			endforeach; ?>
<?		endif; ?>
	</ul>

	<h2>Filter by tags</h2>
	<ul class="tag_list">
<?		if($tags): ?>
<?			foreach($tags as $tag): ?>
				<li><?= $tag["value"] ?></li>
<?			endforeach; ?>
<?		endif; ?>
	</ul>

	<ul class="legend">
		<li>Host</li>
		<li>Event</li>
		<li>Location</li>
		<li>Tags</li>
	</ul>


<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): ?>

		<li class="item person id:<?= $item["item_id"] ?> i:article" itemscope itemtype="http://schema.org/Person">

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
				<p><?= $item["description"] ?></p>
				
				<ul class="action">
					<li>
						<a href="<?= $item["facebook_link"] ?>">Facebook event</a>
					</li>
				</ul>

			</div>

		</li>

<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>
