const CORRECT_PIN = "5048";

const pinScreen = document.getElementById("pin-screen");
const mainPage = document.getElementById("main-page");

const pinInput = document.getElementById("pin-input");
const pinButton = document.getElementById("pin-button");
const pinError = document.getElementById("pin-error");

const content = document.getElementById("content");

const menuItems = document.querySelectorAll(".menu-item");


/* =========================================
   아이콘 초기화
========================================= */

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}


/* =========================================
   자료실 화면
========================================= */

function showFormsPage() {

  content.innerHTML = `

    <h1>서식 다운로드</h1>

    <p>
      대학 AI 기본교육과정 개발 지원 사업의
      사업비 집행에 필요한 서식을 확인하고 다운로드할 수 있습니다.
    </p>


    <div class="content-box">


      <div class="file-item">

        <div class="file-info">

          <div class="file-icon">
            <i data-lucide="file-text"></i>
          </div>


          <div class="file-text">

            <div class="file-name">
              서식 파일
              <span class="file-type">
                준비 중
              </span>
            </div>


            <div class="file-description">
              실제 서식 파일은 추후 등록 예정입니다.
            </div>

          </div>

        </div>


        <a
          href="#"
          class="download-button"
          onclick="return false;"
        >

          <i data-lucide="download"></i>

          <span>
            다운로드
          </span>

        </a>

      </div>


    </div>

  `;

  refreshIcons();
}


/* =========================================
   문의처 화면
========================================= */

function showContactPage() {

  content.innerHTML = `

    <h1>문의처</h1>

    <p>
      사업비 집행과 관련하여 문의사항이 있는 경우
      아래 담당자에게 문의해주시기 바랍니다.
    </p>


    <div class="contact-box">


      <div class="contact-row">

        <div class="contact-label">
          예산 집행 담당자
        </div>


        <div class="contact-value">
          교수·학습센터 이재현 전임연구원
        </div>

      </div>



      <div class="contact-row">

        <div class="contact-label">
          연락처
        </div>


        <div class="contact-value">

          <a
            href="tel:02-970-5048"
            class="contact-link"
          >
            02-970-5048
          </a>

        </div>

      </div>



      <div class="contact-row">

        <div class="contact-label">
          이메일
        </div>


        <div class="contact-value">

          <a
            href="mailto:jhyeon@swu.ac.kr"
            class="contact-link"
          >
            jhyeon@swu.ac.kr
          </a>

        </div>

      </div>


    </div>

  `;

  refreshIcons();
}


/* =========================================
   PIN 인증
========================================= */

function checkPin() {

  const enteredPin = pinInput.value.trim();


  if (enteredPin === CORRECT_PIN) {

    pinScreen.style.display = "none";

    mainPage.style.display = "block";

    pinError.textContent = "";

    showFormsPage();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  pinError.textContent =
    "PIN 번호가 올바르지 않습니다.";


  pinInput.value = "";

  pinInput.focus();
}


/* =========================================
   PIN 버튼 클릭
========================================= */

pinButton.addEventListener(
  "click",
  checkPin
);


/* =========================================
   Enter 키로 PIN 인증
========================================= */

pinInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      checkPin();

    }

  }
);


/* =========================================
   메뉴 클릭
========================================= */

menuItems.forEach(
  function(item) {

    item.addEventListener(
      "click",
      function(event) {

        event.preventDefault();


        menuItems.forEach(
          function(menu) {

            menu.classList.remove(
              "active"
            );

          }
        );


        item.classList.add("active");


        const page =
          item.getAttribute("data-page");


        if (page === "forms") {

          showFormsPage();

        }


        if (page === "contact") {

          showContactPage();

        }

      }
    );

  }
);


/* =========================================
   처음 로딩될 때
========================================= */

showFormsPage();

refreshIcons();

pinInput.focus();
