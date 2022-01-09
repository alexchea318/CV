<!DOCTYPE html>
<html>
 <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Frontend разработчик Александр Чеченев</title>
    <link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/mobile.css">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&family=Roboto&display=swap" rel="stylesheet">
    <script src="script.js"></script>
 </head>

 <body>

  <section id="hero">
    <header id="menu">
      <nav id="menu_content">
        <img src="img/favicon.png">
        <ul id="menu_list">
          <li><a href="#about">Обо мне</a></li>
          <li><a href="#projects">Проекты</a></li>
          <li><a href="#stack">Стек</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
        <div id="menu_selector" onclick="open_menu();">
          <div id="selector_1"></div>
          <div id="selector_2"></div>
          <div id="selector_3"></div>
        </div>
      </nav>
    </header>

    <div id="intro">
        <div id="left_intro">
          <h1>Frontend разработчик</h1>
          <h2>Чеченев Александр</h2>
        </div>
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_1LhsaB.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
    </div>
    <a class="mouse" href="#about"><lottie-player src="https://assets10.lottiefiles.com/packages/lf20_66CQcm.json" 
      background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop  autoplay></lottie-player></a>
  </section>

  <section class="sect" id="about">
    <h2>Обо мне</h2>
    <div class="block">
        <div>
        <p>Меня зовут Чеченев Александр. Возраст: 19 лет, живу в Санкт-Петербурге, студент третьего курса Политеха (СПБПУ), учусь на специальности "Информационно-аналитические системы безопасности."</p>
        <p>Обожаю дизайн, веб-разработку и проектировать интерфейсы. Ценю минимализм, простоту и удобство.</p>
        <p>Моя специальность, в основном, связана с низкоуровневым программированием, 
            но также хорошо я владею современным стеком веб-разбработки, работая фронтендером на фрилансе (создаю сайты под ключ).</p>
        <p>В повседневной жизни пишу на C/C++ и Python.
           Владею основными алгоритмами, структурами данных, регулярными выражениями и разделами математики, связанными с программированием: матанализом, дискретной, матлогикой и статистикой.</p>
        <p>Незаисимо от языка программирования, всегда пишу эффективный код: выношу инварианты, оцениваю сложность алгоритмов, не сортирую пузырьком =).</p>
        </div>
        <img src="img/Chechenev Alexander.jpg" alt="Моя фотка"> 
    </div>
  </section> 
  
  <section class="sect" id="projects">
    <h2>Проекты</h2>
    <div class="projects">
        <a href="https://findly.info/">
          <div class="project_cell">
            <iframe id="iframe" style="border-radius: 5px;" src="https://www.youtube.com/embed/uiTfmFCLXPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>Новостной сервис Findly</h3>
            <p>Findly - прогрессивное приложение (работает на всех платформах), которое ищет интересные новости и факты из них в режиме реального времени.
              Ежедневные подобрки размещаются на сайте, а для пользователей всегда доступен бот, который работает как поисковая система - достаточно ввести любой запрос и получить краткую информацию.</p>
          </div>
        </a>

        <a href="https://alexchea318.github.io/vk_test_task/">
          <div class="project_cell">
            <img style="border: 1px solid #fff" src="img/pc.png">
            <h3>Тестовое задание для ВКонтакте</h3>
            <p>Адаптивный чат, полностью копирующий дизайн ВКонтакте с возможностью вставки эмодзи и отправки сообщений. Также необходимо было реализовать подсветку почт, хештегов и упоминаний в поисковой строке.</p>
          </div>
        </a>

        <a href="https://difmedia.ru/">
          <div class="project_cell">
            <img style="border-radius: 5px;" src="img/dif.png">
            <h3>Студия Difmedia</h3>
            <p>Сайт для собственной студии Difmedia, которая занимается созданием сайтов под ключ.</p>
          </div>
        </a>
    </div>
  </section>
 
  <section class="sect" id="stack">
    <h2>Cтек технологий</h2>
    <div class="stack">
        <div class="cell"><h3>Дизайн</h3><p>Figma, Photoshop, Illustrator</p></div>
        <div class="cell"><h3>Вёрстка</h3><p>HTML, CSS</p></div>
        <div class="cell"><h3>Программирование</h3><p>JS, Python, C/C++, PHP, Assembler</p></div>
    </div>
    <p>Есть опыт работы с Git, React, Wordpress, Tilda, Apache, базами данных и разработки под Linux.</p>
  </section>
  
  <section class="sect" id="contacts">
    <h2 style="margin-top: -20px;">Контакты</h2>
    <div class="contacts">
        <a href="tel:+79312023110"><div class="cell"><h3>+7 (931) 202 31 10</h3><p>Телефон</p></div></a>
        <a href="mailto:alexchea319@gmail.com"><div class="cell"><h3>alexchea319@gmail.com</h3><p>Почта</p></div></a>
        <a href="https://vk.me/schechenev"><div class="cell"><h3>@schechenev</h3><p>ВКонтакте</p></div></a>
    </div>
  </section>
  
  <a href="#">
      <div id="to_top">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 448 512">
              <path fill="rgb(59, 59, 59)" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 
              22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569
               0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg></div>
  </a>

  <footer>
    <span>© Чеченев Александр Дмитриевич, 2021 год</span>
  </footer>
 </body>
</html>
