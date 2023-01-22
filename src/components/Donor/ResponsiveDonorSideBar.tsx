import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import React from 'react'
import { Home, User, UserMinus, UserPlus, X } from 'react-feather'
import { useRouter } from 'next/router';


const ResponsiveSideBar = ({sidebarOpen, setSidebarOpen, onClick}: any) => {
    const router = useRouter()
    const navigation = [
        { name: 'Overview', href: '/donor/dashboard', icon: Home},
        // { name: 'Recipient', href: '/donor/recipient', icon: UserMinus, current: false },
        { name: 'Profile', href: '/donor/profile', icon: User },
    ];

    const classNames = (...classes : any) => {
        return classes.filter(Boolean).join(' ')
      };
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
      <Transition.Child
        as={React.Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-green-800 pt-5 pb-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClick}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X size={20} className="h-6 w-6 text-white"  />
                </button>
              </div>
            </Transition.Child>
            <div className="flex flex-shrink-0 items-center px-4">
              {/* <Image
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                width={50}
                height={50}
                alt="Your Company"
              /> */}
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="space-y-1 px-2">
                 <h1 className='text-4xl font-bold text-yellow-500 mb-6'><span className='text-green-500'>Charity</span>App</h1>
                {navigation.map((item) => (
                  <div key={item.name} className={classNames(
                    router.asPath === item.href
                    ? 'bg-yellow-300 text-green-800' : 'text-yellow-400 hover:bg-yellow-300 hover:text-green-800',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}>
                    <Link href={item.href} passHref>
                      <span className='px-4 flex items-center justify-center'>
                        <item.icon className="mr-4 h-6 flex-shrink-0 " aria-hidden="true" />
                        {item.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </Dialog.Panel>
        </Transition.Child>
        <div className="w-14 flex-shrink-0" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  )
}

export default ResponsiveSideBar