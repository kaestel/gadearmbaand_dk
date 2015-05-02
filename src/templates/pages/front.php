<?php
global $action;

$IC = new Items();

$itemtype = "instagram";
$instagrams = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 22, "extend" => array("tags" => true, "mediae" => true)));

$itemtype = "twitter";
$tweets = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "limit" => 10, "extend" => array("tags" => true)));

$itemtype = "media";
$mediae = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC, published_at DESC", "limit" => 3, "extend" => array("mediae" => true)));

?>

<div class="scene front i:front">
	<h1>#gadearmbaand</h1>

	<ul class="grid">
		<li class="article twenty i0">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Køb. Så tryller vi</h2>
				<a href="#">Køb nu</a>
			</div>
		</li>
		<li class="instagram forty i2">
			<div class="image image_id:<?= $instagrams[0]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[0]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty i3"></li>
		<li class="instagram twenty i4">
			<div class="image image_id:<?= $instagrams[1]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[1]["username"] ?></p>
			</div>
		</li>
		<li class="blank sixty i5"></li>
		<li class="instagram forty push_up_half mfull i6">
			<div class="image image_id:<?= $instagrams[2]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[2]["username"] ?></p>
			</div>
		</li>
		<li class="instagram twenty push_up i7">
			<div class="image image_id:<?= $instagrams[3]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[3]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty i8"></li>
		<li class="instagram twenty push_up i9">
			<div class="image image_id:<?= $instagrams[4]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[4]["username"] ?></p>
			</div>
		</li>
		<li class="blank forty i10"></li>
		<li class="article forty i11">
			<div class="card">
				<h3>Manifest</h3>
				<h2>En gadefest er i virkelig­&shy;heden ikke svær at holde</h2>
				<a href="/manifest">Derfor gadearmbånd</a>
			</div>
		</li>
		<li class="tweet forty i12">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[0]["username"]) ?>" target="_blank"><?= $tweets[0]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[0]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[1]["username"]) ?>" target="_blank"><?= $tweets[1]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[1]["text"]) ?></p>
			</div>
		</li>
		<li class="instagram twenty push_down mfull i13">
			<div class="image image_id:<?= $instagrams[5]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[5]["username"] ?></p>
			</div>
		</li>
		<li class="ambassador a1">
			<ul>
				<li class="video sixty">
					<div class="image image_id:<?= $mediae[0]["item_id"] ?> image_format:<?= $mediae[0]["mediae"]["image"]["format"] ?>"></div>
					<div class="video video_id:<?= $mediae[0]["item_id"] ?> video_format:<?= $mediae[0]["mediae"]["video"]["format"] ?>"></div>
				</li>
				<li class="article forty">
					<div class="card">
						<h3>Fest-diplomat</h3>
						<h2>Master Fatman</h2>
						<p>Om at gøre noget ved byen. Om Dronning Louises Bro der kan mærke det. Om 4/4-takter og om at tilbyde en masse forskelligt på hylderne.</p>
						<a href="#">Køb Gadearmbånd</a>
					</div>
				</li>
			</ul>
		</li>
	</ul>

	<ul class="grid">
		<li class="tweet forty">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[2]["username"]) ?>" target="_blank"><?= $tweets[2]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[2]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[3]["username"]) ?>" target="_blank"><?= $tweets[3]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[3]["text"]) ?></p>
			</div>
		</li>
		<li class="instagram forty mfull">
			<div class="image image_id:<?= $instagrams[6]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[6]["username"] ?></p>
			</div>
		</li>
		<li class="article twenty push_down">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Hold festen skæv</h2>
				<a href="#">Køb nu</a>
			</div>
		</li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[7]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[7]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[8]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[8]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[9]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[9]["username"] ?></p>
			</div>
		</li>
		<li class="tweet forty float push_up_half">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[4]["username"]) ?>" target="_blank"><?= $tweets[4]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[4]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[5]["username"]) ?>" target="_blank"><?= $tweets[5]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[5]["text"]) ?></p>
			</div>
		</li>
		<li class="ambassador a2">
			<ul>
				<li class="article forty">
					<div class="card">
						<h3>Fest-diplomat</h3>
						<h2>David Muchacho</h2>
						<p>Om at have været med siden dengang. Om at indtage Vesterbro oppefra. Om at flirte med en sommerkæreste. Om at få solen i øjnene og Distortion i kroppen.</p>
						<a href="/manifest">Derfor gadearmbånd</a>
					</div>
				</li>
				<li class="video sixty">
					<div class="image image_id:<?= $mediae[1]["item_id"] ?> image_format:<?= $mediae[1]["mediae"]["image"]["format"] ?>"></div>
					<div class="video video_id:<?= $mediae[1]["item_id"] ?> video_format:<?= $mediae[1]["mediae"]["video"]["format"] ?>"></div>
				</li>
			</ul>
		</li>
	</ul>

	<ul class="grid">
		<li class="instagram twenty push_down">
			<div class="image image_id:<?= $instagrams[10]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[10]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[11]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[11]["username"] ?></p>
			</div>
		</li>
		<li class="article twenty">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Skab magien</h2>
				<a href="#">Køb nu</a>
			</div>
		</li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[12]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[12]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="tweet forty">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[6]["username"]) ?>" target="_blank"><?= $tweets[6]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[6]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[7]["username"]) ?>" target="_blank"><?= $tweets[7]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[7]["text"]) ?></p>
			</div>
		</li>
		<li class="instagram forty push_up_half mfull">
			<div class="image image_id:<?= $instagrams[13]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[13]["username"] ?></p>
			</div>
		</li>
		<li class="ambassador a3">
			<ul>
				<li class="video sixty">
					<div class="image image_id:<?= $mediae[2]["item_id"] ?> image_format:<?= $mediae[2]["mediae"]["image"]["format"] ?>"></div>
					<div class="video video_id:<?= $mediae[2]["item_id"] ?> video_format:<?= $mediae[2]["mediae"]["video"]["format"] ?>"></div>
				</li>
				<li class="article forty">
					<div class="card">
						<h3>Fest-diplomat</h3>
						<h2>Signe Lykke</h2>
						<p>Om at lave klassisk musik med underliggende drone-bas. Om at være med til at udfordre rammerne. Om musiksnobberi og drive, blod, sved og tårer.</p>
						<a href="/events">Se gadeprogrammet</a>
					</div>
				</li>
			</ul>
		</li>
	</ul>

	<ul class="grid">
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[14]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[14]["username"] ?></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[15]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[15]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[16]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[16]["username"] ?></p>
			</div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty push_up_half">
			<div class="image image_id:<?= $instagrams[17]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[17]["username"] ?></p>
			</div>
		</li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[18]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[18]["username"] ?></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[19]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[19]["username"] ?></p>
			</div>
		</li>
		<li class="blank forty"></li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[20]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[20]["username"] ?></p>
			</div>
		</li>
		<li class="tweet forty">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[8]["username"]) ?>" target="_blank"><?= $tweets[8]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[8]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[9]["username"]) ?>" target="_blank"><?= $tweets[9]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[9]["text"]) ?></p>
			</div>
		</li>
		<li class="instagram twenty push_down mfull">
			<div class="image image_id:<?= $instagrams[21]["item_id"] ?> format:<?= $instagrams[0]["image"] ?>">
				<p>@<?= $instagrams[21]["username"] ?></p>
			</div>
		</li>
	</ul>

</div>
