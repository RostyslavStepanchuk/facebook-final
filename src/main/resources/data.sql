/* tokens_storage */
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, email_confirmation_id, email_is_confirmed) values ('034daREFRESHTOKENf341fd', 0, '41fdFORGOTPASSWORDTOKEN093wgs', 1234563141324, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, email_confirmation_id, email_is_confirmed) values ('fadseREFRESHTOKENf98fds', 0, '89dseFORGOTPASSWORDTOKEN425dw', 8034793431244, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31defe', 0, '21fdv2FORGOTPASSWORDTOKEN84gr', 0831431473943, true);

/* images */
/* avatars */
INSERT INTO images (source_key, src) values ('1576923750814-avatar', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923750814-avatar.jpg');
INSERT INTO images (source_key, src) values ('1576923867246-christian', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923867246-christian.jpg');
INSERT INTO images (source_key, src) values ('1576923900764-kendal', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923900764-kendall.jpg');
/* backgrounds */
INSERT INTO images (source_key, src) values ('1576923813421-avatar-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg');
INSERT INTO images (source_key, src) values ('1578253112874-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1578253112874-bg.jpg');
INSERT INTO images (source_key, src) values ('1578253112874-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1578253112874-bg.jpg');
/* posts images */
INSERT INTO images (source_key, src) values ('1576923813421-avatar-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg');
INSERT INTO images (source_key, src) values ('1576923750814-avatar', 'https://s3.us-west-2.amazonaws.com/fs-8/1576923750814-avatar.jpg');
INSERT INTO images (source_key, src) values ('1578253112874-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1578253112874-bg.jpg');
INSERT INTO images (source_key, src) values ('1578253112874-bg', 'https://s3.us-west-2.amazonaws.com/fs-8/1578253112874-bg.jpg');

/* users */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('testUser', '$2a$10$SnXMYc5qb13dm8E2lza71.CtZcZQuh18vF3i6uZqeODN0eq/XjFX.', 'test@test.com', 'Tyler', 'Durden', 659998800000, 1, 1, 4, true, 1); /* password passw1234 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('imaginaryUser', '$2a$10$X1s6c7Ypt/tjpcIdoDm1zuNbnwV.72ugUpWq.wpPuVd3HR5iYI6z2', 'emailAddress@test.com', 'Tony', 'Stark', 659996700000, 0, 2, 5, false, 2); /* password psw123321 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('nonExistingUser', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'mailbox@test.com', 'Bill', 'Clinton', 659993200000, 2, 3, 6, true, 3); /* password 123456 */

/* friends */
INSERT INTO friends (fk_username, fk_friend_username) values ('testUser', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'testUser');

/* posts */
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('this is a first post in this application', 1575390051359 , 7, true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Happy BD to u!', 1575390057359 , 8, true, 'imaginaryUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Smart friends post', 1575390091359 , 9, true, 'imaginaryUser', 'imaginaryUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Not Smart post from a stranger', 1575390091359 , 10, true, 'nonExistingUser', 'nonExistingUser');

/* comments */
INSERT INTO comments (message, date, fk_author_username, fk_post_id) values ('this post sucks, actually', 1575390058432, 'imaginaryUser', 1);
INSERT INTO comments (message, date, fk_author_username, fk_post_id) values ('second comment', 1575390058432 , 'nonExistingUser', 1);

/* friend_requests */
INSERT INTO friend_requests (fk_requester_username, fk_responder_username, date) values ('nonExistingUser', 'testUser', 1575476483875);

/* likes */
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'imaginaryUser');
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'nonExistingUser');
INSERT INTO likes (fk_post_id, fk_provider_username) values (2, 'testUser');

/* chats */
INSERT INTO chats (name) values ('Final project discussion');

/* chat_to_user */
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'testUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'nonExistingUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'imaginaryUser');

/* messages */
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Guys, how are we going to do final?', 1575481606043, 'testUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Have no idea', 1575485606043, 'imaginaryUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Relaaaax', 1575489606043, 'nonExistingUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Have you ever heard of Stack Overflow?', 1575490206043, 'nonExistingUser', 1);
