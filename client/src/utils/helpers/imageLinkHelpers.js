const DEFAULT_AVATAR_LINK = 'static/images/no-avatar.png'
const DEFAULT_PROFILE_COVER_LINK = 'static/images/profile-cover-placeholder.jpg'

export const getAvatarLink = user => {
  if (!user.avatar) {
    return DEFAULT_AVATAR_LINK
  }
  return user.avatar.src
}

export const getProfileCoverLink = user => {
  if (!user.profileCover) {
    return DEFAULT_PROFILE_COVER_LINK
  }
  return user.profileCover.src
}
