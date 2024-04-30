import Link from "next/link";
import { Icons } from "./icons";

const Socials = () => {
  return (
    <div className="flex justify-center items-center gap-x-4">
      <Link
        href="https://github.com/matsaks/matstracksV2"
        aria-label="Github link"
        target="_blank"
        className="hover-rise text-muted-foreground hover:text-foreground duration-150"
      >
        <Icons.gitHub className="h-5 w-5" />
      </Link>

      <Link
        href="https://www.linkedin.com/in/mats-aksness%C3%A6ther-81a303244/"
        aria-label="LinkedIn link"
        target="_blank"
        className="hover-rise text-muted-foreground hover:text-foreground duration-150"
      >
        <Icons.linkedIn className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default Socials;
