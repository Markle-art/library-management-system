
import { useState } from 'react';

function SpaceBookingPage() {
  const [formData, setFormData] = useState({
    space: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.endTime <= formData.startTime) {
      setMessage('End time must be later than start time.');
      return;
    }

    setMessage(
      'Your booking details have been captured. Booking submission will be available when the backend booking API is implemented.',
    );
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">LIBRARY FACILITIES</p>
        <h1>Book a Space</h1>
        <p className="auth-description">
          Choose a space and select your preferred booking time.
        </p>

        {message && (
          <p className="status-message" role="status">
            {message}
          </p>
        )}

        <label htmlFor="space">Select a space</label>
        <select
          id="space"
          name="space"
          value={formData.space}
          onChange={handleChange}
          required
        >
          <option value="">Choose a space</option>
          <option value="Study Room">Study Room</option>
          <option value="Discussion Room">Discussion Room</option>
          <option value="Computer Lab">Computer Lab</option>
        </select>

        <label htmlFor="date">Booking date</label>
        <input
          id="date"
          type="date"
          name="date"
          min={new Date().toLocaleDateString('en-CA')}
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="startTime">Start time</label>
        <input
          id="startTime"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="endTime">End time</label>
        <input
          id="endTime"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Review Booking</button>
      </form>
    </main>
  );
}

export default SpaceBookingPage;
