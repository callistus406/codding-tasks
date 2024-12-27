--  Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BlogPosts Table

CREATE TABLE BlogPosts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments Table

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES BlogPosts(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Likes Table
CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES BlogPosts(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);



-- EXAMPLE SQL QUERIES

-- Retrieve all posts by a specific user
SELECT id, title, content, created_at 
FROM BlogPosts 
WHERE user_id = 1;

-- Retrieve all comments for a specific blog post
SELECT Comments.id, Comments.content, Comments.created_at, Users.name AS commenter_name
FROM Comments
JOIN Users ON Comments.user_id = Users.id
WHERE Comments.post_id = 10;


-- Count the number of likes on a specific blog post
SELECT COUNT(*) AS like_count
FROM Likes
WHERE post_id = 10;



--  Retrieve a user’s posts along with the number of likes and comments for each post
SELECT 
    BlogPosts.id,
    BlogPosts.title,
    BlogPosts.created_at,
    COUNT(DISTINCT Comments.id) AS comment_count,
    COUNT(DISTINCT Likes.id) AS like_count
FROM BlogPosts
LEFT JOIN Comments ON BlogPosts.id = Comments.post_id
LEFT JOIN Likes ON BlogPosts.id = Likes.post_id
WHERE BlogPosts.user_id = 1
GROUP BY BlogPosts.id, BlogPosts.title, BlogPosts.created_at;


-- Retrieve recent blog posts with authors' names
SELECT 
    BlogPosts.id,
    BlogPosts.title,
    BlogPosts.created_at,
    Users.name AS author_name
FROM BlogPosts
JOIN Users ON BlogPosts.user_id = Users.id
ORDER BY BlogPosts.created_at DESC
LIMIT 10;
