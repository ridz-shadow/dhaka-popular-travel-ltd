import { Fragment, useState } from "react";
import Header from "./components/common/header";
import PageTitle from "./components/common/page-title";

function App() {
  const [selectedTab, setSelectedTab] = useState("one_way");
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState("");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const tabOptions = [
    { id: "round_trip", label: "Round Trip" },
    { id: "one_way", label: "One Way" },
    { id: "multi_city", label: "Multi City" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setFlights(jsonData.flightOffer);
      setMessage(jsonData.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTabs = (
    <div className="flex justify-center">
      {tabOptions.map((option) => (
        <button
          key={option.id}
          className={`px-4 py-2 focus:outline-none ${
            selectedTab === option.id
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleTabChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  const renderForm = (
    <form
      className="mt-4 border-y border-gray-300 w-full py-2 px-4 lg:px-0"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col lg:flex-row justify-start items-center">
        <input
          type="text"
          id="from"
          name="from"
          className="form-input mt-1 mb-4 md:mb-0 px-3 py-2 border border-gray-300 mr-2 w-full lg:w-1/6"
          placeholder="From"
        />
        <input
          type="text"
          id="to"
          name="to"
          className="form-input mt-1 mb-4 md:mb-0 px-3 py-2 border border-gray-300 mr-2 w-full lg:w-1/6"
          placeholder="To"
        />
        <input
          type="date"
          id="departure"
          name="departure"
          className="form-input mt-1 mb-4 md:mb-0 px-3 py-2 border border-gray-300 mr-2 w-full lg:w-1/6"
          placeholder="Departure"
        />
        <div className="flex flex-row mt-1 mb-4 md:mb-0 justify-start mr-2 items-center w-full lg:w-2/12">
          <input
            type="text"
            id="dayMinus"
            name="dayMinus"
            className="form-input px-3 py-2 border border-gray-300 mr-2 w-1/2"
            placeholder="Day -"
          />
          <input
            type="text"
            id="dayPlus"
            name="dayPlus"
            className="form-input px-3 py-2 border border-gray-300 w-1/2"
            placeholder="Day +"
          />
        </div>
        <div className="flex flex-row mt-1 mb-4 md:mb-0 justify-start mr-2 items-center w-full lg:w-3/12">
          <select
            id="anyTime"
            name="anyTime"
            className="form-select px-3 py-2 border border-gray-300 mr-2 w-full"
          >
            <option value="any">Any Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <button
            type="button"
            className="flex items-center px-3 py-2 focus:outline-none"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <div className="flex flex-row mt-1 mb-4 md:mb-0 justify-start mr-2 items-center w-full lg:w-5/12">
          <select
            id="adt"
            name="adt"
            className="form-select px-3 py-2 border border-gray-300 mr-2 w-full"
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
          </select>
          <select
            id="numberOfPeople"
            name="numberOfPeople"
            className="form-select px-3 py-2 border border-gray-300 mr-2 w-full"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1} Person{index !== 0 ? "s" : ""}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="flex items-center px-3 py-2 focus:outline-none"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2 w-full"></div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-3 font-bold">
        <div className="flex items-center py-2 md:py-0">
          <input
            type="checkbox"
            id="extraOptions"
            name="extraOptions"
            className="form-checkbox h-5 w-5 text-gray-600"
          />
          <label htmlFor="extraOptions" className="ml-2">
            Extra Options
          </label>
        </div>
        <div className="flex items-center py-2 md:py-0">
          <span className="mr-2">Environment:</span>
          <input
            type="radio"
            id="dummy"
            name="environment"
            value="dummy"
            defaultChecked
            className="form-radio h-5 w-5 text-gray-600"
          />
          <label htmlFor="dummy" className="ml-1 mr-4">
            Dummy
          </label>
          <input
            type="radio"
            id="pdt"
            name="environment"
            value="pdt"
            className="form-radio h-5 w-5 text-gray-600"
          />
          <label htmlFor="pdt" className="ml-1">
            PDT
          </label>
        </div>
        <button
          type="submit"
          className="my-2 md:my-0 w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
    </form>
  );

  const renderResult = (
    <div className="mt-4 px-4 lg:px-0 overflow-x-scroll">
      <table className="bg-gray-100 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flight
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aircraft
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fare
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Departure
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrival
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flights.map((flight, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.itineraries.map((itinerary) =>
                  itinerary.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="text-sm text-gray-900">
                      <span>
                        {segment.carrierCode} {segment.aircraft}
                      </span>
                    </div>
                  ))
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.itineraries.map((itinerary) =>
                  itinerary.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="text-sm text-gray-900">
                      <span>{segment.flightNumber}</span>
                    </div>
                  ))
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.class.map((cls, clsIndex) => (
                  <div key={clsIndex}>
                    {cls.map((item, itemIndex) => (
                      <Fragment key={itemIndex}>
                        {item}
                        <br />
                      </Fragment>
                    ))}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.fareBasis.map((fare, fareIndex) => (
                  <div key={fareIndex}>
                    {fare.map((basis, basisIndex) => (
                      <Fragment key={basisIndex}>
                        {basis}
                        <br />
                      </Fragment>
                    ))}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.itineraries.map((itinerary) =>
                  itinerary.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="text-sm text-gray-900">
                      <span>
                        {segment.departure.iataCode} -{" "}
                        {segment.arrival.iataCode}
                      </span>
                    </div>
                  ))
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.itineraries.map((itinerary) =>
                  itinerary.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="text-sm text-gray-900">
                      <span>{segment.departure.at}</span>
                    </div>
                  ))
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {flight.itineraries.map((itinerary) =>
                  itinerary.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="text-sm text-gray-900">
                      <span>{segment.arrival.at}</span>
                    </div>
                  ))
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                {flight.itineraries.map((itinerary, itineraryIndex) => (
                  <Fragment key={itineraryIndex}>
                    <span>{itinerary.duration}</span>
                    <br />
                  </Fragment>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                <div className="text-sm text-gray-900">{flight.price}</div>
                <button className="mt-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  SELECT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!flights.length && (
        <div className="w-full text-center py-60">
          Please submit the form ...
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Header />
      <PageTitle title="Master Price" />
      <main className="container mx-auto py-4 px-4">
        {renderTabs}

        {renderForm}

        <div className="w-full font-bold py-2">{message}</div>

        {renderResult}
      </main>
    </div>
  );
}

export default App;
