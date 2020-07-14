const placeForInsertExistsBook=document.querySelector('.bookshelf');
const placeForInsertSelectForAlias=document.querySelector('.selectforalias');
const placeForInsertSelectForGenre=document.querySelector('.selectforgenre');
const placeForInsertSelectForYear=document.querySelector('.selectforyear');
const placeForMyBook=document.querySelector('.mybook');

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
const areaButtonClipGenre=document.querySelector('.clipbygenre');
const areaButtonClipYear=document.querySelector('.clipbyyear');
const areaButtonGiveBook=document.querySelector('.givebook');
const areaButtonDamageBook=document.querySelector('.damagebook');
const areaButtonGlueBook=document.querySelector('.gluebook');
const areaButtonReturnBook=document.querySelector('.returnbook');

areaBottomForFlex.addEventListener('click',allButtons);
placeForInsertSelectForGenre.addEventListener('input',changeSelect);
placeForInsertSelectForYear.addEventListener('input',changeSelect);

function changeSelect() {
    if (!areaButtonClipGenre.classList.contains('notorder')) {
        libraryLenina.findBookByGenre(false);updateAll();
    }
    if (!areaButtonClipYear.classList.contains('notorder')) {
        libraryLenina.findBookByYear(false);updateAll();
    }
}

function allButtons() {
    switch (event.target) {
        case areaButtonCreateBook:
        if (areaAliasNewBook.value&&areaGenreNewBook.value&&areaYearNewBook.value>=1900&&areaYearNewBook.value<=2020){
            libraryLenina.addBook(areaAliasNewBook.value, areaYearNewBook.value, areaGenreNewBook.value,`cov${currentCover}.png`, areaAliasNewBook.value)
        }else{libraryLenina.notSuccess()};updateAll(); break;

        case areaButtonClipGenre: libraryLenina.findBookByGenre();updateAll(); break;

        case areaButtonClipYear: libraryLenina.findBookByYear();updateAll(); break;

        case areaButtonGiveBook: libraryLenina.giveBook();updateAll(); break;

        case areaButtonDamageBook: if (placeForMyBook.value!=='') {
        libraryLenina.actionWithBook(libraryLenina.getBookByName(placeForMyBook.value), false)
        }else {
            libraryLenina.notSuccess();}; updateAll(); break;

        case areaButtonGlueBook: if (placeForMyBook.value!=='') {
        libraryLenina.actionWithBook(libraryLenina.getBookByName(placeForMyBook.value), true)
        }else {
            libraryLenina.notSuccess();}; updateAll(); break;

        case areaButtonReturnBook: if (placeForMyBook.value!=='') {
            libraryLenina.returnBook(libraryLenina.getBookByName(placeForMyBook.value))
        }else{
            libraryLenina.notSuccess();
        };updateAll(); break;
    }
}

function updateAll() {
    libraryLenina.bookShelfRebuild();
    libraryLenina.updateBookByName();
    libraryLenina.updateBookByGenre();
    libraryLenina.updateBookByYear();
    libraryMy.updateCatalog();
}

/*------------------ классы ------------------------*/

class PrintEditionItem {
    constructor(name, release, state, genre, notAvailable, notInSearch) {
        this.name=name;
        this.release=release;
        this.state=stateDefault;
        this.genre=null;
        this.notAvailable=false;
        this.notInSearch=false;
    }
    fix() {this.state=Math.round(this.state*1.5);
        if (this.state>100) {this.state=100};
        const fixWav=new Audio('fix.ogg');
        fixWav.play();
    }
    destroy() {this.state=Math.round(this.state/2);
        const destroyWav=new Audio('destroy.wav');
        destroyWav.play();
    }
}

class Book extends PrintEditionItem {
    constructor(name, release, genre, cover, alias) {
        super();
        this.cover=cover;
        this.genre=genre;
        this.name=name;
        this.release=release;
        this.alias=alias;
    }
}


