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

class Tiles {
    constructor (notes, duration, side, isAuto, index, canvasArea) {
        const { setTileColors, setTilePositions, setTileWidths } = this;

        this.canvasArea = canvasArea;
        this.index      = index;

        this.isAuto   = isAuto;
        this.duration = duration;

        this.fellOut   = false;
        this.wasPlayed = false;
        
        if (notes != null) {
            this.notes = notes;
            this.colors= setTileColors(side);
                
            this.widths= setTileWidths();
            this.height= 50 * duration;

            this.x     = setTilePositions();
            this.y     = 0;
        } else {
            this.notes = null;
        }

    }

    setTileColors    = hand => {
        const { notes } = this;
        let colors = [];
        
        notes.forEach(note => {
            const match   = note.match(/\w#/); // e.g: "C#5", "D#3", ...
            const isWhite = !match;
            const isBlack = match;

            if (hand === "left") {
                colors.push((isWhite)? "#3fffe3" : (isBlack)? "#009f87" : null);
            } else if (hand === "right") {
                colors.push((isWhite)? "#E6BB48" : (isBlack)? "#846512" : null);
            }
        });

        return colors;
    }

    setTileWidths    = () => {
        const { notes } = this;
        let widths = [];

        notes.forEach(note => {
            const match   = note.match(/\w#/); // e.g: "C#5", "D#3", ...

            const isWhite = !match;
            const isBlack = match;

            const tileWidth = (isWhite)? 30 : (isBlack)? 25 : null;

            widths.push(tileWidth);
        });

        return widths;
    }

    setTilePositions = () => {
        const { notes } = this;
        let positions = [];

        notes.forEach(note => {
            const match = note.match(/\w#/); // e.g: "C#5", "D#3", ...

            const isWhite = !match;
            const isBlack = match;

            const keyWidth  = (isWhite)? 56.5 : (isBlack)? 25 : null;
            const tileWidth = (isWhite)? 30   : (isBlack)? 25 : null;
            
            const paddingLeft = 40;
            
            const keyOffset = document.querySelector(
                `div[data-note="${note}"]`
            ).offsetLeft;
            
            const center = (keyWidth - tileWidth)/2;

            positions.push(parseInt(paddingLeft + keyOffset + center));
        });

        return positions;
    }

    update = () => {
        const ctx = this.canvasArea.context;
        const { 
            notes, 
            colors,
            widths,
            height,
            y, x 
        } = this;

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur    = 2;
        ctx.shadowColor   = "rgba(0, 0, 0, 0.5)";

        if (notes != null) {
            notes.forEach((note, i) => {
                ctx.fillStyle = colors[i];
                ctx.fillRect(x[i], y, widths[i], height, 6);
            });
        }
    }
}

export default Tiles;