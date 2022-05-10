import lastfmServices from './lastfm-services.js';


const searchForm = document.querySelector('.form_input');
const searchInput = document.querySelector('.header__search');
const searchResult = document.querySelector('.allSearchResultContent');
const searchBestResult = document.querySelector('.bestSearchResultDiv');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const track = searchInput.value;

    const tracks = await lastfmServices.searchTrack(track);

    const bestTrack = await lastfmServices.getTrackInfo(tracks[0].name, tracks[0].artist);
    searchUpdate(tracks, bestTrack);
});


//Метод обновляющий поиск на странице по введенному запросу
function searchUpdate(tracks, bestTrack) {
    searchResult.innerHTML = "";
    searchBestResult.innerHTML = "";


    let image;

    if (bestTrack.track.album == null) {
        image = " ";
    } else {
        image = bestTrack.track.album.image[1]["#text"];
    }

    const tmplateBestresult = `
    <h2>Лучший результат</h2>
    <div class="bestSearchItem">
      <a href="${tracks[0].url}"> 
        <img
            src="${image}"
          class="content__imgSong searchImg"
          alt=""
        />
        <h1 class="bestSearchItemName overflowHIdden">${tracks[0].name}</h1>
        <br />
        <p class="groupName overflowHIdden">${tracks[0].artist}</p>
      </a>
    </div>
    `;


    for (let i = 1; i < tracks.length; i++) {

        const template = `
        <a href="${tracks[i].url}" class="allSearchResultItem">
            <img src="${tracks[i].image}" class="cover" width="50px" alt="" />
            <div class="nameSong">
                <p class="name overflowHIdden">${tracks[i].name}</p>
                <p class="groupName overflowHIdden">${tracks[i].artist}</p>
            </div>
            <p class="time">Слушателей: ${tracks[i].listeners}</p>
        </a>
        `;

        searchResult.insertAdjacentHTML('beforeend', template);
    }

    searchBestResult.insertAdjacentHTML('beforeend', tmplateBestresult);
}