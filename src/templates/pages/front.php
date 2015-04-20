<?php
global $action;

$IC = new Items();
$itemtype = "instagram";

$instagrams = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => array("tags" => true, "mediae" => true)));



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
			<div class="image image_id:frontpage2_new format:jpg"></div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty negative_twenty">
			<div class="image image_id:frontpage3_new format:jpg"></div>
		</li>
		<li class="instagram twenty negative_twenty">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty negative_twenty">
			<div class="image image_id:frontpage2_new format:jpg"></div>
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
			<h2 class="author">@twitter_user</h2>
			<p>This is the text from at tweet, it can include links. <a href="http://google.com">Link in tweet</a>. The text is exactly 140 characters long.</p>
		</li>

		<!--li class="blank twenty"></li-->
		<li class="instagram twenty plus_twenty">
			<div class="image image_id:frontpage2_new format:jpg"></div>
		</li>

		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>
		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>



		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
		</li>
		<li class="instagram">
			<div class="image image_id:frontpage1_new format:jpg"></div>
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
