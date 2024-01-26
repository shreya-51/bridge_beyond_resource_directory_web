'use client'

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import data from './data/all_data.json';
import { Button } from "@/components/ui/button"

interface Resource {
  Name: string;
  Description?: string | null;
  Location?: string | null;
  "Contact information"?: string | null;
  Hours?: string | null;
  Eligibility?: string | null;
  Link?: string | null;
  "Other information"?: string | null;
  category?: string | null;
}

const resources: Resource[] = data;

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(resources);
  const [openResourceIndex, setOpenResourceIndex] = useState<number | null>(null);

  useEffect(() => {
    const fuse = new Fuse(resources, {
      keys: ['name', 'description', 'location', 'contact_information', 'hours', 'eligibility', 'link', 'other_information', 'category'],
      includeScore: true
    });

    const results = query ? fuse.search(query).map(result => result.item) : resources;
    setSearchResults(results);
  }, [query]);

  const handleCategoryClick = (category: string) => {
    const filteredResults = resources.filter(resource => resource.category === category);
    setSearchResults(filteredResults);
  };

  const toggleResourceInfo = (index: number) => {
    setOpenResourceIndex(openResourceIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center py-8">
        <img src="bb_logo.png" alt="Descriptive Text" width="300" height="200" />
      </div>
      <div className="flex justify-center py-8">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md block w-full md:w-[60rem] shadow-sm"
        />
      </div>
      <div className="flex flex-col items-center gap-y-4 py-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Button variant="outline" onClick={() => handleCategoryClick('food')}>Food</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('shelters')}>Shelters</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('clothing')}>Clothing</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('showers')}>Showers</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('legal')}>Legal</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('physical_healthcare')}>Physical Healthcare</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('mental_healthcare')}>Mental Healthcare</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('transportation')}>Transportation</Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Button variant="outline" onClick={() => handleCategoryClick('lgbtq')}>LGBTQ+</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('people_of_color')}>People of Color</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('substance_misuse')}>Substance Abuse</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('disability')}>Disabilty</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('veterans')}>Veterans</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('women')}>Women</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('family')}>Family</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('youth')}>Youth</Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Button variant="outline" onClick={() => handleCategoryClick('seniors')}>Seniors</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('winter')}>Winter</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('drop_in_centers')}>Drop-In Centers</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('immigrants_refugee')}>Immigrants/Refugees</Button>
          <Button variant="outline" onClick={() => handleCategoryClick('incarceration_support')}>Incarceration Support</Button>
        </div >
      </div >
      <div className="mt-4 flex flex-col items-center">
        {searchResults.map((resource, index) => (
          <div
            key={index}
            className="p-4 mb-2 border rounded-2xl hover:border-blue-300 shadow border-gray-200 cursor-pointer w-full md:w-[100rem]"
            onClick={() => toggleResourceInfo(index)}
          >
            <div className="flex gap-x-4 justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{resource.Name}</h2>
                <p className="text-gray-600">{resource.Description}</p>
              </div>
              <span className="">
                {openResourceIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {openResourceIndex === index && (
              <div className="mt-2 text-gray-600">
                {resource.Location && <p>Location: {resource.Location}</p>}
                {resource["Contact information"] && <p>Contact Information: {resource["Contact information"]}</p>}
                {resource.Hours && <p>Hours: {resource.Hours}</p>}
                {resource.Eligibility && <p>Eligibility: {resource.Eligibility}</p>}
                {resource.Link && <p>Link: <a href={resource.Link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{resource.Link}</a></p>}
                {resource["Other information"] && <p>Other Information: {resource["Other information"]}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

    </div >
  );
};

export default Home;
