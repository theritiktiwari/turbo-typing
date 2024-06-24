# Turbo Typing

Turbo Typing is a web application designed to help users improve their typing speed and accuracy. The app features a typing test where users can measure their words per minute (WPM), characters per minute (CPM), and accuracy. It also provides a variety of statistics and progress tracking over time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Typing test with real-time feedback
- Progress tracking and statistics
- User authentication
- Various typing exercises
- Responsive design

## Tech Stack

Turbo Typing is built using the following technologies:

- **Next.js**: React framework for server-side rendering and static site generation
- **NextAuth.js**: Authentication for Next.js applications
- **MongoDB**: NoSQL database for storing user data and typing statistics
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **Lucide-react**: Icon library for React
- **date-fns**: Utility library for date and time functions
- **clsx**: Utility for constructing `className` strings conditionally
- **shadcn**: Component library for React
- **react-hook-form**: Library for managing forms in React
- **react-hot-toast**: Notifications for React applications
- **react-spinners**: Loading spinners for React
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: TypeScript-first schema declaration and validation library
- **Zustand**: State management library for React
- **TypeScript**: Typed JavaScript for scalable and maintainable code

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/turbo-typing.git
    cd turbo-typing
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    NEXT_PUBLIC_APP_NAME=
    NEXT_PUBLIC_SUPPORT_EMAIL=
    
    MONGO_URI=
    
    NEXTAUTH_URL=
    NEXTAUTH_SECRET=
    
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    
    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign up or log in using your preferred authentication method.
- Start a typing test by selecting a paragraph and hitting the start button.
- View your results including WPM, CPM, and accuracy.
- Track your progress over time from your profile page.

## Contributing

We welcome contributions to Turbo Typing! Here's how you can help:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Open a pull request.

Please make sure to update tests as appropriate.
