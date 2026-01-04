import { useState } from 'react';
import '../styles/main.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Whether you're looking to buy, sell, or
          rent a property, or if you have any questions, please don't hesitate
          to get in touch.
        </p>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Address:</strong> 345 High level street, Brixton, London</p>
          <p><strong>Phone:</strong> +94 78 384 0690</p>
          <p><strong>Email:</strong> propifyestateagents@gmail.com</p>
          <p><strong>Opening Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="020 1234 5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us how we can help you..."
              style={{
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          * Required fields. This is a demonstration form and does not submit data to a server.
        </p>
      </div>

      {showMessage && (
        <div className="modal-overlay" onClick={handleCloseMessage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Under Development</h2>
            </div>
            <div className="modal-body">
              <p>This part is under development.</p>
              <p>Sorry for that.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleCloseMessage}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
