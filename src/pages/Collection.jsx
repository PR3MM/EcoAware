import { useState, useEffect } from 'react';
import CollectionForm from '../components/CollectionForm';
import CollectionList from '../components/CollectionList';

const Collection = () => {
  const [requests, setRequests] = useState([]);

  // Load requests from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ewasteRequests');
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem('ewasteRequests', JSON.stringify(requests));
  }, [requests]);

  const handleSubmit = (newRequest) => {
    setRequests([newRequest, ...requests]);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            📦 Collection Portal
          </h1>
          <p className="text-gray-600">
            Schedule a pickup for your e-waste. Fill out the form below and we'll arrange collection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <CollectionForm onSubmit={handleSubmit} />
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Submit Request</h4>
                  <p className="text-sm text-gray-600">Fill out the collection form with your details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Verification</h4>
                  <p className="text-sm text-gray-600">We'll verify your request and contact you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Schedule Pickup</h4>
                  <p className="text-sm text-gray-600">A convenient pickup time will be arranged</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Eco-Friendly Disposal</h4>
                  <p className="text-sm text-gray-600">Your e-waste will be responsibly recycled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CollectionList requests={requests} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Collection;
