<?php
global $action;
global $model;
global $IC;
global $itemtype;


$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => true));
$hash = "";
if($item["hashtags"]) {
	$hashtags = explode(",", $item["hashtags"]);
	if($hashtags) {
		foreach($hashtags as $hashtag) {
			$hash .= ($hash ? ", " : "")."#".$hashtag;
		}
	}
}

?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit <?= $itemtype ?></h1>

	<?= $JML->editGlobalActions($item) ?>


	<div class="item i:defaultEdit">
		<h2>Instagram</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

<?		if(isset($item["image"]) && $item["image"]): ?>
			<img src="/images/<?= $item_id ?>/image/380x.<?= $item["image"] ?>" class="instagram" />
<?		endif; ?>

			<fieldset>
				<?= $model->input("caption", array("value" => $item["caption"])) ?>
				<?= $model->input("location", array("value" => $item["location"])) ?>
			</fieldset>
			<div class="instagram_id">
				<h4>Instagram ID:</h4>
				<p><?= $item["name"] ?></p>
			</div>
			<div class="fullname">
				<h4>Fullname:</h4>
				<p><?= $item["fullname"] ?></p>
			</div>
			<div class="username">
				<h4>Username:</h4>
				<p><?= $item["username"] ?></p>
			</div>
			<div class="instalink">
				<h4>Link:</h4>
				<p><?= $item["link"] ?></p>
			</div>
			<div class="user_id">
				<h4>user_id:</h4>
				<p><?= $item["user_id"] ?></p>
			</div>
			<div class="hashtags">
				<h4>Hashtags:</h4>
				<p><?= $hash ?></p>
			</div>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
