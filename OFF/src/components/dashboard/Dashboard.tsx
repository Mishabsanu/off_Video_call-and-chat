import { Navbar } from "../navbar/Navbar";
import ChatBox from "../chat/ChatBox";
import FriendList from "../friendList/FriendList";
import Caption from "../caption/Caption";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <section className="w-full">
        <div className="mx-auto max-w-8xl px-2 py-10 lg:px-10">
          <hr className="my-8" />
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-2">
            <div className="grid-cols-2 gap-2 h-[400px] w-full rounded-lg px-2 lg:col-span-8 lg:h-[500px]">
              <div className="grid grid-cols-2 gap-2 h-[400px] rounded-lg px-2 lg:h-[500px]">
                <div className="relative ">
                  <img
                    src="https://l-frii.com/wp-content/uploads/2022/03/00Cristiano-Ronaldo-Apres-sa-performance-du-week-end-CR7-sort-un-nouveau-bijou.jpg"
                    alt="Default User"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="relative">
                  <img
                    src="https://www.iwmbuzz.com/wp-content/uploads/2020/02/lionel-messi-the-fashion-icon-of-millions-8-920x518.jpg"
                    alt="Default User"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <button className="absolute bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    End Video
                  </button>

                  <button className="absolute bottom-4 left-48 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                    Follow
                  </button>
                  <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6 divide-y lg:col-span-3 lg:block">
              <ul >
              <li className="items-center justify-between">
                  <ChatBox />
                </li>
                <li className="items-center justify-between">
                  <Caption />
                </li>
                <li className="items-center justify-between">
                  <FriendList />
                </li>
            
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
