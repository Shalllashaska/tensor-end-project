export default function SearchResult(props) {
    return (
        <a href={props.url} className="allSearchResultItem">
            <img src={props.image} className="cover" width="50px" alt="" />
            <div className="nameSong">
                <p className="name overflowHIdden">{props.name}</p>
                <p className="groupName overflowHIdden">{props.artist}</p>
            </div>
            <p className="time">Слушателей: {props.listeners}</p>
        </a>
    )
}