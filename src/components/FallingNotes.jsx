import React from "react";
import makeResponsive from "./makeResponsive.jsx";
import Notes from "./Notes.jsx";

class FallingNotes extends React.Component {
    constructor(props) {
        super(props);

        this.updateCanvasArea = this.updateCanvasArea.bind(this); 
        const component = this; 

        this.canvasArea = {
            canvas: React.createRef(),
            start : function() {
                this.context = this.canvas.current.getContext("2d");
                this.frameNum = 0; // The current frame number. - O número do frame atual.
                this.noteNum = 0; // The current note index. - O índice da nota atual. 
                this.notes = []; // Will contain all the falling notes. - Irá conter todos as notas em queda.
                /* Each one is a block and will fall at the exact same time the note shold be pressed 
                to produce the song. - Cada uma é um bloco e vai cair exatamente no mesmo tempo em que a nota 
                deve ser pressionada para produzir a música. */
                this.canvas.current.width = window.innerWidth;
                this.canvas.current.height = window.innerHeight;
                this.interval = setInterval(component.updateCanvasArea, 20);
            },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
            },
            stop  : function() {
                clearInterval(this.interval);
            }    
        }
    }

    completelyFellOut = obj => {
        const { canvasArea } = this;

        return (obj.left.y > canvasArea.canvas.current.height);
    }

    partiallyFellOut = obj => {
        const { canvasArea } = this;
        
        return (obj.left.y > (canvasArea.canvas.current.height - obj.left.height));
    }

    handleAutoNotes = obj => {
        const {
            play,
            currNotes,
            helpingHand 
        } = this.props;

        if (helpingHand !== "none") {                 
            if (helpingHand === "left") {
                if (currNotes.left === obj.left.note) {
                    play(obj.left.note, false);
                }
            }
            
            if (helpingHand === "right") {
                if (currNotes.right === obj.right.note) {
                    play(obj.right.note, false);
                }
            }

            if (helpingHand === "both") {
                play(obj.left.note, false);
                play(obj.right.note, false); 
            }
        }
    }

    updateCanvasArea() {
        // Musical score = Partitura musical
        const { 
            musicalScore, 
            setCurrNotes
        } = this.props;

        const { 
            canvasArea,
            completelyFellOut,
            partiallyFellOut,
            handleAutoNotes
        } = this;

        const screen = makeResponsive();
        canvasArea.canvas.current.width = screen.canvasArea.width;
        canvasArea.canvas.current.height = screen.canvasArea.height;

        canvasArea.clear();
        canvasArea.frameNum += 1;

        let currIndex = canvasArea.noteNum;
        let notes = canvasArea.notes;

        if (currIndex < musicalScore.length) {
            let noteFrame = musicalScore[currIndex].frameNum;
            let currFrame = canvasArea.frameNum;
            let props = {
                notes: {
                    "left hand": musicalScore[currIndex]["note"]["left hand"], 
                    "right hand": musicalScore[currIndex]["note"]["right hand"]
                }
            };
            let interval = musicalScore[currIndex]["interval"];

            if (noteFrame === currFrame) {
                notes.push(new Notes(props.notes, interval, canvasArea.noteNum, canvasArea));
                canvasArea.noteNum += 1;
            }
        }

        for (let i = 0; i < notes.length; i++) {
            if (!notes[i].fellOut) {
                notes[i].left.y += 1.2;
                notes[i].right.y += 1.2;
                notes[i].update();
            }
        }

        for (let i = 0; i < notes.length; i++) {
            if (!notes[i].fellOut) {
                if (completelyFellOut(notes[i])) {
                    notes[i].fellOut = true;
                }

                if (partiallyFellOut(notes[i]) && !notes[i].played) {
                    notes[i].played = true;
                    
                    setCurrNotes(notes[i].index, notes[i].interval); // Index. - índice
                    handleAutoNotes(notes[i]);               
                    
                    break;
                }
            }
        }

    }

    componentDidMount() {
        const { canvasArea } = this;
        canvasArea.start();
    }

    render() {
        return <canvas ref={this.canvasArea.canvas} />
    }
}

export default FallingNotes;