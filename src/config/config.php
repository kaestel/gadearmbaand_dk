<?php

/**
* This file contains definitions
*
* @package Config Dummy file
*/
header("Content-type: text/html; charset=UTF-8");
error_reporting(E_ALL);

/**
* Site name
*/
define("SITE_UID", "gade");
define("SITE_NAME", "Distortion gadearmbånd");
define("SITE_URL", (isset($_SERVER["HTTPS"]) ? "https" : "http")."://".$_SERVER["SERVER_NAME"]);
define("SITE_EMAIL", "friedlistephan@gmail.com");

/**
* Optional constants
*/
define("DEFAULT_PAGE_DESCRIPTION", "Alt om Distortions gadefester, gadearmbånd og en masse rare ord om, hvorfor du skal købe det.");
define("DEFAULT_LANGUAGE_ISO", "DA"); // Reginal language English
define("DEFAULT_COUNTRY_ISO", "DK"); // Regional country Denmark


// ENABLE ITEMS MODEL
define("SITE_ITEMS", true);
//define("SITE_SIGNUP", true);

// Enable notifications (send collection email after N notifications)
define("SITE_COLLECT_NOTIFICATIONS", 50);

// INSTALL MODE
//define("SITE_INSTALL", true);

?>
