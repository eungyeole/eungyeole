# Sandbox authoring

샌드박스는 별도 목록이나 라우트에 등록하지 않고 MDX 파일 하나로 작성합니다.

```sh
pnpm sandbox:new spring-tabs "Spring Tabs"
```

제목을 생략하면 slug를 제목 형태로 바꿉니다. 위 예시에서 제목을 생략해도 `Spring Tabs`가 됩니다. slug는
`spring-tabs`처럼 소문자, 숫자, 하이픈만 사용한 kebab-case여야 하며, 같은 파일이 있으면 덮어쓰지 않습니다.

명령을 실행하면 `src/sandboxes/<slug>.mdx`에 비공개 초안이 생깁니다.

## 작성 순서

1. 생성된 MDX의 한국어·영어 설명과 태그를 채웁니다.
2. 본문에 작업의 맥락, 시도한 내용, 배운 점을 적습니다.
3. 인터랙티브 데모가 필요하면 파일 안의 예시처럼 컴포넌트를 `Preview`로 내보냅니다.
4. 공개할 준비가 되면 `draft`를 `false`로 바꿉니다.

## Metadata

- `title`: 화면에 표시할 제목
- `description.ko`, `description.en`: 언어별 한 줄 설명
- `createdAt`: 생성일 (`YYYY-MM-DD`)
- `kind`: 기본값 `experiment`
- `order`: 목록에서 사용할 정렬 우선순위
- `layout`: 카드 크기. 새 글은 `half`로 시작
- `draft`: `true`인 동안 공개 목록에서 제외
- `tags`: 관련 기술이나 주제를 담는 문자열 배열

도움말은 다음처럼 확인할 수 있습니다.

```sh
pnpm sandbox:new --help
```
