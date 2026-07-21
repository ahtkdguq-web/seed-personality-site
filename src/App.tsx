import { useMemo, useState } from 'react'
import './App.css'

const questions = [
  '나는 모든 일을 개선하기 위해 깊이 생각해서 행동한다', '나는 다른 사람들보다 근면하며 책임감이 강하다', '나는 정직하고 자제력이 있는 사람이다', '나의 행동은 원칙에 기초를 둔다', '나는 완벽을 위해 끝까지 참고 노력한다', '나는 규칙을 잘 지키며 엄격하다', '나는 다른 사람들의 신임을 얻을 수 있다', '나는 정의감이 강하고 근면하다', '나는 주로 나의 양심과 이성에 따른다',
  '나는 다른 사람들과 함께 일하기를 더 좋아한다', '나의 관심사는 다른 사람들을 도와주는 것이다', '나는 사람들에게 칭찬을 잘 한다', '내 생각보다는 남의 생각에 공감할 때가 많다', '나는 친구들이 나에게 의지할 때 기분이 좋다', '나는 사람들을 관심 있게 대하고 보살피려 한다', '나는 사람들과 친해지려고 많이 노력하고 있다', '나는 타인의 만족을 위해 노력한다', '나는 타인의 호감을 얻기 위해 노력한다',
  '나는 나의 능력을 발휘하는데 많은 시간을 투자한다', '나는 과정보다는 결과를 중시한다', '나는 인간 중심적이기보다는 오히려 목표 중심적이다', '나는 적응력이 뛰어나 상황에 적절히 대응한다', '나는 사람들에게 지나친 경쟁을 강요한다', '나는 사람들에 대한 배려보다 일의 성취를 중요하게 생각한다', '나는 성공만이 애정을 획득할 수 있다고 믿는다', '나는 실패를 두려워하여 과장하는 경향이 있다', '나는 침체에 빠지지 않고 무엇인가를 끊임없이 행한다',
  '나는 감상적이어서 혼자 있을 때가 많다', '나는 혼자서 자신만의 고상한 취미를 즐긴다', '나는 낭만적이고 예술가적 기질이 있다', '나는 이방인처럼 느낄 때가 있다', '나는 다른 사람들과는 다른 독특한 감정을 가지고 있다', '나는 분위기에 약하고 자기 생각에 골몰하는 편이다', '나는 내 행동의 동기, 감정에 대해 회의적인 생각이 들 때가 있다', '나는 감동적인 것을 추구하다가 혼자 우울해지기도 한다', '나는 비현실적이며 몽상가적 기질을 가지고 있다',
  '나는 무엇인가에 집중하여 통찰한다', '나는 문제가 있으면 풀릴 때까지 그것만 골똘히 생각한다', '나는 공적인 것보다는 개인생활에 대한 관심이 많다', '나는 감정보다 이성을 추구한다', '나는 시간이나 돈을 아끼는 경향이 있다', '나의 관심사는 나를 둘러싼 세계를 이해하는 것이다', '나는 권위를 믿지 않고 규칙을 무시한다', '나는 지적이고 냉철하게 관찰하는 편이다', '나는 머리로 모든 것을 이해하고 판단한다',
  '나는 명확한 지침이 있을 때 일의 능률이 오른다', '나는 사랑하는 사람을 가끔 의심하는 경향이 있다', '나의 성공에 대해서도 가끔 평가절하하는 경향이 있다', '나는 잘 훈련되어 있어 조직이나 집단에 헌신할 수 있다', '나는 모든 일에서 안전을 중요하게 생각한다', '사람들은 내게 때로 용기가 필요하다고 말한다', '나는 결과에 대한 두려움 때문에 일을 질질 끄는 경우가 있다', '나는 충성할 만한 사람이라고 판단되면 헌신할 수 있다', '나는 친하게 지내는 사람과 영원한 우정을 유지하도록 노력한다',
  '나는 자발적으로 재미있는 일을 즐긴다', '나는 모험적이며 위험을 감수한다', '나는 끊임없이 변화하는 생활을 좋아한다', '나는 자극과 흥분을 유발하는 행동을 좋아한다', '나는 어린아이처럼 명랑하고 순진하다', '나는 미래에 대해 항상 열정을 가지고 있다', '나는 여러 가지 일들을 즐기며, 새로운 경험을 갈망한다', '나는 한 가지 일에 정착하기 어렵다', '나는 현실에 만족하지 않고 새로운 것을 추구한다',
  '나에게는 지도자로서의 기질이 있다', '나는 의사 결정을 할 때 적절히 지도력을 발휘한다', '나는 늘 강해야 된다고 생각한다', '나는 사람들에게 영향력 있는 사람이다', '나는 다른 사람들이 말하기 어려워하는 것을 이야기한다', '나는 공격적이고 자기주장이 강하다', '나는 사람들을 통제하려 한다', '나는 사람들을 지시하고 동기를 부여한다', '나는 강한 자신감으로 사람들을 설득시킨다',
  '나는 자기만족적이며 태평한 편이다', '나는 감정의 동요가 많지 않은 원만한 사람이다', '나는 안전한 해결책을 원하고 되도록 갈등을 피한다', '나는 친구들과 긴장을 풀고 마음 편하게 지낸다', '나는 사람들을 유쾌하고 편하게 대한다', '사람들은 나를 그냥 좋아한다', '나는 세상에 대해 낙관적인 편이다', '사람들이 하는 일은 각자의 몫이며, 나와 상관없는 일이다', '나는 조화로움을 추구하는 평화주의자이다',
]

