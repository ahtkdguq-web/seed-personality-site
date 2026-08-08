import { useMemo, useState } from 'react'

type EmotionCheckProps = { onBack: () => void }

const emotionQuestions = [
  ['불안', '앞으로 일어날 일을 생각하면 마음이 쉽게 긴장된다.'], ['불안', '작은 변화에도 혹시 잘못될까 걱정하는 편이다.'], ['불안', '마음이 편안해지려면 확실한 계획이 필요하다.'], ['지침', '요즘은 해야 할 일을 생각하면 에너지가 먼저 줄어든다.'], ['지침', '충분히 쉬어도 개운하지 않은 날이 있다.'], ['지침', '사소한 일에도 쉽게 지치거나 예민해진다.'], ['슬픔', '혼자 있을 때 마음이 가라앉는 순간이 잦다.'], ['슬픔', '누군가에게 내 마음을 털어놓고 싶을 때가 있다.'], ['슬픔', '최근에는 예전만큼 즐겁지 않다고 느낄 때가 있다.'], ['분노', '내 경계나 기준이 존중받지 않는다고 느낀다.'], ['분노', '불공평한 상황을 보면 쉽게 마음이 불편해진다.'], ['분노', '참아 온 감정이 한꺼번에 올라오는 순간이 있다.'], ['기쁨', '사소한 순간에서도 고마움이나 즐거움을 발견한다.'], ['기쁨', '좋아하는 일에 몰입할 때 나다운 기분이 든다.'], ['기쁨', '가까운 사람과 함께할 때 에너지를 얻는다.'], ['평온', '불확실한 상황에서도 내 속도를 지키려 한다.'], ['평온', '감정을 알아차리고 잠시 멈출 수 있다.'], ['평온', '지금의 나를 있는 그대로 받아들이는 편이다.'],
] as const

const emotionCopy: Record<string, { title: string; message: string; practice: string }> = {
  불안: { title: '안전과 확신을 바라는 마음', message: '불안은 위험을 미리 살피고 나를 지키려는 중요한 신호일 수 있어요.', practice: '오늘 통제할 수 있는 일 한 가지와, 잠시 내려둘 일 한 가지를 나눠 적어 보세요.' },
  지침: { title: '회복이 필요한 마음', message: '지침은 더 노력하라는 신호가 아니라, 잠깐의 회복이 필요하다는 몸과 마음의 요청일 수 있어요.', practice: '이번 주에 꼭 하지 않아도 되는 일 하나를 덜어내 보세요.' },
  슬픔: { title: '돌봄과 연결을 바라는 마음', message: '슬픔은 잃어버린 것과 소중했던 것을 알아차리게 하는 감정이에요.', practice: '편하게 연락할 수 있는 사람에게 짧은 안부를 건네 보세요.' },
  분노: { title: '경계와 존중을 바라는 마음', message: '분노는 나에게 중요한 기준과 경계가 있다는 신호일 수 있어요.', practice: '불편했던 상황을 떠올리고, 내가 바랐던 한 문장을 적어 보세요.' },
  기쁨: { title: '나를 움직이는 활력', message: '기쁨은 내게 에너지를 주는 관계와 경험을 알려주는 단서가 됩니다.', practice: '이번 주에 나를 웃게 한 순간을 한 줄로 기록해 보세요.' },
  평온: { title: '나를 지탱하는 안정감', message: '평온은 감정을 없애는 것이 아니라, 감정과 함께 균형을 찾는 힘이에요.', practice: '오늘의 나에게 괜찮다고 말해 줄 작은 시간을 만들어 보세요.' },
}

export default function EmotionCheck({ onBack }: EmotionCheckProps) {
  const [step, setStep] = useState(0); const [answers, setAnswers] = useState<number[]>(Array(emotionQuestions.length).fill(0)); const [complete, setComplete] = useState(false)
  const scores = useMemo(() => Object.fromEntries(Object.keys(emotionCopy).map((emotion) => [emotion, emotionQuestions.reduce((total, [type], index) => total + (type === emotion ? answers[index] : 0), 0)])), [answers]); const ordered = Object.entries(scores).sort((a, b) => b[1] - a[1]); const primary = ordered[0]?.[0] ?? '평온'; const current = emotionQuestions[step]
  if (complete) return <main className="result-page emotion-result"><button className="brand plain" onClick={onBack}><span>♧</span> SEED</button><section className="result-card"><p className="eyebrow">지금 내 마음의 중심에는</p><div className="emotion-orb">{primary === '기쁨' ? '✦' : primary === '평온' ? '◌' : '◒'}</div><h1>{emotionCopy[primary].title}</h1><p>{emotionCopy[primary].message}</p><div className="practice"><b>오늘의 작은 제안</b><span>{emotionCopy[primary].practice}</span></div><div className="score-list emotion-scores">{ordered.map(([emotion, score]) => <div key={emotion}><span>{emotion}</span><i><b style={{ width: `${(score / 15) * 100}%` }} /></i><strong>{score}</strong></div>)}</div><small className="disclaimer">이 검사는 의료적 진단이 아닌, 현재 마음을 돌아보기 위한 자기 성찰 도구입니다.</small><button className="cta" onClick={onBack}>SEED 홈으로</button></section></main>
  return <main className="quiz-page emotion-page"><button className="brand plain" onClick={onBack}><span>♧</span> SEED</button><div className="quiz-shell"><div className="quiz-top"><span>핵심 감정 검사</span><span>{step + 1} / {emotionQuestions.length}</span></div><div className="progress"><i style={{ width: `${((step + 1) / emotionQuestions.length) * 100}%` }} /></div><p className="eyebrow">지금의 마음을 알아차리는 시간</p><h1>{current[1]}</h1><p className="hint">최근 2주 동안의 나와 가장 가까운 답을 선택해 주세요.</p><div className="answers">{[['매우 그렇다', 5], ['그렇다', 4], ['보통이다', 3], ['아니다', 2], ['전혀 아니다', 1]].map(([label, value]) => <button key={String(value)} className={answers[step] === value ? 'selected' : ''} onClick={() => { setAnswers((previous) => previous.map((answer, index) => index === step ? Number(value) : answer)); if (step < emotionQuestions.length - 1) window.setTimeout(() => setStep(step + 1), 120) }}>{label}</button>)}</div><div className="quiz-nav"><button onClick={() => setStep(Math.max(0, step - 1))} disabled={!step}>이전</button>{step === emotionQuestions.length - 1 ? <button className="green" disabled={!answers[step]} onClick={() => setComplete(true)}>결과 보기</button> : <button disabled={!answers[step]} onClick={() => setStep(step + 1)}>다음</button>}</div></div></main>
}
