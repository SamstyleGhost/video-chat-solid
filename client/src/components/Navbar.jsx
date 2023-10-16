import { A } from "@solidjs/router";

const Navbar = () => {
  return (
    <div class="w-full h-12 md:h-20 text-text flex justify-between p-5 md:p-10">
      <div class='flex items-center'>
        {/* // TODO Add icons */}
        {/* //* Could use solid-heroicons npm library. Given on official Solid doc */}
        <A href="/"><span className="font-medium text-2xl md:text-6xl">RTChat</span></A>
      </div>
    </div>
  )
};

export default Navbar