import { useState } from 'react';

const CollectionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    type: 'Mobile',
    weight: ''
  });
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.weight) {
      setSuccess({ ok: false, message: 'Please fill all required fields.' })
      return
    }

    setSubmitting(true)
    const newReq = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    }

    // simulate small delay for UX
    setTimeout(() => {
      onSubmit(newReq)
      setSubmitting(false)
      setSuccess({ ok: true, message: 'Request submitted — we will contact you soon.' })
      setFormData({ name: '', email: '', address: '', type: 'Mobile', weight: '' })
      setTimeout(() => setSuccess(null), 4000)
    }, 450)
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white text-2xl mb-3">
          📦
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Schedule E-Waste Collection</h2>
        <p className="text-sm text-gray-600">Fill in the details below to request a pickup</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="collection form">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-1.5">Pickup Address</label>
          <textarea
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm resize-none"
            placeholder="123 Main Street, Apt 4B, City, State, ZIP"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-900 mb-1.5">Type of E-Waste</label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white text-sm"
            >
              <option value="Mobile">📱 Mobile Phone</option>
              <option value="Battery">🔋 Battery</option>
              <option value="Laptop">💻 Laptop / Computer</option>
              <option value="Charger">🔌 Charger / Cable</option>
              <option value="Other">📦 Other Electronics</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-semibold text-gray-900 mb-1.5">Approximate Weight (kg)</label>
            <input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              required
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
              placeholder="2.5"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Collection Request'}
          </button>
        </div>
      </form>

      {success && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 px-3 py-2 rounded-lg text-sm ${success.ok ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
          {success.message}
        </div>
      )}
    </div>
  );
}

export default CollectionForm;
