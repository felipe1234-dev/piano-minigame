import React from "react";
import Header from "./Header.jsx";
import PianoGame from "./PianoGame.jsx";
import GameSettings from "./GameSettings.jsx";
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false, // Ready to play. - Pronto(a) para jogar.
            showModal: false,
            songSpeed: 1,
            helpingHand: "none",
            songName: null,
            playerName: null
        };
    }

    startGame = (speed, helpingHand, song, player) => {
        this.setState({
            ready: true,
            showModal: false, 
            songSpeed: parseFloat(speed),
            helpingHand: helpingHand,
            songName: song,
            playerName: player
        });
    }

    // Close game settings. - Fechar as configurações do jogo.
    closeModal = () => this.setState({ showModal: false });

    // Open game settings. - Abrir as configurações do jogo.
    openModal = () => this.setState({ showModal: true });

    render() {
        const { 
            closeModal, 
            openModal, 
            startGame
        } = this;

        const { 
            showModal, 
            ready, 
            songSpeed, 
            helpingHand,
            songName,
            playerName
        } = this.state;

        const props = {
            header: {
                open: openModal
            },
            gameSettings: {
                close: closeModal,
                start: startGame
            },
            pianoGame: { 
                song: songName,
                speed: songSpeed,
                helpingHand: helpingHand,
                player: playerName
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