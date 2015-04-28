<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit Page</h1>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit">
		<h2>Video name</h2>
		<?= $model->formStart("update/".$item_id, array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

	<?= $JML->editSingleMedia($item, array("label" => "Cover image", "variant" => "image")) ?>

	<?= $JML->editSingleMedia($item, array("label" => "Video", "variant" => "video")) ?>


</div>
