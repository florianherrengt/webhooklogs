import { testApp } from './testApp';

const port = process.env.PORT || 3001;

testApp.listen(port, () => {
    console.log(`Test server is listening on http://localhost:${port}`);
});
