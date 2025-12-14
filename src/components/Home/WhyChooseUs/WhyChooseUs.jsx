import {
  FaTrophy,
  FaUsers,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">ContestHub</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A modern platform built to discover talent, compete fairly, and win
            real rewards.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body text-center">
              <FaTrophy className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Win Exciting Prizes</h3>
              <p className="text-gray-500 text-sm mt-2">
                Participate in creative contests and earn prize money based on
                your talent.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body text-center">
              <FaUsers className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Fair Competition</h3>
              <p className="text-gray-500 text-sm mt-2">
                Transparent participation, real users, and unbiased contest
                evaluation.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body text-center">
              <FaMoneyBillWave className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="text-gray-500 text-sm mt-2">
                Safe and reliable payment system for contest registration and
                rewards.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body text-center">
              <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Trusted Platform</h3>
              <p className="text-gray-500 text-sm mt-2">
                Built with modern technologies ensuring performance and data
                security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
