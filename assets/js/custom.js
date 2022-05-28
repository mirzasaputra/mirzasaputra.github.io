$(function(){
    new WOW().init()
    
    navbarFixed()
    topbarActive()
    
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