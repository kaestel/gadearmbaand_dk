<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));

?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit post</h1>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit">
		<h2>Post content</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("host", array("value" => $item["host"])) ?>
				<?= $model->input("location", array("value" => $item["location"])) ?>
				<?= $model->input("latitude", array("value" => $item["latitude"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("facebook_link", array("value" => $item["facebook_link"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


	<?= $JML->editTags($item) ?>

	<?= $JML->editMedia($item) ?>

</div>
