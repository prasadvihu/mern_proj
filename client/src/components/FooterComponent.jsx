import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export const FooterComponent = () => {
  return (
    <Footer
      container
      className="border border-teal-300 border-t-4 flex flex-col"
    >
      <div className="">
        <div className="mb-8">
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-xl md:text-2xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 text-white text-[1.2rem] bg-gradient-to-r from-indigo-800 via-violet-900 to-orange-500 rounded-xl">
              Prasad's
            </span>
            Blog
          </Link>
        </div>
        <div className="">
          <div>
            <Footer.Title className="m-4" title="About" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">My Blog</Footer.Link>
              <Footer.Link href="#">Get to Know More</Footer.Link>
              <Footer.Link href="#">And More Info</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="m-4" title="Follow us" />
            <Footer.LinkGroup className="" col>
              <Footer.Link href="#">My Blog</Footer.Link>
              <Footer.Link href="#">Get to Know More</Footer.Link>
              <Footer.Link href="#">And More Info</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="m-4" title="Privacy policy" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">My Blog</Footer.Link>
              <Footer.Link href="#">Get to Know More</Footer.Link>
              <Footer.Link href="#">And More Info</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>

      <div>
        <Footer.Divider />
        <div className="">
          <Footer.Copyright by="prasads" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-4 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
