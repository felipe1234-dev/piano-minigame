// based on http://en.wikipedia.org/wiki/Smoothstep
const smoothstep = (start, end, pos) => {
    if (pos <= start) {
        return 0;
    }
    if (pos >= end) {
        return 1;
    }
    let x = (pos - start)/(end - start); // interpolation
    return x*x*(3 - 2*x);
}

class SmoothScrolling {
    scrollTo = (target, 
        args = { 
            parent: null, 
            duration: 0 
        }
    ) => {
        let { parent, duration } = args;

        const 
            parentEl      = document.querySelector(parent),
            targetEl      = document.querySelector(target),
            startX        = parentEl.scrollLeft,
            startY        = parentEl.scrollTop,
            distanceX     = targetEl.offsetLeft - parentEl.scrollLeft,
            distanceY     = targetEl.offsetTop - parentEl.scrollTop,
            startTime     = Date.now(),
            endTime       = startTime + duration,
            hasHorzScroll = parentEl.scrollWidth > parentEl.clientWidth,
            hasVertScroll = parentEl.scrollHeight > parentEl.clientHeight;

        duration = Math.round(duration);

        if (parentEl == null) {
            return Promise.reject("Parent element not found! \n >>" + args.parent);
        }
        if (targetEl == null) {
            return Promise.reject("Target element not found! \n >>" + target);
        }

        if (duration < 0) {
            return Promise.reject("Duration can not be negative.");
        }
        if (duration === 0) {
            parentEl.scrollTop = targetEl.offsetTop;
            parentEl.scrollLeft = targetEl.offsetLeft;
            return;
        }

        const walk = () => {
            let now = Date.now();
            let step = null;
            
            if (hasVertScroll) {
                step = distanceY*smoothstep(startTime, endTime, now);
                let newYPos = Math.round(startY + step);
                parentEl.scrollTop = newYPos;
            }
        
            if (hasHorzScroll) {
                step = distanceX*smoothstep(startTime, endTime, now);
                let newXPos = Math.round(startX + step);
                parentEl.scrollLeft = newXPos;
            }
            
            // Checks if we're done! - Checa se acabamos!
            if (now >= endTime) {
                clearInterval(intervalId);
                return;
            }
            
        };
        
        let intervalId = setInterval(walk, 0);
    }

    scroll = (target, 
        args = { 
            parent: null, 
            duration: 0, 
            yAxis: true, 
            xAxis: false 
        }
    ) => {
        target = Math.round(target);
        let { parent, duration, xAxis, yAxis } = args;

        const 
            parentEl      = document.querySelector(parent),
            startX        = parentEl.scrollLeft,
            startY        = parentEl.scrollTop,
            distanceX     = target - parentEl.scrollLeft,
            distanceY     = target - parentEl.scrollTop,
            startTime     = Date.now(),
            endTime       = startTime + duration,
            hasHorzScroll = parentEl.scrollWidth > parentEl.clientWidth,
            hasVertScroll = parentEl.scrollHeight > parentEl.clientHeight;
        
        duration = Math.round(duration);

        if (parentEl == null) {
            return Promise.reject("Parent element not found! \n >>" + parent);
        }

        if (duration < 0) {
            return Promise.reject("Duration can not be negative.");
        }
        if (duration === 0) {
            if (yAxis) {
                parentEl.scrollTop += target;
            }
            if (xAxis) {
                parentEl.scrollLeft += target;
            }
            return;
        }
        
        const walk = () => {
            let now = Date.now();
            let step = null;
            
            if (hasVertScroll && yAxis) {
                step = distanceY*smoothstep(startTime, endTime, now);
                let newYPos = Math.round(startY + step);
                parentEl.scrollTop = newYPos;
            }
            if (hasHorzScroll && xAxis) {
                step = distanceX*smoothstep(startTime, endTime, now);
                let newXPos = Math.round(startX + step);
                parentEl.scrollLeft = newXPos;
            }
            
            // Checks if we're done! - Checa se acabamos!
            if (now >= endTime) {
                clearInterval(intervalId);
                return;
            }
            
        };
        
        let intervalId = setInterval(walk, 0);
    }
}

const scroller = new SmoothScrolling();

export { scroller };