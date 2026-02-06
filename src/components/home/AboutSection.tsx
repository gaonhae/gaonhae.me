export function AboutSection() {
  const stats = [
    { value: "4+", label: "프로젝트" },
    { value: "20+", label: "블로그 포스트" },
    { value: "365", label: "일일 루틴" },
  ];

  return (
    <section className="w-full max-w-[1200px] px-6 py-24 flex flex-col items-center text-center">
      <div className="max-w-[800px] space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
          About Me
        </h2>
        <p className="text-muted-foreground text-xl font-light leading-relaxed">
          단순 포트폴리오를 넘어, 개발 프로젝트부터 자기관리까지 모든 과정을 기록하고 공유하는
          개인 브랜드 플랫폼입니다. &quot;성장형 메이커&quot;로서 배움과 성장의 여정을 함께 나누며,
          깔끔하고 유지보수 가능한 코드로 실질적인 문제를 해결하는 것을 추구합니다.
        </p>

        <div className="flex flex-wrap justify-center gap-10 pt-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl font-black text-primary">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
