import SegregationGuide from '../components/SegregationGuide';

const Guide = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            🧾 E-Waste Segregation Guide
          </h1>
          <p className="text-gray-600">
            Learn how to properly segregate different types of electronic waste for safe and 
            efficient recycling. Click on each category to expand and view detailed information.
          </p>
        </div>

        <SegregationGuide />

        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Proper Segregation Matters
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <strong className="text-gray-900">♻️ Maximizes Recycling:</strong> Proper segregation 
              ensures that valuable materials like gold, silver, and copper can be efficiently recovered.
            </p>
            <p>
              <strong className="text-gray-900">🌍 Protects Environment:</strong> Prevents hazardous 
              materials like lead and mercury from contaminating soil and water.
            </p>
            <p>
              <strong className="text-gray-900">⚡ Saves Energy:</strong> Recycling electronics uses 
              significantly less energy than producing new materials from scratch.
            </p>
            <p>
              <strong className="text-gray-900">🔒 Data Security:</strong> Proper disposal ensures 
              your personal data is completely erased and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
