import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <Navbar className="p-2 flex flex-col">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 text-white text-[1.2rem] bg-gradient-to-r from-indigo-800 via-violet-900 to-orange-500 rounded-xl">
          Prasad's
        </span>
        Blog
      </Link>
      <TextInput
        className="hidden md:inline"
        type="text"
        placeholder="Search"
        rightIcon={CiSearch}
      ></TextInput>
      <Button className="w-12 h-10 md:hidden" color="gray" pill>
        <CiSearch />
      </Button>
      <div className="flex gap-2 items-center md:order-2">
        <Button color="w-12 h-10 gray border-2 border-black border-solid" pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={currentUser.photoUrl} alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block font-sm">@{currentUser.username}</span>
              <span className="block font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <Link>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                className="hidden md:inline"
                gradientDuoTone="purpleToBlue"
                outline
              >
                Sign In
              </Button>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className="hover:bg-indigo-600 hover:text-white hover:p-1 hover:rounded-lg"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "about"} as={"div"}>
          <Link
            to="about"
            className="hover:bg-indigo-600 hover:text-white hover:p-1 hover:rounded-lg"
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "projects"} as={"div"}>
          <Link
            to="projects"
            className="hover:bg-indigo-600 hover:text-white hover:p-1 hover:rounded-lg"
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
