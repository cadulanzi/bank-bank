# bank-bank

Bank-Bank is a simple banking application that allows users to create accounts, deposit money, transfer funds between accounts, and view account history.

## Features

- Create new bank accounts
- Deposit money into accounts
- Transfer funds between accounts
- View account balance and transaction history

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Jest (for testing)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/bank-bank.git
   ```

2. Navigate to the project directory:

   ```
   cd bank-bank
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Usage

1. Start the development server:

   ```
   npm run dev
   ```

2. Build the production-ready code:

   ```
   npm run build
   ```

3. Start the production server:

   ```
   npm start
   ```

### API Endpoints

- `POST /api/v1/accounts` - Create a new account
- `GET /api/v1/accounts/:accountNumber/balance` - Get account balance
- `POST /api/v1/accounts/:accountNumber/deposit` - Deposit money into an account
- `POST /api/v1/accounts/transfer` - Transfer funds between accounts
- `GET /api/v1/accounts/:accountNumber/history` - Get account transaction history

## Testing

Run the tests using the following command:

```
npm test
```

## Project Structure

- `src/controllers` - Contains the controller classes for handling API requests
- `src/services` - Contains the service classes for business logic
- `src/repositories` - Contains the repository classes for data access
- `src/models` - Contains the model classes for data representation
- `src/routes` - Contains the route definitions
- `src/middlewares` - Contains the middleware functions
- `src/config` - Contains the configuration files
- `src/utils` - Contains utility functions and classes
- `tests` - Contains the test files

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
