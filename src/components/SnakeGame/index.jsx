import { useState, useEffect, useCallback, useRef } from 'react'
import * as S from '@/components/SnakeGame/styles'

const GRID_SIZE = 20
const CELL_SIZE = 18
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 5
const MIN_SPEED = 60

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

function getRandomFood(snake) {
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
  return pos
}

function SnakeGame() {
  const initialSnake =[{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }]
  const [snake, setSnake] = useState(initialSnake)
  const [food, setFood] = useState({ x: 15, y: 10 })
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('yeg-snake-highscore') || '0', 10)
  })

  const dirRef = useRef(direction)
  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const speedRef = useRef(INITIAL_SPEED)
  const gameLoopRef = useRef(null)

  dirRef.current = direction
  snakeRef.current = snake
  foodRef.current = food

  const resetGame = useCallback(() => {
    const initial = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setFood(getRandomFood(initial))
    setDirection(DIRECTIONS.ArrowRight)
    dirRef.current = DIRECTIONS.ArrowRight
    setGameOver(false)
    setScore(0)
    setStarted(false)
    speedRef.current = INITIAL_SPEED
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
  }, [])

  const tick = useCallback(() => {
    const currentSnake = snakeRef.current
    const currentDir = dirRef.current
    const currentFood = foodRef.current

    const head = currentSnake[0]
    const newHead = {
      x: (head.x + currentDir.x + GRID_SIZE) % GRID_SIZE,
      y: (head.y + currentDir.y + GRID_SIZE) % GRID_SIZE,
    }

    if (currentSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      setGameOver(true)
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      return
    }

    const ate = newHead.x === currentFood.x && newHead.y === currentFood.y
    const newSnake = [newHead, ...currentSnake]
    if (!ate) newSnake.pop()

    setSnake(newSnake)
    snakeRef.current = newSnake

    if (ate) {
      setScore((prev) => {
        const updated = prev + 1

        if (updated > highScore) {
          setHighScore(updated)
          localStorage.setItem('yeg-snake-highscore', String(updated))
        }

        return updated
      })
      const newFood = getRandomFood(newSnake)
      setFood(newFood)
      foodRef.current = newFood

      speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT)
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      gameLoopRef.current = setInterval(tick, speedRef.current)
    }
  }, [highScore])

  const startGame = useCallback(() => {
    if (gameOver) resetGame()
    setStarted(true)
    speedRef.current = INITIAL_SPEED
    gameLoopRef.current = setInterval(tick, speedRef.current)
  }, [gameOver, resetGame, tick])

  const changeDirection = useCallback(
    (key) => {
      if (!started && !gameOver) {
        startGame()
      }

      const newDir = DIRECTIONS[key]
      if (!newDir) return

      const current = dirRef.current
      if (newDir.x + current.x === 0 && newDir.y + current.y === 0) return

      setDirection(newDir)
      dirRef.current = newDir
    },
    [started, gameOver, startGame],
  )

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        changeDirection(e.key)
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!started || gameOver) startGame()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [changeDirection, started, gameOver, startGame])

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [])

  return (
    <S.Container>
      <S.ScoreBar>
        <S.Score>
          SKOR: <S.ScoreValue>{score}</S.ScoreValue>
        </S.Score>
        <S.Score>
          EN YÜKSEK: <S.ScoreValue $highlight>{highScore}</S.ScoreValue>
        </S.Score>
      </S.ScoreBar>

      <S.Board style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
        <S.GridOverlay $size={GRID_SIZE} $cell={CELL_SIZE} />

        {snake.map((segment, i) => (
          <S.Cell
            key={i}
            $x={segment.x}
            $y={segment.y}
            $size={CELL_SIZE}
            $isHead={i === 0}
          />
        ))}

        <S.Food $x={food.x} $y={food.y} $size={CELL_SIZE} />

        {!started && !gameOver && (
          <S.Overlay>
            <S.OverlayText>🐍</S.OverlayText>
            <S.OverlayHint>BAŞLAMAK İÇİN BASIN</S.OverlayHint>
          </S.Overlay>
        )}
        {gameOver && (
          <S.Overlay>
            <S.OverlayText>GAME OVER</S.OverlayText>
            <S.OverlayScore>Skor: {score}</S.OverlayScore>
            <S.OverlayHint>TEKRAR OYNAMAK İÇİN 'SPACE' TUŞUNA BASIN</S.OverlayHint>
          </S.Overlay>
        )}
      </S.Board>

      <S.Controls>
        <S.ControlRow>
          <S.ControlButton onClick={() => changeDirection('ArrowUp')}>▲</S.ControlButton>
        </S.ControlRow>
        <S.ControlRow>
          <S.ControlButton onClick={() => changeDirection('ArrowLeft')}>◄</S.ControlButton>
          <S.ControlButton $wide onClick={() => (!started || gameOver ? startGame() : null)}>
            {gameOver ? '↻' : started ? '•' : '▶'}
          </S.ControlButton>
          <S.ControlButton onClick={() => changeDirection('ArrowRight')}>►</S.ControlButton>
        </S.ControlRow>
        <S.ControlRow>
          <S.ControlButton onClick={() => changeDirection('ArrowDown')}>▼</S.ControlButton>
        </S.ControlRow>
      </S.Controls>
    </S.Container>
  )
}

export default SnakeGame
