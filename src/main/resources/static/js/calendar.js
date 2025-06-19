document.addEventListener("DOMContentLoaded", () => {
    const monthTitle = document.querySelector(".month-title");
    const calendarBody = document.querySelector(".calendar-table tbody");
    const prevBtn = document.querySelectorAll(".month-btn")[0];
    const nextBtn = document.querySelectorAll(".month-btn")[1];
    const tabs = document.querySelectorAll(".tab");

    let currentDate = new Date();
    let currentTab = '일정';

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthTitle.textContent = `${year}년 ${month + 1}월`;

        // 달력 시작 요일과 끝 날짜 구하기
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 이전 달 날짜 채우기 위해
        const prevLastDate = new Date(year, month, 0).getDate();

        // 전체 6행(6주 = 42칸)
        const cells = [];
        for (let i = 0; i < 42; i++) {
            let day = '';
            let isCurrentMonth = false;

            if (i < firstDay) {
                day = prevLastDate - (firstDay - i - 1);
            } else if (i >= firstDay && i < firstDay + lastDate) {
                day = i - firstDay + 1;
                isCurrentMonth = true;
            } else {
                day = i - (firstDay + lastDate) + 1;
            }

            cells.push({ day, isCurrentMonth });
        }

        // tbody 생성
        calendarBody.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const idx = i * 7 + j;
                const td = document.createElement("td");
                td.classList.toggle('dimmed', !cells[idx].isCurrentMonth);

                const cell = document.createElement("div");
                cell.className = "cell";
                cell.innerHTML = `
          <div class="cell-top">${cells[idx].day}</div>
        `;

                // 셀 클릭 이벤트
                cell.addEventListener('click', () => {
                    const input = prompt(`${cells[idx].day}일 ${currentTab} 내용 입력:`);
                    if (input !== null) {
                        cell.querySelector('.cell-bottom').textContent = input;
                    }
                });

                td.appendChild(cell);
                tr.appendChild(td);
            }
            calendarBody.appendChild(tr);
        }
    }

    // 월 이동
    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // 탭 전환
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentTab = tab.textContent;
            renderCalendar();
        });
    });

    // 초기 렌더링
    renderCalendar();
});
