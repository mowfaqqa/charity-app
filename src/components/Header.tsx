import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx' 
import { Container } from './Container'

function MobileNavLink({ href, children } : any) {
    return (
      <Popover.Button as={Link} href={href} className="block w-full p-1">
        {children}
      </Popover.Button>
    )
  }
  
  function MobileNavIcon({ open } : any) {
    return (
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 overflow-visible stroke-yellow-700"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
      >
        <path
          d="M0 1H14M0 7H14M0 13H14"
          className={clsx(
            'origin-center transition',
            open && 'scale-90 opacity-0'
          )}
        />
        <path
          d="M2 2L12 12M12 2L2 12"
          className={clsx(
            'origin-center transition',
            !open && 'scale-90 opacity-0'
          )}
        />
      </svg>
    )
  }
  
  function MobileNavigation() {
    return (
      <Popover>
        <Popover.Button
          className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {({ open }) => <MobileNavIcon open={open} />}
        </Popover.Button>
        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <Link href="/auth/login/donor" passHref><span> login as donor</span> </Link>
              <Link href="/auth/login/recipient" passHref><span> login as recipient</span> </Link>
              <hr className="m-2 border-green-300/40" />
              <Link href="/login" passHref>Register</Link>
            </Popover.Panel> 
          </Transition.Child>
        </Transition.Root>
      </Popover>
    )
  }
  
  export function Header() {
    return (
      <header className="py-4">
        <Container>
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="#" aria-label="Home">
                <h1 className='text-4xl font-bold text-yellow-500'><span className='text-green-500'>Charity</span>App</h1>
              </Link>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:flex items-center gap-x-5 text-yellow-400">
                
                <Link href="/auth/login/recipient" passHref>
                    <span>
                        Login as Recipient
                    </span>    
                </Link>
                <Link href="/auth/login/donor" passHref>
                    <span>
                        Login as Donor
                    </span>    
                </Link>
                <Link href="/auth/signup" passHref>
                    <span className='bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-700'>
                        Register
                    </span>    
                </Link>
              </div>
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          </nav>
        </Container>
      </header>
    )
  }