$(document).ready(function(){
    $('.slider__inner').slick({
        prevArrow: `<button type="button" class="slick-prev"><img src="./img/icons/slick_prev.svg" alt="prev"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="./img/icons/slick_next.svg" alt="next"></button>`,
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