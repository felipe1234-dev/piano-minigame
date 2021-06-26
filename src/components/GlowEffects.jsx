import React from "react";
import pianoKeyboard from "../json-objs/pianoKeyboard";

class GlowEffects extends React.Component {
    
    constructor() {
        super();
        this.handleClass = this.handleClass.bind(this);
    }

    handleClass(note) {
        const { notes, activeNotes } = this.props;

        const isActive    = `${activeNotes}`.search(note) > -1;
        const activeClass = (isActive)? " active" : "";
        
        const isLeft        = `${notes["left"]}`.search(note) > -1;
        const leftHandClass = (isActive && isLeft)? " left-hand" : "";
        
        const isRight        = `${notes["right"]}`.search(note) > -1;
        const rightHandClass = (isActive && isRight)? " right-hand" : "";

        return `${leftHandClass + rightHandClass + activeClass}`;
    }

    render() {
        const { handleClass            } = this;
        const { blackKeys  , whiteKeys } = pianoKeyboard;

        return (
            <>
                <div className="black-keys-glow">
                    {blackKeys.map(quad => (
                        <div data-quadrant={quad.num}>
                            {quad["keys"].map(key => (
                                <span 
                                    data-note={key.note} 
                                    className={`glow${handleClass(key.note)}`}
                                >
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="white-keys-glow">
                    {whiteKeys.map(quad => (
                        <div data-quadrant={quad.num}>
                            {quad["keys"].map(key => (
                                <span 
                                    data-note={key.note} 
                                    className={`glow${handleClass(key.note)}`}
                                >
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default GlowEffects;