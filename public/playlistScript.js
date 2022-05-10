const playList = document.querySelector(".playlistList");
const playListTracks = document.querySelector('.playlistTracks');
const playListTracksName = playListTracks.querySelector('.span__playlistName');

const inputForm = document.querySelector(".form_input");
const inputPlaylist = document.querySelector(".inputPlaylist");

updatePlaylistTabs();

playList.addEventListener('click', (event) => {
    if (event.target.classList.contains('deletePlayelist')) {
        return deletePlaylist(event.target);
    }
});


const deletePlaylist = (elem) => {
    elem.closest('.playlistTab').remove();
    closePlaylist();
}

inputForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = inputPlaylist.value;
    const template = `
    <div class="bestSearchItem playlistTab">
        <div class="playlistImg">
            <img
            src="testSongImg.jpg"
            class="content__imgSong searchImg"
            alt=""
            />
            <button class="deletePlayelist">X</button>
        </div>
        <h1 class="playlistName">${value}</h1>
    </div> 
  `;
    inputPlaylist.value = "";
    playList.insertAdjacentHTML('beforeend', template);

    updatePlaylistTabs();
});

function openPlaylist(elem) {
    let elementTab = elem.target.closest('.playlistTab');
    playListTracksName.textContent = elementTab.querySelector('.playlistName').textContent;
}

function closePlaylist(){
    playListTracksName.textContent = "";
}

function updatePlaylistTabs() {
    Array.from(playList.querySelectorAll('.playlistTab')).forEach(element => {
        element.removeEventListener("click", openPlaylist);
        element.addEventListener("click", openPlaylist);
    });
}