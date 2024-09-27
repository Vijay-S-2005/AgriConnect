import NodeCache from 'node-cache';

// Create a new instance of NodeCache with default TTL of 5 minutes (300 seconds)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export { cache };