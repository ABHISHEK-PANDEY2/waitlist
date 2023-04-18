const Home = () => {
  return (
    <>
      <section className="">
        <p className="font-semibold text-GrayText mb-5">All Waitlist</p>
        <div className="flex flex-auto flex-wrap gap-5">
          <div className="min-w-fit border border-GrayDark rounded-md flex">
            <div className="h-full bg-[#493ee6] text-white py-4 px-6 rounded-l-md m-auto">
              TE
            </div>
            <div className="px-3 py-2 m-auto">
              <p>test</p>
              <p className=" text-GrayText">
                Created: 20-04-2023 | Total Signups: 5
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
