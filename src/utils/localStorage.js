export const removeUserInfoFromStorage = () =>
  localStorage.removeItem('userInfo')

export const saveUserInfoFromStorage = (dataUserInfo, jwtToken) =>
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      userInfo: { ...dataUserInfo },
      auth: { jwtToken: jwtToken },
    })
  )

export const fetchUserInfoFromStorage = () =>
  JSON.parse(localStorage.getItem('userInfo'))
