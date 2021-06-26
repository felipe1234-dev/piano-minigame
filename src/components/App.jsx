import React from "react";
import Header from "./Header.jsx";
import PianoGame from "./PianoGame.jsx";
import GameSettings from "./GameSettings.jsx";
import en from "../en/index.jsx";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false, // Ready to play. - Pronto(a) para jogar.
            showModal: false,
            songSpeed: 1,
            helpingHand: "left",
            songName: null,
            pianoModel: null,
            lang: "pt"
        };
    }

    startGame = (speed, helpingHand, song, piano) => {
        this.setState({
            ready: true,
            showModal: false, 
            songSpeed: parseFloat(speed),
            helpingHand: helpingHand,
            songName: song,
            pianoModel: piano
        });
    }

    translate = text => ((this.state.lang === "en")? en[text] : text);

    // Switch app language. - Trocar o idioma do app.    
    setLang = lang => {
        window.location.href = `${(window.location.href).replace(/\?lang=\w{2}/g, "")}?lang=${lang}`; 
    }

    // Close game settings. - Fechar as configurações do jogo.
    closeModal = () => this.setState({ showModal: false });

    // Open game settings. - Abrir as configurações do jogo.
    openModal = () => this.setState({ showModal: true });

    componentDidMount() {
        let url = window.location.href;
        let lang = url.match(/pt|en/);

        lang = (lang == null)? "pt" : lang[0];

        this.setState({ lang: lang });
    }

    render() {
        const { 
            closeModal, 
            openModal, 
            startGame,
            translate,
            setLang
        } = this;

        const {
            lang, 
            showModal, 
            ready, 
            songSpeed, 
            helpingHand,
            songName,
            pianoModel
        } = this.state;

        const props = {
            header: {
                open: openModal,
                setLang: setLang,
                tr: translate,
                lang: lang
            },
            gameSettings: {
                close: closeModal,
                start: startGame,
                tr: translate
            },
            pianoGame: { 
                songName: songName,
                songSpeed: songSpeed,
                helpingHand: helpingHand,
                pianoModel: pianoModel,
                setLang: setLang,
                tr: translate
            }
        }

        return (
            <div className="App">
                {(ready)? <PianoGame { ...props.pianoGame } /> : (
                    (showModal)? (
                        <>
                            <Header { ...props.header } /> 
                            <GameSettings { ...props.gameSettings } /> 
                        </>
                    ) : <Header { ...props.header } /> 
                )}
            </div>
        )
    }
}
    
export default App;