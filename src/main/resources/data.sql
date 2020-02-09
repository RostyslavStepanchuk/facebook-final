/* tokens_storage */
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('034daREFRESHTOKENf341fd', 0, '41fdFORGOTPASSWORDTOKEN093wgs', 0, 1234563141324, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('fadseREFRESHTOKENf98fds', 0, '89dseFORGOTPASSWORDTOKEN425dw', 0, 8034793431244, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31defe', 0, '21fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431473943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);

INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_tkn, forgot_password__tkn_valid_till, email_confirmation_id, email_is_confirmed) values ('trqwREFRESHTOKENf31dfoe', 0, '22fdv2FORGOTPASSWORDTOKEN84gr', 0, 0831431173943, true);

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
INSERT INTO images (source_key, src) values ('1581283928868-77f7', 'https://s3.us-east-2.amazonaws.com/fs-8-final/1581283928868-77f7.png');
INSERT INTO images (source_key, src) values ('1581277432105-20d8', 'https://s3.us-east-2.amazonaws.com/fs-8-final/1581277432105-20d8.png');

/* users */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('testUser', '$2a$10$SnXMYc5qb13dm8E2lza71.CtZcZQuh18vF3i6uZqeODN0eq/XjFX.', 'test@test.com', 'Tyler', 'Durden', 659998800000, 1, 1580365523140, 1, 4, true, 1); /* password passw1234 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('testUserDouble', '$2a$10$SnXMYc5qb13dm8E2lza71.CtZcZQuh18vF3i6uZqeODN0eq/XjFX.', 'test2@test.com', 'Tyler', 'Burden', 659998800000, 1, 1580365523240, 1, 4, true, 4); /* password passw1234 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('imaginaryUser', '$2a$10$X1s6c7Ypt/tjpcIdoDm1zuNbnwV.72ugUpWq.wpPuVd3HR5iYI6z2', 'emailAddress@test.com', 'Tony', 'Stark', 659996700000, 0, 1580365523340, 2, 5, false, 2); /* password psw123321 */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('nonExistingUser', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'mailbox@test.com', 'Bill', 'Clinton', 659993200000, 2, 1580365523440, 3, 6, true, 3); /* password 123456 */


INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend@test.com', 'Harry', 'Potter', 659993200000, 1, 1580365523540, null, null, true, 4);
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend1', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend1@test.com', 'Conan', 'Doyle', 659993200000, 1, 1580365523640, null, null, true, 5);
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend2', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend2@test.com', 'Monika', 'Lewinsky', 659993200000, 2, 1580365523740, null, null, true, 6);
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend3', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend3@test.com', 'Hillary', 'Clinton', 659993200000, 2, 1580365523840, null, null, true, 7);
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend4', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend4@test.com', 'David', 'Beckham', 659993200000, 1, 1580365523940, null, null, true, 8);
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('tagFriend', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'tagFriend@test.com', 'David', 'Blaine', 659993200000, 1, 1580365521340, null, null, true, 9);

-- INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend6', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend6@test.com', 'Harry', 'Potter', 659993200000, 1, null, null, true, null); /* password 123456 */
-- INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend7', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend7@test.com', 'Harry', 'Potter', 659993200000, 1, null, null, true, null); /* password 123456 */
-- INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend8', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend8@test.com', 'Harry', 'Potter', 659993200000, 1, null, null, true, null); /* password 123456 */
-- INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend9', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend9@test.com', 'Harry', 'Potter', 659993200000, 1, null, null, true, null); /* password 123456 */
-- INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id) values ('suggestFriend10', '$2a$10$YLk8kRbiYhDvOWImYSKHSuRNB0j6QhcuHwEZD8lWehcuCK/mVoJ6i', 'suggestFriend10@test.com', 'Harry', 'Potter', 659993200000, 1, null, null, true, null); /* password 123456 */

