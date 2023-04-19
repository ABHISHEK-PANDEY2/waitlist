import { SearchOutlined } from "@ant-design/icons";

const List = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl">Waitlist</h2>
        <div className="flex h-12 justify-between mt-5">
          <div className="border border-GrayDark rounded-md flex items-center px-5 gap-5">
            <span className="bg-Gray rounded-md h-3/5 flex items-center px-2">
              Show Current Waiters
            </span>
            <span className=" flex items-center px-2">
              Show offboarded waiters
            </span>
          </div>
          <div className="w-96 h-10 relative">
            <input
              className="w-full h-full border border-GrayDark rounded-md px-8 outline-none"
              placeholder="search by email"
              type="text"
            />
            <SearchOutlined className="absolute font-md top-1/2 left-2 translate-y-[-50%] text-GrayText" />
          </div>
        </div>
        {/* List */}
        <div className="rounded-md border border-GrayDark mt-5 ">
          <div className="bg-Gray h-10 rounded-t-md items-center grid grid-cols-12">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" />
            </div>
            <div className="col-span-1">Position</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-1">Referred</div>
            <div className="col-span-2">Referrals Made</div>
            <div className="col-span-2">Phone</div>
          </div>
          {/* col 1 */}
          <div className="h-10 items-center  border-0 border-b border-Gray grid grid-cols-12">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" />
            </div>
            <div className="col-span-1">0</div>
            <div className="col-span-3">abhishekpandey3188@gmail.com</div>
            <div className="col-span-2">21/07/2023</div>
            <div className="col-span-1">No</div>
            <div className="col-span-2">5</div>
            <div className="col-span-2">8837000013</div>
          </div>
          {/* col 2 */}
          <div className="h-10 items-center border-0 border-b border-Gray grid grid-cols-12">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" />
            </div>
            <div className="col-span-1">0</div>
            <div className="col-span-3">abhishekpandey3188@gmail.com</div>
            <div className="col-span-2">21/07/2023</div>
            <div className="col-span-1">No</div>
            <div className="col-span-2">5</div>
            <div className="col-span-2">8837000013</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
