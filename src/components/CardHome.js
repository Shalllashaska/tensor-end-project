export default function CardHome(props) {
    return (
        <a href={props.url} className="content__item buttonPlayeSong">
            <div className="content__buttonWrapper">
                <img src={props.image} alt="" className="content__imgSong" />
                    <p className="content__nameSong">{props.name}</p>
            </div>
        </a>
    )
}