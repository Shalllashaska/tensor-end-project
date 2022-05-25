import lastfmServices from './lastfm-services.js';

const topArtistsSection = document.querySelector('.topArtistsSection');
const topSongsSection = document.querySelector('.topSongSection');
const content = document.querySelector('.content');

document.onload = await startPage();


async function startPage(){

    const topArtists = await lastfmServices.getTopArtists();
    const topTracks = await lastfmServices.getTopTracks();

    loadTops(topArtists, topArtistsSection);
    loadTops(topTracks, topSongsSection);
    await startTags()
}


async function startTags(){

    const topTags = await lastfmServices.getTopTags();
    for(let i = 0; i < topTags.length; i++){
        await loadTag(topTags[i], i);
    }
}

//Загрузка тэгов на страницу
async function loadTag(element, count){
    const templateSection =`
    <section class="content__section">
        <h2 class="content__sectionName">${element.name.toUpperCase()}</h2>
        <div class="content__musicList Tag${count}List">
        </div>
    </section>
    `;

    content.insertAdjacentHTML('beforeend', templateSection);

    const str = `.Tag${count}List`;
    const tagSect = content.querySelector(str);

    const topArtistByTag = await lastfmServices.getTopArtistByTag(element.name);
    loadTops(topArtistByTag, tagSect);
    
}

//Загрузка карточек на страницу
function loadTops(arrayElem, section){
    section.innerHTML = "";

    arrayElem.forEach(element => {
        
        const template = `
        <a href="${element.url}" class="content__item buttonPlayeSong">
            <div class="content__buttonWrapper">
                <img src="${element.image}" alt="" class="content__imgSong">
                <p class="content__nameSong">${element.name}</p>
            </div>
        </a>
        `;
        section.insertAdjacentHTML('beforeend', template);
    });
}

function loadTagsArtis(){

}