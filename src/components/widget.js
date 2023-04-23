import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUserData } from "../context/useUserData";
// import "https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/style.css";
// import "../script/ui";

const Widget = () => {
  const { uid } = useUserData();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    return () => {
      console.log("cleanup");
      const script = document.querySelector(
        "script[src='https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/script.js']"
      );
      if (script) {
        console.log("script exist");
        script.remove();
      }
    };
  });
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const code = `<div id="getWaitlistContainer" data-waitlist_id="${uid}"></div>
<link rel="stylesheet" type="text/css" href="https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/style.css"/>
<script src="https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/script.js"></script>`;
  return (
    <>
      <section className="mt-5 flex justify-center">
        <button
          className="w-full bg-[#5F4FEB] text-white max-w-lg h-10 rounded-md font-semibold"
          onClick={() => setOpen(true)}
        >
          {"</>"} Embed Code
        </button>
      </section>
      <Modal open={open} onClose={handleClose} className="relative">
        <div className="w-4/5 min-w-[300px] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-5 py-5 rounded-md">
          <p className="font-bold">Embed code</p>
          <p>Copy the code below and paste it into your code editor</p>
          <SyntaxHighlighter language="html">{code}</SyntaxHighlighter>
        </div>
      </Modal>

      <section>
        <div
          id="embeded-waitlist"
          data-waitlist_id="rXDkyWJBWweOmI6UWKvX"
        ></div>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/style.css"
          />
          <script
            defer
            src="https://prod-waitlist-bucket.s3.ap-south-1.amazonaws.com/script.js"
            type="module"
          ></script>
        </Helmet>
      </section>
    </>
  );
};

export default Widget;