const types = [
  ['1', '원칙을 세우는 개혁가', '바른 기준으로 더 나은 방향을 만듭니다.'], ['2', '마음을 돌보는 조력가', '사람의 필요를 섬세하게 살피고 연결합니다.'], ['3', '목표를 이루는 성취가', '명확한 목표와 에너지로 변화를 이끕니다.'], ['4', '고유함을 찾는 예술가', '깊은 감정과 상상력으로 나만의 의미를 만듭니다.'], ['5', '통찰을 쌓는 탐구자', '한 발 물러나 관찰하며 본질을 이해합니다.'], ['6', '신뢰를 지키는 충실가', '신중하게 위험을 살피고 든든한 관계를 만듭니다.'], ['7', '가능성을 여는 낙천가', '새로운 경험과 즐거움을 향해 활기차게 나아갑니다.'], ['8', '힘 있게 이끄는 지도자', '단단한 의지로 사람과 일을 보호하고 이끕니다.'], ['9', '조화를 만드는 평화가', '서로의 다름을 품으며 편안한 균형을 만듭니다.'],
] as const

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function App() {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'result'>('home')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0))
  const score = useMemo(() => types.map((_, index) => answers.slice(index * 9, index * 9 + 9).reduce((sum, value) => sum + value, 0)), [answers])
  const winner = score.indexOf(Math.max(...score))
  const current = questions[step]

  const startQuiz = () => { setScreen('quiz'); setStep(0); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const choose = (value: number) => {
    setAnswers((previous) => previous.map((answer, index) => index === step ? value : answer))
    if (step < questions.length - 1) window.setTimeout(() => setStep(step + 1), 130)
  }
  const resetQuiz = () => { setAnswers(Array(questions.length).fill(0)); setStep(0); setScreen('home') }

  if (screen === 'quiz') return <main className="quiz-page">
    <button className="brand plain" onClick={resetQuiz}><span>♧</span> SEED</button>
    <div className="quiz-shell">
      <div className="quiz-top"><span>성격 유형 검사</span><span>{step + 1} / {questions.length}</span></div>
      <div className="progress"><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
      <p className="eyebrow">나를 알아가는 작은 질문</p>
      <h1>{current}</h1>
      <p className="hint">평소의 나와 가장 가까운 답을 선택해 주세요.</p>
      <div className="answers">{[['매우 그렇다', 5], ['그렇다', 4], ['보통이다', 3], ['아니다', 2], ['전혀 아니다', 1]].map(([label, value]) => <button key={String(value)} className={answers[step] === value ? 'selected' : ''} onClick={() => choose(Number(value))}>{label}</button>)}</div>
      <div className="quiz-nav"><button onClick={() => setStep(Math.max(0, step - 1))} disabled={!step}>이전</button>{step === questions.length - 1 ? <button className="green" disabled={!answers[step]} onClick={() => setScreen('result')}>결과 보기</button> : <button disabled={!answers[step]} onClick={() => setStep(step + 1)}>다음</button>}</div>
    </div>
  </main>

  if (screen === 'result') return <main className="result-page">
    <button className="brand plain" onClick={resetQuiz}><span>♧</span> SEED</button>
    <section className="result-card"><p className="eyebrow">당신의 씨앗은</p><div className="type-number">{types[winner][0]}</div><h1>{types[winner][1]}</h1><p>{types[winner][2]}</p><div className="score-list">{types.map((type, index) => <div key={type[0]}><span>{type[0]}유형</span><i><b style={{ width: `${(score[index] / 45) * 100}%` }} /></i><strong>{score[index]}</strong></div>)}</div><button className="cta" onClick={resetQuiz}>SEED 홈으로</button></section>
  </main>

  return <div className="site">
    <header><a className="brand" href="#top"><span>♧</span> SEED</a><nav><button onClick={() => scrollTo('programs')}>프로그램</button><button onClick={() => scrollTo('why')}>Why SEED?</button><button onClick={() => scrollTo('stories')}>후기</button><button onClick={() => scrollTo('pricing')}>요금제</button></nav><div className="head-actions"><button className="login">↪ 코치 로그인</button><button className="small-cta" onClick={startQuiz}>시작하기</button></div></header>
    <main id="top">
      <section className="hero"><div className="hero-content"><p className="eyebrow light">Grow in your own way</p><h1>당신이라는 씨앗이<br />제대로 싹틔울 수 있도록</h1><p>“나는 어떤 사람일까?”라는 질문이 막막하게 느껴질 때,<br />SEED는 당신만의 선명한 성장 지도를 그려냅니다.</p><div><button className="cta" onClick={() => scrollTo('programs')}>프로그램 살펴보기</button><button className="ghost" onClick={startQuiz}>검사 바로 시작하기</button></div></div><div className="sprout sprout-one">✦</div><div className="sprout sprout-two">⌁</div></section>
      <section id="programs" className="section"><p className="eyebrow">SEED PROGRAM</p><h2>당신의 가능성을 발견하는<br />SEED 프로그램</h2><div className="program-grid"><article><div className="icon">⌘</div><p>씨앗의 DNA</p><h3>성격 유형 검사</h3><span>81가지 질문으로 나만의 고유한 기질과 성장 방향을 발견해 보세요.</span><button onClick={startQuiz}>검사 시작하기 →</button></article><article><div className="icon">♡</div><p>토양과 수분</p><h3>핵심 감정 검사</h3><span>지금 내 마음을 움직이는 감정을 살피고 건강한 심리 환경을 찾아요.</span><button>준비 중</button></article><article><div className="icon">↗</div><p>성장의 기록</p><h3>인생 그래프</h3><span>지나온 경험 속에서 나만의 회복력과 행복의 패턴을 찾아보세요.</span><button>준비 중</button></article></div></section>
      <section id="why" className="why"><div><p className="eyebrow">WHY SEED</p><h2>성장은 나를<br />이해하는 데서 시작됩니다.</h2><p>SEED는 정답을 대신 정해주지 않습니다.<br />나의 고유함을 발견하고, 나다운 방향으로 걸어갈 수 있도록 곁에서 돕습니다.</p></div><div className="benefits"><article><b>01</b><h3>나만을 위한 진단</h3><p>검사 결과를 숫자가 아닌 나만의 언어로 이해할 수 있어요.</p></article><article><b>02</b><h3>작은 실천의 기록</h3><p>오늘의 감정과 성장을 쌓으며 나에게 맞는 리듬을 찾아요.</p></article><article><b>03</b><h3>따뜻한 연결</h3><p>나와 비슷한 고민을 가진 사람들과 안전하게 대화해요.</p></article></div></section>
      <section id="stories" className="section stories"><p className="eyebrow">SEED STORIES</p><h2>다른 사람들은<br />어땠는지 알아보세요</h2><div className="story-grid"><article>“나를 억지로 바꾸려 하기보다, 내 모습 그대로의 강점을 찾게 됐어요.”<footer><b>최○린</b><span>26세 · 성격 유형 검사</span></footer></article><article>“막막했던 미래를 나다운 속도로 그려볼 수 있게 되었어요.”<footer><b>유○진</b><span>24세 · 인생 그래프</span></footer></article><article>“이제는 다른 사람과 비교하지 않고 마음이 한결 편안해졌어요.”<footer><b>박○희</b><span>28세 · 핵심 감정 검사</span></footer></article></div></section>
      <section id="pricing" className="pricing"><p className="eyebrow">MEMBERSHIP</p><h2>당신에게 맞는 플랜을<br />선택하세요</h2><p>모든 플랜에서 SEED의 핵심 기능을 자유롭게 이용할 수 있습니다.</p><div className="price-grid"><article><h3>월간 구독</h3><p>부담 없이 시작하고 싶다면</p><strong>79,000<small>원 / 월</small></strong><ul><li>전체 콘텐츠 무제한 이용</li><li>커뮤니티 참여 가능</li><li>월간 성장 리포트</li></ul><button onClick={startQuiz}>월간 플랜으로 시작</button></article><article className="featured"><em>가장 인기 있는 선택</em><h3>연간 구독</h3><p>가장 합리적인 선택</p><strong>59,000<small>원 / 월</small></strong><small>연 708,000원 · 25% 이상 할인</small><ul><li>전체 콘텐츠 무제한 이용</li><li>커뮤니티 참여 가능</li><li>월간 성장 리포트</li><li>전문가 1:1 코칭 세션</li></ul><button onClick={startQuiz}>할인받고 시작하기</button></article></div></section>
    </main><footer className="site-footer"><a className="brand" href="#top"><span>♧</span> SEED</a><p>나답게 자라는 모든 순간을 응원합니다.</p><small>© 2026 SEED. All rights reserved.</small></footer>
  </div>
}

export default App
