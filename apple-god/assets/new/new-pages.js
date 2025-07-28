var newBenefitsSlider = new Splide('.benefits-cards-slider', {
    arrows: false,
    pagination: false,
    autoWidth: true,
    omitEnd: true,
    focus: 0,
    gap: 'clamp(10px, 2.299vw + 1.379px, 40px)',
})

newBenefitsSlider.on('overflow', function (isOverflow) {
    newBenefitsSlider.options = {
        drag: isOverflow,
    };
});

newBenefitsSlider.mount();