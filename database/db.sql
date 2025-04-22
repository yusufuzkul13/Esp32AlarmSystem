CREATE DATABASE esp32;

CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    button VARCHAR(10),       -- "left" veya "right"
    color VARCHAR(10),        -- "red" veya "green"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);