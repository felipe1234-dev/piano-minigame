import A0 from "./flac-files/A0.flac";
import A1 from "./flac-files/A1.flac";
import A3 from "./flac-files/A3.flac";
import A4 from "./flac-files/A4.flac";
import A5 from "./flac-files/A5.flac";
import A6 from "./flac-files/A6.flac";
import A7 from "./flac-files/A7.flac";

import B0 from "./flac-files/B0.flac";
import B1 from "./flac-files/B1.flac";
import B2 from "./flac-files/B2.flac";
import B3 from "./flac-files/B3.flac";
import B4 from "./flac-files/B4.flac";
import B5 from "./flac-files/B5.flac";
import B6 from "./flac-files/B6.flac";
import B7 from "./flac-files/B7.flac";

import C1 from "./flac-files/C1.flac";
import C2 from "./flac-files/C2.flac";
import C3 from "./flac-files/C3.flac";
import C5 from "./flac-files/C5.flac";
import C6 from "./flac-files/C6.flac";
import C7 from "./flac-files/C7.flac";
import C8 from "./flac-files/C8.flac";

import Ds1 from "./flac-files/Ds1.flac";
import Ds2 from "./flac-files/Ds2.flac";
import Ds3 from "./flac-files/Ds3.flac";
import Ds4 from "./flac-files/Ds4.flac";
import Ds5 from "./flac-files/Ds5.flac";
import Ds6 from "./flac-files/Ds6.flac";
import Ds7 from "./flac-files/Ds7.flac";

import Fs1 from "./flac-files/Fs1.flac";
import Fs2 from "./flac-files/Fs2.flac";
import Fs3 from "./flac-files/Fs3.flac";
import Fs4 from "./flac-files/Fs4.flac";
import Fs5 from "./flac-files/Fs5.flac";
import Fs6 from "./flac-files/Fs6.flac";
import Fs7 from "./flac-files/Fs7.flac";

const getNotes = () => ({
    A0, A1, A3, A4, A5, 
    A6, A7,
    
    B0, B1, B2, B3, B4, 
    B5, B6, B7,
    
    C1, C2, C3, C5, C6, 
    C7, C8,

    "D#1": Ds1, "D#2": Ds2, 
    "D#3": Ds3, "D#4": Ds4, 
    "D#5": Ds5, "D#6": Ds6, 
    "D#7": Ds7, 

    "F#1": Fs1, "F#2": Fs2, 
    "F#3": Fs3, "F#4": Fs4, 
    "F#5": Fs5, "F#6": Fs6, 
    "F#7": Fs7
});

export default getNotes;