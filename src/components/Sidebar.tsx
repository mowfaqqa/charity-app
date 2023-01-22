import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { User, UserMinus, BarChart } from "react-feather";

const Sidebar = () => {
  const router = useRouter();
  const navigation = [
    {
      name: "Overview",
      href: "/recipient/dashboard",
      icon: BarChart,
      current: true,
    },
    // { name: "Donor", href: "/recipient", icon: UserMinus, current: false },
    { name: "Profile", href: "/recipient/profile", icon: User, current: false },
  ];
  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto px-3 bg-green-800 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          {/* <Image
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
          width={50}
          height={50}
          alt="Your Company"
        /> */}
        </div>
        <div className="mt-5 flex flex-1 flex-col">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">
            <span className="text-green-500">Charity</span>App
          </h1>
          <nav className="flex-1 px-2 pb-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={classNames(
                    item.current
                      ? "bg-yellow-300 text-green-800"
                      : "text-yellow-400 hover:bg-yellow-300 hover:text-green-800",
                    "group flex items-center px-2 py-2 my-3 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
