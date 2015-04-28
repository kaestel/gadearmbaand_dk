<?php
global $action;

$IC = new Items();


$itemtype = "instagram";
$instagrams = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 15, "extend" => array("tags" => true, "mediae" => true)));

$itemtype = "twitter";
$tweets = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 10, "extend" => array("tags" => true)));

?>

<!-- Fonts in - Regular / Black -->
<div class="scene front i:front">
	<h1>Gadeårmband</h1>

	<ul id="grid">
		<!-- item: instagram -->
		<!--li class="instagram twenty">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li-->
		<!-- item: article page -->
		<li class="article twenty">
			<h3>Gadeårmband</h3>
			<h2>Del din kærlighed</h2>
			<a href="#">Køb nu</a>
		</li>
		<!-- item: istagram -->
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[0]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[1]["item_id"] ?> format:<?= $instagrams[1]["image"] ?>"></div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty negative_twenty">
			<div class="image image_id:<?= $instagrams[2]["item_id"] ?> format:<?= $instagrams[2]["image"] ?>"></div>
		</li>
		<li class="instagram twenty negative_twenty">
			<div class="image image_id:<?= $instagrams[3]["item_id"] ?> format:<?= $instagrams[3]["image"] ?>"></div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty negative_twenty">
			<div class="image image_id:<?= $instagrams[4]["item_id"] ?> format:<?= $instagrams[4]["image"] ?>"></div>
		</li>

		<li class="blank forty">
		</li>
		<!-- item: article page -->
		<li class="article forty">
			<h3>Gadeårmband</h3>
			<h2>En gadefest er i virkeligheden ikke svært at holde</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<!-- item: tweet -->
		<li class="tweet">
			<h2 class="author"><?= $tweets[0]["username"] ?></h2>
			<p><?= $tweets[0]["text"] ?></p>
		</li>

		<!--li class="blank twenty"></li-->
		<li class="instagram twenty plus_twenty">
			<div class="image image_id:<?= $instagrams[5]["item_id"] ?> format:<?= $instagrams[5]["image"] ?>"></div>
		</li>

		<li class="instagram">
			<div class="image image_id:<?= $instagrams[6]["item_id"] ?> format:<?= $instagrams[6]["image"] ?>"></div>
		</li>
		<li class="instagram">
			<div class="image image_id:<?= $instagrams[7]["item_id"] ?> format:<?= $instagrams[7]["image"] ?>"></div>
		</li>



		<li class="instagram">
			<div class="image image_id:<?= $instagrams[8]["item_id"] ?> format:<?= $instagrams[8]["image"] ?>"></div>
		</li>
		<li class="instagram">
			<div class="image image_id:<?= $instagrams[9]["item_id"] ?> format:<?= $instagrams[9]["image"] ?>"></div>
		</li>

		<!-- item: tweet -->
		<li class="tweet">
			<h2 class="author"><?= $tweets[1]["username"] ?></h2>
			<p><?= $tweets[1]["text"] ?></p>
		</li>

		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>
		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>
		<!-- item: article page -->
		<li class="article">
			<h3>Ambassador</h3>
			<h2>David Muchacho</h2>
			<p>Lorem ipsum, info about the the ambassador.</p>
			<a href="#">Derfor gadeårmband</a>
		</li>

	</ul>
</div>
