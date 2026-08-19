const CORRECT_PIN = "5048";

const pinScreen = document.getElementById("pin-screen");
const mainPage = document.getElementById("main-page");

const pinInput = document.getElementById("pin-input");
const pinButton = document.getElementById("pin-button");
const pinError = document.getElementById("pin-error");

const content = document.getElementById("content");

const menuItems =
  document.querySelectorAll(".menu-item");

const submenuItems =
  document.querySelectorAll(".submenu-item");


/* =========================================
   아이콘 초기화
========================================= */

function refreshIcons() {

  if (window.lucide) {

    lucide.createIcons();

  }

}


/* =========================================
   공통 서식 화면
========================================= */

function showFormsCategory(
  title,
  description
) {

  content.innerHTML = `

    <h1>${title}</h1>

    <p>
      ${description}
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
   AI 기본교육과정 개발·운영 관련 서식
========================================= */

function showAiBasicFormsPage() {

  showFormsCategory(

    "AI 기본교육과정 개발·운영 관련 서식",

    "대학 AI 기본교육과정 개발 및 운영에 필요한 서식을 확인하고 다운로드할 수 있습니다."

  );

}


/* =========================================
   교수자 AI 역량 강화 프로그램 관련 서식
========================================= */

function showInstructorAiFormsPage() {

  showFormsCategory(

    "교수자 AI 역량 강화 프로그램 관련 서식",

    "교수자 AI 역량 강화 프로그램 운영에 필요한 서식을 확인하고 다운로드할 수 있습니다."

  );

}


/* =========================================
   예산 집행 시 필요 서식
========================================= */

function showBudgetFormsPage() {

  showFormsCategory(

    "예산 집행 시 필요 서식",

    "대학 AI 기본교육과정 개발 지원 사업의 예산 집행에 필요한 서식을 확인하고 다운로드할 수 있습니다."

  );

}


/* =========================================
   기존 서식 다운로드 기본 화면
========================================= */

function showFormsPage() {

  showAiBasicFormsPage();

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
   메뉴 활성화
========================================= */

function setActiveMenu(page) {


  menuItems.forEach(
    function(item) {

      item.classList.remove("active");

    }
  );


  submenuItems.forEach(
    function(item) {

      item.classList.remove("active");

    }
  );


  /* 서식 관련 페이지라면
     서식 다운로드 상위 메뉴 활성화 */

  if (
    page === "forms" ||
    page === "ai-basic-forms" ||
    page === "instructor-ai-forms" ||
    page === "budget-forms"
  ) {

    const formsMenu =
      document.querySelector(
        '.menu-item[data-page="forms"]'
      );

    if (formsMenu) {

      formsMenu.classList.add("active");

    }

  }


  /* 하위 메뉴 활성화 */

  const submenu =
    document.querySelector(
      `.submenu-item[data-page="${page}"]`
    );


  if (submenu) {

    submenu.classList.add("active");

  }


  /* 문의처 */

  if (page === "contact") {

    const contactMenu =
      document.querySelector(
        '.menu-item[data-page="contact"]'
      );

    if (contactMenu) {

      contactMenu.classList.add("active");

    }

  }

}


/* =========================================
   페이지 이동
========================================= */

function showPage(page) {


  if (page === "forms") {

    showFormsPage();

  }


  if (page === "ai-basic-forms") {

    showAiBasicFormsPage();

  }


  if (page === "instructor-ai-forms") {

    showInstructorAiFormsPage();

  }


  if (page === "budget-forms") {

    showBudgetFormsPage();

  }


  if (page === "contact") {

    showContactPage();

  }


  setActiveMenu(page);

}


/* =========================================
   PIN 인증
========================================= */

function checkPin() {

  const enteredPin =
    pinInput.value.trim();


  if (enteredPin === CORRECT_PIN) {

    pinScreen.style.display = "none";

    mainPage.style.display = "block";

    pinError.textContent = "";


    showPage("ai-basic-forms");


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
   상위 메뉴 클릭
========================================= */

menuItems.forEach(
  function(item) {

    item.addEventListener(
      "click",
      function(event) {

        event.preventDefault();


        const page =
          item.getAttribute("data-page");


        showPage(page);

      }
    );

  }
);


/* =========================================
   하위 메뉴 클릭
========================================= */

submenuItems.forEach(
  function(item) {

    item.addEventListener(
      "click",
      function(event) {

        event.preventDefault();


        const page =
          item.getAttribute("data-page");


        showPage(page);

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
