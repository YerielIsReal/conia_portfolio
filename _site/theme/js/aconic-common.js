function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$!%*?&])[a-zA-Z\d@#$!%*?&]{8,20}$/;
  return passwordRegex.test(password) === true;
}


function addQueryParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.location.href = url.toString();
}

function move_page(obj) {
    console.log(obj.getAttribute('href'));
    if (obj.getAttribute('href')) {
        window.location.href = obj.getAttribute('href');
    }
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const decodedName = encodeURIComponent(name);
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(decodedName + "=") === 0) {
            const decodedValue = decodeURIComponent(cookie.substring(decodedName.length + 1));
            return decodedValue;
        }
    }

    return null;
}

function inputNumberFormat(obj) {
    let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    if (regExp.test(obj.value)){
        obj.value = obj.value.substring(0, obj.value.length - 1);
    }
    obj.value = obj.value.replace(/[^-0-9]/g, '');
}

function textLimit(obj, maxLength) {
    if(obj.value.length > maxLength){
        obj.value = obj.value.slice(0, maxLength);
    }
}

function getQueryParam(url, key) {
    const urlData = new URL(url);
    return urlData.searchParams.get(key);
}

// == Scroll To Top == //
function scrolltoTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// === ++ theme button functions ++  === //
let headerH = $("header").height();
let btngrpH = $(".sticky-button").outerHeight();

function stickyBtnSet() {
    // sticky-button top setting
    if( $(window).width() >= 992 && $(".navbar-sticky").hasClass("navbar-stuck") ){
        $(".sticky-button").css("top", headerH - 1);
    } else {
        $(".sticky-button").css("top", 0);
    }
}

// scroll, resize setTime
function stickyBtnTimer() {
    let timer = 0;
    clearTimeout(timer);
    timer = setTimeout(function(){
        stickyBtnSet();
    }, 300);
}

// get siblings
function getSiblings(element) {
    let siblings = [];
    let sibling = element.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
}

// == x slider arrow set == //
function setArrow(element) {
    let pmmTot = 0;
    let scrollItems = element.querySelectorAll("ul li");

    let siblings = getSiblings(element);
    let toLeftBtn = siblings.find(sibling => sibling.classList.contains("to_left"));
    let toRightBtn = siblings.find(sibling => sibling.classList.contains("to_right"));

    if (!scrollItems.length) {
        if (toLeftBtn) toLeftBtn.classList.add("d-none");
        if (toRightBtn) toRightBtn.classList.add("d-none");
        return;
    }

    scrollItems.forEach((item) => {
        pmmTot += item.offsetWidth;
    });

    if (element.offsetWidth > pmmTot) {
        if (toRightBtn) toRightBtn.classList.add("d-none");
    } else {
        if (toRightBtn) toRightBtn.classList.remove("d-none");
    }
}

function x_scrollBox(element) {
    element.addEventListener("scroll", function() {
        let elementWidth = element.offsetWidth;
        let scrollWidth = element.scrollWidth;
        let scrollLeft = element.scrollLeft;

        let siblings = getSiblings(element);
        let toLeftBtn = siblings.find(sibling => sibling.classList.contains("to_left"));
        let toRightBtn = siblings.find(sibling => sibling.classList.contains("to_right"));

        if (Math.ceil(scrollLeft + elementWidth) >= scrollWidth) {
            if (toLeftBtn) toLeftBtn.classList.remove("d-none");
            if (toRightBtn) toRightBtn.classList.add("d-none");
        } else if (scrollLeft === 0) {
            if (toLeftBtn) toLeftBtn.classList.add("d-none");
            if (toRightBtn) toRightBtn.classList.remove("d-none");
        } else {
            if (toLeftBtn) toLeftBtn.classList.remove("d-none");
            if (toRightBtn) toRightBtn.classList.remove("d-none");
        }
    });
}

function xsliderArrow(dir, obj) {
    let parentScrollBox = $(obj).parent().find(".x-slider");

    if (dir === 'left') {
        parentScrollBox.animate({scrollLeft: 0},250);
    } else if (dir === 'right') {
        let scrollWidth = parentScrollBox[0].scrollWidth - parentScrollBox.outerWidth();
        parentScrollBox.animate({scrollLeft: scrollWidth}, 250);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let scrollBoxes = document.querySelectorAll(".x-slider");

    scrollBoxes.forEach((element) => {
        setArrow(element);
        x_scrollBox(element);
    });
});

// == Horizontal Scroll Set == //
function enableDragScroll(element) {
    let isDragging = false;
    let startX, scrollLeft;
    let isClick = false;

    element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        isClick = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing';
    });

    element.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 0.65;
        element.scrollLeft = scrollLeft - walk;
        isClick = false;
    });

    element.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';
            if (isClick && e.target.tagName === 'A') {
                e.target.click();
            }
        }
    });

    element.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';
        }
    });

    element.addEventListener('mouseup', () => {
        Array.from(element.children).forEach(child => {
            child.style.pointerEvents = 'auto';
            child.style.userSelect = '';
        });
    });

    element.style.cursor = 'grab';
}

// == Custom Anchor == //
function anchorMove(obj) {
    event.preventDefault();

    let target = $(obj).attr("href");
    let location = 0;

    if($(target).length) {
        location = $(target).offset().top - btngrpH;

        $("html, body").animate({scrollTop: location},0);
    }
}

