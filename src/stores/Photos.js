import AppDispatcher from '../dispatcher'
import {_START,_SUCCESS, LOAD_PHOTOS } from '../actions/constants'
import SimpleStore from './SimpleStore'
import { loadPhotos } from '../actions/VK.js'


class Photos extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)
        this.total=999;

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type,response } = action

            switch (type) {


                case LOAD_PHOTOS + _START:
                    this.loading = true
                    break;

                case LOAD_PHOTOS + _SUCCESS:
                    this.resetFeeds()
                    response.response.slice(1).forEach(this.__add)
                    this.loading=false
                    break;


                default: return
            }
            this.emitChange()
        })
    }


    getByPage(page){
        const int=[...new Array(10)].map((_,i)=>page*10+i+1).filter(i=>i<=this.total);

        if(!int.every(this.getById)) loadCommentsPage (page)

        return int.map(this.getById)
    }
    resetFeeds(){
        this.__items=[]
    }
    getById = (id) => {
        return this.__items.find(item => item.pid == id)
    }
}

export default Photos