/////////////////////
// NAVIGATION BAR
/////////////////////

function navigation() {
    const navBtn = document.querySelector('.nav-btn');
    const navBg = document.querySelector('.nav-bg');
    const navBar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('#home');
    var showMenu = false;

    function toggleMenu() {
        if (!showMenu) {
            navBtn.classList.add('x');
            navBar.classList.add('show');
            navBg.classList.add('grow');
            showMenu = true;
        } else {
            navBtn.classList.remove('x');
            navBar.classList.remove('show');
            navBg.classList.remove('grow');
            showMenu = false;
        }
    }
    navLinks.forEach(e => e.addEventListener('click', toggleMenu));
    navBtn.addEventListener('click', toggleMenu);

    ///////////////////////////////////
    //  POP-UP THE NAVIGATION BTN on first section
    //////////////////////////////////

    function showNav() {
        if (window.scrollY >= header.scrollHeight) {
            navBtn.classList.add('pop');
        } else if (window.scrollY < header.scrollHeight) {
            navBtn.classList.remove('pop');
        }
    };
    document.addEventListener("scroll", showNav);


    ///////////////////////////////////
    //  SCROLL TO SECTION SNIPPET
    //////////////////////////////////

    function scrollTo() {
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 1000);
        });
    }
    scrollTo();

}

/////////////////////
// GALLERY 
/////////////////////

function imageSlider() {
    const images = document.querySelectorAll('.image'); // node of all images
    const slider = document.querySelector('.gallery__slider'); // image container
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    let counter = 0;
    let page = 0;
    let total = 0;
    let widthArr = [];

    function slidePrev() {
        if (page > 0) {
            page--;
            total = total - widthArr[page];
            slider.style.left = -total + 'px';
        }
    };

    function slideNext() {
        // Before Last page
        if (page === widthArr.length - 1) {
            // slide to last page
            slider.style.left = -(slider.scrollWidth - screen.width) + 'px';
            total = total + widthArr[page];
            page++;
        }
        // if not last page
        if (page < widthArr.length - 1) {
            total = total + widthArr[page];
            slider.style.left = -total + 'px';
            page++;
        }
    };

    // loop trough images and make ARRAY of widths to scroll
    images.forEach(cur => {
        counter += cur.getBoundingClientRect().width;
        if (counter > screen.width) {
            widthArr.push(counter - cur.getBoundingClientRect().width);
            counter = cur.getBoundingClientRect().width;
        }
    });

    btnPrev.addEventListener('click', function () {
        slidePrev();
    });

    btnNext.addEventListener('click', function () {
        slideNext();
    });
};

window.onload = function () {
    navigation();
    imageSlider();
};