import { Link } from "react-router-dom";

export default function Accordion() {
    return (
        <aside className="accordion">
            <Link to="/" className="accordion__logo link">
                <img src="./adidas.png" width="42px" alt="" className="logo" />
                <h1 className="accordoin__title title">Spotiфу</h1>
            </Link>
            <nav className="accordion__navigation">
                <Link to="/" className="accordion__link link">Главная</Link>
                <Link to="/search" className="accordion__link link">Поиск</Link>
            </nav>
        </aside>
    )
}