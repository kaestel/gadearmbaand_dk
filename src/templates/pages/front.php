<?php
global $action;

$IC = new Items();
$itemtype = "instagram";

$instagrams = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => array("tags" => true, "mediae" => true)));



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
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<!-- item: blank -->
		<li class="blank twenty"></li>

		<li class="instagram twenty">
			<div class="image image_id:frontpage2 format:jpg"></div>
		</li>
		<li class="blank sixty"></li>

		<li class="instagram forty push_up_half">
			<div class="image image_id:frontpage3 format:jpg"></div>
		</li>

		<li class="instagram twenty push_up">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>
		<li class="blank twenty"></li>

		<li class="instagram twenty push_up">
			<div class="image image_id:frontpage2 format:jpg"></div>
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
			<h3 class="author">@twitter_user</h3>
			<p>This is the text from at tweet, it can include links. <a href="http://google.com">Link in tweet</a>. The text is exactly 140 characters long.</p>
		</li>

		<li class="instagram twenty push_down">
			<div class="image image_id:frontpage2 format:jpg"></div>
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
			<h3 class="author">@twitter_user</h3>
			<p>This is the text from at tweet, it can include links. <a href="http://google.com">Link in tweet</a>. The text is exactly 140 characters long.</p>
		</li>

		<li class="instagram forty">
			<div class="image image_id:frontpage2 format:jpg"></div>
		</li>

		<!-- item: article page -->
		<li class="article twenty push_down">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<li class="instagram twenty">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<li class="instagram forty">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<li class="blank twenty"></li>

		<li class="instagram twenty ">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<li class="tweet forty float push_up_half">
			<h3 class="author">@twitter_user</h3>
			<p>This is the text from at tweet, it can include links. <a href="http://google.com">Link in tweet</a>. The text is exactly 140 characters long.</p>
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
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>
		<li class="instagram forty">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<!-- item: article page -->
		<li class="article twenty">
			<h3>Gadeårmband</h3>
			<h2>Headline in two lines</h2>
			<a href="#">Læs hvorfor</a>
		</li>

		<li class="instagram twenty">
			<div class="image image_id:frontpage1 format:jpg"></div>
		</li>

		<li class="blank twenty"></li>

		<li class="tweet forty">
			<h3 class="author">@twitter_user</h3>
			<p>This is the text from at tweet, it can include links. <a href="http://google.com">Link in tweet</a>. The text is exactly 140 characters long.</p>
		</li>

		<li class="instagram forty push_up_half">
			<div class="image image_id:frontpage1 format:jpg"></div>
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
