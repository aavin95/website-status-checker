"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch('/api/status')
      .then((response) => response.json())
      .then((data) => setStatuses(data));
  }, []);

  return (
    <div>
      <h1>Website Statuses</h1>
      <ul>
        {statuses.map((site) => (
          <li key={site.url}>
            {site.name} ({site.url}): {site.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
