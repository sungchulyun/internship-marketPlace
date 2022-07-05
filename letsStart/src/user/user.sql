CREATE TABLE 'user' (
    'user_id' BIGINT(20) NOT NULL AUTO_INCREMENT,
     'email' VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
    'password' VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
    'nickname' VARCHAR(20) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
    PRIMARY KEY('user_id')
   
)