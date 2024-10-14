const express = require('express');
const { connect, StringCodec } = require('nats');

// Define NATS server and subject
const natsServer = 'localhost:4222';
const subject = 'ORDERS.CHECKOUT';

// Create an Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Create a NATS connection
let nc;
(async () => {
  nc = await connect({ servers: natsServer });
  console.log('Connected to NATS server');
})();

// Endpoint to accept product ID and send request to NATS
app.post('/order', async (req, res) => {
  const productId = req.body.productId;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const sc = StringCodec();
  const message = `Place order for product ${productId}`;
  console.log(`Sending order request: ${message}`);

  try {
    // Send request and wait for response (with a timeout)
    const response = await nc.request(subject, sc.encode(message), { timeout: 5000 });
    console.log(`Received response: ${sc.decode(response.data)}`);
    
    // Send the response back to the client
    res.json({ message: sc.decode(response.data) });
  } catch (err) {
    console.error(`Failed to get a response: ${err.message}`);
    res.status(500).json({ error: 'Failed to get a response from NATS' });
  }
});

// Gracefully close the NATS connection on process exit
process.on('exit', () => {
  if (nc) {
    nc.close();
  }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
