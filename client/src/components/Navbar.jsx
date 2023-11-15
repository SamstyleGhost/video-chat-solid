import { A } from "@solidjs/router";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <div class="w-full text-text flex justify-between p-2 md:p-4">
      <div class='flex items-center gap-2 md:gap-4'>
        {/* // TODO Change the logo icons */}
        <ion-icon name="logo-wechat" class='text-4xl md:text-6xl'></ion-icon>
        <A href="/"><span className="font-medium text-2xl md:text-6xl">RTChat</span></A>
        {/* <img src={logo} width={200} height={100} alt="logo"/> */}
      </div>
      <div>
        <a href="https://github.com/SamstyleGhost/video-chat-solid" target="_blank">
          <ion-icon name="logo-github" class='text-4xl md:text-6xl'></ion-icon>
        </a>
      </div>
    </div>
  )
};

export default Navbar