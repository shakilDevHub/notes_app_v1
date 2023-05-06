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
opnNoteImg = openNote.querySelector('#opnNoteImg'),
// history
historyBtn = document.querySelector('.historyBtn'),
history = openNote.querySelector('.history'),
historyList = history.querySelector('#historyList'),
historyListItem = history.querySelector('#historyList li'),
// History data
historyData = document.querySelector('.historyData'),
historyTime = historyData.querySelector('.historyTime'),
historyDataTitle = historyData.querySelector('h3'),
historyDataDescription = historyData.querySelector('p'),
saveHistoryData = historyData.querySelector('.saveHistoryData'),
closeHistoryData = historyData.querySelector('.closeHistoryData');

const date = new Date();
let noteList = [];

let defaultPreviewImg = "https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let sortNotes = (arr)=>{
    arr.sort((a, b)=>{
        return a[0][5] - b[0][5];
    })
    return arr;
}
// =============================================
let time = ()=>{
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    return `${month} | ${day<10? '0'+day: day} | ${year<10? '0'+year : year}`;
}
time();
let getFullTime = ()=>{
    let hour = date.getHours();
    let amPm = hour > 12 ? 'PM' : 'AM';
    hour = (hour%12 || 12);
    hour = (hour < 10) ? ('0' + hour) : hour;
    let min = date.getMinutes();
    (min<10) && (min = '0'+min);
    let sec = date.getSeconds();
    (sec<10) && (sec = '0'+sec);
    return `${hour} : ${min} : ${sec} ${amPm}`;
}
getFullTime();

let getShortName = (nameInp)=>{
    return nameInp.slice(0, 25)+"....";
}

let backgroundStyle = (element, url)=>{
    (url=="") && (url = defaultPreviewImg);
    let testImg = document.querySelector('.testImg');
    testImg.src = url;
    element.style.backgroundImage = `url(${url})`
    testImg.addEventListener('error', ()=>{ 
        element.style.backgroundImage = `url(${defaultPreviewImg})`
    })
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.style.backgroundRepeat = 'no-repeat';
}
let createNoteHTML = (title, previewImg, date, time)=>{
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let h3 = document.createElement('h3');
    let h41 = document.createElement('h4');
    let h42 = document.createElement('h4');
    let button = document.createElement('button');
    div1.classList.add('note');
    div2.classList.add('details')
    h3.classList.add('title');
    h41.classList.add('editedTime');
    h42.classList.add('editedTime');
    button.classList.add('openNoteBtn');
    h3.innerText = getShortName(title), 
    h41.innerText = date;
    h42.innerText = time;
    button.innerText = 'Open';
    div2.appendChild(h3);
    div2.appendChild(h41);
    div2.appendChild(h42);
    div2.appendChild(button);
    div1.appendChild(div2);
    notes.appendChild(div1);
    backgroundStyle(div1, previewImg);
    return div1;
}
let createHistoryListItem = (fullData)=>{
    historyList.innerHTML = ' ';
    fullData.forEach((data)=>{
        let li = document.createElement('li');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span1.innerText = data.lastEditDate;
        span2.innerText = data.lastEditTime;
        li.appendChild(span1);
        li.appendChild(span2);
        historyList.appendChild(li);
    })
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
        createNoteHTML(getData[i][0][0], getData[i][0][1], getData[i][0][3], getData[i][0][4]);
    }
}

window.addEventListener('load', ()=>{
    loadAllNote();  
})
// popup open close
addNoteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    addNote.classList.add('open');
    addNoteTitle.focus();
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

