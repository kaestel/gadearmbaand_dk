<!DOCTYPE html>
<html lang="<?= $this->language() ?>">
<head>
	<!-- (c) & (p) 2015 -->
	<!-- Code: Martin Kæstel, Robin Isaksson, Stefan Friedli - thanks for the beers //-->
	<!-- Design/PM: Great Works //-->
	<!-- All material protected by copyrightlaws, as if you didnt know //-->
	<title><?= SITE_URL ?> - <?= $this->pageTitle() ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="Distortion støtte festival musik gade københavn vesterbro nørrebro refshaleøen" />
	<meta name="description" content="<?= $this->pageDescription() ?>" />
	<meta name="viewport" content="initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<meta property="og:title" content="Gadearmbaand.dk" />
	<meta property="og:description" content="Alt om Distortions gadefester, gadearmbånd og en masse rare ord om, hvorfor du skal købe det." />
	<meta property="og:image" content="http://gadearmbaand.dk/img/share.jpg" />
	<meta property="og:url" content="http://gadearmbaand.dk" />

	<link rel="apple-touch-icon" href="touchicon.png" />
	<link rel="icon" href="favicon.png" />

<? if(session()->value("dev")) { ?>
	<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $this->segment() ?>_include.css" />
	<script type="text/javascript" src="/js/lib/seg_<?= $this->segment() ?>_include.js"></script>
<? } else { ?>
	<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $this->segment() ?>.css" />
	<script type="text/javascript" src="/js/seg_<?= $this->segment() ?>.js"></script>
<? } ?>
</head>

<body<?= $HTML->attribute("class", $this->bodyClass()) ?>>

<div id="page" class="i:page">

	<div id="header">
		<ul class="servicenavigation">
			<li class="keynav navigation nofollow"><a href="#navigation">Menu</a></li>
		</ul>
	</div>

	<div id="content">
