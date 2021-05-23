import makeResponsive from "./makeResponsive.jsx";

CanvasRenderingContext2D.prototype.fillRect = function (x, y, width, height, radius = 0) {
    if (width < (2*radius)) 
        radius = width/2;
    
    if (height < (2*radius)) 
        radius = height/2;
    
    let h = height;
    let w = width;
    let r = radius;
    
    this.beginPath();
    this.moveTo(x + r, y);
    
    this.arcTo(x + w, y    , x + w, y + h, r); 
    this.arcTo(x + w, y + h, x    , y + h, r); 
    this.arcTo(x    , y + h, x    , y    , r);
    this.arcTo(x    , y    , x + w, y    , r);

    this.closePath();
    this.fill();
}

function note2Pos(note) {
    const screen = makeResponsive();

    const incr = screen.fallingNotes.incr;
    const mrgLeft = screen.fallingNotes.mrgLeft; 

    switch(note) {
        case 'C3':
            return (mrgLeft + 0*incr);
        case 'D3':
            return (mrgLeft + 1*incr);
        case 'E3':
            return (mrgLeft + 2*incr);
        case 'F3':
            return (mrgLeft + 3*incr);
        case 'G3':
            return (mrgLeft + 4*incr);
        case 'A3':
            return (mrgLeft + 5*incr);
        case 'B3':
            return (mrgLeft + 6*incr);

        case 'C4':
            return (mrgLeft + 7*incr);
        case 'D4':
            return (mrgLeft + 8*incr);
        case 'E4':
            return (mrgLeft + 9*incr);
        case 'F4':
            return (mrgLeft + 10*incr);
        case 'G4':
            return (mrgLeft + 11*incr);
        case 'A4':
            return (mrgLeft + 12*incr);
        case 'B4':
            return (mrgLeft + 13*incr);
        
        case 'C5':
            return (mrgLeft + 14*incr);
        case 'D5':
            return (mrgLeft + 15*incr);
        case 'E5':
            return (mrgLeft + 16*incr);
        case 'F5':
            return (mrgLeft + 17*incr);
        case 'G5':
            return (mrgLeft + 18*incr);
        case 'A5':
            return (mrgLeft + 19*incr);
        case 'B5':
            return (mrgLeft + 20*incr);

        case 'C6':
            return (mrgLeft + 21*incr);

        default:
            return mrgLeft;
    }
}

function Notes(notes, interval, index, canvasArea) {
    
    let noteL = notes["left hand"];
    let noteR = notes["right hand"];

    this.index = index;
    this.fellOut = false;
    this.played = false;
    this.interval = interval;

    const screen = makeResponsive();
    this.left = {
        note: noteL,
        width: screen.fallingNotes.key.white.width,
        height: 50*interval,
        x: note2Pos(noteL),
        y: 0
    }
    
    this.right = {
        note: noteR,
        width: screen.fallingNotes.key.white.width,
        height: 50*interval,
        x: note2Pos(noteR),
        y: 0
    }

    this.update = () => {
        const ctx = canvasArea.context;

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

        if (noteL != null) {
            ctx.fillStyle = "rgb(63, 270, 227)";
            ctx.fillRect(this.left.x, this.left.y, this.left.width, this.left.height, 6);
        }

        if (noteR != null) {
            ctx.fillStyle = "rgb(166, 234, 114)";
            ctx.fillRect(this.right.x, this.right.y, this.right.width, this.right.height, 6);
        }
    }
}

export default Notes;