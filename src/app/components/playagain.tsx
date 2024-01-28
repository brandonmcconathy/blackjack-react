export default function PlayAgain() {
  return(
    <main className="flex flex-col gap-10 justify-center items-center text-center mt-16">
      <h1 className="text-3xl">Play again?</h1>
      <div className="flex items-center justify-center gap-10 text-xl">
        <button>Yes</button>
        <button>No</button>
      </div>
    </main>
  )
}