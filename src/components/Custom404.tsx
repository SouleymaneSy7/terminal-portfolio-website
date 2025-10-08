"use client";

import Link from "next/link";

const ASCII_404 = `
░░██╗██╗░█████╗░░░██╗██╗
░██╔╝██║██╔══██╗░██╔╝██║
██╔╝░██║██║░░██║██╔╝░██║
███████║██║░░██║███████║
╚════██║╚█████╔╝╚════██║
░░░░░╚═╝░╚════╝░░░░░░╚═╝
`.trim();

const ASCII_ERROR = `
███████╗██████╗░██████╗░░█████╗░██████╗░
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
█████╗░░██████╔╝██████╔╝██║░░██║██████╔╝
██╔══╝░░██╔══██╗██╔══██╗██║░░██║██╔══██╗
███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║
╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
`.trim();

const Custom404 = () => {
  const message = "Moo! Error Page not found!";

  return (
    <div>
      <div className="opacity-85">
        <div>
          <p className="text-secondary-clr inline-block">
            <span className="text-primary-clr">guest</span>@
            <span className="text-tertiary-clr">souleymane-sy-portfolio</span>
          </p>
          <span className="text-secondary-clr">:~$ </span>
          <span className="text-secondary-clr">404 - error page not found</span>
        </div>

        <div className="terminal-output whitespace-pre my-3">
          <pre>{ASCII_404}</pre>

          <pre>{ASCII_ERROR}</pre>

          <pre>
            {String.raw`
 _________________________
< ${message} >
 -------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
`}
          </pre>

          <div>
            <p>The requested path could not be located in this system.</p>
            <p>It may have been moved, deleted, or never existed.</p>
            <p>Please verify the URL or return to the main directory.</p>
          </div>

          <p>
            Click{" "}
            <Link href="/" rel="noopener noreferrer" target="_blank">
              home
            </Link>{" "}
            to return to safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
