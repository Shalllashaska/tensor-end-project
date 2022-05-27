import lastfmServices from "../lastfm-services"
import { useState, useEffect } from "react"
import CardHome from "./CardHome";
import SectionContentIndex from "./SectionContentIndex";

export default function Home() {

    const [artists, setArtist] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        lastfmServices.getTopArtists()
            .then((res) => {
                setArtist(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        lastfmServices.getTopTracks()
            .then((res) => {
                setTracks(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        lastfmServices.getTopTags()
            .then((res) => {
                setTags(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    
    return (
        <>
            <header className="header"></header>
            <div className="content">
                <section className="content__section">
                    <h2 className="content__sectionName">ТОП ИСПОЛНИТЕЛЕЙ</h2>
                    <div className="content__musicList topArtistsSection">
                        {artists.map(artist => <CardHome key={artist.url} name={artist.name} url={artist.url} image={artist.image} />)}
                    </div>
                </section>
                <section className="content__section">
                    <h2 className="content__sectionName">ТОП ТРЕКОВ</h2>
                    <div className="content__musicList topSongSection">
                        {tracks.map(track => <CardHome key={track.url} name={track.name} url={track.url} image={track.image} />)}
                    </div>
                </section>
                {tags.map(tag =>
                    <SectionContentIndex key={tag.url}  tagName={tag.name} tagUrl={tag.url}/>
                )}
            </div>
        </>
    )
}