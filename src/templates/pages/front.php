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

	<ul class="grid">

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

		<!-- item: blank -->
		<li class="blank twenty"></li>

		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[1]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>
		<li class="blank sixty"></li>

		<li class="instagram forty push_up_half">
			<div class="image image_id:<?= $instagrams[2]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[3]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>
		<li class="blank twenty"></li>

		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[4]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="blank forty"></li>

		<!-- item: article page -->
		<li class="article forty">
			<h3>Gadeårmband</h3>
			<h2>En gadefest er i virkeligheden ikke svært at holde</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<!-- item: tweet -->
		<li class="tweet forty">
			<h3 class="author"><?= $tweets[0]["username"] ?></h3>
			<p><?= $tweets[0]["text"] ?></p>
		</li>

		<li class="instagram twenty push_down">
			<div class="image image_id:<?= $instagrams[5]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<!-- item: article page -->
		<li class="ambassador">
			<ul>
				<li class="video sixty video_id:front_video format:mp4">
					<!-- video -->
				</li>

				<li class="article forty">
					<h3>Ambassador</h3>
					<h2>David Muchacho</h2>
					<p>Lorem ipsum, info about the the ambassador.</p>
					<a href="#">Derfor gadeårmband</a>

				</li>
			</ul>
		</li>

	</ul>


	<ul class="grid">

		<li class="tweet forty">
			<h3 class="author"><?= $tweets[1]["username"] ?></h3>
			<p><?= $tweets[1]["text"] ?></p>
		</li>

		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[6]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<!-- item: article page -->
		<li class="article twenty push_down">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[7]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[8]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="blank twenty"></li>

		<li class="instagram twenty ">
			<div class="image image_id:<?= $instagrams[9]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="tweet forty float push_up_half">
			<h3 class="author"><?= $tweets[2]["username"] ?></h3>
			<p><?= $tweets[2]["text"] ?></p>
		</li>


		<!-- item: article page -->
		<li class="ambassador">
			<ul>
				<li class="article forty">
					<h3>Ambassador</h3>
					<h2>David Muchacho</h2>
					<p>Lorem ipsum, info about the the ambassador.</p>
					<a href="#">Derfor gadeårmband</a>
				</li>

				<li class="video sixty video_id:front_video format:mp4">
					<!-- video -->
				</li>


			</ul>
		</li>
	</ul>


	<ul class="grid">

		<li class="instagram twenty push_down">
			<div class="image image_id:<?= $instagrams[10]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[11]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<!-- item: article page -->
		<li class="article twenty">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[12]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<li class="blank twenty"></li>

		<li class="tweet forty">
			<h3 class="author"><?= $tweets[3]["username"] ?></h3>
			<p><?= $tweets[3]["text"] ?></p>
		</li>

		<li class="instagram forty push_up_half">
			<div class="image image_id:<?= $instagrams[13]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>"></div>
		</li>

		<!-- item: article page -->
		<li class="ambassador">
			<ul>
				<li class="video sixty video_id:front_video format:mp4">
					<!-- video -->
				</li>

				<li class="article forty">
					<h3>Ambassador</h3>
					<h2>David Muchacho</h2>
					<p>Lorem ipsum, info about the the ambassador.</p>
					<a href="#">Derfor gadeårmband</a>

				</li>
			</ul>
		</li>

	</ul>
</div>
