import React from "react";
import songList from "../piano-songs/songList.jsx";
import pianoList from "../piano-notes/pianoList.jsx";
import { 
    Form, 
    Modal, 
    Header,
    Icon,
    Button
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class GameSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            speed: 1,
            helpingHand: "left", 
            song: null,
            piano: null
        };
    }
    
    /* Checks if all form fields have been filled out. - Checa se 
    todos os campos do formulário foram preenchidos. */
    validate = () => (
        (this.state.player !== "") && (this.state.player !== null) 
        && (this.state.song !== "" && this.state.song !== null)
    );
              
    setSong = song => this.setState({ song: song.trim() });

    setSpeed = speed => this.setState({ speed: parseFloat(speed) });

    setHelpingHand = helpingHand => this.setState({ helpingHand: helpingHand });

    setPiano = piano => this.setState({ piano: piano });

    render() {
        const { 
            close,    
            start,
            tr
        } = this.props;
        
        const {
            song, 
            speed, 
            helpingHand,
            piano
        } = this.state;

        const {
            setSong,
            validate,
            setSpeed, 
            setHelpingHand,
            setPiano
        } = this;

        return (
            <Modal 
                basic
                onClose={() => close()}
                size="small"
                open={true} 
            >
                <Header icon>
                    <Icon name="setting" />
                    {tr("Configurações do jogo")}
                </Header>
                <Modal.Content>
                    <Form inverted>
                        {/* Song name and piano model */}
                        <Form.Group widths="equal">
                            {(piano === "")? (
                                <Form.Select
                                    fluid
                                    options={pianoList}
                                    label={tr("Modelo do piano")}
                                    placeholder={tr("Escolha um piano para tocar")}
                                    onChange={(e, { value }) => setPiano(value)}
                                    error={{
                                        content: tr("Por favor, escolha um piano que mais goste"),
                                        pointing: "below",
                                    }}
                                />
                            ) : (
                                <Form.Select
                                    fluid
                                    options={pianoList}
                                    label={tr("Modelo do piano")}
                                    placeholder={tr("Escolha um piano para tocar")}
                                    onChange={(e, { value }) => setPiano(value)}
                                />
                            )}
                            {(song === "")? (
                                <Form.Select
                                    fluid
                                    options={songList}
                                    label={tr("Melodia/Música")}
                                    placeholder={tr("Escolha uma música para tocar")}
                                    onChange={(e, { value }) => setSong(value)}
                                    error={{
                                        content: tr("Por favor, escolha uma música da lista de músicas"),
                                        pointing: "below",
                                    }}
                                />
                            ) : (
                                <Form.Select
                                    fluid
                                    options={songList}
                                    label={tr("Melodia/Música")}
                                    placeholder={tr("Escolha uma música para tocar")}
                                    onChange={(e, { value }) => setSong(value)}
                                />
                            )}
                        </Form.Group>
                        {/* Song speed */}
                        <Form.Group inline>
                            <label>{tr("Velocidade")}</label>
                            <Form.Radio
                                label={tr("Lenta")}
                                value="2"
                                checked={speed === 2}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                            <Form.Radio
                                label="Normal"
                                value="1"
                                checked={speed === 1}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                            <Form.Radio
                                label={tr("Rápida")}
                                value="0.1"
                                checked={speed === 0.1}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                        </Form.Group>
                        {/* Helping hand */ }
                        <Form.Group inline>
                            <label>{tr("Mão ajudante")}</label>
                            <Form.Radio
                                label={tr("Esquerda")}
                                value="left"
                                checked={helpingHand === "left"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                            <Form.Radio
                                label={tr("Direita")}
                                value="right"
                                checked={helpingHand === "right"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                            <Form.Radio
                                label={tr("Ambas")}
                                value="both"
                                checked={helpingHand === "both"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        inverted
                        color="red"
                        onClick={() => close()}
                    >
                        <Icon name="remove" /> {tr("Fechar")}
                    </Button>
                    <Button
                        inverted
                        color={(validate())? "green" : "yellow"}
                        onClick={() => (validate())? ( 
                            start(speed, helpingHand, song, piano) 
                        ) : null}
                    >
                        <Icon name={(validate())? "checkmark" : "lock"} /> 
                        {(validate())? tr("Começar o jogo") : tr("Preencha os campos")}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default GameSettings;