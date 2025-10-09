import { useState, useMemo } from 'react';

const SegregationGuide = () => {
  const [openCard, setOpenCard] = useState(null);
  const [query, setQuery] = useState('')

  const categories = [
    {
      id: 1,
      title: '📱 Mobile Phones',
      description: 'Old smartphones and feature phones contain valuable materials like gold, silver, and copper.',
      dos: [
        'Remove SIM cards and memory cards',
        'Factory reset the device',
        'Keep original charger if possible'
      ],
      donts: [
        'Don\'t throw in regular trash',
        'Don\'t expose to water',
        'Don\'t attempt to dismantle battery'
      ],
      recyclable: 'Glass, plastic casing, circuit boards, precious metals, batteries'
    },
    {
      id: 2,
      title: '🔋 Batteries',
      description: 'Batteries contain hazardous materials and must be handled with extreme care.',
      dos: [
        'Store in a cool, dry place',
        'Tape terminals of lithium batteries',
        'Keep different battery types separate'
      ],
      donts: [
        'Never burn or puncture batteries',
        'Don\'t mix with regular waste',
        'Avoid exposing to extreme temperatures'
      ],
      recyclable: 'Lithium, cobalt, nickel, cadmium, lead, zinc'
    },
    {
      id: 3,
      title: '💻 Laptops & PCs',
      description: 'Computers contain valuable components and data that require proper disposal.',
      dos: [
        'Backup and erase all data',
        'Remove hard drives if keeping data',
        'Keep components together'
      ],
      donts: [
        'Don\'t leave personal data',
        'Don\'t discard working parts',
        'Don\'t break screens or monitors'
      ],
      recyclable: 'Aluminum, copper wiring, circuit boards, plastic casings, glass screens'
    },
    {
      id: 4,
      title: '🔌 Cables & Chargers',
      description: 'Power cables and adapters contain copper and other reusable materials.',
      dos: [
        'Bundle cables together',
        'Label different types',
        'Keep chargers with their cables'
      ],
      donts: [
        'Don\'t cut or damage cables',
        'Don\'t mix with organic waste',
        'Don\'t throw in landfills'
      ],
      recyclable: 'Copper wire, plastic insulation, transformer components'
    },
    {
      id: 5,
      title: '🏠 Home Appliances',
      description: 'Large appliances like refrigerators, washing machines, and microwaves.',
      dos: [
        'Remove all personal items',
        'Drain liquids if applicable',
        'Schedule bulk pickup'
      ],
      donts: [
        'Don\'t abandon on streets',
        'Don\'t release refrigerants yourself',
        'Don\'t break glass components'
      ],
      recyclable: 'Metal frames, motors, copper coils, plastic parts, glass'
    }
  ];

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  const filtered = useMemo(() => {
    if (!query) return categories
    const q = query.toLowerCase()
    return categories.filter(c => (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.recyclable.toLowerCase().includes(q) ||
      c.dos.join(' ').toLowerCase().includes(q) ||
      c.donts.join(' ').toLowerCase().includes(q)
    ))
  }, [query])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="guide-search" className="sr-only">Search guide</label>
        <input
          id="guide-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories, tips, or materials..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:border-gray-900 focus:ring-gray-900 text-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-sm text-gray-600 px-3 py-2 hover:text-gray-900 font-medium">Clear</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500 shadow-sm">
          No categories match your search.
        </div>
      )}

      {filtered.map((category) => (
        <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleCard(category.id)}
            aria-expanded={openCard === category.id}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-base font-semibold text-gray-900 text-left">{category.title}</h3>
            <span className="text-xl text-gray-600 font-bold">{openCard === category.id ? '−' : '+'}</span>
          </button>

          {openCard === category.id && (
            <div className="px-6 pb-6 border-t border-gray-200 pt-4 bg-gray-50">
              <p className="text-gray-700 mb-4 text-sm">{category.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">✅ Do's</h4>
                  <ul className="space-y-2">
                    {category.dos.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">❌ Don'ts</h4>
                  <ul className="space-y-2">
                    {category.donts.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">♻️ Recyclable Materials</h4>
                <p className="text-sm text-gray-700">{category.recyclable}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SegregationGuide;
