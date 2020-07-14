//const areaExistsBook=document.querySelector('.existsbook');
//const dataInsertExistsBook=areaExistsBook.outerHTML;
const placeForInsertExistsBook=document.querySelector('.bookshelf');



const areaCoverBookName=document.querySelector('.coverbook > span');
const areaForImage=document.querySelector('.forimage');
const areaCoverBook=document.querySelector('.coverbook');
areaForImage.addEventListener('input',changeCover);

let currentCover=areaForImage.value;
const areaAliasNewBook=document.querySelector('.aliasnewbook');
const areaGenreNewBook=document.querySelector('.genrenewbook');
const areaYearNewBook=document.querySelector('.yearnewbook');
const stateDefault=100;
areaAliasNewBook.addEventListener('input',changeCoverName);

function changeCover() {
    areaCoverBook.style.backgroundImage=`url(cov${event.target.value}.png)`;
    currentCover=event.target.value;
    areaCoverBookName
}
function changeCoverName() {
    areaCoverBookName.innerHTML=event.target.value;
}

const areaBottomForFlex=document.querySelector('.bottomforflex');
const areaButtonCreateBook=document.querySelector('.createbook');
const areaButtonGiveBook=document.querySelector('.givebook');
const areaButtonDamageBook=document.querySelector('.damagebook');
const areaButtonGlueBook=document.querySelector('.gluebook');
const areaButtonReturnBook=document.querySelector('.returnbook');
areaBottomForFlex.addEventListener('click',allButtons);

function allButtons() {
    switch (event.target) {
        case areaButtonCreateBook:
        libraryLenina.addBook(areaAliasNewBook.value, areaYearNewBook.value, areaGenreNewBook.value, currentCover);
        libraryLenina.bookShelfRebuild(); break;
        case areaButtonGiveBook: alert('кнопка получ'); break;
        case areaButtonDamageBook: alert('кнопка урон'); break;
        case areaButtonGlueBook: alert('кнопка ремон'); break;
        case areaButtonReturnBook: alert('кнопка возвра'); break;
    }
}
function createBook() {
    let name=areaAliasNewBook.value;
    let release=areaYearNewBook.value;
    let state=stateDefault;
    let genre=areaGenreNewBook.value;
    let cover=currentCover;
    libraryLenina.addBook(areaAliasNewBook.value, areaYearNewBook.value, areaGenreNewBook.value, currentCover);
    libraryLenina.bookShelfRebuild();
}

class PrintEditionItem {
    constructor(name, release, state, genre) {
        this.name=name;
        this.release=release;
        this.state=stateDefault;
        this.genre=null;
    }
}
class Book extends PrintEditionItem {
    constructor(name, release, genre, cover) {
        super();
        this.cover=cover;
        this.genre=genre;
        this.name=name;
        this.release=release;
    }
}


class Library {
    constructor(name) {
        this.name=name;
        this.books=[];
    }
    addBook(name, release, state, genre, cover) {
        this.books.push(new Book(name, release, state, genre, cover));
    }
    bookShelfRebuild() {
        let vasia='';
        this.books.forEach(function(el,ind,ar) {
            let insertCover=el.cover;
            let insertName=el.name;
            let insertGenre=el.genre;
            let insertRelease=el.release;
            vasia+=`<div class="existsbook" style="background-image: url(cov${insertCover}.png)">
                    <span>${insertName}</span>
                    <div class="aliasbook">${insertName}</div>
                    <div class="genrebook">${insertGenre}</div>
                    <div class="yearbook">${insertRelease}</div></div>`;

        })
        placeForInsertExistsBook.innerHTML=vasia; }

giveBook() {}
return() {}


    findBookByName() {}
    findBookByGenre() {}
    findBookByYear() {}

    checkBook() {}





}

class MyLibrary extends Library {}

let libraryLenina=new Library('lenina');




/*
    fix() {
        state=state*1.5;
    }
    set state(num) {
        if (num<0) {
            state=0;
        }else{
            if(num>100){
                state=100;
            }else{
                state=num;
            }
        }
    }
    get state() {
        return state;
    }*/