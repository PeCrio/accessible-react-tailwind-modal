import React, { useState } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [emailBody, setEmailBody] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container px-4 mx-auto">
          <div className="px-8 py-12 bg-gray-200 rounded-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-2xl md:text-4xl">Test our new Modal</h1>
              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-2 border-2 border-[#8F8FF7] font-medium rounded-full hover:underline focus-visible:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8F8FF7] focus:border-[#8F8FF7] transition-all duration-300 ease-in-out"
                >
                  Click me
                </button>
                <Modal.Frame
                  open={isOpen}
                  onClose={closeModal}
                  closeOnClickOutside
                >
                  <Modal.Head>
                    <h3 className="pt-4 pb-2 text-2xl">
                      <i>Send me a message</i>
                    </h3>
                  </Modal.Head>
                  <Modal.Body>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="email-body"
                        className="py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-[#8F8FF7] w-full"
                        placeholder="Type something"
                        onChange={(e) => setEmailBody(e.target.value)} // update email body (proper validation can be added to this later on)
                      />
                      <div className="mt-4">
                        <a
                          href={`mailto:theossaiprecious@gmai.com?subject=NewDay%20Modal%20Sample&body=${emailBody}`} // If need be an onClick action can be added to close the modal
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <p className="text-center px-6 py-2 bg-[#8F8FF7] text-white font-medium rounded-full">
                            Send message
                          </p>
                        </a>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal.Frame>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
