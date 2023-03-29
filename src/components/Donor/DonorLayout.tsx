import React, { Fragment } from "react";
import { BarChart2, Bell, User } from "react-feather";
import Link from "next/link";
import ResponsiveDonorSideBar from "./ResponsiveDonorSideBar";
import { Menu, Transition } from "@headlessui/react";
import Button from "../Button";
import { useRouter } from "next/router";
import DonorSidebar from "./DonorSidebar";

const userNavigation = [{ name: "Settings", href: "/profile" }];

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};
interface AppProps {
  children: React.ReactNode;
}

const DonorLayout = ({ children }: AppProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     router.push("/login");
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div>
      <ResponsiveDonorSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <DonorSidebar />
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <BarChart2 size={25} className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="w-full flex items-center justify-between px-4">
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <Bell size={25} aria-hidden="true" />
            </button>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  {/* <Image
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        width={50}
                        height={50}
                        alt=""
                      /> */}
                  <User size={30} />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <div
                      className={classNames(
                        "block font-medium py-2 text-sm text-gray-700"
                      )}
                    >
                      <Button className="text-sm" onClick={() => router.push('/auth/login/donor')}>
                        Sign Out
                      </Button>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DonorLayout;
