import {loadFeedsByQuerry, loadCitiesByIds, loadFeedsByPlace, geoCode,
  loadPhotosByQuerry, loadPhotosByAlbum, loadFriendsList,loadFriendsIds} from './api/VK.js'
import { asyncAC } from './api/utils'
import { LOAD_FEEDS, LOAD_FEEDS_CITY, LOAD_CITIES, LOAD_COORDS,
  LOAD_PHOTOS, LOAD_ALBUM, LOAD_FRIENDS, LOAD_FRIENDS_COUNT } from './constants'

export const loadFeeds = asyncAC(loadFeedsByQuerry, LOAD_FEEDS)
export const loadPhotos = asyncAC(loadPhotosByQuerry, LOAD_PHOTOS)
export const loadAlbum = asyncAC(loadPhotosByAlbum, LOAD_ALBUM)
export const loadFeedsByCity = asyncAC(loadFeedsByPlace, LOAD_FEEDS_CITY)
export const loadCityCoords = asyncAC(geoCode, LOAD_COORDS)
export const loadCities = asyncAC(loadCitiesByIds, LOAD_CITIES)
export const loadFriends = asyncAC(loadFriendsList, LOAD_FRIENDS)
export const loadFriendsCount = asyncAC(loadFriendsIds, LOAD_FRIENDS_COUNT)
