import C2 from "./flac-files/C2.flac";
import C3 from "./flac-files/C3.flac";
import C4 from "./flac-files/C4.flac";
import C5 from "./flac-files/C5.flac";
import C6 from "./flac-files/C6.flac";
import C7 from "./flac-files/C7.flac";

import Fs1 from "./flac-files/Fs1.flac";
import Fs2 from "./flac-files/Fs2.flac";
import Fs3 from "./flac-files/Fs3.flac";
import Fs4 from "./flac-files/Fs4.flac";
import Fs5 from "./flac-files/Fs5.flac";
import Fs6 from "./flac-files/Fs6.flac";

const getNotes = () => ({
    C2, C3, C4, C5, C6, 
    C7, 

    "F#1": Fs1, "F#2": Fs2, 
    "F#3": Fs3, "F#4": Fs4, 
    "F#5": Fs5, "F#6": Fs6
});

export default getNotes;