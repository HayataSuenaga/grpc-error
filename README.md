# Reproduction of `Connection GRPC stream error`

This is a sample project that reproduces the following problems with `@firebase/@firebase/rules-unit-testing`.

1. `Connection GRPC stream error` is logged for every run.

2. Jest test script does not exit after execution. Jest shows the following message:
    > Jest did not exit one second after the test run has completed.
    >
    > This usually means that there are asynchronous operations that weren't stopped in your tests.

The problems are reported at https://github.com/firebase/firebase-js-sdk/issues/5872

## How to run

### `npm run`

This executes the following script:

> firebase emulators:exec 'jest --env=node'

The above script starts Firestore emulator at port `8080`.