// 햄버거 모바일 메뉴버튼
const profileBox = document.getElementById('profile_wrap');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    profileBox.classList.toggle('active');
    hamburger.classList.toggle('active');
});





// 탭버튼
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(c => c.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});






// 아코디언
const accHeaders = document.querySelectorAll('.tab-accordion .accordion-header');
accHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.tab-accordion .accordion-item.active').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});





// GNB 부드럽게
document.querySelectorAll('.gnb a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.getElementById('menu').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});
// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};






// 이력, 수상
// 타임라인
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px" // 화면 하단 10% 이전에 시작
  });

  // 모든 타임라인 섹션 감지
  document.querySelectorAll(".timeline").forEach(tl => observer.observe(tl));
});






// Skills animation (circular progress bar + counting number)
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const percent = circle.dataset.percent;
            const circumference = 2 * Math.PI * circle.r.baseVal.value;
            const offset = circumference - (percent / 100) * circumference;
            
            // 원형 프로그레스 바 애니메이션
            circle.style.strokeDashoffset = offset;
            
            // 숫자 카운팅 애니메이션
            const percentText = circle.closest('.skill').querySelector('.percent');
            let currentPercent = 0;
            const duration = 2000; // 2초
            const increment = percent / (duration / 16); // 60fps 기준
            
            const counter = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= percent) {
                    currentPercent = percent;
                    clearInterval(counter);
                }
                percentText.textContent = Math.round(currentPercent) + '%';
            }, 16);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill .progress').forEach(circle => {
    skillObserver.observe(circle);
});