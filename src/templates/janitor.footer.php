	</div>

	<div id="navigation">
		<ul>
			<?= $HTML->link("Events", "/janitor/event/list", array("wrapper" => "li.event")) ?>
			<?= $HTML->link("Instagrams", "/janitor/instagram/list", array("wrapper" => "li.instagram")) ?>
			<?= $HTML->link("Tweets", "/janitor/twitter/list", array("wrapper" => "li.twitter")) ?>
			<?= $HTML->link("Videos", "/janitor/media/list", array("wrapper" => "li.media")) ?>


			<?//= $HTML->link("Navigations", "/janitor/admin/navigation/list", array("wrapper" => "li.navigation")) ?>
			<?= $HTML->link("Users", "/janitor/admin/user/list", array("wrapper" => "li.user")) ?>
			<?= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>

			<?= $HTML->link("Profile", "/janitor/admin/profile", array("wrapper" => "li.profile")) ?>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="copyright">Janitor, Manipulator, Modulator - parentNode - Copyright 2016</li>
		</ul>
	</div>
</div>

</body>
</html>