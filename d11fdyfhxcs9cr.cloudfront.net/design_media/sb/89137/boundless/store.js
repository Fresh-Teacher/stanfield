/* store.js */


$(document).ready(function() {

    /*
    removed as iconfont not working on ff
    $('.icon-menu-2').on('click', function(event) {
          $('#main_nav').slideToggle("slow");
        return false; 
    });*/

    $('.icon-desktop').on('click', function(event) {
        $('#main_nav').slideToggle("slow");
        return false;
    });

    //if touch browser
    if (Modernizr.touch) {
        //disable mouseover on 2nd level categories 
        $('#cat_nav ul ul.dropdown').attr("style", "display: none");
    }


    /* Don't re-enable this width restriction - it breaks additional images on product details pages*/
    //if ($(window).width() >= 1000) {
    if ($("#main_product_image").length) {
        $("#main_product_image").elevateZoom({
            zoomType: "lens",
            lensShape: "round",
            lensSize: 200,
            gallery: 'gallery_01',
            cursor: 'pointer',
            galleryActiveClass: 'active',
            imageCrossfade: true,
            loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
        });

        //swich small large images
        $("#main_product_image").bind("click", function(e) {
            var ez = $('#main_product_image').data('elevateZoom');
            //$.fancybox(ez.getGalleryList()); //disabled as the fancybox script isn't included anywhere
            return false;
        });

        $("#gallery_01 a:first-child").addClass("active");
    }
    //}

});


/* Product Option Change callback */
function ProductOptionChangedCallback(imageInfo) {
    var ez = jQuery('#main_product_image').data('elevateZoom');
    ez.swaptheimage(imageInfo.small, imageInfo.large);
}