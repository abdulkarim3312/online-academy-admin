$(document).ready(function(){
    /*
    =================================================
        DROPDOWN
    =================================================
    */

    $(document).on('click','.dropdown button',function () {
        $(this).parent().children('.dropdown_menu').toggleClass('open');
    });

    $(document).mouseup(function (e) {
        $('.dropdown').each(function () {
            var dropdown = $(this);
            if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
                dropdown.find('.dropdown_menu').removeClass('open');
            }
        });
        // if the target of the click isn't the container nor a descendant of the container
    });

    //TOGGLING NESTED ul
    $(document).on('click','.drop-down .selected',function () {
        $(".drop-down .options ul").toggle();
    });

    $(document).on('click','.drop-down .options ul li',function () {
        var text = $(this).html();
        $(".drop-down .selected span").html(text);
        $(".drop-down .options ul").hide();
    });

    //HIDE OPTIONS IF CLICKED ANYWHERE ELSE ON PAGE
    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("drop-down"))
            $(".drop-down .options ul").hide();
    });


    /*
    =================================================
        TAB 
    =================================================
    */

    $(document).on('click','.tabs li , .tabs a',function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".tab_content").removeClass("show");
        $($(this).attr("href")).addClass("show");
    });

    $(document).on('click','.tabs ul li span',function () {

        if ($(this).parent().next().length > 0) {
            $(this).parent().next().addClass("active");
            $(this).parent().next().trigger('click');
        }

        if ($(this).parent().prev().length > 0) {
            $(this).parent().prev().addClass("active");
            $(this).parent().prev().trigger('click');
        }
        $(this).parent().remove();
        $($(this).parent().attr("href")).removeClass("show");
    });


    /*
    ===============================================
        ACCORDION 
    ===============================================
    */

    $(document).on('click','[data-toggle="collapse"]',function () {
        $($(this).toggleClass('open'));
        let target = $($(this).data('target'));
        target.slideToggle();
    });

    $(document).on('click', '[data-toggle="collapse_noslide"]', function () {
        $($(this).toggleClass('open'));
        let target = $($(this).data('target'));
        target.toggle();
    });

    /*
    ===============================================
        MODAL
    ===============================================
    */

    // OPEN
    $(document).on('click','[data-modal-open]',function () {
        $('body').addClass('model_open');
        var targeted_modal_class = jQuery(this).attr('data-modal-open');
        $('[data-modal="' + targeted_modal_class + '"]').addClass('open_modal');
    });

    // CLOSE
    $(document).on('click','[data-modal-close] , .modal_overlay',function () {
        $('body').removeClass('model_open');
        var targeted_modal_class = jQuery(this).attr('data-modal-close');
        $('[data-modal="' + targeted_modal_class + '"]').removeClass('open_modal');
    });
    
    $(document).on('click', '[data-toggle="comment_collapse"]', function () {
        $($(this).toggleClass('open'));
        let target = $($(this).data('target'));
        target.toggle();
    });

    //resizable Textarea
    // Targets all textareas with class "txta"
    let textareas = document.querySelectorAll('.txta'),
    hiddenDiv = document.createElement('div'),
    content = null;

    // Adds a class to all textareas
    for (let j of textareas) {
        j.classList.add('txtstuff');
    }

    // If you want, you can remove those from CSS and add them via JS
    hiddenDiv.classList.add('txta');

    // Add the styles for the hidden div
    // These can be in the CSS, just remove these three lines and uncomment the CSS
    hiddenDiv.style.display = 'none';
    hiddenDiv.style.whiteSpace = 'pre-wrap';
    hiddenDiv.style.wordWrap = 'break-word';

    // Loop through all the textareas and add the event listener
    for(let i of textareas) {
        (function(i) {
            // Note: Use 'keyup' instead of 'input'
            // if you want older IE support
            i.addEventListener('input', function() {
                // Append hiddendiv to parent of textarea, so the size is correct
                i.parentNode.appendChild(hiddenDiv);
                
                // Remove this if you want the user to be able to resize it in modern browsers
                i.style.resize = 'none';
                
                // This removes scrollbars
                i.style.overflow = 'hidden';

                // Every input/change, grab the content
                content = i.value;

                // Add the same content to the hidden div
                
                // This is for old IE
                content = content.replace(/\n/g, '<br>');
                
                // The <br ..> part is for old IE
                // This also fixes the jumpy way the textarea grows if line-height isn't included
                hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

                // Briefly make the hidden div block but invisible
                // This is in order to read the height
                hiddenDiv.style.visibility = 'hidden';
                hiddenDiv.style.display = 'block';
                i.style.height = hiddenDiv.offsetHeight + 10 + 'px';

                // Make the hidden div display:none again
                hiddenDiv.style.visibility = 'visible';
                hiddenDiv.style.display = 'none';
            });
        })(i);
    }
});

