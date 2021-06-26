import React from "react";
import logo from "../media/logo.png";
import { Nav, Navbar, Icon, Dropdown } from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";

class Header extends React.Component {
    render() {
        const {
            lang,
            open,
            setLang,
            tr
        } = this.props;

        return (
            <>
                <Navbar style={{ backgroundColor: "transparent" }} >
                    <Navbar.Header>
                        <a href="#" className="navbar-brand logo">
                            PIANO HERO
                        </a>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav style={{ display: "inline-block"  }} pullRight>
                            <Nav.Item 
                                target="_blank"
                                href="https://github.com/felipe1234-dev/piano-minigame" 
                                icon={<Icon icon="github-alt" />}
                            >
                                github
                            </Nav.Item>
                            <Dropdown 
                                icon={<Icon icon="language" />} 
                                title={(lang === "pt")? "Português" : "English"}
                            >
                                <Dropdown.Item onClick={() => setLang("pt")}>
                                    {tr("Português")}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setLang("en")}>
                                    {tr("Inglês")}
                                </Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {tr("Joguinho simples de piano para você se divertir!")}
                    </p>
                    <button
                        className="App-link"
                        onClick={() => open()}
                    >
                        {tr("Clique para jogar")}
                    </button>
                </header>
            </>
        )
    }
}

export default Header;