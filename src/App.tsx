import { useRef, useState } from 'react'
import './App.css'

// 그리드 좌표 (viewBox 0~100): 상자 크기 S, 간격 G, 4S + 3G = 100
const S = 19
const G = 8
const pos = (i: number) => ({ x: Math.floor(i / 4) * (S + G), y: (i % 4) * (S + G) })

// i번 상자 → i+1번 상자 화살표. 같은 열이면 아래로, 열이 바뀌면 사이 간격을 타고 위로 꺾음
const arrow = (i: number) => {
  const a = pos(i)
  const b = pos(i + 1)
  if (a.x === b.x) return `M${a.x + S / 2},${a.y + S} V${b.y}`
  const mid = a.x + S + G / 2
  return `M${a.x + S},${a.y + S / 2} H${mid} V${b.y + S / 2} H${b.x}`
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function App() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [num, setNum] = useState(0)

  const open = (n: number) => {
    setNum(n)
    dialog.current?.showModal()
  }

  return (
    <>
      <h1>Bigkim Code</h1>
      <div className="grid">
        <svg className="arrows" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <marker id="head" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" />
            </marker>
          </defs>
          {Array.from({ length: 15 }, (_, i) => (
            <path key={i} d={arrow(i)} markerEnd="url(#head)" />
          ))}
        </svg>
        {Array.from({ length: 16 }, (_, i) => (
          <button key={i} type="button" onClick={() => open(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      <dialog ref={dialog} className="popup">
        <button
          type="button"
          className="close"
          aria-label="닫기"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <h2>{num}</h2>
        <p>{LOREM}</p>
      </dialog>
    </>
  )
}

export default App
