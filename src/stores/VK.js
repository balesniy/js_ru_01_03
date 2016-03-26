import AppDispatcher from '../dispatcher'
import { LOAD_FEEDS, LOAD_CITIES, LOAD_FEEDS_CITY, LOAD_COORDS, _START, _SUCCESS, _FAIL } from '../actions/constants'
import SimpleStore from './SimpleStore'
import { loadFeeds, loadCities, loadCityCoords, loadFeedsByCity } from '../actions/VK'


export default class extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)
        this.cities=[]

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, response, error,data } = action

            switch (type) {

                case LOAD_FEEDS + _START:
                    this.loading = true
                    break;

                case LOAD_FEEDS + _SUCCESS:
                    this.resetFeeds()
                    this.cities=[]
                    response.response
                        .slice(1)
                        //.filter(i=>i.group&&i.group.place&&i.group.place.city)
                        .filter(i=>i.group&&i.group.city)
                        .filter(i=>i.attachment&&i.attachment.type=='photo')
                        //.map(i=>i.group?Object.assign(i,{type:'group'}):Object.assign(i,{type:'user'})
                        .slice(0,50)
                        .forEach(this.__add);
                    //this.__items.forEach(i=>this.cities.push(i.group.city))
                    //setTimeout(()=>loadCities(this.__items.map(i=>i.group.place.city)),0)
                    setTimeout(()=>loadCities(this.__items.map(i=>i.group.city)),0)
                    this.loading=false
                    this.loaded=true
                    break;

                case LOAD_FEEDS + _FAIL:
                    this.error = error
                    this.loaded = false
                    this.loading = false
                    break;

                case LOAD_FEEDS_CITY + _START:
                    this.cities=[data]
                    //setTimeout(()=>loadCityCoords(data.name),0)
                    this.loading = true
                    break;

                case LOAD_FEEDS_CITY + _SUCCESS:
                    this.resetFeeds()
                    response.response
                        .slice(1)
                        //.filter(i=>i.group&&i.group.place&&i.group.place.city)
                        .filter(i=>i.attachment&&i.attachment.type=='photo')
                        //.map(i=>i.group?Object.assign(i,{type:'group'}):Object.assign(i,{type:'user'})
                        .slice(0,50)
                        .forEach(this.__add);
                    //this.__items.forEach(i=>this.cities.push(i.group.city))
                    //setTimeout(()=>loadCities(this.__items.map(i=>i.group.place.city)),0)
                    this.loading=false
                    this.loaded=true
                    break;

                case LOAD_FEEDS_CITY + _FAIL:
                    this.error = error
                    this.loaded = false
                    this.loading = false
                    break;

                case LOAD_CITIES + _START:
                    this.loading = true
                    break;

                case LOAD_CITIES + _SUCCESS:
                    this.cities=response.response.map(i=>({cid:i.cid,name:i.name
                        //long:this.__items.find(feed=>feed.group.city==i.cid).group.place.longitude,
                        //lat:this.__items.find(feed=>feed.group.city==i.cid).group.place.latitude
                    }))

                    //this.__items.forEach(i=>i.group.city=this.cities.find(id=>id.cid==i.group.city).name)
                    this.loading=false
                    this.loaded=true
                    break;

                case LOAD_CITIES + _FAIL:
                    this.error = error
                    this.loaded = false
                    this.loading = false
                    break;

                case LOAD_COORDS + _START:
                    this.loading = true
                    break;

                case LOAD_COORDS + _SUCCESS:
                    const {pos}=response.response.GeoObjectCollection.featureMember[0].GeoObject.Point
                    const [long,lat]=pos.split(' ')
                    //console.log(long,lat)
                    setTimeout(()=>loadFeedsByCity(Object.assign(data,{long,lat})),0)
                    this.loading=false
                    this.loaded=true
                    break;

                case LOAD_COORDS + _FAIL:
                    this.error = error
                    this.loaded = false
                    this.loading = false
                    break;


                default: return
            }
            this.emitChange()
        })
    }

    resetFeeds(){
        this.__items=[]
    }

}
