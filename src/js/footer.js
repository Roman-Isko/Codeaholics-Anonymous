export function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container footer-container">
      <!-- 1) Логотип -->
      <div class="footer-left">
        <a href="#root" class="footer-logo" aria-label="Go to top">
          <img src="/src/assets/images/logo-light.svg" alt="ArtistsHub Logo" class="footer-logo-img" />
        </a>
      </div>

      <!-- 2) Блок навігації -->
      <nav class="footer-center" aria-label="Footer navigation">
        <ul class="footer-nav">
          <li><a href="#artists">Artists</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#feedback">Reviews</a></li>
        </ul>
      </nav>

      <!-- 3) Іконки соцмереж -->
      <div class="footer-right" aria-label="Social media links">
        <ul class="footer-socials">
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/src/assets/images/icon-facebook.svg" alt="" class="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/src/assets/images/icon-instagram.svg" alt="" class="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src="/src/assets/images/icon-youtube.svg" alt="" class="social-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 4) Авторські права -->
    <p class="footer-copy">© ${year} ArtistsHub. All rights reserved.</p>
  `;

  // Плавний скрол для внутрішніх посилань
  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  footer.querySelectorAll(".footer-nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Клік по логотипу → на початок сторінки
  footer.querySelector(".footer-logo").addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return footer;
}