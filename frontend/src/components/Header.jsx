export default function Header() {
  return (
    <div>
      <div className="shadow-sm w-full h-20 grid grid-cols-12 ">
        <div className="flex justify-center items-center col-span-2 sm:col-span-2 md:col-span-1 cursor-pointer  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="flex justify-center items-center  col-span-5 px-3 sm:col-span-4 md:px-5 md:mr-40 md:col-span-6 md:px-10 lg:col-span-3 lg:mr-0 xl:mr-20 xl:px-10 ">
          <img src="./src/assets/logo.svg" alt="logo NowPay" />
        </div>
        <div className=" p-2 grid grid-cols-2 px-3  col-span-5  sm:col-span-6 sm:ml-20 md:col-span-5 lg:col-span-8 lg:flex lg:justify-end lg:px-5">
          <button
            className="m-1.5 my-3 sm:my-1 rounded text-white  lg:w-40  "
            style={{ background: "#EF3E73" }}
          >
            Signin
          </button>
          <button className="m-1.5 my-3  sm:my-1 rounded border-2 border-pink-700 text-pink-700 lg:w-40   ">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
