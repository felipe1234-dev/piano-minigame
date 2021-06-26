import React from "react";
import { Animate } from "react-simple-animate";

class FallingTiles extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            songSheet    : [],
            sequenceIndex: { left: 0, right: 0 },
            fallDuration : 10*this.props.songSpeed
        };

        this.handleClass = this.handleClass.bind(this);
    }

    handleClass(note) {
        return ( /#/.test(note) )? "black-key" : "white-key";;
    }

    onFallCallBack = (note, side, duration) => {
        const { helpingHand, playNote, setNotes } = this.props;

        setNotes(note, side, duration);

        if ((helpingHand === side) || (helpingHand === "both")) {
            playNote(note, duration);
        }
    }

    onCompleteCallBack = (side, note, i = null) => {
        let { sequenceIndex, songSheet } = this.state;

        i = songSheet[side].findIndex(item => (
            (!item.fellOut) && (item.note === note)
        ));
        songSheet[side][i].fellOut = true;

        sequenceIndex[side]++;

        this.setState({ 
            sequenceIndex: sequenceIndex, 
            songSheet    : songSheet 
        });
    }
   
    componentDidMount() {
        const { songSheet } = this.props;
        this.setState({ songSheet: songSheet });

        const { onFallCallBack } = this;
        const { fallDuration   } = this.state;

        Object.keys(songSheet).forEach(side => {
            
            songSheet[side].forEach(item => {
                setTimeout(
                    () => onFallCallBack(item.note, side, item.duration), 
                    item.delay*1000 + fallDuration*1000
                );
            });

        });
    }

    componentDidUpdate(prevProps, prevState) {
        const currState = JSON.stringify(this.state.sequenceIndex);
        prevState       = JSON.stringify(prevState.sequenceIndex);
        
        if (currState !== prevState) {
            const { songSheet, endGame } = this.props;

            const totalTiles  = songSheet["left"].length + songSheet["right"].length;
            const fallenTiles = currState["left"]        + currState["right"];
            const gameEnded   = fallenTiles >= totalTiles;
            
            if (gameEnded) endGame();
        }
    }

    getWidth      = note => {
        const match   = note.match(/\w#/); // e.g: "C#5", "D#3", ...

        const isWhite = !match;
        const isBlack = match;

        const tileWidth = (isWhite)? 30 : (isBlack)? 25 : null;

        return tileWidth;
    }

    getOffsetLeft = note => {
        const match = note.match(/\w#/); // e.g: "C#5", "D#3", ...

        const isWhite = !match;
        const isBlack = match;

        const keyWidth  = (isWhite)? 56.5 : (isBlack)? 25 : null;
        const tileWidth = (isWhite)? 30   : (isBlack)? 25 : null;
        
        // Set's paddingLeft. - O paddingLeft do Set.
        const paddingLeft = 40;
            
        const keyOffset = document.querySelector(`.key[data-note="${note}"]`).offsetLeft;
            
        const center = (keyWidth - tileWidth)/2;

        return parseInt(paddingLeft + keyOffset + center);
    }

    render() {
        const {
            getWidth,
            handleClass,
            onCompleteCallBack, 
            getOffsetLeft,
        } = this;
        
        const {
            fallDuration, 
            songSheet 
        } = this.state;

        return (

            Object.keys(songSheet).map(side => (
                songSheet[side].map(item => (
                    (!item.fellOut)? (
                        <Animate
                            play={true}
                            duration={fallDuration}
                            delay={item.delay}
                            start={{ transform: "translateY(0px)", opacity: "0" }}
                            end={{ transform: `translateY(400px)`, opacity: "1" }}
                            onComplete={() => onCompleteCallBack(side, item.note)}
                        >
                            <div
                                className={`tile ${side} ${handleClass(item.note)}`} 
                                data-note={item.note}
                                style={{
                                    height    : `${      item.height       }px`, 
                                    width     : `${   getWidth(item.note)  }px`,
                                    left      : `${getOffsetLeft(item.note)}px`,
                                    paddingTop: `${ item.height - 14 - 10  }px` 
                                    // 14px: font-size 
                                    // 10px: padding-bottom 
                                }}
                            >
                               {item.note}
                            </div>
                        </Animate>
                    ) : null
                ))
            ))

        );
    }
}

export default FallingTiles;