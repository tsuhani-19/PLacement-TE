import React, { useState, useEffect } from "react";
import axios from "axios";

const Entrepreneur = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    organizer: "",
    password: "",
  });

  // Fetch Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting Event Data:", eventData);
    
    try {
      const response = await axios.post("http://localhost:5001/api/events/addEvent", eventData);
      
      if (response.data.success) {
        setEvents([...events, response.data.event]); // Add new event to UI
        alert("✅ Event Added Successfully!");
        setShowPanel(false);
        setEventData({ title: "", description: "", date: "", organizer: "", password: "" });
      } else {
        alert("❌ Failed to add event: " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert("❌ Error adding event. Please check your input.");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans relative">
      <section className="py-12 px-6 bg-gray-100">
        {/* Centered "Add Event" Button */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setShowPanel(true)} 
            className="bg-purple-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-500 transition"
          >
            Add Event
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-4">
          {/* Dynamically Display Events */}
          {events.map((event, index) => (
            <div key={index} className="w-80 h-auto p-6 border rounded-xl shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              {event.organizer && <p className="text-gray-600"><strong>Organizer:</strong> {event.organizer}</p>}
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Right-Side Panel (Form for Adding Event) */}
      {showPanel && (
        <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0">
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleInputChange} className="p-2 border rounded" required />
            <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="date" name="date" value={eventData.date} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="text" name="organizer" placeholder="Organizer Name" value={eventData.organizer} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="password" name="password" placeholder="Admin Password" value={eventData.password} onChange={handleInputChange} className="p-2 border rounded" required />
            
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-500 transition">
                Submit
              </button>
              <button type="button" onClick={() => setShowPanel(false)} className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-500 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Entrepreneur;
