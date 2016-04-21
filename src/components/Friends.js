import React from 'react'

export default (props)=>{
  const findConnections=(f)=>{
    stores.friends.fillFriends().calcDists(36358);
    const getNext=(item)=>item.friends.filter(i=>i.dist<item.dist);
    const getNextCount=item=>getNext(item).length
    const getNextWeight=item=>1000*getNextCount(item)/(item.friendsCount||Infinity)
    const set=[...Array(3)].map(i=> new Set);
    const getName=(i)=>i.first_name+" "+i.last_name;
    let item=stores.friends.__friends[f];

    while(item.dist){
      console.log(getName(item),'--->',getName(item.way))
      item=item.way
    }


    getNext(stores.friends.__friends[f]).forEach(i=>{
      set[0].add(i);
      getNext(i).forEach(j=>{
        set[1].add(j);
        getNext(j).forEach(k=>{
          set[2].add(k);
        })
      });
    })

    //stores.friends.countFriends([...set[1]])// загрузка друзей серединки

    const shortWayNodes=set.reduce((res,item)=>res.concat(...item),[])
    .concat(Object.keys(stores.friends.getHeroes()).map(i=>stores.friends.__friends[i]));

    const shortWays=shortWayNodes.map(i=>({
      item:i,
      ways:shortWayNodes
      .filter(j=>j.dist<i.dist&&j.friends.includes(i))
      .map(k=>({
        node:k,
        mutuals:0
      })
    )}))

    const shortWayFriends=shortWayNodes.map(i=>({
      id:i.id,
      friends:shortWayNodes
      .filter(j=>j.friends.includes(i))
      .map(k=>k.id)
    }))

    const rTotal=shortWayFriends.reduce((s,i)=>s+i.friends.length,0);// может просто length??

    shortWayFriends.forEach(i=>{
      i.a=i.friends.length/rTotal;
      i.friends=i.friends.map(j=>({
          id:j,
          dq:1/rTotal-i.a*shortWayFriends.find(k=>k.id==j).friends.length/rTotal
        })
      )
      i.maxQ=i.friends.reduce((max,j)=>j.dq>max.dq?j:max);
      i.community=[i.id]
      i.getMaxQ=function(){return this.friends.reduce((max,j)=>j.dq>max.dq?j:max)}
    });



    shortWayFriends.getMaxQ=function(){
      return this.reduce((max,i)=>i.maxQ.dq>max.maxQ.dq?i:max)
    };


    shortWayFriends.findGroups=function(){
      const getFriendsIds=(a)=>a.friends.map(i=>i.id).sort((a,b)=>a-b);
      const getById=(id)=>this.find(a=>a.id==id);

      while(this.getMaxQ().maxQ.dq>0) {
        const i=this.getMaxQ();
        const j=getById(i.maxQ.id);

        const fri=getFriendsIds(i),frj=getFriendsIds(j);
        const k1=intersec_sort_arr(fri,frj),
              k2=diff_sort_arr(fri,frj),
              k3=diff_sort_arr(frj,fri)//id соседних узлов

        k1.forEach(k=>{
          const kobj=getById(k);
          const idq=i.friends.find(a=>a.id==k).dq;
          kobj.friends.find(a=>a.id==j.id).dq+=idq;
          j.friends.find(a=>a.id==k).dq+=idq
        })
        k2.forEach(k=>{
          if(k==j.id) return
          const idq=i.friends.find(a=>a.id==k).dq;
          const kobj=getById(k);
          kobj.friends.push({id:j.id,dq:idq-2*j.a*kobj.a});
          j.friends.push({id:k,dq:idq-2*j.a*kobj.a});
        })
        k3.forEach(k=>{
          if(k==i.id) return
          const kobj=getById(k);
          kobj.friends.find(a=>a.id==j.id).dq-=2*i.a*kobj.a;
          j.friends.find(a=>a.id==k).dq-=2*i.a*kobj.a
        })

        j.community.push(...i.community);
        j.a+=i.a;

        i.friends.forEach(k=>{
          const kobj=getById(k.id);
          kobj.friends.splice(kobj.friends.findIndex(a=>a.id==i.id),1)
        })
        this.splice(this.indexOf(i),1);

        this.forEach(k=>k.maxQ=k.getMaxQ())

      }
      return this
    }



  window.shortWayFriends=shortWayFriends
  window.shortWayNodes=shortWayNodes
  window.calcMiddles=()=>{
    const setList=[...set[1]].map(i=>i.id);
    return [...set[1]].map(i=>({...i,
      friends:i.friends.concat(intersec_sort_arr(i.friendsList, setList).map(j=>stores.friends.__friends[j]))
    }))
  }
  window.calcMut=()=>shortWays.forEach(j=>
    j.ways.forEach(k=>
      k.mutuals=intersec_sort_arr(j.item.friendsList, k.node.friendsList).length
    )
  )


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
			if (array_1[i] < array_2[j]) {
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
			if (array_1[i] < array_2[j]) {
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

function sum_sort_arr(array_1,array_2)
{
	var n = array_1.length, m = array_2.length, i = 0, k = 0, j = 0, array_3 = [];
	while ((i < n) && (j < m)) // пока не дошли до конца массива
	{
		if (array_1[i] == array_2[j])
		{
			array_3[k] = array_1[i];
			k++,i++,j++;
		} else {
			if (array_1[i] < array_2[j]) {
				array_3[k] = array_1[i];
				k++;
				i++; // сдвинем позицию в первом массиве
			} else {
				array_3[k] = array_2[j];
				k++;
				j++; // сдвинем позицию во втором массиве
			}
		}
	}
	while (i < n) {
		array_3[k] = array_1[i];
		k++, i++;
	}
	while (j < m) {
		array_3[k] = array_2[j];
		k++, j++;
	}
    return array_3;
}

function symmetric_diff_sort_arr(array_1,array_2)
{
    var n = array_1.length, m = array_2.length, i = 0, k = 0, j = 0, array_3 = [];
    while ((i < n) && (j < m)) // пока не дошли до конца массива
    {
        if (array_1[i] < array_2[j]) {
            array_3[k] = array_1[i];
            k++;
            i++; // сдвинем позицию в первом массиве
        } else if (array_1[i] > array_2[j]) {
            array_3[k] = array_2[j];
            k++;
            j++; // сдвинем позицию во втором массиве
        } else {
            i++, j++;
        }
    }
    while (i < n) {
        array_3[k] = array_1[i];
        k++, i++;
    }
    while (j < m) {
        array_3[k] = array_2[j];
        k++, j++;
    }
    return array_3;
}



}
  return ( <div>
    <button onClick={props.start}>Рамзан</button>
    <button onClick={props.finish}>Юра</button>
    <button onClick={()=>setTimeout(()=>findConnections(279938622),0)}>Связи</button>
    <a href="https://oauth.vk.com/authorize?client_id=5406559&display=page&redirect_uri=http://local.vcap.me:8080/friends/v/&response_type=code">Code</a>

    <h2>{props.loading}</h2>
  </div>)
}
