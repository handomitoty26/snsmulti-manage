# 멀티 SNS 수익화 관리자 Pro v8.1 개인용 간소화판

이 버전은 혼자 사용하는 개인용 GitHub Pages 배포에 맞춰 파일 구조를 단순화한 버전입니다.

## 핵심 변경

- `app.js`와 `style.css`를 `index.html` 안으로 통합했습니다.
- 처음 GitHub 등록 시 실행용 파일은 4개만 올리면 됩니다.
- 이후 대부분의 업그레이드는 `index.html`만 교체하면 됩니다.
- 데이터는 기존처럼 브라우저 `localStorage`에 저장됩니다.
- JSON 백업/복원 기능은 유지됩니다.
- 자동 크롤링, 자동 게시, ChatGPT/Gemini API 연동은 없습니다.

## 처음 GitHub에 올릴 파일

```text
index.html
manifest.json
service-worker.js
icon.svg
```

## 이후 업그레이드 방법

1. 프로그램에서 JSON 백업을 먼저 저장합니다.
2. 새 버전의 `index.html` 파일을 받습니다.
3. GitHub 저장소에서 기존 `index.html`을 새 파일로 교체합니다.
4. Commit changes를 누릅니다.
5. GitHub Pages 주소를 새로고침합니다.
6. 예전 화면이 보이면 브라우저 새로고침 또는 사이트 데이터 새로 읽기를 실행합니다.

## 주의

`localStorage` 데이터는 GitHub 서버가 아니라 현재 브라우저에 저장됩니다. 기기 변경, 브라우저 데이터 삭제, 업데이트 전에는 반드시 JSON 백업을 저장하세요.
