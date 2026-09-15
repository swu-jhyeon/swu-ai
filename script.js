```javascript
const CORRECT_PIN = "5048";


/* =========================================
   요소 가져오기
========================================= */

const pinScreen =
  document.getElementById("pin-screen");

const mainPage =
  document.getElementById("main-page");

const pinInput =
  document.getElementById("pin-input");

const pinButton =
  document.getElementById("pin-button");

const pinError =
  document.getElementById("pin-error");

const content =
  document.getElementById("content");

const menuItems =
  document.querySelectorAll(".menu-item");


/* =========================================
   아이콘
========================================= */

function refreshIcons() {

  if (
    window.lucide &&
    typeof window.lucide.createIcons === "function"
  ) {

    window.lucide.createIcons();

  }

}


/* =========================================
   서식 목록 화면
========================================= */

function showFormsPage(
  title,
  description,
  files
) {

  let fileList = "";


  files.forEach(
    function(file) {

      let button = "";


      if (file.link) {

        button = `
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
        `;

      } else {

        button = `
          <span
            class="download-button disabled"
          >

            <i data-lucide="clock-3"></i>

            <span>
              준비 중
            </span>

          </span>
        `;

      }


      fileList += `

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


          ${button}

        </div>

      `;

    }
  );


  content.innerHTML = `

    <h1>
      ${title}
    </h1>


    <p>
      ${description}
    </p>


    ${
      files.length > 0
      ?
      `
      <div class="content-box">
        ${fileList}
      </div>
      `
      :
      ""
    }

  `;


  refreshIcons();

}


/* =========================================
   문의처
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


  /* 메뉴 active 상태 */

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
     1. AI 기본교육과정 개발·운영
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

    return;

  }


  /* -----------------------------------------
     2. 교수자 AI 역량 강화 프로그램
     
     기존 파일 삭제
     → 파일 목록 없음
  ----------------------------------------- */

  if (page === "instructor") {

    showFormsPage(

      "교수자 AI 역량 강화 프로그램 관련 서식",

      "교수자 AI 역량 강화 프로그램 운영에 필요한 서식을 확인하고 다운로드할 수 있습니다.",

      []

    );

    return;

  }


  /* -----------------------------------------
     3. 예산 집행 시 필요 서식
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

    return;

  }


  /* -----------------------------------------
     4. 문의처
  ----------------------------------------- */

  if (page === "contact") {

    showContactPage();

    return;

  }

}


/* =========================================
   PIN 확인
========================================= */

function checkPin() {

  const enteredPin =
    pinInput.value.trim();


  if (enteredPin === CORRECT_PIN) {

    pinScreen.style.display = "none";

    mainPage.style.display = "block";

    pinError.textContent = "";

    showPage("ai-basic");

    window.scrollTo(0, 0);

    return;

  }


  pinError.textContent =
    "PIN 번호가 올바르지 않습니다.";

  pinInput.value = "";

  pinInput.focus();

}


/* =========================================
   PIN 버튼
========================================= */

pinButton.addEventListener(
  "click",
  checkPin
);


/* =========================================
   Enter 키
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
   메뉴 버튼
========================================= */

menuItems.forEach(
  function(item) {

    item.addEventListener(
      "click",
      function() {

        const page =
          item.getAttribute("data-page");

        showPage(page);

      }
    );

  }
);


/* =========================================
   최초 실행
========================================= */

showPage("ai-basic");

refreshIcons();

pinInput.focus();
```
