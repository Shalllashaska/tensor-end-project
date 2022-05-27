export default function BestResult(props){
    return(
    <>
    <div className="bestSearchItem">
      <a href={props.url}> 
        <img
            src={props.image}
            className="content__imgSong searchImg"
          alt=""
        />
        <h1 className="bestSearchItemName overflowHIdden">{props.name}</h1>
        <br />
        <p className="groupName overflowHIdden">{props.artist}</p>
      </a>
    </div>
    </>
    )
}