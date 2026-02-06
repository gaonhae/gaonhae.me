export function AboutSection() {
  const stats = [
    { value: "4+", label: "프로젝트" },
    { value: "20+", label: "블로그 포스트" },
    { value: "365", label: "일일 루틴" },
  ];

  return (
    <section className="w-full max-w-[1200px] px-6 py-24 flex flex-col items-center text-center">
      <div className="max-w-[800px] space-y-8">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-20">
          Welcome to my own stage!
        </h2>
        <p className="text-muted-foreground text-xl font-light leading-relaxed">
          이 페이지는 단순히 제 경제적 쓸모를 증명하기 위한 것이 아닙니다.  <br />
          잠에 들어서마저 멈출 줄 모르는 제 생각들이 온전히 담긴 그릇입니다. <br />
          저는 여러분들에게 제 철학을 말하고, 여러분들은 꾸밈없는 저를 보게 되는 것입니다. <br />
          모를 일이지만, 아마 꽤 흥미로울 겁니다.
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
