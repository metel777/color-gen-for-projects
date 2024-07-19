"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

interface HSB {
  h: number
  s: number
  b: number
}

export default function Home() {
  const [brand, setBrand] = useState("")
  const [textStrong, setTextStrong] = useState("")
  const [textWeak, setTextWeak] = useState("")
  const [strokeStrong, setStrokeStrong] = useState("")
  const [strokeWeak, setStrokeWeak] = useState("")
  const [fill, setFill] = useState("")
  const [background, setBackground] = useState("")

  const [showCode, setShowCode] = useState(false)

  function hexToHSB(hex: string): HSB {
    hex = hex.replace(/^#/, "")
    if (hex.length !== 6) {
      throw new Error("Invalid hex color format. Expected 6 characters.")
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    // brightness
    const brightness = max

    //  saturation
    const saturation = max === 0 ? 0 : delta / max

    //  hue
    let hue = 0
    if (delta !== 0) {
      switch (max) {
        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0)
          break
        case g:
          hue = (b - r) / delta + 2
          break
        case b:
          hue = (r - g) / delta + 4
          break
      }
      hue /= 6
    }

    return {
      h: Math.round(hue * 360),
      s: Math.round(saturation * 100),
      b: Math.round(brightness * 100),
    }
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setShowCode(true)
  }

  if (showCode) {
    const hsbBrand = hexToHSB(brand)
    const hsbTextStrong = hexToHSB(textStrong)
    const hsbTextWeak = hexToHSB(textWeak)
    const hsbStrokeStrong = hexToHSB(strokeStrong)
    const hsbStrokeWeak = hexToHSB(strokeWeak)
    const hsbFill = hexToHSB(fill)
    const hsbBackground = hexToHSB(background)
    return (
      <>
        <main className=" bg-white mt-20 rounded-sm p-4 relative">
          <Button
            variant="outline"
            onClick={() => setShowCode(false)}
            className="absolute -top-10 left-0 flex gap-2"
          >
            {" "}
            <ArrowLeftIcon />
            Back
          </Button>
          <code>brand: {`${hsbBrand.h} ${hsbBrand.s}% ${hsbBrand.b}%"`}</code>
          <br />
          <code>
            text-strong:{" "}
            {`${hsbTextStrong.h} ${hsbTextStrong.s}% ${hsbTextStrong.b}%"`}
          </code>
          <br />
          <code>
            text-weak: {`${hsbTextWeak.h} ${hsbTextWeak.s}% ${hsbTextWeak.b}%"`}
          </code>
          <br />
          <code>
            stroke-strong:{" "}
            {`${hsbStrokeStrong.h} ${hsbStrokeStrong.s}% ${hsbStrokeStrong.b}%"`}
          </code>
          <br />
          <code>
            stroke-weak:{" "}
            {`${hsbStrokeWeak.h} ${hsbStrokeWeak.s}% ${hsbStrokeWeak.b}%"`}
          </code>
          <br />
          <code>fill: {`${hsbFill.h} ${hsbFill.s}% ${hsbFill.b}%"`}</code>
          <br />
          <code>
            background:{" "}
            {`${hsbBackground.h} ${hsbBackground.s}% ${hsbBackground.b}%"`}
          </code>
          <br />
        </main>
      </>
    )
  }
  return (
    <div>
      <main className=" bg-white mt-20 rounded-sm p-4">
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="w-[200px] flex flex-col gap-2 mx-auto"
          action=""
        >
          <InputWithColor
            setColor={setBrand}
            color={brand}
            inputName={"Brand"}
          />
          <InputWithColor
            setColor={setTextStrong}
            color={textStrong}
            inputName={"Text strong"}
          />
          <InputWithColor
            setColor={setTextWeak}
            color={textWeak}
            inputName={"Text weak"}
          />
          <InputWithColor
            setColor={setStrokeStrong}
            color={strokeStrong}
            inputName={"Stroke strong"}
          />
          <InputWithColor
            setColor={setStrokeWeak}
            color={strokeWeak}
            inputName={"Stroke weak"}
          />
          <InputWithColor setColor={setFill} color={fill} inputName={"Fill"} />
          <InputWithColor
            setColor={setBackground}
            color={background}
            inputName={"Background"}
          />

          <Button className="bg-blue-500 hover:bg-blue-600 mt-5">
            Proceed
          </Button>
        </form>
      </main>
      <p className="text-sm text-g.modern-500 text-center">
        ©Yehor Brazhenko 2024
      </p>
    </div>
  )
}

function InputWithColor({
  inputName,
  setColor,
  color,
}: {
  inputName: string
  setColor: Dispatch<SetStateAction<string>>
  color: string
}) {
  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={inputName}>
        {inputName}
      </label>
      <div className="border text-sm  rounded-lg shadow-sm overflow-hidden flex items-center justify-between">
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="focus:outline-none w-[70%] p-2"
          type="text"
          id={inputName}
          placeholder={`${inputName} color`}
          required
        />
        <div
          style={{ backgroundColor: color ? "#" + color : "" }}
          className={` mr-2 w-[20px] h-[20px] rounded-sm`}
        ></div>
      </div>
    </div>
  )
}
