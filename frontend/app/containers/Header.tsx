'use client';

import Image from "next/image";

export type Props = {
  title: string;
}

function Header({ title }: Props) {
  const logoText = 'LI-RICSS';
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
      <h2 className="text-xl font-medium fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 p-6">
        {title}
      </h2>
      <div className="flex">
      </div>
      <div className="fixed bottom-0 left-0 flex margin-bottom-10 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          href="https://www.raisga.com/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <span style={{ whiteSpace: "nowrap" }}>
            {logoText}
          </span>
          <Image
            className="rounded-xl"
            src="/logo-sample.png"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
        </a>
      </div>
    </div>
  );
}

export default Header;
