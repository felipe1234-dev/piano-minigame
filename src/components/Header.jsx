import logo from "../media/logo.png";

const Header = props => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Joguinho simples de piano para você se divertir!
        </p>
        <button
            className="App-link"
            onClick={() => props.open()}
        >
            Clique para jogar
        </button>
    </header>
);

export default Header;