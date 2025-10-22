function addSwiper() {
  new Swiper(".swiper_number", {
    autoHeight: false,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
}

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
window.addEventListener('DOMContentLoaded', addSwiper);

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

// wish button
function wish(event, obj){
    event.preventDefault();
    event.stopPropagation();
    let icon = obj.querySelector('i');
    if(icon.classList.contains('ci-heart')){
        icon.classList.remove("ci-heart");
        icon.classList.add('ci-heart-filled', 'text-primary');
        Swal.fire({
                icon: 'success',
                title: '관심상품이 등록되었습니다.',
                showConfirmButton: false,
                timer: 1500
            });
    } else {
        icon.classList.remove("ci-heart-filled", 'text-primary');
        icon.classList.add('ci-heart');
    }

}

// option open/close
function openOption() {
    $(".option_select_wrap").addClass("opened");
    $(".btn_closed").removeClass("d-flex").addClass("d-none");
    $(".btn_opened").removeClass("d-none").addClass("d-flex");
    $("html, body").css("overflow","hidden");
}

function closeOption() {
    $(".option_select_wrap").removeClass("opened");
    $(".btn_closed").removeClass("d-none").addClass("d-flex");
    $(".btn_opened").removeClass("d-flex").addClass("d-none");
    $("html, body").css("overflow","unset");
}

// option select
function option(obj) {
    const selectedOption = obj.options[obj.selectedIndex];
    const selectedText = selectedOption.text;
    const selectedValue = obj.value;

    const optionList = document.querySelector(".option-list");
    let optionEl = document.createElement("div");
    optionEl.classList.add("option-frame");

    let optionHtml = document.getElementById("optTemplate").innerHTML;
    optionHtml = optionHtml.replace("$optionName$", selectedText);
    optionHtml = optionHtml.replaceAll("$selling_price_comma$", selectedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    optionHtml = optionHtml.replaceAll("$selling_price$", selectedValue);
    optionEl.innerHTML = optionHtml;
    optionList.appendChild(optionEl);

    cntChange(null, null, null);
    obj.value = '';
}

// option del
function delOption(obj) {
    const frame = obj.closest(".option-frame")
    frame.remove();
    cntChange(null, null, null);
}

// 상세페이지 open / close
document.addEventListener("DOMContentLoaded", function(){
  let descr_box = document.getElementById("descr_box");
  let read_more_area = document.getElementById("read_more_area");
  let descr_box_height = descr_box.offsetHeight;
  let minimum_height = window.innerHeight * 0.6;

  if (descr_box_height > minimum_height) {
    descr_box.style.height = "60vh";
    read_more_area.classList.remove("d-none");
    read_more_area.classList.add("d-block");
  } else {
    read_more_area.classList.remove("d-block");
    read_more_area.classList.add("d-none");
  }
});

function descrOpen(obj) {
  const descrBox = document.getElementById("descr_box");

  if (descrBox.classList.contains("closed")) {
    // open
    descrBox.classList.remove("closed");
    descrBox.style.height = "fit-content";
    obj.innerHTML = "상세정보 접기 &nbsp;<i class='fas fa-chevron-up'></i>";
  } else {
    const topPos = descrBox.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: topPos,
      behavior: "smooth"
    });

    // close
    descrBox.classList.add("closed");
    descrBox.style.height = "60vh";
    obj.innerHTML = "자세히 보기 &nbsp;<i class='fas fa-chevron-down'></i>";
  }
}

// count product
function plus(obj, price) {
    let selected_cnt = 0;
    let options = document.querySelectorAll(".option-frame");
    for (let i = 0; i < options.length; i++) {
    let cnt = options[i].querySelector("input[name=cnt]").value;
    selected_cnt += Number(cnt);
    }
    if (selected_cnt >= 999) {
        alert("최대 구매수량은 999개 입니다");
        return;
    }

    const max_cnt = 999;
    const input = obj.closest("div").querySelector("input");
    let cnt = input.value;
    if (cnt < max_cnt) {
        input.value = Number(cnt) + 1;
        cntChange(Number(cnt) + 1, price, obj);
    } else {
        alert("최대 구매수량은 999개 입니다");
    }
}

function minus(obj, price) {
    const input = obj.closest("div").querySelector("input");
    let cnt = input.value;
    if (Number(cnt) > 1) {
        input.value = Number(cnt) - 1;
        cntChange(Number(cnt) - 1, price, obj);
    }
}

// value change
function valueChange(obj, price) {
    if (/^[0-9]+$/g.test(obj.value)) {
        const max_cnt = 100;
        let cnt = Number(obj.value);
        if (max_cnt < cnt) {
            obj.value = max_cnt;
            cnt = max_cnt;
        }
        cntChange(cnt, price, obj);
    } else {
        obj.value = 1;
        cntChange(1, price, obj);
    }
}

function cntChange(cnt, price, obj) {
    if (obj) {
    const prdPrice = obj.closest(".option-frame").querySelector("#prdPrice");
    prdPrice.innerText = (cnt * price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let totalAmount = 0;
    const optionFrames = document.querySelectorAll(".option-frame");
    for (let i = 0; i < optionFrames.length; i++) {
    let cnt = optionFrames[i].querySelector("input[name=cnt]").value;
    let price = optionFrames[i].querySelector("input[name=price]").value;

    totalAmount += (cnt * price);
    }
    document.querySelector("#total").innerText = (totalAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 문의하기
function question(){
    let qnaSubject = document.querySelector("#qna-subject").value;
    let qnaMessage = document.querySelector("#qna-message").value;
    if (!qnaSubject) {
        Swal.fire({
                icon: 'warning',
                title: '제목을 입력하세요.',
                showConfirmButton: false,
                timer: 1500
            });
    } else if (!qnaMessage) {
        Swal.fire({
                icon: 'warning',
                title: '문의내용을 입력하세요.',
                showConfirmButton: false,
                timer: 1500
            });
    } else {
        Swal.fire({
                icon: 'success',
                title: '문의가 등록되었습니다.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                let qnaModal = document.getElementById("modalQuestion");
                let modal = bootstrap.Modal.getInstance(qnaModal);
                modal.hide();

                document.getElementById("qna-subject").value = "";
                document.getElementById("qna-message").value = "";
                location.href = "/pages/board/qna/index.html?tab=product";
          })
        
    }
}

// Url clipboard
const shareLink = window.document.location.href;
function urlClipboard() {
    let dump = document.createElement("input");
    document.body.appendChild(dump).classList.add("opacity-0");
    dump.value = shareLink;
    dump.select();
    document.execCommand("copy");
    document.body.removeChild(dump);
    swal.fire({
            position: 'center',
            icon: 'success',
            title: '클립보드에 복사되었습니다.',
            showConfirmButton: false,
            timer: 1500,
        });
}

// account order
function order_complete() {
    swal.fire({
        position: 'center',
        icon: 'info',
        title: '구매확정 하시면 반품 및 교환이 되지 않습니다. <br>구매확정 하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#69b3fe',
        confirmButtonText: "구매확정",
        cancelButtonText: "취소",
      }).then((result) => {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: '구매확정 되었습니다.',
            showConfirmButton: false,
            timer: 1500,
        })
      });
}

// review
function openReview(prdTitle, prdImg) {
    // reset
    document.getElementById("review-message").value = "";
    document.querySelectorAll("input[type='file']").forEach(function(element){
        element.value = "";
    });
    document.querySelectorAll(".img-preview-box").forEach(function(element){
        element.innerHTML = "";
        element.className = "file-drop-icon ci-cloud-upload mt-2";
    });

    document.getElementById("reviewPrdImg").src = prdImg;
    document.getElementById("reviewPrdTitle").innerHTML = prdTitle;
	document.getElementById("btnWrite").disabled = false;

    const modal = new bootstrap.Modal(document.querySelector('#modalReview'));
    modal.show();
}

function review() {
    if (!document.getElementById("review-message").value) {
        swal.fire({
            position: 'center',
            icon: 'warning',
            title: '내용을 입력하세요.',
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }
    swal.fire({
        position: 'center',
        icon: 'success',
        title: '리뷰가 등록 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        window.location.href = "/pages/account_orderhistory/";
    });

    document.getElementById("btnWrite").disabled = true;
}

// file upload
$(document).ready(function () {
    var fileArea = document.querySelectorAll('.file-drop-area');
    var _loop2 = function _loop2(i) {
    var input = fileArea[i].querySelector('.file-drop-input'),
        icon = fileArea[i].querySelector('.file-drop-icon');
    input.addEventListener('change', function () {
        if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var fileName = input.files[0].name;
            if (fileData.startsWith('data:image')) {
            var image = new Image();
            image.src = fileData;
            image.onload = function () {
                icon.className = 'img-preview-box';
                icon.innerHTML = '<img src="' + image.src + '" alt="' + fileName + '">';
            };
            }
        };
        reader.readAsDataURL(input.files[0]);
        }
    });
    };
    for (var i = 0; i < fileArea.length; i++) {
    _loop2(i);
    }
});

// qna add
function qnaAdd(event) {
    event.preventDefault(); 

    const form = document.getElementById('qnaForm');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');     
        return false; 
    }
    
    form.classList.remove('was-validated'); 
    
    swal.fire({
        position: 'center',
        icon: 'success',
        title: '등록되었습니다',
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        window.location.href = "/pages/account_qna/";
    });
}

// qna del
function qnaDel() {
    Swal.fire({
        title: "문의를 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fe696a",
        confirmButtonText: "예",
        cancelButtonText: "취소"
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: '삭제 되었습니다.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "/pages/accßount_qna/";
        });   
    });
}