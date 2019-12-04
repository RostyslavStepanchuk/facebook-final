/* users */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, avatar, refresh_token, forgot_password_tkn, open_account) values ('testUser', '$2a$10$SnXMYc5qb13dm8E2lza71.CtZcZQuh18vF3i6uZqeODN0eq/XjFX.', 'test@test.com', 'Tyler', 'Durden', 659998800000, 'http://avataurl.com', '034daREFRESHTOKENf341fd', '41fdFORGOTPASSWORDTOKEN093wgs', true); /* password passw1234 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, avatar, refresh_token, forgot_password_tkn, open_account) values ('imaginaryUser', '$2a$10$X1s6c7Ypt/tjpcIdoDm1zuNbnwV.72ugUpWq.wpPuVd3HR5iYI6z2', 'email@test.com', 'Tony', 'Stark', 659996700000, 'http://imaginary.avatar.com', 'fadseREFRESHTOKENf98fds', '89dseFORGOTPASSWORDTOKEN425dw', false); /* password psw123321 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, avatar, refresh_token, forgot_password_tkn, open_account) values ('nonExistingUser', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'mailbox@test.com', 'Bill', 'Clinton', 659993200000, 'http://non.existing.avatar.com', 'trqwREFRESHTOKENf31de', '21fdv2FORGOTPASSWORDTOKEN84gre', true); /* password 123456 */

/* friends */
INSERT INTO friends (fk_username, fk_friend_username) values ('testUser', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'testUser');

/* posts */
INSERT INTO posts (message, date, image, show_everyone, fk_author_username) values ('this is a first post in this application', 1575390051359 , 'http://image.source.com', true, 'testUser');

/* comments */
INSERT INTO comments (message, date, fk_author_username, fk_post_id) values ('this post sucks, actually', 1575390058432 , 'imaginaryUser', 1);

/* friend_requests */
INSERT INTO friend_requests (fk_requester_username, fk_responder_username, date) values ('nonExistingUser', 'testUser', 1575476483875);

/* likes */
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'imaginaryUser');
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'nonExistingUser');

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