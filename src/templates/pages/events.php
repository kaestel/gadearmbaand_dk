<?php
global $IC;
global $action;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => array("tags" => true)));

?>

<div class="scene people i:generic">
	<h1>People</h1>
<?	if(!$items): ?>
	<ul class="items">
<?		foreach($items as $item):
		
?>
		<li class="item person id:<?= $item["item_id"] ?> i:article" itemscope itemtype="http://schema.org/Person">


			<ul class="tags">
<?		if($item["tags"]): ?>
<?			foreach($item["tags"] as $item_tag): ?>
<?				if($item_tag["context"] == $itemtype): ?>
				<li><?= $item_tag["value"] ?></li>
<?				endif; ?>
<?			endforeach; ?>
<?		endif; ?>
			</ul>
			<h2 itemprop="name"><?= $item["name"] ?></h2>
			<p class="description" itemprop="description">
				<?= $item["description"] ?>
			</p>
			<ul class="info">
				<li itemprop="jobtitle"><?= stringOr($item["job_title"], "N/A") ?></li>	
				<li itemprop="email"><?= stringOr($item["email"], "N/A") ?></li>
				<li itemprop="telephone"><?= stringOr($item["tel"], "N/A") ?></li>
			</ul>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>
