import React from "react";

function Reading() {
  const currentlyReading = [];

  return (
    <section id="reading" className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="section-title text-center">Reading</h2>
        <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
          Here are some books that I'm currently reading and have read.
        </p>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Currently Reading
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {currentlyReading.map((book, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {book.title}
                    </h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      {book.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-gray-700">{book.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reading;
