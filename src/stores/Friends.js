import AppDispatcher from '../dispatcher'
import {_START,_SUCCESS,_FAIL, LOAD_FRIENDS, LOAD_FRIENDS_COUNT } from '../actions/constants'
import SimpleStore from './SimpleStore'
import { loadFriends, loadFriendsCount } from '../actions/VK.js'


class Friends extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.__friends={};
        this.__loading=0;

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type,response,data } = action

            switch (type) {

                case LOAD_FRIENDS + _START:

                    this.__friends[data.id]||(this.__friends[data.id]={...data});
                    this.__loading++;

                    break;

                case LOAD_FRIENDS + _SUCCESS:
                  this.__loading--;
                  const item=this.__friends[data.id];
                  const friends=(response.response||[]).filter(a=>!a.deactivated);


                  friends.forEach(friend=>
                    this.__friends[friend.uid]||(this.__friends[friend.uid]={id:friend.uid,...friend})
                  )

                  item.friendsList=friends.map(friend=>friend.uid);

                  item.friends=friends.map(friend=>this.__friends[friend.uid]);
                  item.friendsCount=friends.length;

                  if (item.isHero) {
                    friends.forEach(friend=>setTimeout(()=>loadFriends({id:friend.uid}),0))
                  }


                    break;

                    case LOAD_FRIENDS_COUNT + _START:
                        this.__loading++;

                    break;

                    case LOAD_FRIENDS_COUNT + _SUCCESS:
                    this.__loading--;
                    const friendsArr=response.response||[];

                    this.__friends[data.id].friendsCount=friendsArr.length;
                    this.__friends[data.id].friendsList=friendsArr;


                    break;


                default: return
            }
            this.emitChange()
        })
    }

fillFriends(){
  const friends=[];
  for (let key in this.__friends){
    if (this.getFriends(key)) friends.push(this.__friends[key])
  }
  friends.forEach(i=>
    i.friends.forEach(j=>
      j.friends?
      j.friends.includes(i)||j.friends.push(i):
      j.friends=[i]
      )
    )
    return this
}

