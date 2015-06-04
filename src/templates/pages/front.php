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
		<li class="article twenty">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Køb. Så tryller vi</h2>
				<ul class="actions">
					<li><a href="/buy">Køb nu</a></li>
				</ul>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[0]["item_id"] ?> image_format:<?= $instagrams[0]["image"] ?><?= $instagrams[0]["video"] ? " video_format:".$instagrams[0]["video"] : "" ?>">
				<p><a href="<?= $instagrams[0]["link"] ?>" target="_blank">@<?= $instagrams[0]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[1]["item_id"] ?> image_format:<?= $instagrams[1]["image"] ?><?= $instagrams[1]["video"] ? " video_format:".$instagrams[1]["video"] : "" ?>">
				<p><a href="<?= $instagrams[1]["link"] ?>" target="_blank">@<?= $instagrams[1]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty push_up_half mfull">
			<div class="image image_id:<?= $instagrams[2]["item_id"] ?> image_format:<?= $instagrams[2]["image"] ?><?= $instagrams[2]["video"] ? " video_format:".$instagrams[2]["video"] : "" ?>">
				<p><a href="<?= $instagrams[2]["link"] ?>" target="_blank">@<?= $instagrams[2]["username"] ?></a></p>
			</div>
		</li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[3]["item_id"] ?> image_format:<?= $instagrams[3]["image"] ?><?= $instagrams[3]["video"] ? " video_format:".$instagrams[3]["video"] : "" ?>">
				<p><a href="<?= $instagrams[3]["link"] ?>" target="_blank">@<?= $instagrams[3]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[4]["item_id"] ?> image_format:<?= $instagrams[4]["image"] ?><?= $instagrams[4]["video"] ? " video_format:".$instagrams[4]["video"] : "" ?>">
				<p><a href="<?= $instagrams[4]["link"] ?>" target="_blank">@<?= $instagrams[4]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank forty"></li>
		<li class="article forty">
			<div class="card">
				<h3>Manifest</h3>
				<h2>En gadefest er i virkelig­&shy;heden ikke svær at holde</h2>
				<ul class="actions">
					<li><a href="/manifest">Derfor gadearmbånd</a></li>
				</ul>
			</div>
		</li>
		<li class="tweet forty">
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[0]["username"]) ?>" target="_blank"><?= $tweets[0]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[0]["text"]) ?></p>
			</div>
			<div class="card">
				<h3 class="author"><a href="https://twitter.com/<?= preg_replace("/@/", "", $tweets[1]["username"]) ?>" target="_blank"><?= $tweets[1]["username"] ?></a></h3>
				<p><?= preg_replace("/(http[a-z0-9A-Z\:\/\.]+)/", "<a href=\"$1\" target=\"_blank\">$1</a>", $tweets[1]["text"]) ?></p>
			</div>
		</li>
		<li class="instagram twenty push_down mfull">
			<div class="image image_id:<?= $instagrams[5]["item_id"] ?> image_format:<?= $instagrams[5]["image"] ?><?= $instagrams[5]["video"] ? " video_format:".$instagrams[5]["video"] : "" ?>">
				<p><a href="<?= $instagrams[5]["link"] ?>" target="_blank">@<?= $instagrams[5]["username"] ?></a></p>
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
						<ul class="actions">
							<li><a href="/buy">Køb Gadearmbånd</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

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
			<div class="image image_id:<?= $instagrams[6]["item_id"] ?> image_format:<?= $instagrams[6]["image"] ?><?= $instagrams[6]["video"] ? " video_format:".$instagrams[6]["video"] : "" ?>">
				<p><a href="<?= $instagrams[6]["link"] ?>" target="_blank">@<?= $instagrams[6]["username"] ?></a></p>
			</div>
		</li>
		<li class="article twenty push_down">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Hold festen skæv</h2>
				<ul class="actions">
					<li><a href="/buy">Køb nu</a></li>
				</ul>
			</div>
		</li>
		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[7]["item_id"] ?> image_format:<?= $instagrams[7]["image"] ?><?= $instagrams[7]["video"] ? " video_format:".$instagrams[7]["video"] : "" ?>">
				<p><a href="<?= $instagrams[7]["link"] ?>" target="_blank">@<?= $instagrams[7]["username"] ?></a></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[8]["item_id"] ?> image_format:<?= $instagrams[8]["image"] ?><?= $instagrams[8]["video"] ? " video_format:".$instagrams[8]["video"] : "" ?>">
				<p><a href="<?= $instagrams[8]["link"] ?>" target="_blank">@<?= $instagrams[8]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[9]["item_id"] ?> image_format:<?= $instagrams[9]["image"] ?><?= $instagrams[9]["video"] ? " video_format:".$instagrams[9]["video"] : "" ?>">
				<p><a href="<?= $instagrams[9]["link"] ?>" target="_blank">@<?= $instagrams[9]["username"] ?></a></p>
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
						<ul class="actions">
							<li><a href="/manifest">Derfor gadearmbånd</a></li>
						</ul>
					</div>
				</li>
				<li class="video sixty">
					<div class="image image_id:<?= $mediae[1]["item_id"] ?> image_format:<?= $mediae[1]["mediae"]["image"]["format"] ?>"></div>
					<div class="video video_id:<?= $mediae[1]["item_id"] ?> video_format:<?= $mediae[1]["mediae"]["video"]["format"] ?>"></div>
				</li>
			</ul>
		</li>

		<li class="instagram twenty push_down">
			<div class="image image_id:<?= $instagrams[10]["item_id"] ?> image_format:<?= $instagrams[10]["image"] ?><?= $instagrams[10]["video"] ? " video_format:".$instagrams[10]["video"] : "" ?>">
				<p><a href="<?= $instagrams[10]["link"] ?>" target="_blank">@<?= $instagrams[10]["username"] ?></a></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[11]["item_id"] ?> image_format:<?= $instagrams[11]["image"] ?><?= $instagrams[11]["video"] ? " video_format:".$instagrams[11]["video"] : "" ?>">
				<p><a href="<?= $instagrams[11]["link"] ?>" target="_blank">@<?= $instagrams[11]["username"] ?></a></p>
			</div>
		</li>
		<li class="article twenty">
			<div class="card">
				<h3>Gadearmbånd</h3>
				<h2>Skab magien</h2>
				<ul class="actions">
					<li><a href="/buy">Køb nu</a></li>
				</ul>
			</div>
		</li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[12]["item_id"] ?> image_format:<?= $instagrams[12]["image"] ?><?= $instagrams[12]["video"] ? " video_format:".$instagrams[12]["video"] : "" ?>">
				<p><a href="<?= $instagrams[12]["link"] ?>" target="_blank">@<?= $instagrams[12]["username"] ?></a></p>
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
			<div class="image image_id:<?= $instagrams[13]["item_id"] ?> image_format:<?= $instagrams[13]["image"] ?><?= $instagrams[13]["video"] ? " video_format:".$instagrams[13]["video"] : "" ?>">
				<p><a href="<?= $instagrams[13]["link"] ?>" target="_blank">@<?= $instagrams[13]["username"] ?></a></p>
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
						<ul class="actions">
							<li><a href="/program">Se gadeprogrammet</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</li>

		<li class="instagram twenty">
			<div class="image image_id:<?= $instagrams[14]["item_id"] ?> image_format:<?= $instagrams[14]["image"] ?><?= $instagrams[14]["video"] ? " video_format:".$instagrams[14]["video"] : "" ?>">
				<p><a href="<?= $instagrams[14]["link"] ?>" target="_blank">@<?= $instagrams[14]["username"] ?></a></p>
			</div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[15]["item_id"] ?> image_format:<?= $instagrams[15]["image"] ?><?= $instagrams[15]["video"] ? " video_format:".$instagrams[15]["video"] : "" ?>">
				<p><a href="<?= $instagrams[15]["link"] ?>" target="_blank">@<?= $instagrams[15]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty mfull">
			<div class="image image_id:<?= $instagrams[16]["item_id"] ?> image_format:<?= $instagrams[16]["image"] ?><?= $instagrams[16]["video"] ? " video_format:".$instagrams[16]["video"] : "" ?>">
				<p><a href="<?= $instagrams[16]["link"] ?>" target="_blank">@<?= $instagrams[16]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank sixty"></li>
		<li class="instagram forty push_up_half">
			<div class="image image_id:<?= $instagrams[17]["item_id"] ?> image_format:<?= $instagrams[17]["image"] ?><?= $instagrams[17]["video"] ? " video_format:".$instagrams[17]["video"] : "" ?>">
				<p><a href="<?= $instagrams[17]["link"] ?>" target="_blank">@<?= $instagrams[17]["username"] ?></a></p>
			</div>
		</li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[18]["item_id"] ?> image_format:<?= $instagrams[18]["image"] ?><?= $instagrams[18]["video"] ? " video_format:".$instagrams[18]["video"] : "" ?>">
				<p><a href="<?= $instagrams[18]["link"] ?>" target="_blank">@<?= $instagrams[18]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank twenty"></li>
		<li class="instagram twenty push_up">
			<div class="image image_id:<?= $instagrams[19]["item_id"] ?> image_format:<?= $instagrams[19]["image"] ?><?= $instagrams[19]["video"] ? " video_format:".$instagrams[19]["video"] : "" ?>">
				<p><a href="<?= $instagrams[19]["link"] ?>" target="_blank">@<?= $instagrams[19]["username"] ?></a></p>
			</div>
		</li>
		<li class="blank forty"></li>
		<li class="instagram forty">
			<div class="image image_id:<?= $instagrams[20]["item_id"] ?> image_format:<?= $instagrams[20]["image"] ?><?= $instagrams[20]["video"] ? " video_format:".$instagrams[20]["video"] : "" ?>">
				<p><a href="<?= $instagrams[20]["link"] ?>" target="_blank">@<?= $instagrams[20]["username"] ?></a></p>
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
			<div class="image image_id:<?= $instagrams[21]["item_id"] ?> image_format:<?= $instagrams[21]["image"] ?><?= $instagrams[21]["video"] ? " video_format:".$instagrams[21]["video"] : "" ?>">
				<p><a href="<?= $instagrams[21]["link"] ?>" target="_blank">@<?= $instagrams[21]["username"] ?></a></p>
			</div>
		</li>
	</ul>

</div>
