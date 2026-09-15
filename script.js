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
   서식 화면
========================================= */

function showFormsPage(
  title,
  description,
  files
) {

  const fileList = files.map(
    function(file) {

      return `

        <div class="file-item">

          <div class="file-info">

            <div class="file-icon">

              <i data-lucide="file-text"></i>

            </div>


            <div class="file-text">

              <div class="file-name">
                ${file.name}
              </div>

            </div>

          </div>


          ${
            file.link
            ?
            `
            <a
              href="${file.link}"
              class="download-button"
              download
            >

              <i data-lucide="download"></i>

              <span>
                다운로드
              </span>

            </a>
            `
            :
            `
            <span
              class="download-button"
              style="
                background:#d8cdd1;
                cursor:default;
              "
            >

              <i data-lucide="clock-3"></i>

              <span>
                준비 중
              </span>

            </span>
            `
          }

        </div>

      `;

    }
  ).join("");


  content.innerHTML = `

    <h1>
      ${title}
    </h1>


    <p>
      ${description}
    </p>


    <div class="content-box">

      ${fileList}

    </div>

  `;


  refreshIcons();

}


/* =========================================
   문의처 화면
========================================= */

function showContactPage() {

  content.innerHTML = `

    <h1>
      문의처
    </h1>


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
   페이지 전환
========================================= */

function showPage(page) {


  menuItems.forEach(
    function(item) {

      item.classList.remove("active");

    }
  );


  const selectedMenu =
    document.querySelector(
      `.menu-item[data-page="${page}"]`
    );


  if (selectedMenu) {

    selectedMenu.classList.add("active");

  }


  /* -----------------------------------------
     AI 기본교육과정 개발·운영 관련 서식
  ----------------------------------------- */

  if (page === "ai-basic") {

    showFormsPage(

      "AI 기본교육과정 개발·운영 관련 서식",

      "대학 AI 기본교육과정 개발 및 운영에 필요한 서식을 확인하고 다운로드할 수 있습니다.",

      [
        {
          name: "서식 파일",
          link: null
        }
      ]

    );

  }


  /* -----------------------------------------
     교수자 AI 역량 강화 프로그램 관련 서식
  ----------------------------------------- */

  if (page === "instructor") {

    showFormsPage(

      "교수자 AI 역량 강화 프로그램 관련 서식",

      "교수자 AI 역량 강화 프로그램 운영에 필요한 서식을 확인하고 다운로드할 수 있습니다.",

      [
        {
          name: "1. 프로그램 운영 계획(안) 양식",
          link: "프로그램_운영_계획(안)_양식.hwp"
        }
      ]

    );

  }


  /* -----------------------------------------
     예산 집행 시 필요 서식
  ----------------------------------------- */

  if (page === "budget") {

    showFormsPage(

      "예산 집행 시 필요 서식",

      "대학 AI 기본교육과정 개발 지원 사업의 예산 집행에 필요한 서식을 확인하고 다운로드할 수 있습니다.",

      [

        {
          name: "1. 보조인력 근무일지",
          link: null
        },

        {
          name: "2. 특강(강사)비",
          link: null
        },

        {
          name: "3. 특강 실시 계획서",
          link: null
        },

        {
          name: "4. 자문비",
          link: null
        },

        {
          name: "5. 멘토링비",
          link: null
        },

        {
          name: "6. 회의비",
          link: null
        },

        {
          name: "7. 간담회비",
          link: null
        }

      ]

    );

  }


  /* -----------------------------------------
     문의처
  ----------------------------------------- */

  if (page === "contact") {

    showContactPage();

  }

}


/* =========================================
   PIN 인증
========================================= */

function checkPin() {

  const enteredPin =
    pinInput.value.trim();


  if (enteredPin === CORRECT_PIN) {


    pinScreen.style.display =
      "none";


    mainPage.style.display =
      "block";


    pinError.textContent =
      "";


    showPage("ai-basic");


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


    return;

  }


  pinError.textContent =
    "PIN 번호가 올바르지 않습니다.";


  pinInput.value =
    "";


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

showPage("ai-basic");

refreshIcons();

pinInput.focus();