groupMyFriends(){
  const obj={}
  for (let key in this.__friends){
    if (this.__friends[key].friends){
      if(!obj[key]) obj[key]={id:key,friends:{}}
      this.__friends[key].friends.forEach(i=>{
        if (!obj[i.id]&&this.__friends[i.id].friends) {
          obj[i.id]={id:i.id,friends:{}};
        }
        if (obj[i.id]) {
          obj[key].friends[i.id]={item:obj[i.id]};
          obj[i.id].friends[key]={item:obj[key]};


        }
      })
    }
  }


  // const arr=Object.keys(this.fillFriends().__friends).map(i=>({
  //   id:+i,
  //   friends:this.__friends[i].friends.map(j=>+j.id)
  // }));
  // console.log(arr.length);

  // const oneFriendList=arr.filter(i=>i.friends.length==1);
  // oneFriendList.forEach(i=>{
  //   const dd=arr.find(j=>j.id==i.friends[0]);
  //   const index1=dd.friends.findIndex(j=>j==i.id);
  //   const index2=arr.findIndex(j=>j.id==i.id);
  //   dd.friends.splice(index1,1);
  //   arr.splice(index2,1);
  // })
  // console.log(arr.length);
  //const rTotal=arr.reduce((s,i)=>s+i.friends.length,0);
  let rTotal=0;
  let total=0;
  for (let key in obj){
    let counter=0;
    for (let i in obj[key].friends){
      rTotal++;
      counter++
    }
    obj[key].friendsCount=counter;
    total++
  }
  //const getFriendsIds=(a)=>a.friends.map(i=>i.id).sort((a,b)=>a-b);

  const getFriendsIds=(a)=>Object.keys(a.friends);

  //const getById=(id)=>arr.find(a=>a.id==id);

  for (let i in obj) {
    Object.assign(obj[i],{
      a: obj[i].friendsCount/rTotal,
      getMaxQRow: function(){
        let maxQ=-Infinity;
        let max={};
        for (let k in this.friends){
          if(this.friends[k].dq>maxQ){
            max=this.friends[k].item;
            maxQ=this.friends[k].dq
          }
        }

        return {maxQ,max}
      },
      community:[i]
    })
    for (let j in obj[i].friends){
      Object.assign(obj[i].friends[j],{
        dq:1/rTotal-obj[i].a*obj[i].friends[j].item.friendsCount/rTotal
      })
    }
  }

  // arr.forEach(i=>{
  //   i.a=i.friends.length/rTotal;
  //   i.friends=i.friends.map(j=>({
  //       id:j,
  //       dq:1/rTotal-i.a*arr.find(k=>k.id==j).friends.length/rTotal
  //     })
  //   )
  //   i.maxQ=i.friends.reduce((max,j)=>j.dq>max.dq?j:max);
  //   i.community=[i.id]
  //   i.getMaxQ=function(){return this.friends.reduce((max,j)=>j.dq>max.dq?j:max)}
  // });

  const getMaxQ=function(){
    let maxQ=-Infinity;
    let max={};
    let maxItem={};
    for (let k in obj){
      const {maxQ:itemQ, max:item}=obj[k].getMaxQRow()
      if(itemQ>maxQ){
        max=obj[k];
        maxItem=item;
        maxQ=itemQ
      }
    }
    return {item1:max,item2:maxItem,maxQ:maxQ}
  }

  // arr.getMaxQ=function(){
  //   return this.reduce((max,i)=>i.maxQ.dq>max.maxQ.dq?i:max)
  // };

  while(true) {
    if (total==1) {window.obj=obj;return obj}
    //console.log(arr.length);
    console.log(total);
    //const i=arr.getMaxQ();
    const {item1:i,item2:j,maxQ}=getMaxQ();

    //if (i.maxQ.dq<0) return arr
    //if (maxQ<0) {window.obj=obj;return obj}

    //const j=getById(i.maxQ.id);

    const fri=getFriendsIds(i),frj=getFriendsIds(j);

    const k1=intersec_sort_arr(fri,frj),
          k2=diff_sort_arr(fri,frj),
          k3=diff_sort_arr(frj,fri)//id соседних узлов

    // k1.forEach(k=>{
    //   const kobj=getById(k);
    //   const idq=i.friends.find(a=>a.id==k).dq;
    //   kobj.friends.find(a=>a.id==j.id).dq+=idq;
    //   j.friends.find(a=>a.id==k).dq+=idq
    // })
    k1.forEach(k=>{
      const kobj=obj[k];
      const idq=i.friends[k].dq;
      kobj.friends[j.id].dq+=idq;
      j.friends[k].dq+=idq
    })

    // k2.forEach(k=>{
    //   if(k==j.id) return
    //   const idq=i.friends.find(a=>a.id==k).dq;
    //   const kobj=getById(k);
    //   kobj.friends.push({id:j.id,dq:idq-2*j.a*kobj.a});
    //   j.friends.push({id:k,dq:idq-2*j.a*kobj.a});
    // })

    k2.forEach(k=>{
      const kobj=obj[k];
      if(kobj==j) return
      const idq=i.friends[k].dq;

      kobj.friends[j.id]={item:j,dq:idq-2*j.a*kobj.a};

      j.friends[k]={item:kobj,dq:idq-2*j.a*kobj.a};

    })

    // k3.forEach(k=>{
    //   if(k==i.id) return
    //   const kobj=getById(k);
    //   kobj.friends.find(a=>a.id==j.id).dq-=2*i.a*kobj.a;
    //   j.friends.find(a=>a.id==k).dq-=2*i.a*kobj.a
    // })

    k3.forEach(k=>{
      const kobj=obj[k];
      if(kobj==i) return

      kobj.friends[j.id].dq-=2*i.a*kobj.a;
      j.friends[k].dq-=2*i.a*kobj.a
    })

    j.community.push(i.community);
    j.a+=i.a;

    // i.friends.forEach(k=>{
    //   const kobj=getById(k.id);
    //   kobj.friends.splice(kobj.friends.findIndex(a=>a.id==i.id),1)
    // })

    for (let key in i.friends){
      delete obj[key].friends[i.id]
    }

    //arr.splice(arr.indexOf(i),1);
    delete obj[i.id]

    //arr.forEach(k=>k.maxQ=k.getMaxQ())

    total--

  }

  function intersec_sort_arr(array_1,array_2)
{
	var n = array_1.length, m = array_2.length, i = 0, k = 0, j = 0, array_3 = [];
	while ((i < n) && (j < m)) // пока не дошли до конца массива
	{
		if (array_1[i] == array_2[j])
		{
			array_3[k] = array_1[i]; // запишем элемент в массив array_3
			k++,i++,j++; // и сдвинем позицию во всех 3 массивах
		} else {
			if (array_1[i] < +array_2[j]) {
				i++; // сдвинем позицию в первом массиве
			} else {
				j++; // сдвинем позицию во втором массиве
			}
		}
	}
    return array_3;
}


function diff_sort_arr(array_1,array_2)
{
	var n = array_1.length, m = array_2.length, i = 0, k = 0, j = 0, array_3 = [];
	while ((i < n) && (j < m)) // пока не дошли до конца массива
	{
		if (array_1[i] == array_2[j])
		{
			i++,j++;
		} else {
			if (array_1[i] < +array_2[j]) {
				array_3[k] = array_1[i];
				k++;
				i++; // сдвинем позицию в первом массиве
			} else {
				j++; // сдвинем позицию во втором массиве
			}
		}
	}
	while (i < n) {
		array_3[k] = array_1[i];
		k++, i++;
	}
    return array_3;
}

}

