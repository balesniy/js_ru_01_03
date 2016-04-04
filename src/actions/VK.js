import {loadFeedsByQuerry, loadCitiesByIds, loadFeedsByPlace, geoCode, loadPhotosByQuerry} from './api/VK.js'
import { asyncAC } from './api/utils'
import { LOAD_FEEDS, LOAD_FEEDS_CITY, LOAD_CITIES, LOAD_COORDS, LOAD_PHOTOS } from './constants'

export const loadFeeds = asyncAC(loadFeedsByQuerry, LOAD_FEEDS)
export const loadPhotos = asyncAC(loadPhotosByQuerry, LOAD_PHOTOS)
export const loadFeedsByCity = asyncAC(loadFeedsByPlace, LOAD_FEEDS_CITY)
export const loadCityCoords = asyncAC(geoCode, LOAD_COORDS)
export const loadCities = asyncAC(loadCitiesByIds, LOAD_CITIES)