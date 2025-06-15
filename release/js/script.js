const App = {
  init() {
    //this.initIntro();
    this.initDarkMode();
    this.initScrollTopButton();
    this.initScrollAni();
    this.initStickyHeader();
  },
  
  initIntro() {
    gsap.registerPlugin(ScrollTrigger);
    const t1 = gsap.timeline();

    // intro 진입
    t1.from('.intro', {
      opacity: 0, y: 50, duration: 1
    })
  
    // intro 유지 후 main 사라짐
    .to('.intro', {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      onComplete: () => {
        document.querySelector('.intro').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
        ScrollTrigger.refresh();
        App.initScrollAni();
      }
    })
  
    // 본문(content) 등장
    .from('.content', {
      opacity: 0,
      duration: 0.3
    });
  },

  initDarkMode() {
    const toggleBtn = document.getElementById('modeToggle');

    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };
  
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
  
    toggleBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  },

  initScrollTopButton() {
    const btn = document.getElementById('scrollTopBtn');

    // 스크롤 위치 감지
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      btn.classList.toggle('show', scrolled > 200);
    });
  
    // 버튼 클릭 시 위로 이동
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  
  initScrollAni() {
    gsap.utils.toArray('.ani').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', // 요소가 viewport 80%쯤 왔을 때 실행
          toggleActions: 'play none none none'
        }
      });
    });
  },

  initStickyHeader() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      if (scrolled > 20) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    });
  }

}

document.addEventListener('DOMContentLoaded', () => {App.init()});