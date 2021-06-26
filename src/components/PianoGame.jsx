import React from "react";
import * as Tone from "tone";
import { Progress } from "semantic-ui-react";
import PianoKeyboard from "./PianoKeyboard.jsx";
import FallingTiles from "./FallingTiles.jsx";
import GlowEffects from "./GlowEffects.jsx";
import Result from "./Result.jsx";

class PianoGame extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            songSheet  : [ ],
            maxScore   : { left: 0, right: 0 },
            notes      : { left: "", right: "" },
            activeNotes: "", 
            playerScore: 0,
            quadrant   : null,
            showScore  : false,
            showTiles  : false
        };
    }

    endGame  = () => {
        this.setState({ showScore: true });
    }

    playNote = (note, delay = null) => {
        /* 
            This can happen if, for example, user presses some key in their keyboard 
            which doesn't correspond to any note. - Isso pode acontecer se, por exem-
            plo, o usuário pressionar alguma tecla em seu teclado que não corresponda 
            a nenhuma nota.
        */
        if (note == null) return;
        
        delay = (delay !== null)? delay*1000 : 0.5*1000; 

        this.setState({ activeNotes: `${this.state.activeNotes} ${note}` });

        this.piano.triggerAttackRelease(note);

        setTimeout(() => this.setState({ 
            activeNotes: this.state.activeNotes.replace(note, "") 
        }), delay);
    }

    setNotes = (note, side, delay) => {
        let { notes } = this.state;

        notes[side] += `${note}`;
        this.setState({ notes: notes });
        
        setTimeout(() => {
            notes[side] = notes[side].replace(note, "")
            this.setState({ notes: notes })
        }, delay*1000);
    }

    displayTiles = () => {
        setTimeout(() => this.setState({ showTiles: true }), 2000);
    }

    async componentDidMount() {
        const { songName, pianoModel } = this.props;

        const getNotes  = await import(
            `../piano-notes/${pianoModel}/index.jsx`
        ).then(res => res.default);

        const songSheet = await import(
            `../piano-songs/song-sheets/${songName}.jsx`
        ).then(res => res.default);

        let newSongSheet = {
            left : [ ],
            right: [ ] 
        };
        let maxScore = { left: 0, right: 0 };
        let pastTime = 0;

        const incrementMaxScore = (notes, side) => {
            const hasNotes = notes !== "";
            if (hasNotes) {
                const increment = (notes.match(/,\s/g) || ["otherwise, increment by 1"]).length;
                maxScore[side] += increment;
            } 
        }

        Object.keys(songSheet).forEach(side => {
            
            songSheet[side].forEach(item => {
                for (let i = 0; i < item.repeat; i++) {
                    pastTime += item.duration;
                    pastTime += 0.25;

                    item["note(s)"].split(", ").forEach(note => {
                        newSongSheet[side].push({
                            note    : note,
                            delay   : pastTime,
                            duration: item.duration,
                            height  : item.duration * 50,
                            fellOut : false
                        });
                    });

                    incrementMaxScore(item["note(s)"], side);
                }
            });

            pastTime = 0;
        });

        this.setState({ songSheet: newSongSheet, maxScore: maxScore });

        this.piano = new Tone.Sampler(getNotes()).toDestination();
    }

    render() {
        const {
            notes,
            quadrant,
            showTiles,
            songSheet,
            activeNotes,
            playerScore,
            showScore,
            maxScore,
        } = this.state;
        
        const {
            playerName,
            helpingHand, 
            songSpeed
        } = this.props;

        const {
            endGame,
            setNotes,
            setQuadrant,
            displayTiles,
            playNote
        } = this;

        let totalMaxScore = null;

        if (!(songSheet.length <= 0)) {
            totalMaxScore = maxScore["left"] + maxScore["right"];
        }

        const props = {
            progress: {
                style  : {
                    marginBottom: "0px", 
                    display     : "block"
                },
                percent: playerScore/totalMaxScore*100
            },
            fallingTiles: {
                endGame    : endGame,
                setNotes   : setNotes, 
                songSheet  : songSheet,
                helpingHand: helpingHand,
                setQuadrant: setQuadrant,
                songSpeed  : songSpeed,
                playNote   : playNote,
            },
            pianoKeyboard: {
                notes       : notes,
                songSheet   : songSheet,
                helpingHand : helpingHand,
                activeNotes : activeNotes,
                displayTiles: displayTiles,
                quadrant    : quadrant,
                playNote    : playNote
            },
            glowEffects: {
                notes      : notes,
                songSheet  : songSheet,
                activeNotes: activeNotes
            },
            result: {
                playerName: playerName,
                accuracy  : parseInt(playerScore/totalMaxScore*100)
            }
        }

        return (
            (!(songSheet.length <= 0))? (
                <div className="piano-game">
                    <Progress indicating { ...props.progress } />
                    {(showTiles)? ( 
                        <section className="falling-tiles">
                            <FallingTiles { ...props.fallingTiles } />
                        </section>
                    ) : null}
                    <section className="glow-effects">
                        <GlowEffects { ...props.glowEffects } />
                    </section>
                    <section className="piano-keyboard">
                        <PianoKeyboard { ...props.pianoKeyboard } />
                    </section>
                    {(showScore)? <Result { ...props.result } /> : null}
                </div> 
            ) : null
        )
    }
}

export default PianoGame;