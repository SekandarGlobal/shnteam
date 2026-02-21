document.addEventListener("DOMContentLoaded", () => {
    
    // Animated Download Button
    const downloadBtn = document.getElementById('download-btn');
    
    if (downloadBtn) {
        const svg = downloadBtn.querySelector('svg');
        let duration = 3000;
        
        downloadBtn.style.setProperty('--duration', duration);
        
        // Set initial SVG path
        svg.innerHTML = getPath(20, 0, null);
        
        downloadBtn.addEventListener('click', function(e) {
            if (downloadBtn.classList.contains('loading')) {
                e.preventDefault();
                return;
            }
            
            downloadBtn.classList.add('loading');
            
            // Smooth path transition
            setTimeout(() => {
                svg.innerHTML = getPath(12, 0.3, null);
            }, duration * 0.065);
            
            // Animate to download position
            setTimeout(() => {
                svg.innerHTML = getPath(0, 0, null);
            }, duration / 2);
            
            // Change to checkmark
            setTimeout(() => {
                svg.innerHTML = getPath(0, 0, [
                    [3, 14],
                    [8, 19],
                    [21, 6]
                ]);
            }, duration * 0.65);
        });
    }
});

// Helper function to generate SVG path
function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
        let p = previous || current,
        n = next || current,
        o = {
            length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0])
        },
        angle = o.angle + (reverse ? Math.PI : 0),
        length = o.length * smoothing;
        return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
    },
    cps = cp(a[i - 1], a[i - 2], point, false),
    cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
    let points = pointsNew ? pointsNew : [
        [4, 12],
        [12, update],
        [20, 12]
    ],
    d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}
