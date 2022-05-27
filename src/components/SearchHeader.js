export default function SearchHeader(props) {
    return (
        <header className="header">
            <form action="" onSubmit={props.handleSubmit} className="form_input">
                <input
                    value={props.inputValue}
                    onChange={e => props.setInputValue(e.target.value)}
                    type="text"
                    className="header__search"
                    placeholder="Исполнитель, трек или подкаст"
                    required
                />
            </form>
        </header>
    )
}

