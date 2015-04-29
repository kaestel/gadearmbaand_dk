<?php
global $action;

$IC = new Items();

$itemtype = "instagram";
$instagrams = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 22, "extend" => array("tags" => true, "mediae" => true)));

$itemtype = "twitter";
$tweets = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 5, "extend" => array("tags" => true)));

$itemtype = "media";
$mediae = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 3, "extend" => array("mediae" => true)));

?>

<div class="scene front i:front">
	<h1>Gadeårmband</h1>

	<ul class="grid">
		<li class="article twenty">
			<h3>Gadeårmband</h3>
			<h2>Del din kærlighed</h2>
			<a href="#">Køb nu</a>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[0]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[0]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[1]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[1]["username"] ?></p>
			</div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty push_up_half mfull">
			<div class="image image_id:<?= $instagrams[2]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[2]["username"] ?></p>
			</div>
		</li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[3]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[3]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[4]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[4]["username"] ?></p>
			</div>
		</li>
		<li class="blank forty"></li>
		<li class="article forty">
			<h3>Gadeårmband</h3>
			<h2>En gadefest er i virkelig&shy;heden ikke svært at holde</h2>
			<a href="/manifest">Læs hvorfor</a>
		</li>
		<li class="tweet forty">
			<h3 class="author"><?= $tweets[0]["username"] ?></h3>
			<p><?= $tweets[0]["text"] ?></p>
		</li>
		<li class="instagram twenty push_down mfull">
			<div class="image image_id:<?= $instagrams[5]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[5]["username"] ?></p>
			</div>
		</li>
		<li class="ambassador">
			<ul>
				<li class="video sixty video_id:<?= $mediae[0]["item_id"] ?> video_format:<?= $mediae[0]["mediae"]["video"]["format"] ?> image_id:<?= $mediae[0]["item_id"] ?> image_format:<?= $mediae[0]["mediae"]["image"]["format"] ?>"></li>
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
		<li class="instagram forty mfull">
			<div class="image image_id:<?= $instagrams[6]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[6]["username"] ?></p>
			</div>
		</li>
		<li class="article twenty push_down">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[7]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[7]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[8]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[8]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[9]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[9]["username"] ?></p>
			</div>
		</li>
		<li class="tweet forty float push_up_half">
			<h3 class="author"><?= $tweets[2]["username"] ?></h3>
			<p><?= $tweets[2]["text"] ?></p>
		</li>
		<li class="ambassador">
			<ul>
				<li class="article forty">
					<h3>Ambassador</h3>
					<h2>David Muchacho</h2>
					<p>Lorem ipsum, info about the the ambassador.</p>
					<a href="#">Derfor gadeårmband</a>
				</li>
				<li class="video sixty video_id:<?= $mediae[1]["item_id"] ?> video_format:<?= $mediae[1]["mediae"]["video"]["format"] ?> image_id:<?= $mediae[1]["item_id"] ?> image_format:<?= $mediae[1]["mediae"]["image"]["format"] ?>"></li>
			</ul>
		</li>
	</ul>

	<ul class="grid">
		<li class="instagram twenty push_down">
			<div class="image image_id:<?= $instagrams[10]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[10]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[11]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[11]["username"] ?></p>
			</div>
		</li>
		<li class="article twenty">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[12]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[12]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="tweet forty">
			<h3 class="author"><?= $tweets[3]["username"] ?></h3>
			<p><?= $tweets[3]["text"] ?></p>
		</li>
		<li class="instagram forty push_up_half mfull">
			<div class="image image_id:<?= $instagrams[13]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[13]["username"] ?></p>
			</div>
		</li>
		<li class="ambassador">
			<ul>
				<li class="video sixty video_id:<?= $mediae[2]["item_id"] ?> video_format:<?= $mediae[2]["mediae"]["video"]["format"] ?> image_id:<?= $mediae[2]["item_id"] ?> image_format:<?= $mediae[2]["mediae"]["image"]["format"] ?>"></li>
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
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[14]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[14]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[15]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[15]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[16]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[16]["username"] ?></p>
			</div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty push_up_half">
			<div class="image image_id:<?= $instagrams[17]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[17]["username"] ?></p>
			</div>
		</li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[18]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[18]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[19]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[19]["username"] ?></p>
			</div>
		</li>
		<li class="blank forty"></li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[20]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[20]["username"] ?></p>
			</div>
		</li>
		<li class="tweet forty">
			<h3 class="author"><?= $tweets[4]["username"] ?></h3>
			<p><?= $tweets[4]["text"] ?></p>
		</li>
		<li class="instagram twenty push_down mfull">
			<div class="image image_id:<?= $instagrams[21]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p><?= $instagrams[21]["username"] ?></p>
			</div>
		</li>
	</ul>

</div>