let indx = 0;
document.addEventListener('click', (e)=>{
    (!(addNote.contains(e.target)) && (!addNoteBtn.contains(e.target))) && addNote.classList.remove('open');
    
    let contain = true;
    openNoteBtn.forEach((btn)=>{
        contain *= !(btn.contains(e.target));
    }) 
    if(!historyData.contains(e.target) && contain && !openNote.contains(e.target)){
        openNote.classList.remove('open');
        history.classList.remove('open');
    }
    if(!historyData.contains(e.target) && !(historyList.contains(e.target))){
        historyData.classList.remove('open');
    }
    if((e.target).classList.contains('openNoteBtn')){
        openNoteBtn = document.querySelectorAll('.openNoteBtn');
        indx = 0;
        openNoteBtn.forEach((btn, i)=>{
            btn.classList.remove('clicked');
            e.target.classList.add('clicked');
            (btn == e.target) && (indx = i);
        })
        noteList = dataSet();
        let prevData = noteList[indx][0];
        openNoteTitle.value = noteList[indx][0][0];
        opnNoteImg.value = noteList[indx][0][1];
        openNoteDescription.value = noteList[indx][0][2];
        openNote.classList.add('open');
        let verificationOfChanges = ()=>{
            if(prevData[0] != openNoteTitle.value || prevData[1]!=opnNoteImg.value || prevData[2]!=openNoteDescription.value){
                saveOpenNote.classList.remove('disable');
            }else{
                saveOpenNote.classList.add('disable');
            }
        }
        openNoteTitle.addEventListener('input', ()=>{
            verificationOfChanges();
        })
        opnNoteImg.addEventListener('input', ()=>{
            verificationOfChanges();
        })
        openNoteDescription.addEventListener('input', ()=>{
            verificationOfChanges();
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
    }
})

let saveOpenNoteFun = (title, imgLink, description)=>{
    let runFunction = ()=>{
        let arr = [];
        arr.push(title);
        arr.push(imgLink);
        arr.push(description);
        arr.push(time());
        arr.push(getFullTime());
        let currentTime = date.getTime();
        arr.push(currentTime);
        let editedHistory = noteList[indx][1];
        
        let editedHistoryData = {
            data: arr,
            lastEditDate: arr[3],
            lastEditTime: arr[4],
        }
        editedHistory.push(editedHistoryData);
        arr = [arr, editedHistory];
        
        noteList[indx] = arr;
        noteList = sortNotes(noteList);
        window.localStorage.setItem('noteList', JSON.stringify(noteList));
        loadAllNote();
    }

    (title!=noteList[indx][0][0] || description!=noteList[indx][0][2]) && runFunction();
}
saveOpenNote.addEventListener('click', (e)=>{
    e.preventDefault();
    saveOpenNoteFun(openNoteTitle.value, opnNoteImg.value, openNoteDescription.value);
    saveOpenNote.classList.add('disable');
})

let allHistoryLi;
historyBtn.addEventListener('click', ()=>{
    createHistoryListItem(noteList[indx][1]);
    allHistoryLi = Array.from(historyList.children);
    allHistoryLi.forEach((historyLi, i)=>{
        historyLi.addEventListener('click', ()=>{
            historyData.classList.add('open');
            historyTime.innerHTML = `<span>${noteList[indx][1][i].lastEditDate}</span>
            <span>${noteList[indx][1][i].lastEditTime}</span>`;
            historyDataTitle.innerText = noteList[indx][1][i].data[0]; 
            historyDataDescription.innerText = noteList[indx][1][i].data[2]; 
            saveHistoryData.addEventListener('click', (e)=>{
                e.preventDefault();
                historyData.classList.remove('open');
                saveOpenNoteFun(noteList[indx][1][i].data[0], noteList[indx][1][i].data[1], noteList[indx][1][i].data[2], time())
            })
        }, {once: true})
        closeHistoryData.addEventListener('click', (e)=>{
            e.preventDefault();
            historyData.classList.remove('open');
        })
    })
    history.classList.toggle('open');
})

addNoteTitle.value = "", addNoteDescription.value = "";
addNoteTitle.addEventListener('input', ()=>{
    (this.value!="" && addNoteDescription.value!="")? saveNote.classList.remove('disable'): saveNote.classList.add('disable');
})
addNoteDescription.addEventListener('input', ()=>{
    (addNoteTitle.value!="" && this.value!="")? saveNote.classList.remove('disable'): saveNote.classList.add('disable');
})

saveNote.addEventListener('click', (e)=>{
    e.preventDefault();
    let addNoteImgLink = (addNoteImg.value=="")? defaultPreviewImg: addNoteImg.value;
    let arr = [];
    arr.push(addNoteTitle.value);
    arr.push(addNoteImgLink);
    arr.push(addNoteDescription.value);
    arr.push(time());
    arr.push(getFullTime());
    let currentTime = date.getTime();
    arr.push(currentTime);
    let editedHistory = [];
    let editedHistoryData = {
        data: arr,
        lastEditDate: arr[3],
        lastEditTime: arr[4],
    }
    editedHistory.push(editedHistoryData);
    arr = [arr, editedHistory]
    
    noteList.push(arr);
    noteList = sortNotes(noteList);
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
    addNote.classList.remove('open');
    loadAllNote();
})
clearAllNote.addEventListener('click', (e)=>{
    e.preventDefault();
    noteList = [];
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
    // window.localStorage.clear();
    loadAllNote();
})
