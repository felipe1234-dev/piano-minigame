import React from "react";
import songlist from "../piano-songs/songlist.jsx";
import { 
    Form, 
    Modal, 
    Header,
    Icon,
    Button
} from "semantic-ui-react";

class GameSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            speed: 1,
            helpingHand: "none", 
            song: null, 
            player: null
        };
    }
    
    /* Checks if all form fields have been filled out. - Checa se 
    todos os campos do formulário foram preenchidos. */
    validate = () => {
        const { song, player, helpingHand } = this.state;

        return (helpingHand !== "both")?(
            (player !== null && player !== '' && song != null && song !== '')
        ) : (
            (song != null && song !== '')
        );
    }

    setSong = song => this.setState({ song: song.trim() });

    setSpeed = speed => this.setState({ speed: parseFloat(speed) });

    setHelpingHand = helpingHand => this.setState({ helpingHand: helpingHand });

    setPlayer = player => this.setState({ player: player.trim() });

    render() {
        const { 
            close,    
            start
        } = this.props;
        
        const {
            song, 
            speed, 
            helpingHand,
            player
        } = this.state;

        const {
            validate,
            setSong,
            setSpeed, 
            setHelpingHand,
            setPlayer
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
                    Configurações do jogo
                </Header>
                <Modal.Content>
                    <Form inverted>
                        <Form.Group widths="equal">
                            {(helpingHand !== "both")? (
                                (player === '')? (
                                    <Form.Input 
                                        fluid 
                                        label="Nome (Não seu nome real)" 
                                        placeholder="Nome"
                                        onChange={(e, { value }) => setPlayer(value)} 
                                        error={{
                                            content: 'Por favor, insira seu nome',
                                            pointing: 'below'
                                        }}
                                    />
                                ) : (
                                    <Form.Input 
                                        fluid 
                                        label="Nome (Não seu nome real)" 
                                        placeholder="Nome"
                                        onChange={(e, { value }) => setPlayer(value)} 
                                    />
                                )
                            ) : (
                                <Form.Input 
                                    fluid 
                                    label="Nome (Não seu nome real)" 
                                    placeholder="Nome"
                                    disabled
                                    value="" 
                                />
                            )}
                            {(song === '')? (
                                <Form.Select
                                    fluid
                                    options={songlist}
                                    label="Melodia/Música"
                                    placeholder="Escolha uma música para tocar"
                                    onChange={(e, { value }) => setSong(value)}
                                    error={{
                                        content: 'Por favor, escolha uma música da lista de músicas',
                                        pointing: 'below',
                                    }}
                                />
                            ) : (
                                <Form.Select
                                    fluid
                                    options={songlist}
                                    label="Melodia/Música"
                                    placeholder="Escolha uma música para tocar"
                                    onChange={(e, { value }) => setSong(value)}
                                />
                            )}
                        </Form.Group>

                        <Form.Group inline>
                            <label>Velocidade</label>
                            <Form.Radio
                                label="Lenta"
                                value="1.2"
                                checked={speed === 1.2}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                            <Form.Radio
                                label="Normal"
                                value="1"
                                checked={speed === 1}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                            <Form.Radio
                                label="Rápida"
                                value="0.8"
                                checked={speed === 0.8}
                                onChange={(e, { value }) => setSpeed(value)}
                            />
                        </Form.Group>
                        
                        <Form.Group inline>
                            <label>Mão ajudante</label>
                            <Form.Radio
                                label="Esquerda"
                                value="left"
                                checked={helpingHand === "left"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                            <Form.Radio
                                label="Direita"
                                value="right"
                                checked={helpingHand === "right"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                            <Form.Radio
                                label="Nenhuma"
                                value="none"
                                checked={helpingHand === "none"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                            <Form.Radio
                                label="Ambas"
                                value="both"
                                checked={helpingHand === "both"}
                                onChange={(e, { value }) => setHelpingHand(value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        basic 
                        inverted
                        color="red"  
                        onClick={() => close()}
                    >
                        <Icon name="remove" /> Fechar
                    </Button>
                    <Button 
                        color={(validate())? "green" : "yellow"} 
                        inverted 
                        onClick={() => (validate())? ( 
                            start(speed, helpingHand, song, player) 
                        ) : null}
                    >
                        <Icon name={(validate())? "checkmark" : "lock"} /> 
                        {(validate())? 'Começar o jogo' : 'Preencha os campos'}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default GameSettings;