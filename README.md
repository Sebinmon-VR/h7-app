# H7 App

This is a React Native application built with Expo.

## Getting Started

To get started, you need to have Node.js and npm installed on your machine.

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Start the application:
    ```bash
    npm start
    ```

This will open the Expo DevTools in your browser. You can then run the app on an Android emulator or on your physical device using the Expo Go app.

## Configuration

### Full-Screen Mode

To provide a more immersive experience, the application is configured to run in full-screen mode on Android devices. This is achieved by hiding the navigation bar and the status bar.

*   **Navigation Bar**: The navigation bar is hidden by setting the `visible` property of the `navigationBar` object to `false` in the `android` section of the `app.json` file.

    ```json
    "android": {
      "navigationBar": {
        "visible": false
      }
    }
    ```

*   **Status Bar**: The status bar is hidden globally by adding a `<StatusBar hidden />` component to the root `App.tsx` file.

    ```typescriptreact
    // App.tsx
    import { StatusBar } from 'expo-status-bar';

    // ...

    <NavigationContainer>
      <StatusBar hidden />
      {/* ... */}
    </NavigationContainer>
    ```

You may need to rebuild your application for the changes in `app.json` to take effect.