function anchorScroll() {
    let scrollPos = $(document).scrollTop();

    $(".anchors").each(function () {
        if(scrollPos === 0) {
            $(this).removeClass("active");
            return;
        }

        let target = $(this).attr("href");
        let targetTop = 0;
        let targetBottom = 0;

        if($(target).length) {
            if($(window).width() >= 992){
                targetTop = $(target).offset().top - headerH - btngrpH;
            }else{
                targetTop = $(target).offset().top - btngrpH;
            }
            targetBottom = targetTop + ($(target).outerHeight() / 2);

            let focusAnchor = $(".anchors[href='" + target + "']");
            
            if(scrollPos >= targetTop && scrollPos < targetBottom) {
                $(".anchors").removeClass("active");
                $(focusAnchor).addClass("active");
                setTimeout(function() {
                    focusBtnAnimation($(focusAnchor).closest(".x-slider"), $(focusAnchor));
                },100);
            }
        }
    });
}

// x-slider button active focus
function xsliderFocus(element) {
    const xSlider = $(element);
    const btnGrp = xSlider.find(".btn-grp");

    btnGrp.each(function () {
        const grp = $(this);
        let focusBtn = grp.find(".active");

        if (focusBtn.length) {
            focusBtnAnimation(xSlider, focusBtn);
        }
    });
}

function focusBtnAnimation(scrollBox, targetAnchor) {
    const focusBtnOffset = targetAnchor.offset().left;
    const focusBtnWidth = targetAnchor.outerWidth();
    const elementOffset = scrollBox.offset().left;
    const scrollPosition = (focusBtnOffset - elementOffset) - (( $("html, body").innerWidth() - focusBtnWidth) / 2);

    if (scrollBox.get(0).scrollWidth > $("html, body").innerWidth()) {
        scrollBox.stop(true, true).animate({
            scrollLeft: scrollPosition
        }, 350, "swing");
    }
}

if($(".sticky-button").length){
    stickyBtnSet();
    $(window).on("resize", function(){
        stickyBtnTimer();
    });
    $(document).on("scroll", function() {
        stickyBtnTimer();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const xsliders = document.querySelectorAll('.x-slider');
    xsliders.forEach((xslider) => {
        enableDragScroll(xslider);
        xsliderFocus(xslider);
    });
});

$(document).on("scroll", function() {
    anchorScroll();
});

/**
 * Countdown timer
 */

let countdown = function () {
  let countdowns = document.querySelectorAll('.countdown');
  if (countdowns.length === 0) return;

  countdowns.forEach(function (countdown) {
    let endDate = countdown.dataset.countdown,
        daysVal = countdown.querySelector('.countdown-days .countdown-value'),
        hoursVal = countdown.querySelector('.countdown-hours .countdown-value'),
        minutesVal = countdown.querySelector('.countdown-minutes .countdown-value'),
        secondsVal = countdown.querySelector('.countdown-seconds .countdown-value'),
        days, hours, minutes, seconds;

    endDate = new Date(endDate).getTime();
    if (isNaN(endDate)) return;

    setInterval(calculate, 1000);

    function calculate() {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((endDate - startDate) / 1000);
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        timeRemaining = timeRemaining % 86400;
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = timeRemaining % 3600;
        minutes = parseInt(timeRemaining / 60);
        timeRemaining = timeRemaining % 60;
        seconds = parseInt(timeRemaining);

        if (daysVal != null) {
          daysVal.innerHTML = parseInt(days, 10);
        }
        if (hoursVal != null) {
          hoursVal.innerHTML = hours < 10 ? '0' + hours : hours;
        }
        if (minutesVal != null) {
          minutesVal.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        }
        if (secondsVal != null) {
          secondsVal.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        }
      } else {
        // 타이머가 끝난 경우 동작
        clearInterval(calculate);
        // 종료 후에 수행할 작업을 여기에 추가
      }
    }
  });
};

// 문서가 로드된 후 카운트다운 시작
document.addEventListener("DOMContentLoaded", countdown);

let countdown_el = function (target) {
  let countdowns = target.querySelectorAll('.countdown');
  if (countdowns.length === 0) return;

  countdowns.forEach(function (countdown) {
    let endDate = countdown.dataset.countdown,
        daysVal = countdown.querySelector('.countdown-days .countdown-value'),
        hoursVal = countdown.querySelector('.countdown-hours .countdown-value'),
        minutesVal = countdown.querySelector('.countdown-minutes .countdown-value'),
        secondsVal = countdown.querySelector('.countdown-seconds .countdown-value'),
        days, hours, minutes, seconds;

    endDate = new Date(endDate).getTime();
    if (isNaN(endDate)) return;

    setInterval(calculate, 1000);

    function calculate() {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((endDate - startDate) / 1000);
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        timeRemaining = timeRemaining % 86400;
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = timeRemaining % 3600;
        minutes = parseInt(timeRemaining / 60);
        timeRemaining = timeRemaining % 60;
        seconds = parseInt(timeRemaining);

        if (daysVal != null) {
          daysVal.innerHTML = parseInt(days, 10);
        }
        if (hoursVal != null) {
          hoursVal.innerHTML = hours < 10 ? '0' + hours : hours;
        }
        if (minutesVal != null) {
          minutesVal.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        }
        if (secondsVal != null) {
          secondsVal.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        }
      } else {
        // 타이머가 끝난 경우 동작
        clearInterval(calculate);
        // 종료 후에 수행할 작업을 여기에 추가
      }
    }
  });
};