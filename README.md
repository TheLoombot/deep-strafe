# DeepStrafe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

Run `ng build; firebase deploy` to build and deploy the project. 

# Project Notes

First goal is just to get basic auth working in an Angular app deployed to Firebase authenticating via Spotify.

## Authentication

We use the "Authorization Code" flow described in Spotify's [auth guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/). Clicking "sign in with Spotify" in the app calls the `redirect` Cloud Function, which sets a cookie with a CSRF-preventing random value, and then redirects the user to the Spotify authorize URL, which then redirects back to the app (see Routing section below) with an access code (and the CSRF value).

What should happen next:

* The access code and CSRF value are passed to the `token` Cloud Function
* This function: 
 * Checks the CSRF value against the one stored in the user's cookie
 * Saves the access code from Spotify to the Firebase DB for this user
 * Creates a Firebase account for the user and get a Firebase auth token back
* We then log the user in to the Firebase account with that Firebase auth token

This whole pattern, and all the current deployed Cloud Function code, is stolen from [this sample project](https://github.com/firebase/functions-samples/tree/master/spotify-auth).

## Routing

The only use case for routes right now is the OAuth callback from Spotify.

We have to use the route to the root path (`/`) because if we use any path other than `/` ... e.g. `/callback` ... Firebase doesn't like that. You can workaround Firebase by using so-called "HTML 5 mode" in Angular, which just adds a hashtag to the URLs like `poop.com/#/callback` ... but then Spotify doesn't like that (you have to configure Spotify dev settings with your redirect URL for OAuth).

So, we just route back to the root path. 