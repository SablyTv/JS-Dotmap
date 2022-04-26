class Dot {
    constructor(generations, water) {
        this.generations = generations;
        this.water = water;
        this.color = '#212044';
    }

    lerpColor(color1, color2, fraction) {
        var ah = parseInt(color1.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(color2.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + fraction * (br - ar),
            rg = ag + fraction * (bg - ag),
            rb = ab + fraction * (bb - ab);
    
        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    }

    update(total_generations) {
        // fraction is a float between 0 and 1
        // 0 is the color1, 1 is the color2
        var fraction = this.generations.length / total_generations;

        if (this.generations.length > 0)
            this.color = this.lerpColor('#212044', '#2961F1', fraction);
    }
}

class DotMap {
    constructor(mapElement, width, height) {
        this.dots = [];
        this.total_generations = 0;
        this.mapElement = mapElement;
        this.width = width;
        this.height = height;
    }

    update(dots) {
        dots.forEach(dot => {
            this.dots.push(new Dot(dot.generations, dot.water));
            this.total_generations += dot.generations.length;
        });

        this.mapElement.css('width', this.width * 14);
        this.mapElement.css('height', this.height * 14);

        this.dots.forEach(dot => {
            dot.update(this.total_generations);
        });

        this.draw();
    }

    draw() {
        this.mapElement.empty();

        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            const $dot = $('<div>').addClass('dot');
            $dot.css('background-color', dot.color);
            $dot.attr("id", `dot-${i}`);

            if (dot.water)
                $dot.addClass('disabled');

            this.mapElement.append($dot);
        }
    }
}