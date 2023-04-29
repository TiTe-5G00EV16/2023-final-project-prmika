-- Active: 1680944133593@@127.0.0.1@3306@example_db

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
    IF NOT EXISTS `products` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(60) NOT NULL,
        `description` varchar(120) NOT NULL,
        `image` varchar(200),
        `price` DOUBLE NOT NULL,
        `owner` VARCHAR(36) NOT NULL,
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
VALUES (
        'Jalkapallo',
        'Jonkun verran potkittu jalkapallo',
        'https://www.vastavalo.net/albums/userpics/22294/normal_p8172409pt.jpg',
        15.50,
        '3d4707aa-d293-4dec-b02b-79be13c6674d'
    );

INSERT INTO
    `users` (
        `id`,
        `name`,
        `email`,
        `password`
    )
VALUES (
        '3d4707aa-d293-4dec-b02b-79be13c6674d',
        'Admin User',
        'Admin@user.com',
        '$2a$12$EdenwLXa2/gLJP.JxSfWI.2GOaCvlZNrympHg7BXUMzqjKv8qKJBq'
    );