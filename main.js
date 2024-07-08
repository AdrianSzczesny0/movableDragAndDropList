
let draggedElement;
let listItemsArray = [];

function createListItem(ID,ITEM_VALUE){
  const listItemHTML = 
  `
  <div id="item_wrapper" class="item_wrapper">
    <div id ="listSpot" list_id="${ID}" class="spot"></div>
    <div id="list_item" list_id="${ID}" draggable="true" class="list_item">
      <div id="value" class="value" >${ITEM_VALUE}</div>
      <div id="actions" class="actions">
          <div id="move" class="move icon"> M</div>
          <div id="edit" class="edit icon">E</div>
          <div id="delete" class="delete icon">D</div>
      </div>
    </div>
  </div>
  `

  const template = document.createElement('template');
  const viewHTML = listItemHTML;
  template.innerHTML = viewHTML.trim();
  const view = template.content.firstElementChild;
  template.style.opacity=0;
  const listParent = document.getElementById('list_wrapper');
  const listItem = {
    id:ID,
    value:ITEM_VALUE,
    element:view
  };
  listParent.appendChild(view);
  listItemsArray.push(listItem);
}

function log(message){
  console.log(message);
}

function populateList(){
  log('creating list item');
  listItemsArray.forEach(element =>{
    log(`list item: ${element}`);
    drawListItem(element);
  });
}


function clearList(){
  log('clearing list');
  listItemsArray.forEach(element =>{
    element.element.remove();
  })
}

function showDropSpots(listItemID){
  document.querySelectorAll("#listSpot").forEach((e) => {
    let dropspotList=[];
    dropspotList.push(e);
    if( parseInt(e.getAttribute('list_id')) != parseInt(listItemID)+1 && parseInt(e.getAttribute('list_id')) != parseInt(listItemID) ){
      console.log(e.getAttribute('list_id'));
      e.style.height = "15px";
    }
  })
}
function showDropSpot(listItemID){

  const spot = listItemsArray[listItemID].element.querySelector('#listSpot');
  spot.style.height = '15px';
}

function hideDropSpots(){
  document.querySelectorAll("#listSpot").forEach((e) => {
    e.style.height = "0px";
  })
}
function darkenElement(element){
  element.classList.add('darken');
}
function lightenListItems(){
  document.querySelectorAll("#list_item").forEach((e) => {
    e.style.opacity = '1';
  })
}


