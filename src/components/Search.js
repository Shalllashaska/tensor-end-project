import SearchHeader from "./SearchHeader";
import lastfmServices from "../lastfm-services"
import { useState, useEffect } from "react";
import BestResult from "./BestResult";
import SearchResult from "./SearchResult";

let canRequest = true;

export default function Search() {

    const [inputValue, setInputValue] = useState('');
    const [tracks, setAllTracks] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        if(canRequest){
            if (inputValue.length > 0) {

                canRequest = false;
                lastfmServices.searchTrack(inputValue)
                    .then((res) => {
                        canRequest = true;
                        setAllTracks(res);
                    })
                    .catch((err) => {
                        canRequest = true;
                        console.error(err);
                    })
            }
        }
    }

    if (tracks.length) {
        return (
            <>
                <SearchHeader handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
                <div className="content">
                    <section className="content__section searchSection">
                        <div className="bestSearchResultDiv">
                            <h2>Лучший результат</h2>
                            <BestResult url={tracks[0].url} name={tracks[0].name} image={tracks[0].image} artist={tracks[0].artist} />
                        </div>
                        <div className="allSearchResultDiv">
                            <h2>Треки</h2>
                            <div className="allSearchResultContent">
                                {
                                    tracks.map((track) =>
                                        <SearchResult key={track.url} name={track.name} artist={track.artist} url={track.url} image={track.image} listeners={track.listeners}/>
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <SearchHeader handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
                <div className="content">
                    <section className="content__section searchSection">
                        <div className="bestSearchResultDiv">
                            <h2>Лучший результат</h2>

                        </div>
                        <div className="allSearchResultDiv">
                            <h2>Треки</h2>

                        </div>
                    </section>
                </div>
            </>
        )
    }

}
