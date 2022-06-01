$(function(){
    new WOW().init()
    
    navbarFixed()
    topbarActive()
    fireworksAnimation()
    
    $(window).scroll(function(){
        navbarFixed()
        topbarActive()
    })

    $('a[data-toggle="scroll"]').on('click', function(e){
        e.preventDefault()
        var offset = $($(this).attr('href')).offset().top - 90

        console.log(offset)
        $('html, body').animate({
            scrollTop: offset
        }, 200)
    })

    $('#backToTop').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 200)
    })

    $('.show-project').click(function(){
        $('.project-hide').removeClass('d-none')
        $(this).hide()
    })
})

const navbarFixed = () => {
    if($(this).scrollTop() > 70){
        $('.navbar').addClass('navbar-fixed bg-white shadow-sm')
        $('#backToTop').show()
    } else {
        $('.navbar').removeClass('navbar-fixed bg-white shadow-sm')
        $('#backToTop').hide()
    }
}

const topbarActive = () => {
    if($(this).scrollTop() > $('#about').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#about"]').parent().addClass('active')
    }

    if($(this).scrollTop() > $('#service').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#service"]').parent().addClass('active')
    } 
    
    if($(this).scrollTop() > $('#skills').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#skills"]').parent().addClass('active')
    } 

    if($(this).scrollTop() > $('#portofolio').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#portofolio"]').parent().addClass('active')
    } 

    if($(this).scrollTop() > $('#resume').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#resume"]').parent().addClass('active')
    } 

    if($(this).scrollTop() > $('#project').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#project"]').parent().addClass('active')
    } 
    
    if($(this).scrollTop() > $('#contact').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#contact"]').parent().addClass('active')
    } 
    
    if($(this).scrollTop() < $('#about').offset().top - 100){
        $('.nav-item').removeClass('active')
        $('a[href="#home"]').parent().addClass('active')
    }
}

function fireworksAnimation()
{
    var canvas = document.getElementById('fireworksAnimation'),
        el = document.getElementById('home')
        W = canvas.width = el.offsetWidth,
        H = canvas.height = el.offsetHeight,
        ctx = canvas.getContext('2d'),
        maxP = 700,
        minP = 1000,
        fireworks = [];
  
    function tick() {
        var newFireworks = [];
        ctx.clearRect(0, 0, W, H);
        
        fireworks.forEach(function (firework) {
            firework.draw();
            if (!firework.done) newFireworks.push(firework);
        });
        
        fireworks = newFireworks;
        window.requestAnimationFrame(tick);
    }
  
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
  
    Vector.prototype = {
        constructor: Vector,
        
        add: function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        },
        
        diff: function (vector) {
        var target = this.copy();
        return Math.sqrt(
            (target.x-=vector.x) * target.x + (target.y-=vector.y) * target.y
        );
        },
        
        copy: function () {
        return new Vector(this.x, this.y);
        }
    };
    
    var colors = [
        ['rgba(179,255,129,', 'rgba(0,255,0,'], //green / white
        ['rgba(0,0,255,', 'rgba(100,217,255,'], //blue / cyan
        ['rgba(255,0,0,', 'rgba(255,255,0,'], //red / yellow
        ['rgba(145,0,213,', 'rgba(251,144,204,'] //purple / pink
    ];
    
    function Firework(start, target, speed) {
        this.start = start;
        this.pos = this.start.copy();
        this.target = target;
        this.spread = Math.round(Math.random() * (maxP-minP)) + minP;
        this.distance = target.diff(start);
        this.speed = speed || Math.random() * 5 + 15;
        this.angle = Math.atan2(target.y - start.y, target.x - start.x);
        this.velocity = new Vector(
        Math.cos(this.angle) * this.speed,
        Math.sin(this.angle) * this.speed
        );
        
        this.particals = [];
        this.prevPositions = [];
        
        var colorSet = colors[Math.round(Math.random() * (colors.length -1))];
        
        for (var i=0; i<this.spread; i++) {
        this.particals.push(new Partical(target.copy(), colorSet));
        }
    }
    
    Firework.prototype = {
        constructor: Firework,
        
        draw: function () {
        var last = this.prevPositions[this.prevPositions.length -1] || this.pos;
        
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.strokeStyle = 'rgba(0, 0, 0,.7)';
        ctx.stroke();
        
        this.update();
        },
        
        update: function () {
        if (this.start.diff(this.pos) >= this.distance) {
            var newParticals = [];
            this.particals.forEach(function (partical) {
                partical.draw();
                if (!partical.done) newParticals.push(partical);
            });
            
            this.particals = newParticals;
            this.prevPositions = [];
            
            if (!newParticals.length) this.done = true;
        } else {
            this.prevPositions.push(this.pos.copy());
            
            if (this.prevPositions.length > 8) {
                this.prevPositions.shift();
            }

            this.pos.add(this.velocity);
        }
        }
    };
    
    function Partical(pos, colors) {
        this.pos = pos;
        this.ease = 0.2;
        this.speed = Math.random() * 6 + 2;
        this.gravity = Math.random() * 3 + 0.1;
        this.alpha = .8;
        this.angle = Math.random() * (Math.PI*2);
        this.color = colors[Math.round(Math.random() * (colors.length - 1))];
        this.prevPositions = [];
    }
    
    Partical.prototype = {
        constructor: Partical,
        
        draw: function () {
        var last = this.prevPositions[this.prevPositions.length -1] || this.pos;
        
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.stroke();
        
        this.update();
        },
        
        update: function () {
        if (this.alpha <= 0) {
            this.done = true;
        } else {
            this.prevPositions.push(this.pos.copy());
            
            if (this.prevPositions.length > 10) this.prevPositions.shift();
            if (this.speed > 1) this.speed -= this.ease;
            
            this.alpha -= 0.01;
            this.gravity += 0.01;
            
            this.pos.add({
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed + this.gravity
            });
        }
        }
    };
    
    function addFirework(target) {
        var startPos = new Vector(W/2, H);
        target = target || new Vector(Math.random() * W, Math.random() * (H - 300));
        fireworks.push(new Firework(startPos, target));
    }
    
    
    tick();
    setInterval(addFirework, 1300)
}