const nameEnterPage = document.querySelector('#nameEnter'), 
userNameInp = nameEnterPage.querySelector('#userNameInp'),
userNameBtn = nameEnterPage.querySelector('#userNameBtn'); 
let userName;
// detecting is the visitor visiting for the first time or not 
let visitedOrNot = true;
// first time we assuming that visitor never visited here before so 'visited' is null and Number(null) == 0; 
//  if visitingFlag is not NaN then it is his/her first time else 'visited' contain some non number value that's mean visitor visited this site before.
//  If visitor never visit then we will set a flag in his/her local storage. 
let visitingFlag = Number(window.localStorage.getItem('visitorName'));
visitedOrNot = isNaN(visitingFlag);

let notVisited = !visitedOrNot;
if(notVisited){
    nameEnterPage.classList.add('open');
    userNameInp.addEventListener('input', ()=>{
        ((userNameInp.value).trim()!='')? userNameBtn.classList.add('active'): userNameBtn.classList.remove('active');
    })
    userNameBtn.addEventListener('click', ()=>{
        userName = userNameInp.value;
        nameEnterPage.classList.remove('open');
        console.log(userName);
        window.localStorage.setItem('visitorName', userName);
    })
}else{
    nameEnterPage.classList.remove('open');
}

// =========================================================
let logo = document.querySelector('#logo'),
wrapper = document.querySelector('.wrapper'),
notes = wrapper.querySelector('.notes'),
note = wrapper.querySelectorAll('.note'),
addNoteBtn = wrapper.querySelector('#addNoteBtn'),
clearAllNote = wrapper.querySelector('#clearAllNote'),
openNoteBtn = wrapper.querySelectorAll('.openNoteBtn'),
// addNote ======================================
addNote = document.querySelector('#addNote'),
addNoteTitle = addNote.querySelector('#addNoteTitle'),
addNoteImg = addNote.querySelector('#addNoteImg'),
addNoteDescription = addNote.querySelector('#addNoteDescription'),
saveNote = addNote.querySelector('#saveNote'),
closeNote = addNote.querySelector('#closeNote'),
// openNote ======================================
openNote = document.querySelector('#openNote'),
openNoteTitle = openNote.querySelector('#openNoteTitle'),
openNoteDescription = openNote.querySelector('#openNoteDescription'),
saveOpenNote = openNote.querySelector('#saveOpenNote'),
deleteOpenNote = openNote.querySelector('#deleteOpenNote'),
closeOpenNote = openNote.querySelector('#closeOpenNote'),
opnNoteImg = openNote.querySelector('#opnNoteImg');

const date = new Date();
let noteList = [];

let defaultPreviewImg = "https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

let sortNotes = (arr)=>{
    arr.sort((a, b)=>{
        return a[4] - b[4];
    })
    return arr;
}
// =============================================
let time = ()=>{
    month = date.getMonth()+1;
    year = date.getFullYear();
    day = date.getDate();
    return `${month<10? '0'+month: month} | ${day<10? '0'+day: day} | ${year<10? '0'+year : year}`;
}
time();

let getShortName = (name)=>{
    return name.slice(0, 25)+"....";
}
let backgroundStyle = (element, url)=>{
    (url=="") && (url = defaultPreviewImg);
    element.style.backgroundImage = `url(${url})`
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.style.backgroundRepeat = 'no-repeat';
}
let createNoteHTML = (title, previewImg, date)=>{
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    let button = document.createElement('button');
    div1.classList.add('note');
    div2.classList.add('details')
    h3.classList.add('title');
    h4.classList.add('editedTime');
    button.classList.add('openNoteBtn');
    h3.innerText = getShortName(title), 
    h4.innerText = date;
    button.innerText = 'Open';
    div2.appendChild(h3);
    div2.appendChild(h4);
    div2.appendChild(button);
    div1.appendChild(div2);
    notes.appendChild(div1);
    backgroundStyle(div1, previewImg);
    return div1;
}

let dataSet = ()=>{
    let getData = JSON.parse((window.localStorage.getItem('noteList')));
    return getData;
}

let loadAllNote = ()=>{
    userName = (window.localStorage.getItem('visitorName'));
    userName = isNaN(Number(userName))? userName : 'Personal';
    logo.innerText = `${userName}'s Notes`
    let getData = dataSet();
    noteList = isNaN(Number(getData))? getData: [];
    notes.innerHTML = '';
    for(let i=0; i<noteList.length; i++){
        createNoteHTML(getData[i][0], getData[i][1], getData[i][3]);
    }
}

