import {loadFeedsByQuerry, loadCitiesByIds, loadFeedsByPlace, geoCode} from './api/VK.js'
import { asyncAC } from './api/utils'
import { LOAD_FEEDS, LOAD_FEEDS_CITY, LOAD_CITIES, LOAD_COORDS } from './constants'

export const loadFeeds = asyncAC(loadFeedsByQuerry, LOAD_FEEDS)
export const loadFeedsByCity = asyncAC(loadFeedsByPlace, LOAD_FEEDS_CITY)
export const loadCityCoords = asyncAC(geoCode, LOAD_COORDS)
export const loadCities = asyncAC(loadCitiesByIds, LOAD_CITIES)