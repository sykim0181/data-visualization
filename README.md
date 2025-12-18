이 프로젝트는 10만 건 이상의 Sales 데이터를 시각화하고, 대규모 리스트 렌더링을 위해 가상 리스트(Virtualized List) 기법을 직접 구현해본 데모입니다.
대규모 데이터에서 발생하는 UI 렌더링 문제를 체감하고 가상 리스트의 내부 동작을 직접 구현하며 이해하고자 만들어보았습니다.

https://data-visualization-ivory.vercel.app/

---

## 🖥️ 기술 스택

* Next.js 16
* TypeScript
* React Virtual
* Recharts

---

## 🚀 주요 기능

### 🔹 데이터 시각화 (홈 페이지 `/`)

* 월별 매출/수익 (Bar + Line Chart)
* 국가 기준 Top 10 매출 (Bar Chart)
* 상품군 비중 분석 (Pie Chart)
* 핵심 분석 지표(KPI) 카드
* 테이블

### 🔹 가상 리스트 데모 (/example)

| 경로                                     | 설명                                  |
| -------------------------------------- | ----------------------------------- |
| `/example/default`                     | 가상화 없이 모든 행을 렌더링 (비교용)              |
| `/example/library`                     | React Virtual 라이브러리 기반 가상리스트        |
| `/example/my-virtual-same-height`      | 직접 구현 — 고정 높이 행                     |
| `/example/my-virtual-different-height` | 직접 구현 — 가변 높이 행                     |
| `/example/my-virtual-dynamic-height`   | 직접 구현 — 동적 높이 행 (ResizeObserver 활용) |
