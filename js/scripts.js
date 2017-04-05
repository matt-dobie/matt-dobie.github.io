$(document).ready(function() {
        $('.project').mouseenter(function() {
                $('.project').css('opacity', 0.4);
                $(this).css('opacity', 1);
        });
        
        $('#portfolio').mouseleave(function() {
                $('.project').css('opacity', 1);
        });
});