countFriends(arr){
  arr.forEach(i=>loadFriendsCount({id:i.id}))
}

cleanDeadlocks(){
  Object.keys(this.__friends).filter(i=>this.getFriends(i).length==1).forEach(id=>{

    delete this.__friends[this.deleteFromFriendsOfFirstFriend(id)]

  })
  return this
}

calcDists(id,q=[]){
  q.push(Object.assign(this.__friends[id],{dist:0,queued:true}));
  let head=0;
  while(head!=q.length){
    const item=q[head];head++;
    if (item.isHero&&item.id!=id) return item
    item.friends.forEach(i=>
      i.queued||q.push(
        Object.assign(i,
          {
            dist:item.dist+1,
            way:item,
            queued:true
          }
        )
      )
    )
  }
  return false
}

countMutuals(item,friend){
  return friend.friends.filter(i=>i.friends.includes(item)).length
}

getHeroes(){
  const result={}
  for (var key in this.__friends){
    if (this.__friends[key].isHero) Object.assign(result,{[key]:this.__friends[key]})
  }
  return result
}

deleteFromFriendsOfFirstFriend(id){

  return this.getFriendsOfFirstFriend(id).splice(this.getIndexInFriendsOfFirstFriend(id),1)[0].id

}

getIndexInFriendsOfFirstFriend(id){
  return this.getFriendsOfFirstFriend(id).findIndex(i=>i.id==id)
}

getFriendsOfFirstFriend(id){
  return this.getFirstFriend(id).friends
}


getFirstFriend(id){
  return this.getFriends(id)[0]
}

getFriends(id){

  return this.__friends[id].friends
}

isFriends(id1,id2){
  return this.getFriends(id1).includes(id2)
}


hasMutuals(id1,id2){
  return this.getFriends(id1).some(i=>
    this.isFriends(id2,i)
  )
}

hasMutualsNext(id1,id2){
  return this.getFriends(id1).some(i=>
    this.hasMutuals(i,id2)
  )
}

hasMutualsFoF(id1,id2){
  return this.getFriends(id1).some(i=>
    this.getFriends(i).some(j=>
      this.getFriends(id2).some(k=>
        this.isFriends(k,j)
      )
    )
  )
}



}

export default Friends
