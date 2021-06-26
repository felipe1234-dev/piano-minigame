import React from "react";
import pianoKeyboard from "../json-objs/pianoKeyboard";
import { ctrlMapping as keyToNote } from "../json-objs/controlMapping"; 
import { scroller } from "../classes/SmoothScrolling.jsx"; 
// Implementing smooth scrolling. - Implementando rolagem suave.

class PianoKeyboard extends React.Component {

    constructor() {
        super();
        this.state = {
            ctrlMapping: 0 // from 0 to 2 - de 0 a 2
        };
        
        this.handleClass = this.handleClass.bind(this); 
        this.noteToKey   = this.noteToKey.bind(this); 
    }
    
    // Key to note converter. - Conversor de tecla para nota. 
    noteToKey(key, set = null) {
        const { ctrlMapping } = this.state;

        set = ctrlMapping;

        return keyToNote.filter((item, index) => (
            index === set
        )).map(item => (Object.keys(item).find(
                keyboardKey => item[keyboardKey] === key
            )
        ));
    }

    handleClass(note) {
        const { notes, activeNotes } = this.props;

        const isActive       = `${activeNotes}`.search(note) > -1;
        const activeClass    = (isActive)? " active" : "";
        
        const isLeft         = `${notes["left"]}`.search(note) > -1;
        const leftHandClass  = (isActive && isLeft)? " left-hand" : "";
        
        const isRight        = `${notes["right"]}`.search(note) > -1;
        const rightHandClass = (isActive && isRight)? " right-hand" : "";

        return `${leftHandClass + rightHandClass + activeClass}`;
    }

    componentDidMount() {
        this.props.displayTiles();

        const { playNote } = this.props;
        const index = this.state.ctrlMapping;

        document.addEventListener("keydown", event => {
            event.preventDefault() || event.stopPropagation();
            
            /* 
                Prevents event from being handled multiple times while key is held down. -
                Impede que o evento seja effetuado várias vezes enquanto a tecla é pressionada.
            */
            if (event.repeat) 
                return;

            playNote(keyToNote[index][event.key]);
        });
    }   

    componentDidUpdate(prevProps) {   
        if (prevProps.quadrant !== this.props.quadrant) {
            if (window.innerWidth <= 1300) {
                const { quadrant } = this.props;
                
                scroller.scrollTo(`.black-keys > div[data-quadrant="${quadrant}"]`, { 
                    parent: ".black-keys", 
                    duration: 600
                });

                scroller.scrollTo(`.white-keys > div[data-quadrant="${quadrant}"]`, { 
                    parent: ".piano-keyboard", 
                    duration: 600
                });

                scroller.scrollTo(`.black-keys-glow > div[data-quadrant="${quadrant}"]`, { 
                    parent: ".black-keys-glow", 
                    duration: 600
                });

                scroller.scrollTo(`.white-keys-glow > div[data-quadrant="${quadrant}"]`, { 
                    parent: ".glow-effects", 
                    duration: 600
                });

                let target = document.querySelector(`.white-keys > div[data-quadrant="${quadrant}"]`);
                target = target.offsetLeft;

                scroller.scroll(target, { 
                    parent: ".canvas-container", 
                    duration: 600,
                    xAxis: true,
                    yAxis: false
                });
            }
        }
    }

    render() {
        const { playNote               } = this.props;
        const { handleClass, noteToKey } = this;
        const { blackKeys  , whiteKeys } = pianoKeyboard;

        return ( 
            <div className="set">
                <div className="black-keys">
                    {blackKeys.map(quad => (
                        <div data-quadrant={quad.num}>
                            {quad["keys"].map(key => (
                                <div 
                                    data-note={key.note}
                                    onClick={() => playNote(key.note)} 
                                    className={`key${handleClass(key.note)}`}
                                >
                                    <span>
                                        {`${noteToKey(key.note)}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="white-keys">
                    {whiteKeys.map(quad => (
                        <div data-quadrant={quad.num}>
                           {quad["keys"].map(key => (
                               <div 
                                    data-note={key.note}
                                    onClick={() => playNote(key.note)} 
                                    className={`key${handleClass(key.note)}`}
                                >
                                    <span>
                                        {`${noteToKey(key.note)}`}
                                    </span>
                                </div>
                           ))}
                        </div> 
                    ))}
                </div>
            </div>
        );
    }
}

export default PianoKeyboard;