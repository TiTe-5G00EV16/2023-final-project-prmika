CREATE TABLE
    IF NOT EXISTS `users` (
        `id` varchar(36) NOT NULL,
        `name` varchar(100) NOT NULL,
        `email` varchar(50) NOT NULL,
        `password` varchar(60) NOT NULL,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `cities` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `capital` varchar(60) NOT NULL,
        `country` varchar(60) NOT NULL,
        `image` varchar(200),
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `stores` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `chain` int(11) NOT NULL,
        `name` varchar(60) NOT NULL,
        `image` varchar(200),
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `chains` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `chain_name` varchar(60) NOT NULL,
        `chain_id` int(11) NOT NULL,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `products ` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(60) NOT NULL,
        `description` varchar(120) NOT NULL,
        `image` varchar(200),
        `price` DOUBLE NOT NULL,
        `owner` INT(11) NOT NULL,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    `products` (
        `title`,
        `description`,
        `image`,
        `price`,
        `owner`
    )
VALUES
(
        'Jalkapallo',
        'Vähän potkittu jalkapallo',
        'https://www.vastavalo.net/albums/userpics/22294/normal_p8172409pt.jpg',
        15.50,
        1
    );

INSERT INTO
    `chains` (`chain_name`, `chain_id`)
VALUES ('Kesko', 100);

INSERT INTO
    `stores` (`chain`, `name`, `image`)
VALUES
(
        100,
        'K-market Ratikka',
        'https://adventures.com/media/206229/g24w1eitqve-hd.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132741748530000000&quality=100&format=jpg'
    );

INSERT INTO
    `cities` (`capital`, `country`, `image`)
VALUES (
        'Oslo',
        'Norway',
        'https://adventures.com/media/206229/g24w1eitqve-hd.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132741748530000000&quality=100&format=jpg'
    );

INSERT INTO
    `cities` (`capital`, `country`, `image`)
VALUES (
        'Pretoria',
        'South Africa',
        'http://news-events.sleeping-out.co.za/wp-content/uploads/2014/10/city.jpg'
    );

INSERT INTO
    `cities` (`capital`, `country`, `image`)
VALUES (
        'Helsinki',
        'Finland',
        'https://www.lifeinnorway.net/wp-content/uploads/2022/10/helsinki-waterfront-scene.jpg'
    );