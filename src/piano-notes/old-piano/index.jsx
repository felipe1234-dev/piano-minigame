import A0 from "./flac-files/A0.flac";
import A1 from "./flac-files/A1.flac";
import A2 from "./flac-files/A2.flac";
import A3 from "./flac-files/A3.flac";
import A4 from "./flac-files/A4.flac";
import A5 from "./flac-files/A5.flac";
import A6 from "./flac-files/A6.flac";
import A7 from "./flac-files/A7.flac";

import As0 from "./flac-files/As0.flac";
import As2 from "./flac-files/As2.flac";
import As3 from "./flac-files/As3.flac";
import As5 from "./flac-files/As5.flac";
import As6 from "./flac-files/As6.flac";
import As7 from "./flac-files/As7.flac";

import B0 from "./flac-files/B0.flac";
import B2 from "./flac-files/B2.flac";
import B3 from "./flac-files/B3.flac";
import B4 from "./flac-files/B4.flac";
import B5 from "./flac-files/B5.flac";
import B6 from "./flac-files/B6.flac";
import B7 from "./flac-files/B7.flac";

import C1 from "./flac-files/C1.flac";
import C2 from "./flac-files/C2.flac";
import C3 from "./flac-files/C3.flac";
import C4 from "./flac-files/C4.flac";
import C5 from "./flac-files/C5.flac";
import C6 from "./flac-files/C6.flac";
import C7 from "./flac-files/C7.flac";

import Cs2 from "./flac-files/Cs2.flac";
import Cs3 from "./flac-files/Cs3.flac";
import Cs4 from "./flac-files/Cs4.flac";
import Cs5 from "./flac-files/Cs5.flac";
import Cs6 from "./flac-files/Cs6.flac";
import Cs7 from "./flac-files/Cs7.flac";

import D2 from "./flac-files/D2.flac";
import D3 from "./flac-files/D3.flac";
import D4 from "./flac-files/D4.flac";
import D5 from "./flac-files/D5.flac";
import D6 from "./flac-files/D6.flac";
import D7 from "./flac-files/D7.flac";

import Ds1 from "./flac-files/Ds1.flac";
import Ds2 from "./flac-files/Ds2.flac";
import Ds4 from "./flac-files/Ds4.flac";
import Ds5 from "./flac-files/Ds5.flac";
import Ds6 from "./flac-files/Ds6.flac";
import Ds7 from "./flac-files/Ds7.flac";

import E1 from "./flac-files/E1.flac";
import E2 from "./flac-files/E2.flac";
import E3 from "./flac-files/E3.flac";
import E4 from "./flac-files/E4.flac";
import E5 from "./flac-files/E5.flac";
import E6 from "./flac-files/E6.flac";

import F1 from "./flac-files/F1.flac";
import F2 from "./flac-files/F2.flac";
import F3 from "./flac-files/F3.flac";
import F4 from "./flac-files/F4.flac";
import F5 from "./flac-files/F5.flac";
import F6 from "./flac-files/F6.flac";
import F7 from "./flac-files/F7.flac";

import Fs1 from "./flac-files/Fs1.flac";
import Fs3 from "./flac-files/Fs3.flac";
import Fs5 from "./flac-files/Fs5.flac";
import Fs6 from "./flac-files/Fs6.flac";
import Fs7 from "./flac-files/Fs7.flac";

import G1 from "./flac-files/G1.flac";
import G3 from "./flac-files/G3.flac";
import G4 from "./flac-files/G4.flac";
import G5 from "./flac-files/G5.flac";
import G6 from "./flac-files/G6.flac";
import G7 from "./flac-files/G7.flac";

import Gs0 from "./flac-files/Gs0.flac";
import Gs1 from "./flac-files/Gs1.flac";
import Gs2 from "./flac-files/Gs2.flac";
import Gs3 from "./flac-files/Gs3.flac";
import Gs5 from "./flac-files/Gs5.flac";
import Gs6 from "./flac-files/Gs6.flac";
import Gs7 from "./flac-files/Gs7.flac";

const getNotes = () => ({
    A0, A1, A2, A3, A4, 
    A5, A6, A7,
    
    "A#0": As0, "A#2": As2, 
    "A#3": As3, "A#5": As5,
    "A#6": As6, "A#7": As7,
    
    B0, B2, B3, B4, B5, 
    B6, B7,
    
    C1, C2, C3, C4, C5, 
    C6, C7, 

    "C#2": Cs2, "C#3": Cs3, 
    "C#4": Cs4, "C#5": Cs5, 
    "C#6": Cs6, "C#7": Cs7,

    D2, D3, D4, D5, D6, 
    D7,

    "D#1": Ds1, "D#2": Ds2, 
    "D#4": Ds4, "D#5": Ds5, 
    "D#6": Ds6, "D#7": Ds7, 

    E1, E2, E3, E4, E5, 
    E6,

    F1, F2, F3, F4, F5,
    F6, F7,

    "F#1": Fs1, "F#3": Fs3, 
    "F#5": Fs5, "F#6": Fs6, 
    "F#7": Fs7,

    G1, G3, G4, G5, G6, 
    G7,

    "G#0": Gs0, "G#1": Gs1, "G#2": Gs2, 
    "G#3": Gs3, "G#5": Gs5, "G#6": Gs6, 
    "G#7": Gs7
});

export default getNotes;