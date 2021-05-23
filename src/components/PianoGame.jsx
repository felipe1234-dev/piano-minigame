import React from "react";
import * as Tone from "tone";
import { 
    A3, A4, A5,
    B3, B4, B5,
    C3, C4, C5
} from "../piano-notes";
import { Progress } from "semantic-ui-react";
import PianoKeyboard from "./PianoKeyboard.jsx";
import FallingNotes from "./FallingNotes.jsx";

class PianoGame extends React.Component {
    constructor() {
        super();
        this.state = {
            musicalScore: [],
            currNotes: {}, /* Keys to be pressed, according to current position/index 
            in the musical score. - Teclas a serem pressionadas, de acordo com a posição/
            o índice atual na partitura musical. */
            activeKeys: null, /* Teclas which were pressed by the user. - 
            Teclas que foram pressionadas pelo usuário. */
            points: 0
        };
        this.piano = new Tone.Sampler({
            A3, A4, A5,
            B3, B4, B5,
            C3, C4, C5
        }).toDestination();
    }

    handlePoints = (isAuto, note) => {
        const { currNotes } = this.state;
        
        if (isAuto || (`${currNotes.left} ${currNotes.right}`.search(note) > -1)) 
            this.setState({ points: this.state.points + 1 });
    }
    
    play = (note, isPlayer = true) => {
        if (note == null) 
            return;

        const { currNotes } = this.state;
        const { handlePoints, piano } = this;

        this.setState({
            activeKeys: this.state.activeKeys + " " + note
        });
        
        piano.triggerAttackRelease(note);
        handlePoints(!isPlayer, note);

        let interval = null;
        interval = currNotes.interval;

        setTimeout(() => {
            this.setState({
                activeKeys: this.state.activeKeys.replace(note, '')
            });
        }, (interval == null)? 500 : interval*1000);
    } 

    /* Sets the current notes at the current position/index in the musicalScore object. - 
    Define as notas atuais na posição/no índice atual no objeto musicalScore. */
    setCurrNotes = (index, interval) => {
        const { musicalScore } = this.state;
        this.setState({
            currNotes: {
                left: musicalScore[index]["note"]["left hand"],
                right: musicalScore[index]["note"]["right hand"],
                interval: interval
            }
        });
    }

    async componentDidMount() {
        const { song, speed } = this.props;

        const musicalScore = await import(
            `../piano-songs/song-sheets/${song}.jsx`
        ).then(res => res.default);
        
        let i = 0;
        let musicalScoreFormatted = [];
        let pastTime = 0;
        
        do {
            for (let j = 0; j < musicalScore[i].repeat; j++) {
                musicalScoreFormatted.push(
                    {
                        note: {
                            "left hand" : musicalScore[i].left,
                            "right hand": musicalScore[i].right
                        },
                        // frameNum: The frame number at which this specific tile must appear.
                        // frameNum: O número do frame no qual esta "telha" deve aparecer.
                        frameNum: Math.round((musicalScore[i].interval + pastTime)*50*speed),
                        // 50: Amount of frames per second. - 50: Quantidade de frames por segundo.
                        interval: musicalScore[i].interval
                    }
                );
                
                pastTime += musicalScore[i].interval;
            }
            i++;
        } while (i < musicalScore.length);

        this.setState({ musicalScore: musicalScoreFormatted });
    }

    render() {
        const { 
            musicalScore, 
            currNotes, 
            activeKeys,
            points
        } = this.state;

        const { helpingHand } = this.props;

        const { setCurrNotes, play } = this;

        const props = {
            fallingNotes: {
                currNotes: currNotes,
                musicalScore: musicalScore,
                helpingHand: helpingHand,
                setCurrNotes: setCurrNotes,
                play: play
            },
            pianoKeyboard: {
                currNotes: currNotes,
                helpingHand: helpingHand,
                activeKeys: activeKeys,
                play: play
            }
        };

        return (
            <section className="PianoGame">
                <Progress 
                    style={{ marginBottom: "0px" }} 
                    percent={points/(musicalScore.length*2)*100} 
                    indicating 
                />
                <FallingNotes { ...props.fallingNotes } />
                <PianoKeyboard { ...props.pianoKeyboard } />
            </section> 
        );
    }
}

export default PianoGame;