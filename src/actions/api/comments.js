import $ from 'jquery'


export function loadById(id) {
    return $.get(`/api/comment?article=${id}`)
}