import $ from 'jquery'


export function loadById(id) {
    return $.get(`/api/comment?article=${id}`)
}

export function loadByPage(page) {
    return $.get(`/api/comment?limit=10&offset=${page*10}`)
}