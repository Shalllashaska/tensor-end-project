import lastfmServices from "../lastfm-services"
import { useState, useEffect } from "react"
import CardHome from "./CardHome";

export default function SectionContentIndex(props) {

    const [artists, setArtist] = useState([]);

    useEffect(() => {
        lastfmServices.getTopArtistByTag(props.tagName)
            .then((res) => {
                setArtist(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <section className="content__section">
            <h2 className="content__sectionName"><a className="link" herf={props.tagUrl}>{props.tagName.toUpperCase()}</a></h2>
            <div className="content__musicList topSongSection">
                {artists.map(artist => <CardHome key={artist.url} name={artist.name} url={artist.url} image={artist.image} />)}
            </div>
        </section>
    )
}