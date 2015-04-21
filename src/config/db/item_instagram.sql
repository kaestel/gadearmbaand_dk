CREATE TABLE `SITE_DB`.`item_instagram` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,
  `caption` text NOT NULL,
  `hashtags` varchar(255) NOT NULL,

  `location` varchar(255) NULL,
  `link` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT 0,

  `image` varchar(5) NOT NULL,
  `video` varchar(5) NOT NULL,

  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_instagram_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
