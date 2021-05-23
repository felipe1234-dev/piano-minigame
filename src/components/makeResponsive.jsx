function makeResponsive() {
    const screenW = window.innerWidth;
    let cW = 0;
    let cH = 0;

    let fnIncr = 0;
    let fnMrgLeft = 0;
    let bKW = 0;
    let wKW = 0;

    if (screenW >= 1200) {
        cW = 790;
        cH = 430;

        fnIncr = 35.6;
        fnMrgLeft = 4;
        wKW = 35;
    }
    if (screenW >= 992 && screenW < 1200) {
        cW = 790;
        cH = 420;

        fnIncr = 35.6;
        fnMrgLeft = 0;
        wKW = 35;
    }
    if (screenW >= 768 && screenW < 992) {
        cW = 790;
        cH = 420;

        fnIncr = 35.6;
        fnMrgLeft = 4;
        wKW = 35;
    }
    if (screenW >= 600 && screenW < 768) {
        cW = 790;
        cH = 420;

        fnIncr = 35.6;
        fnMrgLeft = 4;
        wKW = 35;
    }
    if (screenW < 600) {
        cW = 600;
        cH = 420;

        fnIncr = 21;
        fnMrgLeft = 0;
        wKW = 18;
    }
    return {
        canvasArea: {
            width: cW,
            height: cH
        },
        fallingNotes: {
            incr: fnIncr,
            mrgLeft: fnMrgLeft,
            key: {
                white: {
                    width: wKW
                },
                black: {
                    width: bKW
                }
            }
        }
    }
}

export default makeResponsive;