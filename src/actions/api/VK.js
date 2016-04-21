import $ from 'jquery'


export function loadFeedsByQuerry(q) {
    return $.getJSON(`https://api.vk.com/method/newsfeed.search?extended=1&fields=city,place,status,contacts&count=200&q=${q}&callback=?`)
}

export function loadCitiesByIds(ids) {
    return $.getJSON(`https://api.vk.com/method/database.getCitiesById?city_ids=${ids.join(',')}&callback=?`)
}

export function geoCode({name}) {
    return $.getJSON(`http://geocode-maps.yandex.ru/1.x/?format=json&geocode=${name}&results=1&callback=?`)
}

export function loadFeedsByPlace(q) {
    return $.getJSON(`https://api.vk.com/method/newsfeed.search?extended=1&fields=city,place,status,contacts&count=200&q=${q.q}&longitude=${q.long}&latitude=${q.lat}&callback=?`)
}

export function loadPhotosByQuerry(q) {
    return $.getJSON(`https://api.vk.com/method/photos.search?count=20&q=${q}&callback=?`)
}

export function loadPhotosByAlbum({owner_id,aid}) {
    return $.getJSON(`https://api.vk.com/method/photos.get?count=5&owner_id=${owner_id}&album_id=${aid}&callback=?`)
}

export function loadFriendsList({id}){
  return $.getJSON(`https://api.vk.com/method/friends.get?user_id=${id}&fields=photo_max,city&callback=?`)
}

export function loadFriendsIds({id}){
  return $.getJSON(`https://api.vk.com/method/friends.get?user_id=${id}&callback=?`)
}
