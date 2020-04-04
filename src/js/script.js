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

    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
        $('body').css("overflow", "hidden");
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('body').css("overflow", "hidden");
        })
    });

    //modal_close
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        $("body").css("overflow","auto");
    });

    //validate form
    function validateForms (form) {
        $(form).validate({
            rules: {
                name: {
                    required: true, 
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: 'Пожалуйста, введите своё имя',
                    minlength: jQuery.validator.format('Введите {0} символа!')
                },
                phone: 'Пожалуйста, введите свой номер телефона',
                email: {
                    required: 'Пожалуйста, введите свою почту',
                    email: 'Неправильно введен адрес почты'
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //validate mask-input
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //php mailer
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
    });

    //page-up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 2000) {
            $('.page-up').fadeIn();
        } else {
            $('.page-up').fadeOut();
        }
    });

    //scroll
    $('a[href^="#"]').on('click', function () {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    })
});
