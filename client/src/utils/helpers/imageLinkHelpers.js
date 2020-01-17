const DEFAULT_AVATAR_LINK = '/images/no-avatar.png'
const DEFAULT_PROFILE_COVER_LINK = '/images/profile-cover-placeholder.jpg'

export const getAvatarLink = imageObj => {
  if (!imageObj) {
    return DEFAULT_AVATAR_LINK
  }
  return imageObj.src
}

export const getProfileCoverLink = imageObj => {
  if (!imageObj) {
    return DEFAULT_PROFILE_COVER_LINK
  }
  return imageObj.src
}
