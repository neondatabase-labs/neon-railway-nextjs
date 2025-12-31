import Image from 'next/image'
import Link from 'next/link'

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      className="inline-block group-hover:translate-x-1 transition-transform duration-300"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path strokeDasharray={16} strokeDashoffset={16} d="M5 12h13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path
          strokeDasharray={10}
          strokeDashoffset={10}
          d="M19 12l-5 5M19 12l-5 -5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="10;0"
          ></animate>
        </path>
      </g>
    </svg>
  )
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="flex items-center gap-2">
          <Image
            src="/instagres.svg"
            alt="Instagres logo"
            width={100}
            height={100}
            priority
          />
          <div className="flex flex-col relative top-5">
            <span className="text-2xl font-bold font-mono">Instagres</span>
            <span className="text-md dark:text-gray-300 text-gray-700 font-mono">
              by Neon
            </span>
          </div>
        </h1>
        <ol className="font-mono list-inside list-decimal text-lg/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            <a
              href={process.env.NEXT_INSTAGRES_CLAIM_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline hover:underline-offset-4 dark:text-blue-400 text-blue-500 font-bold"
            >
              Claim your database
            </a>{' '}
            before it expires!
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Build your app editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/*
            </code>
            files.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="border-1 rounded-full hover:bg-black/[.05] dark:hover:bg-white/[.06] hover:scale-105 transition-all duration-300"
          >
            <img
              src="railway-button.svg"
              className="invert dark:invert-0 w-52"
              alt="Railway"
            />
          </a>
          <Link
            href="/demo"
            className="group border-0 rounded-full py-3 px-7  hover:bg-black/[.05] dark:hover:bg-white/[.06] hover:scale-105 transition-all duration-300"
          >
            Live Demo <Arrow />
          </Link>
        </div>
      </main>
      <footer className="flex justify-end font-mono w-full">
        <ul className="flex flex-col gap-4">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://neon.com/docs?utm_source=railway&utm_medium=nextjs-template&utm_campaign=neon-instagres"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/lamp.svg"
              alt="Lamp icon"
              width={24}
              height={24}
            />
            Docs
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://neon.new?utm_source=railway&utm_medium=nextjs-template&utm_campaign=neon-instagres"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/ramen.svg"
              alt="Rocket icon"
              width={24}
              height={24}
            />
            Instagres
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://neon.com?utm_source=railway&utm_medium=nextjs-template&utm_campaign=neon-instagres"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/elephant.svg"
              alt="Elephant icon"
              width={24}
              height={24}
            />
            neon.com
          </a>
        </ul>
      </footer>
    </div>
  )
}
