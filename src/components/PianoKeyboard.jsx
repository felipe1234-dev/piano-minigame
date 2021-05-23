import React from "react";
import pianoKeyboard from "../json-objs/pianoKeyboard";
import { ctrlMapping as key2Note } from "../json-objs/controlMapping"; 
// Key to note converter. - Conversor de tecla para nota. 

class PianoKeyboard extends React.Component {
    constructor() {
        super();
        this.state = {
            pianoKeys: pianoKeyboard,
            ctrlMapping: 0 // 0 to 2 - 0 a 2
        };
        this.handleClass = this.handleClass.bind(this); 
    }

    note2Key = key => {
        const { ctrlMapping } = this.state;
        
        return `${key2Note.filter((item, index) => (
            index === ctrlMapping
        )).map(item => (Object.keys(item).find(
                keyboardKey => item[keyboardKey] === key
            )
        ))}`;
    }

    handleClass(note) {
        const { activeKeys, currNotes } = this.props;
        
        // Checks wheter key has been pressed. - Checa se a tecla foi pressionada.
        let isActive = (`${activeKeys}`.search(note) > -1)? " Active" : "";
        
        /* Checks if the left hand key to be pressed is among the active keys. 
        - Checa se a tecla da mão esquerda a ser pressionada está entre as 
        teclas ativas. */
        let currLeftKey = (`${activeKeys}`.search(currNotes.left) > -1)? (
            (note === currNotes.left)? " Left-hand" : ""
        ) : "";
        
        /* Checks if the right hand key to be pressed is among the active keys. 
        - Checa se a tecla da mão direitaa a ser pressionada está entre as 
        teclas ativas. */
        let currRightKey = (`${activeKeys}`.search(currNotes.right) > -1)? (
            (note === currNotes.right)? " Right-hand" : ""
        ) : "";
        
        note = note.replace(/(\w)(#)*\d/g, m => ((m[1] !== "#")? m[0] : m[0] + "s")).toLowerCase();

        return note + currLeftKey + currRightKey + isActive;
    }

    componentDidMount() {
        const { play } = this.props;
        const index = this.state.ctrlMapping;

        document.addEventListener("keydown", event => {
            event.preventDefault() || event.stopPropagation();
            
            /* Prevents event from being handled multiple times while key is held down. -
            Impede que o evento seja effetuado várias vezes enquanto a tecla é pressionada.*/
            if (event.repeat) 
                return;

            play(key2Note[index][event.key]);
        });
    }

    render() {
        const { play } = this.props;
        const { pianoKeys } = this.state;
        const { handleClass, note2Key } = this;

        return (
            <section className="Set">
                <ul className="Black-keys">
                    {pianoKeys.filter(key => (key.color === 'black')).map(key => (   
                        <li 
                            data-note={key.note}
                            onClick={() => play(key.note)} 
                            className={handleClass(key.note)}
                        >
                            <span>
                                {`${note2Key(key.note)}`}
                            </span>
                        </li>
                    ))}
                </ul>
                <ul className="White-keys">
                    {pianoKeys.filter(key => (key.color === 'white')).map(key => (
                        <li 
                            data-note={key.note}
                            onClick={() => play(key.note)} 
                            className={handleClass(key.note)}
                        >
                            <span>
                                {`${note2Key(key.note)}`}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default PianoKeyboard;