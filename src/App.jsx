import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null)

  const copyToClipboard = () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-wd-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center my-3 text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef} />
          <button className="outline-none bg-blue-700 hover:bg-blue-800 text-white py-1 px-4"
            onClick={copyToClipboard}>
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" name="length" id="lengthInput"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="lengthInput">Length: {length}</label>

            <input type="checkbox" name="numbers" id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => { setNumberAllowed(prev => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>

            <input type="checkbox" name="char" id="charInput"
              defaultChecked={charAllowed}
              onChange={() => { setCharAllowed(prev => !prev) }} />
            <label htmlFor="charInput">Characters</label>


          </div>
        </div>
      </div>
    </>
  )
}

export default App
