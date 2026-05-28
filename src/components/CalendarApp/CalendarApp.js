import { useState } from "react";
import "./styles.css";

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [validationError, setValidationError] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const goToPreviousMonth = () => {

    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  };

  const openAddEventModal = () => {
    setShowModal(true);
    setEventDate("");
    setEventTitle("");
    setValidationError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEventDate("");
    setEventTitle("");
    setValidationError("");
  };

  const saveEvent = () => {
    setValidationError("");
    if (!eventTitle.trim()) {
      return setValidationError("Please enter event title");
    }

    if (!eventDate) {
      return setValidationError("Please select event date");
    }

    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
    };
    setEvents((prev) => ({
      ...prev,
      [eventDate]: [...(prev[eventDate] || []), newEvent],
    }));
    closeModal();
  };

  const deleteEvent = (eventId, date) => {
    setEvents((prev) => ({
      ...prev, [date]: prev[date].filter((event) => event.id !== eventId)
    }))
  };

  const isToday = (day) => {
    return (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());

  };

  const getEventsForDay = (day) => {
    const targetDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events[targetDate] || [];
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calender-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const todayClass = isToday(day) ? "today" : "";

      days.push(
        <div key={day} className={`calender-day ${todayClass}`}>
          <span className="day-number">{day}</span>
          <div className="events-container">
            {dayEvents.map((event) => (
              <div key={event.id}
                className="event-item"
                data-testid="event-item">
                <span>{event.title}</span>
                <button onClick={() => deleteEvent(event.id, event.date)}
                  className="delete-btn"
                  data-testid="delete-event-btn">*</button>
              </div>
            ))}
          </div>
        </div>
      )

    }
    return days;
  };

  return (
    <div className="calendar-app" data-testid="calendar-container">
      <div className="calendar-header">
        <button
          data-testid="prev-month-btn"
          className="nav-btn"
          onClick={goToPreviousMonth}
        >
          &#8249;
        </button>
        <span data-testid="month-year-display">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          data-testid="next-month-btn"
          className="nav-btn"
          onClick={goToNextMonth}
        >
          &#8250;
        </button>
      </div>

      <button
        data-testid="add-event-btn"
        className="add-event-btn"
        onClick={openAddEventModal}
      >
        + Add Event
      </button>

      <div className="calendar-grid">
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="weekday">
              {d}
            </div>
          ))}
        </div>
        <div className="days-grid">{renderCalendarDays()}</div>
      </div>

      {showModal && (
        <div data-testid="event-modal" className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Event</h3>
              <button
                className="close-btn"
                onClick={closeModal}
                data-testid="close-modal-btn"
              >
                *
              </button>
            </div>
            {validationError && (
              <div data-testid="validation-error" className="error-message">
                <h3>{validationError}</h3>
              </div>
            )}
            <div className="modal-body">
              <div className="form-group">
                <label>Event Title:</label>
                <input
                  data-testid="event-title-input"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Event title"
                />
                <br />
                <br />
                <label>Event Date:</label>
                <input
                  type="date"
                  data-testid="event-date-input"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <div className="modal-footer">
                  <button
                    data-testid="save-event-btn"
                    className="save-btn"
                    onClick={() => saveEvent(eventTitle, eventDate)}
                  >
                    Save Event
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
