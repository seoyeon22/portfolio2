document.addEventListener("DOMContentLoaded", function() {

    // Intersection Observer 생성
    const observer = new IntersectionObserver(
        (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            // 화면에 들어옴
            entry.target.classList.add("fade-in");
            } else {
            // 화면에서 나감
            entry.target.classList.remove("fade-in");
            }
        });
        },
        // 화면에서 해당 요소가 10% 이상 보일 경우 화면에 들어온 것으로 판단함
        { threshold: 0.05 }
    );

    // 관찰 대상 설정
    const targetElements = document.querySelectorAll(".fade-wrap");
    targetElements.forEach((element) => {
        observer.observe(element);
    });

    // 네비게이션 링크
    const navLinks = document.querySelectorAll('.nav_menu');

    // 각 섹션의 위치를 계산하기 위한 함수
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
    }
    
    // 현재 구역인지 판단하는 함수
    function currentSection(el) {
        const rect = el.getBoundingClientRect();
        if(rect.top <= 80 && rect.top + rect.height > 0){
            return true;
        }
        return false
    }

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        
        // 각 섹션을 순회하면서 현재 보이는 섹션을 확인
        navLinks.forEach(link => {
            const section = document.querySelector(link.hash);
            
            if (
                currentSection(section)
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // 각 링크에 클릭 이벤트 리스너를 추가하여 해당 섹션으로 스크롤
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const targetOffset = getOffset(targetElement);
            
            window.scrollTo({
                top: targetOffset - 70,
                behavior: 'smooth' // 부드러운 스크롤 효과
            });
        });
    });
});