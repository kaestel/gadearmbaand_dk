<?php
global $action;
global $model;
global $IC;
global $itemtype;


$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => true));

?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit tweet</h1>

	<?= $JML->editGlobalActions($item) ?>


	<div class="item i:defaultEdit">
		<h2>Tweet</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("text", array("value" => $item["text"])) ?>
			</fieldset>
			<div class="tweet_id">
				<h4>Tweet ID:</h4>
				<p><?= $item["name"] ?></p>
			</div>
			<div class="username">
				<h4>Username:</h4>
				<p><?= $item["username"] ?></p>
			</div>
			<div class="user_id">
				<h4>user_id:</h4>
				<p><?= $item["user_id"] ?></p>
			</div>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
