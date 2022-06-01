$(function(){
    new WOW().init()
    
    navbarFixed()
    topbarActive()
    fireworksAnimation()
    animationBalls()
    renderParticles()
    objectThree()
    
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

    $(window).on('load', function(){
        $('.loader').addClass('hide')
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
        canvas.width = el.offsetWidth,
        canvas.height = el.offsetHeight,
        ctx = canvas.getContext('2d'),
        fireworks = []
  
    function setFireworks() {
        var newFireworks = []
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        fireworks.forEach(function (firework) {
            firework.draw();
            if (!firework.done) newFireworks.push(firework)
        });
        
        fireworks = newFireworks
        requestAnimationFrame(setFireworks)
    }
  
    function Vector(x, y) {
        this.x = x
        this.y = y
    }
  
    Vector.prototype = {
        constructor: Vector,
        add: function (vector) {
            this.x += vector.x
            this.y += vector.y
        },
        diff: function (vector) {
            var target = this.copy()
            return Math.sqrt(
                (target.x-=vector.x) * target.x + (target.y-=vector.y) * target.y
            )
        },
        copy: function () {
            return new Vector(this.x, this.y)
        }
    };
    
    var colors = [
        ['rgba(179,255,129,', 'rgba(0,255,0,'], //green / white
        ['rgba(0,0,255,', 'rgba(100,217,255,'], //blue / cyan
        ['rgba(255,0,0,', 'rgba(255,255,0,'], //red / yellow
        ['rgba(145,0,213,', 'rgba(251,144,204,'] //purple / pink
    ]
    
    function Firework(start, target, speed) {
        this.start = start
        this.pos = this.start.copy()
        this.target = target
        this.spread = Math.round(Math.random() * (1000 - 700)) + 700
        this.distance = target.diff(start)
        this.speed = speed || Math.random() * 5 + 15
        this.angle = Math.atan2(target.y - start.y, target.x - start.x)
        this.velocity = new Vector(
            Math.cos(this.angle) * this.speed,
            Math.sin(this.angle) * this.speed
        )
        
        this.particals = []
        this.prevPositions = []
        
        var colorSet = colors[Math.round(Math.random() * (colors.length -1))]
        
        for (var i=0; i<this.spread; i++) {
            this.particals.push(new Partical(target.copy(), colorSet))
        }
    }
    
    Firework.prototype = {
        constructor: Firework,
        draw: function () {
            var last = this.prevPositions[this.prevPositions.length -1] || this.pos
            
            ctx.beginPath()
            ctx.moveTo(last.x, last.y)
            ctx.lineTo(this.pos.x, this.pos.y)
            ctx.strokeStyle = 'rgba(0, 0, 0,.7)'
            ctx.stroke()
            
            this.update()
        },
        update: function () {
            if (this.start.diff(this.pos) >= this.distance) {
                var newParticals = []
                this.particals.forEach(function (partical) {
                    partical.draw()
                    if (!partical.done) newParticals.push(partical)
                })
                
                this.particals = newParticals
                this.prevPositions = []
                
                if (!newParticals.length) this.done = true
            } else {
                this.prevPositions.push(this.pos.copy())
                
                if (this.prevPositions.length > 8) {
                    this.prevPositions.shift()
                }

                this.pos.add(this.velocity)
            }
        }
    }
    
    function Partical(pos, colors) {
        this.pos = pos
        this.ease = 0.2
        this.speed = Math.random() * 6 + 2
        this.gravity = Math.random() * 3 + 0.1
        this.alpha = 0.8
        this.angle = Math.random() * (Math.PI*2)
        this.color = colors[Math.round(Math.random() * (colors.length - 1))]
        this.prevPositions = []
    }
    
    Partical.prototype = {
        constructor: Partical,
        draw: function () {
            var last = this.prevPositions[this.prevPositions.length -1] || this.pos
            
            ctx.beginPath()
            ctx.moveTo(last.x, last.y)
            ctx.lineTo(this.pos.x, this.pos.y)
            ctx.strokeStyle = this.color + this.alpha + ')'
            ctx.stroke()
            
            this.update()
        },
        update: function () {
            if (this.alpha <= 0) {
                this.done = true
            } else {
                this.prevPositions.push(this.pos.copy())
                
                if (this.prevPositions.length > 10) this.prevPositions.shift()
                if (this.speed > 1) this.speed -= this.ease
                
                this.alpha -= 0.01
                this.gravity += 0.01
                
                this.pos.add({
                    x: Math.cos(this.angle) * this.speed,
                    y: Math.sin(this.angle) * this.speed + this.gravity
                })
            }
        }
    }
    
    function addFirework(target) {
        var startPos = new Vector(canvas.width / 2, canvas.height)
        target = target || new Vector(Math.random() * canvas.width, Math.random() * (canvas.height - 300))
        fireworks.push(new Firework(startPos, target))
    }
    
    function draw() {
        if(fireworks.length >= 5){
            fireworks.shift()
        } else {
            setTimeout(addFirework, 200)
            setTimeout(addFirework, 400)
            setTimeout(addFirework, 600)
        }
    }
    
    setFireworks();
    setInterval(draw, 1000)
}

function animationBalls()
{
    var el = document.getElementById('portofolio')
    var canvas = document.getElementById('animationBalls')
    canvas.width = el.offsetWidth
    canvas.height = el.offsetHeight
    var ctx = canvas.getContext('2d')

    var balls = [
        new ballDirection(100, 200, 30, 3, -2, 'rgb(255, 200, 100)'),
        new ballDirection(500, 200, 50, 1, -2, 'rgb(100, 200, 100)'),
        new ballDirection(200, 300, 80, -3, 1, 'rgb(155, 100, 200)'),
        new ballDirection(300, 100, 70, 1, -4, 'rgb(250, 100, 180)'),
        new ballDirection(100, 200, 30, 2, -4, 'rgb(250, 100, 100)'),
        new ballDirection(400, 250, 100, 1, 1, 'rgb(255, 50, 10)'),
        new ballDirection(200, 300, 80, 4, -1, 'rgb(55, 80, 200)'),
        new ballDirection(100, 200, 40, -2, -1, 'rgb(25, 150, 210)'),
        new ballDirection(150, 200, 100, -1, -1, 'rgb(250, 250, 10)'),
        new ballDirection(200, 200, 110, -4, 1, 'rgb(0, 50, 10)'),
        new ballDirection(100, 250, 90, 3, -5, 'rgb(95, 150, 210)'),
        new ballDirection(180, 200, 60, -6, 2, 'rgb(225, 10, 210)'),
        new ballDirection(130, 200, 60, -3, 4, 'rgb(100, 100, 210)'),
        new ballDirection(100, 90, 70, -2, -5, 'rgb(222, 150, 10)'),
    ]

    function draw()
    {
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.6

        for(let i = 0;i < balls.length;i++){
            balls[i].animate()
        }

        ctx.restore()
    }

    setInterval(draw, 1)

    function ballDirection(x, y, radius, dx, dy, color)
    {
        this.animate = () => {
            ball(x, y, radius, color)

            x += dx
            y += dy

            if(x + radius > canvas.width || x < radius){
                dx *= -1
            }

            if(y + radius > canvas.height || y < radius){
                dy *= -1
            }
        }
    }

    function ball(x, y, radius, color)
    {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }
}

function renderParticles()
{
    particlesJS('particles-js',
    {
        "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#2023a5"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#2023a5",
            "opacity": 0.5,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
                },
                "bubble": {
                    "distance": 300,
                    "size": 10,
                    "duration": 2,
                    "opacity": .4,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": true,
            "background_color": "#2023a5",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    });
}

function objectThree()
{
    const el = document.getElementById('objectThree')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, el.offsetWidth / el.offsetHeight, 0.1, 1000)
    camera.position.z = 5

    const geometry = new THREE.IcosahedronGeometry(3, 2)
    const material = new THREE.MeshLambertMaterial({
        wireframe: true,
        color: 'blue',
        emissive: 'blue',
        emissiveIntensity: 0.2,
        wireframeLinewidth: 10,
        transparent: true,
        opacity: 0.2
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    
    const renderer = new THREE.WebGLRenderer({alpha: true})
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    el.appendChild(renderer.domElement)

    function draw(){
        mesh.rotation.x += 0.001
        mesh.rotation.y += 0.001

        renderer.render(scene, camera)
        requestAnimationFrame(draw)
    }
    draw()
}