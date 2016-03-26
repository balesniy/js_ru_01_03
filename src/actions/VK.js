import {loadFeedsByQuerry, loadCitiesByIds, loadFeedsByPlace} from './api/VK.js'
import { asyncAC } from './api/utils'
import { LOAD_FEEDS, LOAD_FEEDS_CITY, LOAD_CITIES } from './constants'

export const loadFeeds = asyncAC(loadFeedsByQuerry, LOAD_FEEDS)
export const loadFeedsByCity = asyncAC(loadFeedsByPlace, LOAD_FEEDS_CITY)
export const loadCities = asyncAC(loadCitiesByIds, LOAD_CITIES)