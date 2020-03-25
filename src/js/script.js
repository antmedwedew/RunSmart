$(document).ready(function(){
    $('.slider__inner').slick({
        prevArrow: `<button type="button" class="slick-prev"><img src="/icons/slick_prev.svg" alt="prev"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="/icons/slick_next.svg" alt="next"></button>`,
        // autoplay: true,
        // autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
});