window.addEventListener('load', ()=>{
    loadAllNote();  
})
// popup open close
addNoteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    addNote.classList.add('open');
    addNoteTitle.value = addNoteDescription.value = addNoteImg.value = "";
})
closeNote.addEventListener('click', (e)=>{
    e.preventDefault();
    addNote.classList.remove('open');
})

closeOpenNote.addEventListener('click', (e)=>{
    e.preventDefault();
    openNote.classList.remove('open');
})

document.addEventListener('click', (e)=>{
    (!(addNote.contains(e.target)) && (!addNoteBtn.contains(e.target))) && addNote.classList.remove('open');
    
    let contain = true;
    openNoteBtn.forEach((btn)=>{
        contain *= !(btn.contains(e.target));
    }) 
    if(!openNote.contains(e.target) && contain){
        openNote.classList.remove('open');
    }
    if((e.target).classList.contains('openNoteBtn')){
        openNoteBtn = document.querySelectorAll('.openNoteBtn');
        let indx = 0;
        openNoteBtn.forEach((btn, i)=>{
            btn.classList.remove('clicked');
            e.target.classList.add('clicked');
            (btn == e.target) && (indx = i);
        })
        noteList = dataSet();
        let prevData = noteList[indx];
        openNoteTitle.value = noteList[indx][0];
        opnNoteImg.value = noteList[indx][1];
        openNoteDescription.value = noteList[indx][2];
        openNote.classList.add('open');
        openNoteTitle.addEventListener('input', ()=>{
            if(prevData[0] != openNoteTitle.value || prevData[1]!=opnNoteImg.value || prevData[2]!=openNoteDescription.value){
                saveOpenNote.classList.remove('disable');
            }else{
                saveOpenNote.classList.add('disable');
            }
        })
        openNoteDescription.addEventListener('input', ()=>{
            if(prevData[0] != openNoteTitle.value || prevData[2]!=openNoteDescription.value){
                saveOpenNote.classList.remove('disable');
            }else{
                saveOpenNote.classList.add('disable');
            }
        })
        closeOpenNote.addEventListener('click', (e)=>{
            e.preventDefault();
            openNote.classList.remove('open');
        })
        deleteOpenNote.addEventListener('click', (e)=>{
            e.preventDefault();
            noteList.splice(indx, 1);
            noteList = sortNotes(noteList);
            window.localStorage.setItem('noteList', JSON.stringify(noteList));
            loadAllNote();
            openNote.classList.remove('open');
        })
        saveOpenNote.addEventListener('click', (e)=>{
            e.preventDefault();
            noteList[indx][0] = openNoteTitle.value;
            noteList[indx][1] = opnNoteImg.value;
            noteList[indx][2] = openNoteDescription.value;
            noteList[indx][3] = time();
            let currentTime = date.getTime();
            noteList[indx][4] = currentTime;
            noteList = sortNotes(noteList);
            window.localStorage.setItem('noteList', JSON.stringify(noteList));
            loadAllNote();
            openNote.classList.remove('open');
        })
    }
})

addNoteTitle.value = "", addNoteDescription.value = "";
addNoteTitle.addEventListener('input', ()=>{
    (addNoteTitle.value!="" && addNoteDescription.value!="")? saveNote.classList.remove('disable'): saveNote.classList.add('disable');
})
addNoteDescription.addEventListener('input', ()=>{
    (addNoteTitle.value!="" && addNoteDescription.value!="")? saveNote.classList.remove('disable'): saveNote.classList.add('disable');
})

saveNote.addEventListener('click', (e)=>{
    e.preventDefault();
    let addNoteImgLink = (addNoteImg.value=="")? defaultPreviewImg: addNoteImg.value;
    let arr = [addNoteTitle.value, addNoteImgLink, addNoteDescription.value, time(), date.getTime()];
    noteList.push(arr);
    noteList = sortNotes(noteList);
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
    addNote.classList.remove('open');
    createNoteHTML(arr[0], arr[1], arr[3]);
})
clearAllNote.addEventListener('click', (e)=>{
    e.preventDefault();
    noteList = [];
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
    // window.localStorage.clear();
    loadAllNote();
})