/* friends */
/* Tyler - Tony */
INSERT INTO friends (fk_username, fk_friend_username) values ('testUser', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'testUser');
/* Harry - Tony */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'suggestFriend');
/* Conan - Tony */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend1', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'suggestFriend1');
/* Conan - Bill */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend1', 'nonExistingUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('nonExistingUser', 'suggestFriend1');
/* Bill - Tyler */
INSERT INTO friends (fk_username, fk_friend_username) values ('testUser', 'nonExistingUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('nonExistingUser', 'testUser');
/* Bill - Monika */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend2', 'nonExistingUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('nonExistingUser', 'suggestFriend2');
/* Tyler - Monika */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend2', 'testUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('testUser', 'suggestFriend2');
/* Bill - Hillary */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend3', 'nonExistingUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('nonExistingUser', 'suggestFriend3');
/* David - Burden */
INSERT INTO friends (fk_username, fk_friend_username) values ('suggestFriend4', 'testUserDouble');
INSERT INTO friends (fk_username, fk_friend_username) values ('testUserDouble', 'suggestFriend4');
/* Tony - Muslim */
INSERT INTO friends (fk_username, fk_friend_username) values ('tagFriend', 'imaginaryUser');
INSERT INTO friends (fk_username, fk_friend_username) values ('imaginaryUser', 'tagFriend');

/* posts */
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('this is a first post in this application', 1575390051359 , 7, true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Smart friends post', 1575390091359 , 9, true, 'imaginaryUser', 'imaginaryUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Gif', 1575390091359 , 10, true, 'nonExistingUser', 'testUser');

INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('Happy BD to u!', 1575390057359 , 8, true, 'imaginaryUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390051359 , null , true, 'testUser', 'testUser');
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username) values ('post for pagination test', 1575390091359 , 9, true, 'nonExistingUser', 'nonExistingUser');

/* comments */
INSERT INTO comments (message, date, fk_author_username, fk_post_id) values ('this post sucks, actually', 1575390058432, 'imaginaryUser', 1);
INSERT INTO comments (message, date, fk_author_username, fk_post_id) values ('second comment', 1575390058432 , 'nonExistingUser', 1);

/* friend_requests */
INSERT INTO friend_requests (fk_requester_username, fk_responder_username, date) values ('tagFriend', 'testUser', 1575476483875);

/* likes */
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'imaginaryUser');
INSERT INTO likes (fk_post_id, fk_provider_username) values (1, 'nonExistingUser');
INSERT INTO likes (fk_post_id, fk_provider_username) values (2, 'testUser');

/* chats */
INSERT INTO chats (name) values ('Final project discussion');
INSERT INTO chats (name) values ('Chat with Bill');
INSERT INTO chats (name) values ('Chat with Tony');

/* chat_to_user */
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'testUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'nonExistingUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (1, 'imaginaryUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (2, 'testUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (2, 'nonExistingUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (3, 'testUser');
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username) values (3, 'imaginaryUser');

/* messages */
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Guys, how are we going to do final?', 1575481606043, 'testUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Have no idea', 1575485606043, 'imaginaryUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Relaaaax', 1575489606043, 'nonExistingUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Have you ever heard of Stack Overflow?', 1575490206043, 'nonExistingUser', 1);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Hi, how are you?', 1575481606043, 'testUser', 2);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('I am fine', 1575489606043, 'nonExistingUser', 2);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Doing the final project', 1575490206043, 'nonExistingUser', 2);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Did you make a step project?', 1575481606043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('No', 1575489606043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('I have 10 more days for the project', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('And what do you plan to do?', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Dont know yet', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Maybe watch couple of java tutorials', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Or read some articles on Medium', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Or do nothing and see what will happen', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Sounds like a plan, lol', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Yeah, Im kidding', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('I know :) ', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('You always were such a bookworm', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('I dont believe something will change now', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Especially when you are starting new career', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('And do thing you love', 1575490206043, 'testUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Oh come on', 1575490206043, 'imaginaryUser', 3);
INSERT INTO messages ( text, date, fk_author_username, fk_chat_id) values ('Stop this whining', 1575490206043, 'imaginaryUser', 3);

/* unread_messages */
INSERT INTO unread_messages (fk_username, fk_message_id) values ('testUser', 23);
INSERT INTO unread_messages (fk_username, fk_message_id) values ('testUser', 24);

/* tagged friends */
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (1, 'imaginaryUser');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (24, 'suggestFriend');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (24, 'suggestFriend1');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (24, 'tagFriend');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (24, 'testUser');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (25, 'imaginaryUser');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (25, 'suggestFriend2');
INSERT INTO tagged_friends (fk_post_id, fk_tagged_username) values (26, 'testUser');