class Library {
    constructor(name) {
        this.name=name;
        this.books=[];
    }
    addBook(name, release, state, genre, cover, alias) {
        this.books.push(new Book(name, release, state, genre, cover, alias));
    }
    bookShelfRebuild() {
        let vasia='';
        this.books.forEach(function(el) {
            let insertCover=el.cover;
            let insertName=el.name;
            let insertGenre=el.genre;
            let insertRelease=el.release;
            let insertAlias=el.alias;
            if (!el.notAvailable) {
            vasia+=`<div class="existsbook" style="background-image: url(${insertCover})">
                    <span>${insertAlias}</span>
                    <div class="aliasbook">${insertName}</div>
                    <div class="genrebook">${insertGenre}</div>
                    <div class="yearbook">${insertRelease}</div></div>`;
                }

        })
        placeForInsertExistsBook.innerHTML=vasia;
    }
    updateBookByName() {
        let vasia='';
        this.books.forEach(function(el) {
            let insertName=el.name;
            if (!el.notAvailable&&!el.notInSearch) {vasia+=`<option>${insertName}</option>`};
        })
        placeForInsertSelectForAlias.innerHTML=vasia;
    }
    updateBookByGenre() {
        let buffer=new Set();
        this.books.forEach(function(el) {if (!el.notAvailable) {buffer.add(el.genre)}});
        let vasia='';
        buffer.forEach(function(el) {
            let insertGenre=el;
            if (!el.notAvailable) {vasia+=`<option>${insertGenre}</option>`};
        })
        placeForInsertSelectForGenre.innerHTML=vasia;
    }
    updateBookByYear() {
        let buffer=new Set();
        this.books.forEach(function(el) {if (!el.notAvailable) {buffer.add(el.release)}});
        let vasia='';
        let buffer2=[];
        buffer.forEach(function(el) {buffer2.push(el)});
        buffer2.sort();
        buffer2.forEach(function(el) {
            let insertRelease=el;
            vasia+=`<option>${insertRelease}</option>`;
        })
        placeForInsertSelectForYear.innerHTML=vasia;
    }
    giveBook() {
        if (!placeForInsertSelectForAlias.value) {libraryLenina.notSuccess()};
        let kniga=this.books.findIndex(function(el) {return (el.name===placeForInsertSelectForAlias.value)});
        this.books[kniga].notAvailable=true;
        libraryMy.addBook(this.books[kniga].name);
    }
    findBookByGenre(byButton=true) {
        if (byButton) {areaButtonClipGenre.classList.toggle('notorder')};

        if (!areaButtonClipGenre.classList.contains('notorder')) {
            this.books.forEach(function(el) {if (el.genre===placeForInsertSelectForGenre.value) {
                el.notInSearch=false}else{el.notInSearch=true}})
        }else{
            this.books.forEach(function(el) {el.notInSearch=false})
        }
    }
    findBookByYear(byButton=true) {
        if (byButton) {areaButtonClipYear.classList.toggle('notorder')};
        if (!areaButtonClipYear.classList.contains('notorder')) {
            this.books.forEach(function(el) {if (el.release===placeForInsertSelectForYear.value) {
                el.notInSearch=false}else{el.notInSearch=true}})
        }else{
            this.books.forEach(function(el) {el.notInSearch=false})
        }
    }
    getBookByName(name) {
        let knigaNum=this.books.findIndex(function(el) {return (el.name===name)});
        return knigaNum;
    }
    returnBook(num) {
        if (this.books[num].notAvailable===true&&this.books[num].state>30) {
            this.books[num].notAvailable=false;
            libraryMy.removeBook(this.books[num].name);
        }
    }
    actionWithBook(num, good=true) {
        if (good) {this.books[num].fix()}else{this.books[num].destroy()}
    }
    notSuccess() {
        const horseWav=new Audio('horse.wav');
        horseWav.play();
    }
}

class MyLibrary extends Library {
    constructor(name) {
        super();
        this.name=name;
        this.books=[];
    }
    updateCatalog() {
        let vasia='';
        this.books.forEach(function(el) {
            let insertName=el.name;
            let stateFor=libraryLenina.books[libraryLenina.getBookByName(insertName)].state;
            let insertState='';
            if (stateFor>=100) {insertState='available'};
            if (stateFor<=30) {insertState='notavailable'};
            vasia+=`<option class="${insertState}">${insertName}</option>`;
        })
        placeForMyBook.innerHTML=vasia;
    }
    removeBook(name) {
        let remNum=this.books.findIndex(function(el) {return (el.name===name)});
        this.books.splice(remNum,1);
    }
}


/*-------------- вызовы -----------------------------------------*/
let libraryLenina=new Library('lenina');
let libraryMy=new MyLibrary('vladislavo');

libraryLenina.addBook('божество реки','1995','приключения', 'k01.jpg', '');
libraryLenina.addBook('весь шерлок холмс','2006','приключения', 'k02.jpg', '');
libraryLenina.addBook('машина времени','1982','фантастика', 'k03.jpg', '');
libraryLenina.addBook('секреты ява-скрипт ниндзя','2008','учебное пособие', 'k04.jpg', '');
libraryLenina.addBook('оракл для профессионалов','2003','учебное пособие', 'k05.jpg', '');
libraryLenina.addBook('пикник на обочине','1977','фантастика', 'k06.png', '');
libraryLenina.addBook('жизнь среди звезд','2018','научно-популярный', 'k07.png', '');
libraryLenina.addBook('пират против всей галактики','2012','фантастика', 'k08.png', '');

updateAll();