async function test1() {
  // DRAG START
  document.querySelectorAll("#list_item").forEach((e) => {
    e.addEventListener("dragstart", () => {
      let parentItem = e.parentElement;
      console.log('STARTED DRAG');
      draggedElement = {
        id: parseInt(e.getAttribute('list_id')),
        value: parentItem.querySelector('#value').innerHTML,
        element:parentItem
      }
      darkenElement(e);

    });
    e.addEventListener("touchstart", () => {
      let parentItem = e.parentElement;
      console.log('STARTED DRAG');
      draggedElement = {
        id: parseInt(e.getAttribute('list_id')),
        value: parentItem.querySelector('#value').innerHTML,
        element:parentItem
      }
      darkenElement(e);
    });
  })

  // add dragdrop spot
  document.querySelectorAll("#listSpot").forEach((e) => {
    e.addEventListener("dragover", (event) => {
      event.preventDefault();
      e.style.height = '60px';
      log(`dragged item id:${draggedElement.id}`);
      targetId = parseInt(e.getAttribute('list_id'));
      log(targetId);
      if( draggedElement.id != parseInt(e.getAttribute('list_id'))){
        e.classList.add('over');
        console.log('drag over element');
        // showDropSpot(parseInt(e.getAttribute('list_id')));
      }else{

      }
    });
    e.addEventListener("dragleave", (event) => {
      event.preventDefault();
      e.classList.remove('over');
      console.log('drag over element');
      e.style.height = '0px';

    });
    e.addEventListener("ondragend", (event) => {
      log('DRAG EVENT END');
      event.preventDefault();
      e.classList.remove('darken');
      e.style.width="900px";
      lightenListItems();
    });
    // DRAG DROP
    e.addEventListener("drop", (event) => {
      event.preventDefault();
      console.log('DROPPED');
      lightenListItems();
      targetId = parseInt(e.getAttribute('list_id'));
      log(e.getAttribute('list_id'));
      replaceItemAtIndex(draggedElement.id, targetId);
      clearList();
      populateList();
      test1();
      e.style.height = '15px';
    });
    
  })
  // MOBILE:

  document.querySelectorAll("#list_item").forEach((e) => {
    e.addEventListener("dragover", (event) => {
      event.preventDefault();
      // e.style.height = '50px';
      log(`dragged item id:${draggedElement.id}`);
      log(`over item id:`)
      if( draggedElement.id != parseInt(e.getAttribute('item_id'))){
        if(e.classList.contains('darken')){
          e.style.opacity = "0.4";
        }else{
          e.classList.add('over');
          e.parentElement.querySelector('#listSpot').style.height = "15px";
          console.log('drag over element');
        }
      }
    });
    e.addEventListener("dragleave", (event) => {
      event.preventDefault();
      e.classList.remove('over');
      e.parentElement.querySelector('#listSpot').style.height = "0px";
      console.log('drag over element');
    });
    e.addEventListener("dragend", (event) =>{
      log('DRAGEND');
      draggedElement.element.querySelector('#list_item').style.opacity="1";
      draggedElement.element.querySelector('#list_item').classList.remove('darken');
    });
    // DRAG DROP
    e.addEventListener("ondragend", (event) => {
      log('DRAG EVENT END');
      event.preventDefault();
      e.classList.remove('darken');
      e.style.width="900px";
      lightenListItems();
    });
    e.addEventListener("drop", (event) => {
      event.preventDefault();
      console.log('DROPPED');
      lightenListItems();
      targetId = parseInt(e.getAttribute('list_id'));
      log(e.getAttribute('list_id'));
      swapItems(draggedElement.id, targetId);
      clearList();
      populateList();
      test1();
      e.style.height = '15px';
    });

  })
}

function drawListItem(listItem){
  const listItemHTML = 
  `
  <div id="item_wrapper" class="item_wrapper">
    <div id ="listSpot" list_id="${listItem.id}" class="spot"></div>
    <div id="list_item" list_id="${listItem.id}" draggable="true" class="list_item">
      <div id="value" class="value" >${listItem.value}</div>
      <div id="actions" class="actions">
          <div id="move" class="move icon"> M</div>
          <div id="edit" class="edit icon">E</div>
          <div id="delete" class="delete icon">D</div>
      </div>
    </div>
  </div>
  `

  const template = document.createElement('template');
  const viewHTML = listItemHTML;
  template.innerHTML = viewHTML.trim();
  const view = template.content.firstElementChild;
  template.style.opacity=0;
  const listParent = document.getElementById('list_wrapper');
  listParent.appendChild(view);
  listItemsArray[listItem.id].element = view;
}

createListItem(0,'Test1');
createListItem(1,'Test2');
createListItem(2,'Test3');
createListItem(3,'Test4');
createListItem(4,'Test5');
createListItem(5,'Test6');

function swapItems(from,to){
  let tempArray = listItemsArray;
  let tempItem = tempArray[from];
  tempArray[from] = tempArray[to];
  tempArray[to] = tempItem;
  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i].id = i;
  }
  listItemsArray = tempArray;
}

function replaceItemAtIndex(from,to){
  let tmpArray = listItemsArray;

  if ( from > to){
    for (let i = from; i > to; i--) {
      let tempElement = tmpArray[i-1];
      tmpArray[i-1] = tmpArray[i];
      tmpArray[i] = tempElement;      
    }
  }
  if ( from < to){
    for (let i = from; i < to; i++) {
      let tempElement = tmpArray[i+1];
      tmpArray[i+1] = tmpArray[i];
      tmpArray[i] = tempElement;      
    }
  }
  for (let i = 0; i < tmpArray.length; i++) {
    tmpArray[i].id = i;
  }
  listItemsArray = tmpArray;
}

function clear(){
  log('CLEAR CLEAR');
  let element = document.querySelector(`[list-id="${draggedElement.id}"]`);
  element.style.opacity= "1";
}

test1();

