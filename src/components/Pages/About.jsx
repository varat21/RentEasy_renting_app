const About = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative w-full  md:h-[450px] p-4">
        <img
          src="/about.jpg"
          alt="About Us Banner"
          className="w-[100%] h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="text-lg mt-2">
            Your Trusted Partner in House Renting Solutions
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 md:pr-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome to **RentEasy**, your go-to platform for **finding rental
              homes** effortlessly. We connect **tenants** with **trusted
              landlords**, ensuring a smooth and secure renting experience.
              Whether you're searching for an **apartment, house, or shared
              space**, we provide the best listings tailored to your needs.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Our mission is to **simplify house renting** by offering
              **reliable listings, transparent transactions, and exceptional
              customer service**. We ensure every tenant finds a **safe and
              comfortable** place to call home.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2">
            <img
              src="/image.png"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Verified Listings
              </h3>
              <p className="text-gray-600 mt-2">
                We ensure all rental properties are **legit and trustworthy**.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Easy Search
              </h3>
              <p className="text-gray-600 mt-2">
                Use our **advanced filters** to find properties that match your
                needs.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                24/7 Support
              </h3>
              <p className="text-gray-600 mt-2">
                Our team is available anytime to assist with your queries.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Secure Transactions
              </h3>
              <p className="text-gray-600 mt-2">
                We prioritize **security and transparency** in every deal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
