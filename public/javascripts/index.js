const data = require('./data').data
let docFragment = document.createDocumentFragment()
let docRoot = document.querySelector('#root')
let Record = [], UndoRecord = [], RedoRecord=[];


function createFile(fileData,level,isRoot){
    const el = document.createElement('a')
    // not root element
    if(!isRoot){
        el.classList.add('hide')
        el.style.paddingLeft = level+5+'px'
    }
    el.innerText = fileData.name
    el.setAttribute('data-type','file')
    el.classList.add('file')
    el.classList.add('element')
    return el
}

function createFolder(folderData,level,isRoot){
    const el = document.createElement('a')
    if(!isRoot){
        el.classList.add('folder')
        el.classList.add('hide')
        el.style.marginLeft = level+5+'px'
    }
    el.setAttribute('_id',folderData._id)
    el.innerText = folderData.name
    el.setAttribute('data-type','folder')
    el.setAttribute('data-open',false)
    el.classList.add('folder')
    el.classList.add('element')
    return el
}

function createTree(treeData){

    let level=0;

    function createComponent(treeElData,el){
      
      for(let i=0; i<treeElData.length; i++){
        let elData = treeElData[i],newEl;
        
        if(elData.type === 'file'){
            if(!el){
                newEl = createFile(elData,level,true)
                docFragment.appendChild(newEl)
            }
            else {
                newEl = createFile(elData,level)
                el.appendChild(newEl)
            }
        }
        else if(elData.type === 'folder'){
            if(!el){
                newEl = createFolder(elData,level,true)
                docFragment.appendChild(newEl)
            }
            else {
                newEl = createFolder(elData,level)
                el.appendChild(newEl)
            }
            if(elData.childrens && elData.childrens.length>0){
                level++
                createComponent(elData.childrens,newEl)
            }
            // reached end of this subtree, reset the level to 0
            else level = 0
        }
      }
    }

    createComponent(treeData)
    docRoot.appendChild(docFragment)

}

function addTreeClickHandlers(){
    docRoot.addEventListener('click', function(event){
        const eventTarget = event.target;
        if(eventTarget && eventTarget.getAttribute('data-type') === 'folder'){
            const type = eventTarget.getAttribute('data-type')
            showHideFolderChildrens(eventTarget)
            addRecord(eventTarget,type,Record)
        }
    })
}

function addRecord(eventTarget,type,RecordTarget){
    if(type === 'folder'){
        if(eventTarget.getAttribute('data-open') === 'false'){
            RecordTarget.push({
                el : eventTarget,
                operation : 'open',
                type : 'folder'
            })
            eventTarget.setAttribute('data-open', true)
        }
        else{
            RecordTarget.push({
                el : eventTarget,
                operation : 'close',
                type : 'folder'
            })
            eventTarget.setAttribute('data-open', false)
        } 

    }
}

function showHideFolderChildrens(el){
    const childrens = el.children;
    el.classList.toggle('open')
    for(let i=0; i<childrens.length; i++){
        childrens[i].classList.toggle('hide')
    }
}

function setElementPadding(el,level){
    if(el && el.style){
        el.style.paddingLeft = level+'px';
    }
}

function addUndoRedoHandlers(){
    const undoBtn = document.querySelector('#undoBtn')
    const redoBtn = document.querySelector('#redoBtn')

    undoBtn.addEventListener('click',handleUndo)
    redoBtn.addEventListener('click',handleRedo)
}


function handleUndo(){
    let lastElRecord;
    if(UndoRecord.length){
        lastElRecord = UndoRecord.pop()
    }
    else if(Record.length){
       lastElRecord = Record.pop()
    }
    else {
        return;
    }
    showHideFolderChildrens(lastElRecord.el)
    addRecord(lastElRecord.el,lastElRecord.type,RedoRecord)
}

function handleRedo(){
    let lastElRecord;
    if(RedoRecord.length){
       lastElRecord = RedoRecord.pop()
       showHideFolderChildrens(lastElRecord.el)
       addRecord(lastElRecord.el,lastElRecord.type,UndoRecord)
    }
}

createTree(data)
addTreeClickHandlers()
addUndoRedoHandlers()

