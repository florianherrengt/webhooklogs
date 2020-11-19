import { testApp } from "./testApp";

testApp.listen(3001, () => {
    console.log("Test server is listening on http://localhost:3001");
});
