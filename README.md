# gaonhae.me - 개인 브랜드 플랫폼

**gaonhae.me**는 기획-개발-운영-자기관리가 통합된 성장형 메이커의 개인 브랜드 플랫폼입니다.

## 🎯 핵심 가치

단순 포트폴리오를 넘어, 개발 프로젝트부터 자기관리까지 모든 과정을 기록하고 공유하는 플랫폼입니다.

## ✨ 주요 기능

### 1. 포트폴리오 섹션
- 프로젝트 카드 그리드
- MDX 기반 프로젝트 상세 페이지
- 기술 스택 태그
- GitHub 및 Live URL 링크

### 2. 기술 블로그
- MDX 렌더링 (코드 하이라이팅, LaTeX 수식)
- 카테고리 분류 (Dev, Product, Life)
- 태그 기반 필터링
- SEO 최적화

### 3. 자기관리 대시보드
- 깃허브 잔디 스타일 습관 시각화
- Recharts 기반 진척도 차트
- 일일 루틴 위젯

## 🛠️ 기술 스택

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict 모드)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Backend/DB**: Supabase (PostgreSQL)
- **Content**: MDX (코드 하이라이팅, LaTeX)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase 데이터베이스 설정

Supabase 대시보드의 SQL 에디터에서 `supabase-schema.sql` 파일을 실행하세요.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
gaonhae.me/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # 메인 레이아웃 그룹
│   │   │   ├── page.tsx       # 홈 대시보드
│   │   │   ├── blog/          # 블로그 페이지
│   │   │   ├── projects/      # 프로젝트 페이지
│   │   │   └── habits/        # 습관 트래커
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/
│   │   ├── ui/                # Shadcn UI
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── home/              # HeroSection, RoutineWidget
│   │   ├── projects/          # ProjectCard, ProjectGrid
│   │   ├── blog/              # PostCard, MDXContent
│   │   └── habits/            # ConsistencyGrid, ProgressChart
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   └── mdx/               # MDX utilities
│   ├── actions/               # Server Actions
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
├── content/                   # MDX 콘텐츠
│   ├── blog/
│   └── projects/
└── public/                    # Static assets
```

## 📝 콘텐츠 작성

### 블로그 포스트 작성

`content/blog/` 디렉토리에 `.mdx` 파일을 생성하세요:

```mdx
---
title: "포스트 제목"
date: "2024-02-06"
description: "포스트 설명"
category: "Dev"
tags: ["nextjs", "react"]
published: true
---

# 내용 시작

여기에 Markdown/MDX 콘텐츠를 작성하세요.
```

### 프로젝트 작성

1. Supabase에 프로젝트 데이터 추가
2. `content/projects/` 디렉토리에 상세 설명 MDX 파일 생성

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: #74A12E (녹색)
- **Background Light**: #f7f7f6
- **Background Dark**: #1a1c16
- **Text Light**: #151513
- **Text Dark**: #f3f3f2

### 폰트

- **Primary**: Inter (300-900)

## 🔧 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 📦 배포

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 임포트
3. 환경 변수 설정
4. 배포!

## 📚 참고 문서

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [MDX](https://mdxjs.com)
- [Recharts](https://recharts.org)

## 📄 라이선스

MIT License

---

Made with ❤️ by 가온해
