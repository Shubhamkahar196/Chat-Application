import React from "react";

const Features = () => {
  return (
    <section className="bg-gray-900"> {/* Added background color */}
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6"> {/* Completed class name */}
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white"> {/* Completed class name */}
            Designed for business teams like yours
          </h2>
          <p className="sm:text-xl text-gray-400">
            Here at Swift we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Completed class name */}
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 001.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414L8.586 11l-2.293 2.293a1 1 0 001.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11l2.293-2.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Marketing
            </h3>
            <p className="text-gray-400">
              Plan it, create it, launch it. Collaborate seamlessly with your
              organization and hit your marketing goals every month with our
              marketing plan.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L10 13.5l7-6.58a1 1 0 000-1.84l-7-3zM10 15.5l-7 3.5v-2.58l7-6.58 7 6.58v2.58L10 15.5z" /> {/* Corrected path data for cube icon */}
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Legal</h3> {/* Corrected heading */}
            <p className="text-gray-400">
              Protect your organization, devices and stay compliant with our
              structured workflows and custom permissions made for you.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.586l-1.293 1.293A.996.996 0 0117 14v-2h-4v4h-2v-4H7v4H5v-4H3v2a2 2 0 01-2 2h-.586l-1.293 1.293A.996.996 0 010 14V8a2 2 0 012-2h4zm-4 7V8h4v5H2zm6 0V8h4v5H8zm6 0V8h4v5h-4z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A2 2 0 0016 12H4a2 2 0 00-2 1.692z" /> {/* Corrected path data for shopping bag icon */}
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Business Automation
            </h3>
            <p className="text-gray-400">
              Auto-assign tasks, send Slack messages, and much more. We’ve
              up with hundreds of new templates to help you get started.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v-4.41c0-.21-.13-.4-.326-.474L4.97 2.08a1 1 0 00-.788 0L.326 3.634A.996.996 0 000 4.01v4.41c0 .21.13.4.326.474l3.137 1.255c.21.084.43.084.64 0l3.137-1.255a.996.996 0 00.326-.474zM10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v2a1 1 0 102 0V5z" /> {/* Corrected path data for chart bar icon */}
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v2a1 1 0 102 0V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Finance</h3> {/* Corrected heading */}
            <p className="text-gray-400">
              Audit-proof software built for critical financial operations like
              month-end close and quarterly budgeting.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /> {/* Corrected path data for folder icon */}
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Enterprise Design
            </h3>
            <p className="text-gray-400">
              Craft beautiful, delightful experiences for both marketing and
              product with real cross-company collaboration.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"> {/* Completed class name */}
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 00-2.286.947c-.056.223-.342.344-.647.245-.54-.18-.99-.364-1.42-.596C2.83 3.513 2.09 4.293 2.09 5.343c0 .358.11.7.31.983.117.17.258.324.42.46l.006.006c.17.14.35.26.54.36.21.11.44.19.68.23.27.05.55.08.84.08h.004c.28 0 .56-.03.83-.08.24-.04.47-.12.68-.23.19-.1.37-.22.54-.36l.006-.006c.16-.136.3-.29.42-.46.2-.283.31-.625.31-.983 0-1.05-.74-1.83-1.87-2.32zM10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.001a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Operations
            </h3>
            <p className="text-gray-400">
              Keep your company’s lights on with customizable, iterative
              structured workflows built for all efficient teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;