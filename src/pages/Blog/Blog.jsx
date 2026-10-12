import React, { useState } from 'react';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCards, setSelectedCards] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({
    1: [
      { name: 'Sarah Johnson', time: '5m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Great insights! This really helped me understand the startup funding landscape better.', likes: 12 },
      { name: 'Mike Chen', time: '15m ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Would love to see more content like this. Especially on product-market fit strategies.', likes: 8 },
    ],
    2: [], 3: [], 4: [], 5: [], 6: []
  });
  return (
    <>
      {/* Blog & Insights Heading */}
      <div className="w-full text-center pt-12 pb-4 bg-gradient-to-br from-black via-[#0a1a2f] to-[#0a1a2f]">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-2">Blog & Insights</h1>
        <p className="text-lg text-white mb-10">Stories, insights, and experiences from the entrepreneurial journey</p>

        {/* Featured Post Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row bg-[#0a1a2f] border-4 border-blue-500 rounded-3xl overflow-hidden shadow-xl relative">
            {/* Image */}
            <div className="md:w-1/2 w-full relative">
              <img
                src="/assets/ai-blog.jpg"
                alt="AI Ecosystem"
                className="object-cover w-full h-72 md:h-full"
              />
              {/* Trending badge */}
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 text-sm shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>
                Trending
              </span>
              {/* Category badge */}
              <span className="absolute bottom-4 left-4 bg-blue-700 text-white px-4 py-1 rounded-full font-semibold text-xs">AI & Technology</span>
            </div>
            {/* Content */}
            <div className="md:w-1/2 w-full flex flex-col justify-center p-8 text-left">
              <span className="text-blue-400 font-bold text-sm mb-2">FEATURED POST</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">How AI is Revolutionizing Startup Ecosystems in 2026</h2>
              <p className="text-blue-100 mb-6">Exploring the transformative impact of artificial intelligence on modern entrepreneurship and startup development...</p>
              <div className="flex items-center gap-4 text-blue-200 text-sm mb-6 flex-wrap">
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Arjun Sharma</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Feb 14, 2026</span>
                <span>• 8 min read</span>
                <span className="text-blue-400 font-semibold">12.5K views</span>
              </div>
              <button className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition flex items-center gap-2 w-fit">
                Read Full Article
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex flex-col lg:flex-row gap-8">
          {/* Left: Blog Grid */}
          <div className="flex-1">
            {/* Filter Buttons */}
            {(() => {
              const filters = [
                { label: 'All', value: 'all' },
                { label: 'Startup', value: 'startup' },
                { label: 'Tech', value: 'tech' },
                { label: 'AI', value: 'ai' },
                { label: 'Funding', value: 'funding' },
                { label: 'Productivity', value: 'productivity' },
              ];
              return (
                <div className="flex flex-wrap gap-4 mb-8">
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={
                        (activeFilter === filter.value
                          ? 'bg-blue-600 text-white shadow-md '
                          : 'bg-[#0a1a2f] text-blue-300 ') +
                        'px-5 py-2 rounded-full font-semibold transition duration-200 hover:bg-blue-700 hover:text-white hover:scale-105'
                      }
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* Blog Cards Grid with Filtering */}
            {(() => {
              const blogCards = [
                {
                  id: 1,
                  category: 'startup',
                  badge: 'Startup',
                  badgeColor: 'bg-purple-700',
                  title: '10 Lessons from Building a Successful Startup',
                  author: 'Priya Patel',
                  date: 'Feb 12, 2026',
                  stats: ['145', '24', '8.5K', '5 min'],
                  image: null,
                },
                {
                  id: 2,
                  category: 'tech',
                  badge: 'Tech',
                  badgeColor: 'bg-purple-700',
                  title: 'The Future of Web Development: Trends to Watch',
                  author: 'Rahul Kumar',
                  date: 'Feb 11, 2026',
                  stats: ['89', '18', '6.2K', '7 min'],
                  image: null,
                },
                {
                  id: 3,
                  category: 'ai',
                  badge: 'AI',
                  badgeColor: 'bg-purple-700',
                  title: 'AI Tools Every Entrepreneur Should Know',
                  author: 'Vikram Singh',
                  date: 'Feb 10, 2026',
                  stats: ['234', '31', '9.5K', '6 min'],
                  image: '/assets/ai-blog.jpg',
                },
                {
                  id: 4,
                  category: 'funding',
                  badge: 'Funding',
                  badgeColor: 'bg-blue-700',
                  title: 'Funding Strategies for Early-Stage Startups',
                  author: 'Ananya Gupta',
                  date: 'Feb 9, 2026',
                  stats: ['167', '27', '7.7K', '9 min'],
                  image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                },
                {
                  id: 5,
                  category: 'productivity',
                  badge: 'Productivity',
                  badgeColor: 'bg-pink-500',
                  title: 'Productivity Hacks from Top Founders',
                  author: 'Sneha Reddy',
                  date: 'Feb 8, 2026',
                  stats: ['98', '15', '5.4K', '4 min'],
                  image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
                },
                {
                  id: 6,
                  category: 'tech',
                  badge: 'Tech',
                  badgeColor: 'bg-purple-700',
                  title: 'Building Products Users Love: A UX Guide',
                  author: 'Sneha Reddy',
                  date: 'Feb 7, 2026',
                  stats: ['203', '22', '8.9K', '8 min'],
                  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                },
              ];
              const filteredCards = activeFilter === 'all'
                ? blogCards
                : blogCards.filter(card => card.category === activeFilter);
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredCards.map((card) => (
                    <div key={card.id} className="relative">
                      {/* Blur overlay for background when comment is open */}
                      {/* Remove global blur overlay. We'll use a local blur effect below the comment box. */}
                      <div
                        className={
                          `bg-[#0a1a2f] rounded-2xl p-5 shadow-lg relative cursor-pointer transition duration-200 ` +
                          (selectedCards.includes(card.id) ? 'ring-4 ring-blue-400 scale-105 z-50' : 'hover:ring-2 hover:ring-blue-400 hover:scale-105')
                        }
                        onClick={() => {
                          if (!selectedCards.includes(card.id)) setSelectedCards([...selectedCards, card.id]);
                        }}
                      >
                        <span className={`absolute top-4 left-4 bg-blue-700 text-white text-xs px-3 py-1 rounded-full`}>{card.badge}</span>
                        {card.image && <img src={card.image} alt={card.title} className="rounded-xl w-full h-32 object-cover mb-2" />}
                        <h3 className="text-lg font-bold text-white mt-8 mb-2">{card.title}</h3>
                        <div className="flex items-center gap-2 text-blue-200 text-xs mb-2">
                          <span>{card.author}</span>
                          <span>• {card.date}</span>
                        </div>
                        <div className="flex items-center gap-6 text-blue-200 text-xs mb-2">
                          {card.stats.map((stat, i) => <span key={i}>{stat}</span>)}
                        </div>
                      </div>
                      {/* Inline Comments Section */}
                      {selectedCards.includes(card.id) && (
                        <div className="relative z-50">
                          {/* Local blur effect behind the comment box */}
                          <div className="absolute inset-0 -z-10 backdrop-blur-md bg-black/30 rounded-2xl" />
                          <div className="bg-[#0a1a2f] rounded-2xl shadow-2xl mx-auto p-8 relative animate-fade-in">
                            <button className="absolute top-4 right-4 text-blue-300 hover:text-white text-2xl font-bold" onClick={() => setSelectedCards(selectedCards.filter(id => id !== card.id))}>&times;</button>
                            <h3 className="text-2xl font-bold text-white mb-1">Comments</h3>
                            <span className="text-blue-200 text-sm mb-4 block">{(comments[card.id]?.length || 0)} comments</span>
                            <div className="flex items-start gap-3 mb-4">
                              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="user" className="w-10 h-10 rounded-full object-cover" />
                              <div className="flex-1">
                                <textarea
                                  className="w-full p-3 rounded-lg bg-[#101c2c] text-white border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
                                  rows={2}
                                  placeholder="Share your thoughts..."
                                  value={comment}
                                  onChange={e => setComment(e.target.value)}
                                  onClick={e => e.stopPropagation()}
                                />
                                <button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 float-right"
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (comment.trim()) {
                                      setComments(prev => ({
                                        ...prev,
                                        [card.id]: [
                                          ...(prev[card.id] || []),
                                          { name: 'You', time: 'Just now', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: comment, likes: 0 }
                                        ]
                                      }));
                                      setComment('');
                                    }
                                  }}
                                >
                                  Post
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                              </div>
                            </div>
                            <div className="space-y-4 max-h-72 overflow-y-auto">
                              {(comments[card.id] || []).map((c, i) => (
                                <div key={i} className="bg-[#101c2c] rounded-xl p-4 flex gap-3">
                                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-white">{c.name}</span>
                                      <span className="text-xs text-blue-200">{c.time}</span>
                                    </div>
                                    <div className="text-blue-100 mb-2">{c.text}</div>
                                    <div className="flex items-center gap-4 text-xs text-blue-200">
                                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-3 3m0 0l-3-3m3 3V4m0 8v8" /></svg> {c.likes}</span>
                                      <span className="cursor-pointer hover:underline">Reply</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {/* Right: Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Trending Now */}
            <div className="bg-[#0a1a2f] rounded-2xl p-6 shadow-lg mb-4">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Trending Now</span></h4>
              <ol className="list-decimal ml-5 text-blue-100 space-y-2">
                <li>How We Scaled to 1M Users in 6 Months <span className="text-blue-400 ml-2">21.3K engagements</span></li>
                <li>The AI Startup Playbook for 2026 <span className="text-blue-400 ml-2">12.6K engagements</span></li>
                <li>Fundraising Mistakes to Avoid <span className="text-blue-400 ml-2">9.2K engagements</span></li>
                <li>Building in Public: Our Journey <span className="text-blue-400 ml-2">8.8K engagements</span></li>
              </ol>
            </div>
            {/* Community Stats */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-2xl p-6 shadow-lg text-white">
              <h4 className="text-lg font-bold mb-4">Community Stats</h4>
              <div className="flex flex-col gap-2 text-lg">
                <div className="flex justify-between"><span>Active Readers</span><span className="font-bold">25.4K</span></div>
                <div className="flex justify-between"><span>Posts Published</span><span className="font-bold">1,234</span></div>
                <div className="flex justify-between"><span>Comments Today</span><span className="font-bold">456</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Blog;