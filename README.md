# Environment Variables

Please set up the following environment variables in a `.env` file before running the server.

```bash
PORT=3000
CLIENT_ID="cloud project client ID"
CLIENT_SECRET="cloud project client key"
TUYA_DOMAIN="https://openapi.tuya(eu/cn/us).com" # the appropriate Tuya domain for the region
```

# Running the Development Server

install dependencies:
```bash
npm install
```

run the development server:
```bash
npm run dev
```

> Running the development server will run `tsc -w` (tscompile in watch mode) in the background with nodemon watching for changes to the `dist` directory. Only make changes to Typescript files in the `src` directory. Tscompile will automatically perform static type checks and compile the source code into Javascript in the `dist` directory.

# Running Tests

An example test script written with **Jest** is available at `src/app/v1/devices/devices.test.ts`. This file contains a single Jest suite testing the `/v1/devices/hub` and `/v1/devices/sensor` endpoints.

To run the tests:
```bash
npm run test:all
```